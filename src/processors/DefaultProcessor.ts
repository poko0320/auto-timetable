import { BaseProcessor } from './BaseProcessor';
import { NodeOutput, ExecutionContext, NodeSchema } from '../types';

export class DefaultProcessor extends BaseProcessor {
  async execute(input: Record<string, any>, context: ExecutionContext): Promise<NodeOutput> {
    // Default implementation - just pass through input as output
    return this.createOutput({
      ...input,
      processed: true,
      timestamp: new Date().toISOString()
    });
  }
  
  getSchema(): NodeSchema {
    return {
      inputs: [
        {
          name: 'data',
          type: 'any',
          required: false,
          description: 'Input data to process'
        }
      ],
      outputs: [
        {
          name: 'result',
          type: 'any',
          description: 'Processed output data'
        }
      ],
      config: []
    };
  }
}