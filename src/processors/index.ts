import { NodeDefinition, NodeType } from '../types';
import { BaseProcessor } from './BaseProcessor';
import { DefaultProcessor } from './DefaultProcessor';
import { LLMProcessor } from './LLMProcessor';
import { IfElseProcessor } from './IfElseProcessor';
import { HttpRequestProcessor } from './HttpRequestProcessor';
import { CodeProcessor } from './CodeProcessor';
import { StringProcessor } from './StringProcessor';
import { MathCalculatorProcessor } from './MathCalculatorProcessor';
import { ScreenCaptureProcessor } from './ScreenCaptureProcessor';

// Simple processors for basic nodes
class StartProcessor extends BaseProcessor {
  async execute(input: Record<string, any>) {
    return this.createOutput({ started: true, timestamp: new Date().toISOString() });
  }
  
  getSchema() {
    return {
      inputs: [],
      outputs: [{ name: 'started', type: 'boolean' as const, description: 'Workflow started' }],
      config: []
    };
  }
}

class EndProcessor extends BaseProcessor {
  async execute(input: Record<string, any>) {
    return this.createOutput({ completed: true, timestamp: new Date().toISOString() });
  }
  
  getSchema() {
    return {
      inputs: [{ name: 'final_data', type: 'any' as const, required: false, description: 'Final workflow data' }],
      outputs: [{ name: 'completed', type: 'boolean' as const, description: 'Workflow completed' }],
      config: []
    };
  }
}

class TemplateProcessor extends BaseProcessor {
  async execute(input: Record<string, any>, context: any) {
    const template = input.config?.template || '';
    const result = this.replaceVariables(template, { ...context.variables, ...input });
    return this.createOutput({ text: result });
  }
  
  getSchema() {
    return {
      inputs: [{ name: 'variables', type: 'object' as const, required: false, description: 'Template variables' }],
      outputs: [{ name: 'text', type: 'string' as const, description: 'Processed template' }],
      config: [{
        key: 'template',
        label: 'Template',
        type: 'textarea' as const,
        required: true,
        placeholder: 'Hello {{name}}!',
        description: 'Text template with variable substitution'
      }]
    };
  }
}

// Node Registry - Only nodes we've actually implemented
export const NODE_REGISTRY: Record<NodeType, NodeDefinition> = {
  // Input/Output Layer
  start: {
    type: 'start',
    category: 'input-output',
    label: 'Start',
    description: 'Workflow entry point',
    icon: 'play',
    color: '#10B981',
    processorClass: StartProcessor,
    schema: new StartProcessor().getSchema(),
    defaultConfig: {}
  },
  
  end: {
    type: 'end',
    category: 'input-output',
    label: 'End',
    description: 'Workflow completion point',
    icon: 'stop',
    color: '#EF4444',
    processorClass: EndProcessor,
    schema: new EndProcessor().getSchema(),
    defaultConfig: {}
  },
  
  httpRequest: {
    type: 'httpRequest',
    category: 'input-output',
    label: 'HTTP Request',
    description: 'Make HTTP requests to external APIs',
    icon: 'globe',
    color: '#3B82F6',
    processorClass: HttpRequestProcessor,
    schema: new HttpRequestProcessor().getSchema(),
    defaultConfig: {
      method: 'GET',
      timeout: 10000,
      retries: 1,
      headers: {}
    }
  },
  
  fileUpload: {
    type: 'fileUpload',
    category: 'input-output',
    label: 'File Upload',
    description: 'Handle file uploads and processing',
    icon: 'upload',
    color: '#8B5CF6',
    processorClass: DefaultProcessor,
    schema: new DefaultProcessor().getSchema(),
    defaultConfig: {}
  },
  
  database: {
    type: 'database',
    category: 'input-output',
    label: 'Database',
    description: 'Database operations and queries',
    icon: 'database',
    color: '#059669',
    processorClass: DefaultProcessor,
    schema: new DefaultProcessor().getSchema(),
    defaultConfig: {}
  },
  
  // AI/LLM Layer
  llm: {
    type: 'llm',
    category: 'ai-llm',
    label: 'LLM',
    description: 'Large Language Model processing',
    icon: 'brain',
    color: '#F59E0B',
    processorClass: LLMProcessor,
    schema: new LLMProcessor().getSchema(),
    defaultConfig: {
      provider: 'openai',
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      maxTokens: 1000,
      outputFormat: 'text'
    }
  },
  
  agent: {
    type: 'agent',
    category: 'ai-llm',
    label: 'AI Agent',
    description: 'Autonomous AI agent with tools',
    icon: 'robot',
    color: '#EC4899',
    processorClass: DefaultProcessor,
    schema: new DefaultProcessor().getSchema(),
    defaultConfig: {}
  },
  
  knowledgeRetrieval: {
    type: 'knowledgeRetrieval',
    category: 'ai-llm',
    label: 'Knowledge Retrieval',
    description: 'Search and retrieve from knowledge base',
    icon: 'search',
    color: '#8B5CF6',
    processorClass: DefaultProcessor,
    schema: new DefaultProcessor().getSchema(),
    defaultConfig: {}
  },
  
  questionClassification: {
    type: 'questionClassification',
    category: 'ai-llm',
    label: 'Question Classifier',
    description: 'Classify and route questions',
    icon: 'tag',
    color: '#06B6D4',
    processorClass: DefaultProcessor,
    schema: new DefaultProcessor().getSchema(),
    defaultConfig: {}
  },
  
  // Logic Layer
  ifElse: {
    type: 'ifElse',
    category: 'logic',
    label: 'IF/ELSE',
    description: 'Conditional logic branching',
    icon: 'split',
    color: '#F97316',
    processorClass: IfElseProcessor,
    schema: new IfElseProcessor().getSchema(),
    defaultConfig: {
      conditions: [],
      operator: 'AND'
    }
  },
  
  loop: {
    type: 'loop',
    category: 'logic',
    label: 'Loop',
    description: 'Iteration and looping logic',
    icon: 'repeat',
    color: '#84CC16',
    processorClass: DefaultProcessor,
    schema: new DefaultProcessor().getSchema(),
    defaultConfig: {}
  },
  
  iteration: {
    type: 'iteration',
    category: 'logic',
    label: 'Iteration',
    description: 'Iterate over collections',
    icon: 'layers',
    color: '#EAB308',
    processorClass: DefaultProcessor,
    schema: new DefaultProcessor().getSchema(),
    defaultConfig: {}
  },
  
  // Transform Layer
  code: {
    type: 'code',
    category: 'transform',
    label: 'Code',
    description: 'Execute custom code logic',
    icon: 'code',
    color: '#6366F1',
    processorClass: CodeProcessor,
    schema: new CodeProcessor().getSchema(),
    defaultConfig: {
      language: 'javascript',
      timeout: 5000,
      outputVariable: 'result',
      inputVariables: []
    }
  },
  
  template: {
    type: 'template',
    category: 'transform',
    label: 'Template',
    description: 'Text template processing',
    icon: 'document-text',
    color: '#14B8A6',
    processorClass: TemplateProcessor,
    schema: new TemplateProcessor().getSchema(),
    defaultConfig: {
      template: 'Hello {{name}}!'
    }
  },
  
  variableAggregator: {
    type: 'variableAggregator',
    category: 'transform',
    label: 'Variable Aggregator',
    description: 'Combine and aggregate variables',
    icon: 'collection',
    color: '#8B5CF6',
    processorClass: DefaultProcessor,
    schema: new DefaultProcessor().getSchema(),
    defaultConfig: {}
  },
  
  variableAssign: {
    type: 'variableAssign',
    category: 'transform',
    label: 'Variable Assign',
    description: 'Assign values to variables',
    icon: 'variable',
    color: '#06B6D4',
    processorClass: DefaultProcessor,
    schema: new DefaultProcessor().getSchema(),
    defaultConfig: {}
  },
  
  stringProcessor: {
    type: 'stringProcessor',
    category: 'transform',
    label: 'String Processor',
    description: 'String manipulation and processing',
    icon: 'type',
    color: '#64748B',
    processorClass: StringProcessor,
    schema: new StringProcessor().getSchema(),
    defaultConfig: { operation: 'uppercase' }
  },
  
  mathCalculator: {
    type: 'mathCalculator',
    category: 'transform',
    label: 'Math Calculator',
    description: 'Mathematical calculations',
    icon: 'calculator',
    color: '#3B82F6',
    processorClass: MathCalculatorProcessor,
    schema: new MathCalculatorProcessor().getSchema(),
    defaultConfig: { operation: 'add' }
  },
  
  // Utilities Layer
  delay: {
    type: 'delay',
    category: 'utilities',
    label: 'Delay',
    description: 'Add time delays to workflow',
    icon: 'timer',
    color: '#64748B',
    processorClass: DefaultProcessor,
    schema: new DefaultProcessor().getSchema(),
    defaultConfig: {}
  },
  
  webhook: {
    type: 'webhook',
    category: 'utilities',
    label: 'Webhook',
    description: 'HTTP webhook handling',
    icon: 'webhook',
    color: '#F59E0B',
    processorClass: DefaultProcessor,
    schema: new DefaultProcessor().getSchema(),
    defaultConfig: {}
  },
  
  screenCapture: {
    type: 'screenCapture',
    category: 'utilities',
    label: 'Screen Capture',
    description: 'Capture screenshots and screen recordings',
    icon: 'camera',
    color: '#6366F1',
    processorClass: ScreenCaptureProcessor,
    schema: new ScreenCaptureProcessor().getSchema(),
    defaultConfig: {
      captureMode: 'fullScreen',
      outputPath: './screenshot.png',
      imageFormat: 'png'
    }
  }
};

// Helper functions
export function getNodeDefinition(type: NodeType): NodeDefinition | undefined {
  return NODE_REGISTRY[type];
}

export function getNodesByCategory(category: string): NodeDefinition[] {
  return Object.values(NODE_REGISTRY).filter(node => node.category === category);
}

export function getAllNodeTypes(): NodeType[] {
  return Object.keys(NODE_REGISTRY) as NodeType[];
}

export function createNodeProcessor(type: NodeType): BaseProcessor {
  const definition = getNodeDefinition(type);
  if (!definition) {
    throw new Error(`Unknown node type: ${type}`);
  }
  return new definition.processorClass() as BaseProcessor;
}

// Export all processors
export {
  BaseProcessor,
  DefaultProcessor,
  LLMProcessor,
  IfElseProcessor,
  HttpRequestProcessor,
  CodeProcessor,
  StringProcessor,
  MathCalculatorProcessor
};