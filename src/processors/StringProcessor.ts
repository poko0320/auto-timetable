import { BaseProcessor } from './BaseProcessor';
import { NodeOutput, ExecutionContext, NodeSchema } from '../types';

export class StringProcessor extends BaseProcessor {
  async execute(input: Record<string, any>, context: ExecutionContext): Promise<NodeOutput> {
    try {
      const text = input?.text || input?.value || '';
      const operation = input?.operation || 'uppercase';
      
      let result: any;
      
      switch (operation) {
        case 'uppercase':
          result = text.toUpperCase();
          break;
        case 'lowercase':
          result = text.toLowerCase();
          break;
        case 'trim':
          result = text.trim();
          break;
        case 'reverse':
          result = text.split('').reverse().join('');
          break;
        case 'length':
          result = text.length;
          break;
        case 'split':
          const delimiter = input?.delimiter || ' ';
          result = text.split(delimiter);
          break;
        case 'replace':
          const searchValue = input?.searchValue || '';
          const replaceValue = input?.replaceValue || '';
          result = text.replace(new RegExp(searchValue, 'g'), replaceValue);
          break;
        default:
          result = text;
      }
      
      return {
        success: true,
        data: {
          text: result,
          originalLength: text.length,
          operation,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: `String processing failed: ${error}`
      };
    }
  }

  getSchema(): NodeSchema {
    return {
      inputs: [
        { name: 'text', type: 'string', required: true, description: 'Input text to process' },
        { name: 'operation', type: 'string', required: false, description: 'String operation to perform' }
      ],
      outputs: [
        { name: 'text', type: 'string', description: 'Processed text result' },
        { name: 'originalLength', type: 'number', description: 'Length of original text' }
      ],
      config: [
        {
          key: 'operation',
          label: 'Operation',
          type: 'select',
          required: true,
          options: [
            { value: 'uppercase', label: 'Convert to uppercase' },
            { value: 'lowercase', label: 'Convert to lowercase' },
            { value: 'trim', label: 'Remove whitespace' },
            { value: 'reverse', label: 'Reverse text' },
            { value: 'length', label: 'Get text length' },
            { value: 'split', label: 'Split text' },
            { value: 'replace', label: 'Find and replace' }
          ],
          description: 'String operation to perform'
        }
      ]
    };
  }
}

export default StringProcessor;