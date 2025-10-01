import { BaseProcessor } from './BaseProcessor';
import { IfElseNodeConfig, ConditionGroup, NodeOutput, ExecutionContext, NodeSchema } from '../types';

export class IfElseProcessor extends BaseProcessor {
  async execute(input: Record<string, any>, context: ExecutionContext): Promise<NodeOutput> {
    const config = input.config as IfElseNodeConfig;
    const startTime = Date.now();
    
    try {
      // Validate configuration
      const validation = this.validate(config);
      if (!validation.isValid) {
        return this.createOutput(null, false, `Configuration error: ${validation.errors.join(', ')}`);
      }
      
      // Evaluate all conditions
      const conditionResults = config.conditions.map(condition => 
        this.evaluateCondition(condition, { ...context.variables, ...input })
      );
      
      // Apply logical operator
      let result: boolean;
      if (config.operator === 'AND') {
        result = conditionResults.every(r => r.result);
      } else { // OR
        result = conditionResults.some(r => r.result);
      }
      
      const executionTime = Date.now() - startTime;
      
      return this.createOutput({
        condition_result: result,
        branch: result ? 'true' : 'false',
        condition_details: conditionResults
      }, true, undefined, { executionTime });
      
    } catch (error) {
      const executionTime = Date.now() - startTime;
      return this.createOutput(null, false, (error as Error).message, { executionTime });
    }
  }
  
  getSchema(): NodeSchema {
    return {
      inputs: [
        {
          name: 'variables',
          type: 'object',
          required: false,
          description: 'Variables to use in condition evaluation'
        }
      ],
      outputs: [
        {
          name: 'condition_result',
          type: 'boolean',
          description: 'True if conditions are met, false otherwise'
        },
        {
          name: 'branch',
          type: 'string',
          description: 'Either "true" or "false" indicating which branch to take'
        },
        {
          name: 'condition_details',
          type: 'array',
          description: 'Detailed results of each condition evaluation'
        }
      ],
      config: [
        {
          key: 'conditions',
          label: 'Conditions',
          type: 'json',
          required: true,
          placeholder: '[{"left": "{{variable}}", "operator": "==", "right": "value"}]',
          description: 'Array of conditions to evaluate'
        },
        {
          key: 'operator',
          label: 'Logical Operator',
          type: 'select',
          required: true,
          options: ['AND', 'OR'],
          description: 'How to combine multiple conditions'
        }
      ]
    };
  }
  
  private evaluateCondition(
    condition: ConditionGroup, 
    variables: Record<string, any>
  ): { result: boolean; error?: string; details: string } {
    try {
      // Resolve left side (variable reference)
      const leftValue = this.resolveValue(condition.left, variables);
      const rightValue = condition.right;
      
      let result: boolean;
      const details = `${leftValue} ${condition.operator} ${rightValue}`;
      
      switch (condition.operator) {
        case '==':
          result = leftValue == rightValue;
          break;
        case '!=':
          result = leftValue != rightValue;
          break;
        case '>':
          result = Number(leftValue) > Number(rightValue);
          break;
        case '<':
          result = Number(leftValue) < Number(rightValue);
          break;
        case '>=':
          result = Number(leftValue) >= Number(rightValue);
          break;
        case '<=':
          result = Number(leftValue) <= Number(rightValue);
          break;
        case 'contains':
          result = String(leftValue).includes(String(rightValue));
          break;
        case 'startsWith':
          result = String(leftValue).startsWith(String(rightValue));
          break;
        case 'endsWith':
          result = String(leftValue).endsWith(String(rightValue));
          break;
        case 'regex':
          const regex = new RegExp(String(rightValue));
          result = regex.test(String(leftValue));
          break;
        default:
          throw new Error(`Unknown operator: ${condition.operator}`);
      }
      
      return { result, details };
      
    } catch (error) {
      return {
        result: false,
        error: (error as Error).message,
        details: `Error evaluating condition: ${(error as Error).message}`
      };
    }
  }
  
  private resolveValue(reference: string, variables: Record<string, any>): any {
    // Handle variable references like {{variable}}
    if (reference.startsWith('{{') && reference.endsWith('}}')) {
      const varName = reference.slice(2, -2);
      return variables[varName];
    }
    
    // Handle direct variable names
    if (variables[reference] !== undefined) {
      return variables[reference];
    }
    
    // Handle nested property access like object.property
    if (reference.includes('.')) {
      const parts = reference.split('.');
      let value = variables[parts[0]];
      for (let i = 1; i < parts.length && value !== undefined; i++) {
        value = value[parts[i]];
      }
      return value;
    }
    
    // Return as literal value if not found in variables
    return reference;
  }
}