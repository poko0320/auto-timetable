import { BaseProcessor } from './BaseProcessor';
import { NodeOutput, ExecutionContext, NodeSchema } from '../types';

export class MathCalculatorProcessor extends BaseProcessor {
  async execute(input: Record<string, any>, context: ExecutionContext): Promise<NodeOutput> {
    try {
      const a = parseFloat(input?.a || input?.valueA || 0);
      const b = parseFloat(input?.b || input?.valueB || 0);
      const operation = input?.operation || 'add';
      
      let result: number;
      
      switch (operation) {
        case 'add':
          result = a + b;
          break;
        case 'subtract':
          result = a - b;
          break;
        case 'multiply':
          result = a * b;
          break;
        case 'divide':
          if (b === 0) {
            throw new Error('Division by zero is not allowed');
          }
          result = a / b;
          break;
        case 'power':
          result = Math.pow(a, b);
          break;
        case 'sqrt':
          if (a < 0) {
            throw new Error('Cannot calculate square root of negative number');
          }
          result = Math.sqrt(a);
          break;
        case 'abs':
          result = Math.abs(a);
          break;
        case 'round':
          result = Math.round(a);
          break;
        case 'floor':
          result = Math.floor(a);
          break;
        case 'ceil':
          result = Math.ceil(a);
          break;
        case 'min':
          result = Math.min(a, b);
          break;
        case 'max':
          result = Math.max(a, b);
          break;
        default:
          throw new Error(`Unknown operation: ${operation}`);
      }
      
      return {
        success: true,
        data: {
          result,
          operation,
          operands: operation === 'sqrt' || operation === 'abs' || operation === 'round' || 
                   operation === 'floor' || operation === 'ceil' ? [a] : [a, b],
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: `Math calculation failed: ${error}`
      };
    }
  }

  getSchema(): NodeSchema {
    return {
      inputs: [
        { name: 'a', type: 'number', required: true, description: 'First operand' },
        { name: 'b', type: 'number', required: false, description: 'Second operand (for binary operations)' },
        { name: 'operation', type: 'string', required: false, description: 'Mathematical operation to perform' }
      ],
      outputs: [
        { name: 'result', type: 'number', description: 'Calculation result' },
        { name: 'operation', type: 'string', description: 'Operation that was performed' }
      ],
      config: [
        {
          key: 'operation',
          label: 'Operation',
          type: 'select',
          required: true,
          options: [
            { value: 'add', label: 'Addition (a + b)' },
            { value: 'subtract', label: 'Subtraction (a - b)' },
            { value: 'multiply', label: 'Multiplication (a × b)' },
            { value: 'divide', label: 'Division (a ÷ b)' },
            { value: 'power', label: 'Power (a ^ b)' },
            { value: 'sqrt', label: 'Square Root (√a)' },
            { value: 'abs', label: 'Absolute Value (|a|)' },
            { value: 'round', label: 'Round (round a)' },
            { value: 'floor', label: 'Floor (floor a)' },
            { value: 'ceil', label: 'Ceiling (ceil a)' },
            { value: 'min', label: 'Minimum (min a, b)' },
            { value: 'max', label: 'Maximum (max a, b)' }
          ],
          description: 'Mathematical operation to perform'
        }
      ]
    };
  }
}

export default MathCalculatorProcessor;