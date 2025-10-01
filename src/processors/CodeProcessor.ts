import { BaseProcessor } from './BaseProcessor';
import { CodeNodeConfig, NodeOutput, ExecutionContext, NodeSchema } from '../types';

export class CodeProcessor extends BaseProcessor {
  async execute(input: Record<string, any>, context: ExecutionContext): Promise<NodeOutput> {
    const config = input.config as CodeNodeConfig;
    const startTime = Date.now();
    
    try {
      // Validate configuration
      const validation = this.validate(config);
      if (!validation.isValid) {
        return this.createOutput(null, false, `Configuration error: ${validation.errors.join(', ')}`);
      }
      
      // Prepare execution context
      const executionContext = this.prepareExecutionContext(config, input, context);
      
      // Execute code based on language
      let result: any;
      switch (config.language) {
        case 'javascript':
          result = await this.executeJavaScript(config.code, executionContext, config.timeout);
          break;
        case 'python':
          result = await this.executePython(config.code, executionContext, config.timeout);
          break;
        default:
          throw new Error(`Unsupported language: ${config.language}`);
      }
      
      const executionTime = Date.now() - startTime;
      
      return this.createOutput(
        { [config.outputVariable]: result },
        true,
        undefined,
        { executionTime }
      );
      
    } catch (error) {
      const executionTime = Date.now() - startTime;
      return this.createOutput(null, false, (error as Error).message, { executionTime });
    }
  }
  
  getSchema(): NodeSchema {
    return {
      inputs: [
        {
          name: 'input_variables',
          type: 'object',
          required: false,
          description: 'Variables available in the code execution context'
        }
      ],
      outputs: [
        {
          name: 'result',
          type: 'any',
          description: 'Output from code execution stored in specified variable'
        }
      ],
      config: [
        {
          key: 'language',
          label: 'Language',
          type: 'select',
          required: true,
          options: ['javascript', 'python'],
          description: 'Programming language for the code'
        },
        {
          key: 'code',
          label: 'Code',
          type: 'code',
          required: true,
          placeholder: 'Enter your code here...',
          description: 'Code to execute'
        },
        {
          key: 'inputVariables',
          label: 'Input Variables',
          type: 'json',
          required: false,
          placeholder: '["variable1", "variable2"]',
          description: 'List of variables to make available in code context'
        },
        {
          key: 'outputVariable',
          label: 'Output Variable',
          type: 'text',
          required: true,
          placeholder: 'result',
          description: 'Variable name to store the output'
        },
        {
          key: 'timeout',
          label: 'Timeout (ms)',
          type: 'number',
          required: true,
          validation: { min: 1000, max: 30000 },
          description: 'Maximum execution time in milliseconds'
        },
        {
          key: 'allowedModules',
          label: 'Allowed Modules',
          type: 'json',
          required: false,
          placeholder: '["math", "json", "datetime"]',
          description: 'List of allowed modules/libraries (security)'
        }
      ]
    };
  }
  
  private prepareExecutionContext(
    config: CodeNodeConfig,
    input: Record<string, any>,
    context: ExecutionContext
  ): Record<string, any> {
    const executionContext: Record<string, any> = {};
    
    // Add specified input variables
    if (config.inputVariables) {
      config.inputVariables.forEach(varName => {
        if (input[varName] !== undefined) {
          executionContext[varName] = input[varName];
        } else if (context.variables[varName] !== undefined) {
          executionContext[varName] = context.variables[varName];
        }
      });
    }
    
    // Add workflow context
    executionContext.__context = {
      executionId: context.executionId,
      timestamp: context.timestamp,
      globalState: context.globalState
    };
    
    return executionContext;
  }
  
  private async executeJavaScript(
    code: string,
    executionContext: Record<string, any>,
    timeout: number
  ): Promise<any> {
    // Create a safe execution environment
    const safeCode = this.createSafeJavaScriptEnvironment(code, executionContext);
    
    return this.executeWithTimeout(
      new Promise((resolve, reject) => {
        try {
          // Use Function constructor for safer evaluation than eval
          const func = new Function('context', `
            "use strict";
            ${Object.keys(executionContext).map(key => `const ${key} = context.${key};`).join('\n')}
            
            return (function() {
              ${safeCode}
            })();
          `);
          
          const result = func(executionContext);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }),
      timeout
    );
  }
  
  private async executePython(
    code: string,
    executionContext: Record<string, any>,
    timeout: number
  ): Promise<any> {
    // Mock Python execution (in real implementation, use python-shell or similar)
    return this.executeWithTimeout(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            // Mock Python execution result
            const mockResult = this.mockPythonExecution(code, executionContext);
            resolve(mockResult);
          } catch (error) {
            reject(error);
          }
        }, 100 + Math.random() * 500);
      }),
      timeout
    );
  }
  
  private createSafeJavaScriptEnvironment(code: string, context: Record<string, any>): string {
    // Remove potentially dangerous operations
    const dangerousPatterns = [
      /require\s*\(/g,
      /import\s+/g,
      /eval\s*\(/g,
      /Function\s*\(/g,
      /setTimeout\s*\(/g,
      /setInterval\s*\(/g,
      /process\./g,
      /global\./g,
      /window\./g,
      /document\./g
    ];
    
    let safeCode = code;
    dangerousPatterns.forEach(pattern => {
      if (pattern.test(safeCode)) {
        throw new Error(`Potentially unsafe operation detected: ${pattern.source}`);
      }
    });
    
    return safeCode;
  }
  
  private mockPythonExecution(code: string, context: Record<string, any>): any {
    // Simple mock for common Python operations
    if (code.includes('len(')) {
      return 42; // Mock length
    }
    
    if (code.includes('sum(')) {
      return 100; // Mock sum
    }
    
    if (code.includes('json.loads') || code.includes('json.dumps')) {
      return { mock: 'json_result', data: Object.keys(context) };
    }
    
    if (code.includes('math.')) {
      return 3.14159; // Mock math result
    }
    
    if (code.includes('datetime')) {
      return new Date().toISOString();
    }
    
    // Default mock result
    return {
      mock_result: true,
      code_length: code.length,
      available_variables: Object.keys(context),
      execution_note: 'This is a mock Python execution result'
    };
  }
}