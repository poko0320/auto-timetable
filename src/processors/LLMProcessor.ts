import { BaseProcessor } from './BaseProcessor';
import { LLMNodeConfig, NodeOutput, ExecutionContext, NodeSchema } from '../types';

export class LLMProcessor extends BaseProcessor {
  async execute(input: Record<string, any>, context: ExecutionContext): Promise<NodeOutput> {
    const config = input.config as LLMNodeConfig;
    const startTime = Date.now();
    
    try {
      // Validate configuration
      const validation = this.validate(config);
      if (!validation.isValid) {
        return this.createOutput(null, false, `Configuration error: ${validation.errors.join(', ')}`);
      }
      
      // Replace variables in prompt
      const prompt = this.replaceVariables(config.prompt, {
        ...context.variables,
        ...input
      });
      
      const systemPrompt = config.systemPrompt ? 
        this.replaceVariables(config.systemPrompt, { ...context.variables, ...input }) : 
        undefined;
      
      // Mock LLM call (in real implementation, this would call actual LLM API)
      const response = await this.mockLLMCall({
        provider: config.provider,
        model: config.model,
        prompt,
        systemPrompt,
        temperature: config.temperature,
        maxTokens: config.maxTokens,
        topP: config.topP
      });
      
      const executionTime = Date.now() - startTime;
      
      // Format output based on outputFormat
      let formattedOutput;
      switch (config.outputFormat) {
        case 'json':
          try {
            formattedOutput = JSON.parse(response.content);
          } catch (e) {
            return this.createOutput(null, false, 'Failed to parse JSON output from LLM');
          }
          break;
        case 'structured':
          // Parse structured output (key-value pairs)
          formattedOutput = this.parseStructuredOutput(response.content);
          break;
        default:
          formattedOutput = response.content;
      }
      
      return this.createOutput(formattedOutput, true, undefined, {
        executionTime,
        tokensUsed: response.usage.totalTokens,
        cost: this.calculateCost(config.provider, config.model, response.usage),
        outputSize: response.content.length
      });
      
    } catch (error) {
      const executionTime = Date.now() - startTime;
      return this.createOutput(null, false, (error as Error).message, { executionTime });
    }
  }
  
  getSchema(): NodeSchema {
    return {
      inputs: [
        {
          name: 'prompt_variables',
          type: 'object',
          required: false,
          description: 'Variables to replace in the prompt template'
        }
      ],
      outputs: [
        {
          name: 'content',
          type: 'any',
          description: 'LLM generated content in specified format'
        },
        {
          name: 'usage',
          type: 'object',
          description: 'Token usage and cost information'
        }
      ],
      config: [
        {
          key: 'provider',
          label: 'Provider',
          type: 'select',
          required: true,
          options: ['openai', 'anthropic', 'local'],
          description: 'LLM provider to use'
        },
        {
          key: 'model',
          label: 'Model',
          type: 'select',
          required: true,
          options: [
            'gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo',
            'claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'
          ],
          description: 'Specific model to use'
        },
        {
          key: 'prompt',
          label: 'Prompt Template',
          type: 'textarea',
          required: true,
          placeholder: 'Enter your prompt here. Use {{variable}} for dynamic content.',
          description: 'The main prompt template with variable substitution'
        },
        {
          key: 'systemPrompt',
          label: 'System Prompt',
          type: 'textarea',
          required: false,
          placeholder: 'System instructions (optional)',
          description: 'System-level instructions for the LLM'
        },
        {
          key: 'temperature',
          label: 'Temperature',
          type: 'number',
          required: true,
          validation: { min: 0, max: 2 },
          description: 'Controls randomness (0-2)'
        },
        {
          key: 'maxTokens',
          label: 'Max Tokens',
          type: 'number',
          required: true,
          validation: { min: 1, max: 32000 },
          description: 'Maximum tokens in response'
        },
        {
          key: 'topP',
          label: 'Top P',
          type: 'number',
          required: false,
          validation: { min: 0, max: 1 },
          description: 'Nucleus sampling parameter (0-1)'
        },
        {
          key: 'outputFormat',
          label: 'Output Format',
          type: 'select',
          required: true,
          options: ['text', 'json', 'structured'],
          description: 'Expected format of the LLM response'
        }
      ]
    };
  }
  
  private async mockLLMCall(params: {
    provider: string;
    model: string;
    prompt: string;
    systemPrompt?: string;
    temperature: number;
    maxTokens: number;
    topP?: number;
  }): Promise<{ content: string; usage: { totalTokens: number; promptTokens: number; completionTokens: number } }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Mock response based on prompt content
    let content = '';
    if (params.prompt.toLowerCase().includes('json')) {
      content = JSON.stringify({
        result: "This is a mock JSON response",
        confidence: 0.85,
        metadata: { processed_at: new Date().toISOString() }
      });
    } else if (params.prompt.toLowerCase().includes('list')) {
      content = "1. First item\n2. Second item\n3. Third item";
    } else {
      content = `This is a mock response to: "${params.prompt.substring(0, 50)}..."`;
    }
    
    // Mock token usage
    const promptTokens = Math.ceil(params.prompt.length / 4);
    const completionTokens = Math.ceil(content.length / 4);
    
    return {
      content,
      usage: {
        promptTokens,
        completionTokens,
        totalTokens: promptTokens + completionTokens
      }
    };
  }
  
  private parseStructuredOutput(content: string): Record<string, any> {
    const result: Record<string, any> = {};
    const lines = content.split('\n');
    
    for (const line of lines) {
      const match = line.match(/^([^:]+):\s*(.+)$/);
      if (match) {
        const key = match[1].trim().toLowerCase().replace(/\s+/g, '_');
        const value = match[2].trim();
        
        // Try to parse as number or boolean
        if (!isNaN(Number(value))) {
          result[key] = Number(value);
        } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
          result[key] = value.toLowerCase() === 'true';
        } else {
          result[key] = value;
        }
      }
    }
    
    return result;
  }
  
  private calculateCost(provider: string, model: string, usage: { promptTokens: number; completionTokens: number }): number {
    // Mock cost calculation (in real implementation, use actual pricing)
    const rates: Record<string, { prompt: number; completion: number }> = {
      'gpt-4': { prompt: 0.03, completion: 0.06 },
      'gpt-4-turbo': { prompt: 0.01, completion: 0.03 },
      'gpt-3.5-turbo': { prompt: 0.0015, completion: 0.002 },
      'claude-3-opus': { prompt: 0.015, completion: 0.075 },
      'claude-3-sonnet': { prompt: 0.003, completion: 0.015 },
      'claude-3-haiku': { prompt: 0.00025, completion: 0.00125 }
    };
    
    const rate = rates[model] || { prompt: 0.001, completion: 0.002 };
    return (usage.promptTokens * rate.prompt + usage.completionTokens * rate.completion) / 1000;
  }
}