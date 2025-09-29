import { NodeProcessor, NodeOutput, ExecutionContext, NodeSchema, ValidationResult } from '../types';

export abstract class BaseProcessor implements NodeProcessor {
  abstract execute(input: Record<string, any>, context: ExecutionContext): Promise<NodeOutput>;
  abstract getSchema(): NodeSchema;
  
  validate(config: any): ValidationResult {
    const schema = this.getSchema();
    const errors: string[] = [];
    
    // Validate required config fields
    schema.config.forEach(field => {
      if (field.required && (config[field.key] === undefined || config[field.key] === '')) {
        errors.push(`${field.label} is required`);
      }
      
      // Type validation
      if (config[field.key] !== undefined) {
        const value = config[field.key];
        switch (field.type) {
          case 'number':
            if (typeof value !== 'number' || isNaN(value)) {
              errors.push(`${field.label} must be a valid number`);
            }
            break;
          case 'checkbox':
            if (typeof value !== 'boolean') {
              errors.push(`${field.label} must be a boolean`);
            }
            break;
          case 'select':
            if (field.options && !field.options.includes(value)) {
              errors.push(`${field.label} must be one of: ${field.options.join(', ')}`);
            }
            break;
        }
        
        // Range validation
        if (field.validation) {
          if (field.validation.min !== undefined && value < field.validation.min) {
            errors.push(`${field.label} must be at least ${field.validation.min}`);
          }
          if (field.validation.max !== undefined && value > field.validation.max) {
            errors.push(`${field.label} must be at most ${field.validation.max}`);
          }
          if (field.validation.pattern && typeof value === 'string') {
            const regex = new RegExp(field.validation.pattern);
            if (!regex.test(value)) {
              errors.push(`${field.label} format is invalid`);
            }
          }
        }
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  protected createOutput(data: any, success: boolean = true, error?: string, metadata?: any): NodeOutput {
    return {
      success,
      data,
      error,
      metadata: {
        executionTime: 0,
        ...metadata
      }
    };
  }
  
  protected replaceVariables(template: string, variables: Record<string, any>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
      return variables[varName] !== undefined ? String(variables[varName]) : match;
    });
  }
  
  protected extractVariablesFromText(text: string): string[] {
    const matches = text.match(/\{\{(\w+)\}\}/g);
    return matches ? matches.map(match => match.slice(2, -2)) : [];
  }
  
  protected validateInputs(input: Record<string, any>, requiredInputs: string[]): string[] {
    const errors: string[] = [];
    requiredInputs.forEach(inputName => {
      if (input[inputName] === undefined || input[inputName] === null) {
        errors.push(`Required input '${inputName}' is missing`);
      }
    });
    return errors;
  }
  
  protected async executeWithTimeout<T>(
    operation: Promise<T>, 
    timeoutMs: number
  ): Promise<T> {
    return Promise.race([
      operation,
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs);
      })
    ]);
  }
  
  protected measureExecutionTime<T>(fn: () => Promise<T>): Promise<{ result: T; duration: number }> {
    const start = Date.now();
    return fn().then(result => ({
      result,
      duration: Date.now() - start
    }));
  }
}