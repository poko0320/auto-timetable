import { Node, Edge } from 'reactflow';

// Node Types - Comprehensive categorization based on AI workflow platforms
export type NodeType = 
  // Input/Output Layer
  | 'start' | 'end' | 'httpRequest' | 'fileUpload' | 'database'
  // AI/LLM Layer  
  | 'llm' | 'agent' | 'knowledgeRetrieval' | 'questionClassification'
  // Logic Layer
  | 'ifElse' | 'loop' | 'iteration'
  // Transform Layer
  | 'code' | 'template' | 'variableAggregator' | 'variableAssign' 
  | 'stringProcessor' | 'mathCalculator'
  // Utilities Layer
  | 'delay' | 'webhook' | 'screenCapture';

export type NodeCategory = 'input-output' | 'ai-llm' | 'logic' | 'transform' | 'utilities';

export type NodeStatus = 'idle' | 'running' | 'success' | 'error' | 'warning';

// Execution Context
export interface ExecutionContext {
  variables: Record<string, any>;
  globalState: Record<string, any>;
  executionId: string;
  timestamp: Date;
}

// Node Output Structure
export interface NodeOutput {
  success: boolean;
  data: any;
  error?: string;
  metadata?: {
    executionTime: number;
    tokensUsed?: number;
    cost?: number;
    outputSize?: number;
  };
}

// Node Execution Interface
export interface NodeProcessor {
  execute(input: Record<string, any>, context: ExecutionContext): Promise<NodeOutput>;
  validate(config: any): { isValid: boolean; errors: string[] };
  getSchema(): NodeSchema;
}

// Node Configuration Schemas
export interface NodeSchema {
  inputs: InputSchema[];
  outputs: OutputSchema[];
  config: ConfigSchema[];
}

export interface InputSchema {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'any';
  required: boolean;
  description: string;
}

export interface OutputSchema {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'any';
  description: string;
}

export interface ConfigSchema {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'checkbox' | 'json' | 'code';
  required: boolean;
  options?: string[] | { value: string; label: string }[];
  placeholder?: string;
  description?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

// Specific Node Configurations
export interface LLMNodeConfig {
  provider: 'openai' | 'anthropic' | 'local';
  model: string;
  prompt: string;
  systemPrompt?: string;
  temperature: number;
  maxTokens: number;
  topP?: number;
  outputFormat: 'text' | 'json' | 'structured';
  variables?: string[];
}

export interface AgentNodeConfig {
  model: 'gpt-4' | 'gpt-4-turbo' | 'claude-3-opus' | 'claude-3-sonnet';
  systemPrompt: string;
  tools: AgentTool[];
  temperature: number;
  maxTokens: number;
  memory: boolean;
  maxIterations: number;
}

export interface AgentTool {
  name: string;
  description: string;
  parameters: Record<string, any>;
  implementation: string; // Function code or API endpoint
}

export interface IfElseNodeConfig {
  conditions: ConditionGroup[];
  operator: 'AND' | 'OR';
}

export interface ConditionGroup {
  left: string; // Variable reference
  operator: '==' | '!=' | '>' | '<' | '>=' | '<=' | 'contains' | 'startsWith' | 'endsWith' | 'regex';
  right: string | number | boolean;
}

export interface LoopNodeConfig {
  type: 'for' | 'while' | 'forEach';
  condition?: string; // For while loops
  iterableVariable?: string; // For forEach loops
  maxIterations: number;
  breakCondition?: ConditionGroup;
}

export interface CodeNodeConfig {
  language: 'javascript' | 'python';
  code: string;
  timeout: number;
  allowedModules?: string[];
  inputVariables: string[];
  outputVariable: string;
}

export interface HttpRequestNodeConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers: Record<string, string>;
  body?: string;
  timeout: number;
  retries: number;
  authentication?: {
    type: 'none' | 'bearer' | 'basic' | 'apikey';
    credentials: Record<string, string>;
  };
}

// Extended Node Data Interface
export interface NodeData {
  label: string;
  type: NodeType;
  category: NodeCategory;
  status: NodeStatus;
  config: any; // Specific config based on node type
  inputs?: Record<string, any>;
  outputs?: Record<string, any>;
  lastExecution?: {
    timestamp: Date;
    duration: number;
    success: boolean;
    error?: string;
  };
}

// Legacy interfaces for compatibility
export interface WorkflowNode {
  id: string;
  type: NodeType;
  label: string;
  position: { x: number; y: number };
  data?: NodeData;
  config?: Record<string, any>;
  status?: NodeStatus;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

// Workflow Interfaces
export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: Node<NodeData>[];
  edges: Edge[];
  variables: Record<string, any>;
  version: string;
  status: 'draft' | 'active' | 'paused';
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  inputs: Record<string, any>;
  outputs?: Record<string, any>;
  nodeResults: Record<string, NodeOutput>;
  error?: string;
}

// Execution Log
export interface ExecutionLog {
  id: string;
  workflowId: string;
  nodeId: string;
  status: NodeStatus;
  message: string;
  timestamp: Date;
  data?: any;
  error?: string;
}

// Template System
export interface NodeTemplate {
  type: NodeType;
  label: string;
  icon: string;
  color: string;
  category: NodeCategory;
  description: string;
  configSchema?: ConfigSchema[];
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail?: string;
  workflow: Workflow;
  usage: number;
  rating: number;
  author: string;
}

// Validation Results
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

// Node Registry
export interface NodeDefinition {
  type: NodeType;
  category: NodeCategory;
  label: string;
  description: string;
  icon: string;
  color: string;
  processorClass: new () => NodeProcessor;
  schema: NodeSchema;
  defaultConfig: any;
}

// Search and Filter
export interface SearchFilters {
  category?: NodeCategory;
  status?: NodeStatus;
  query?: string;
}

export type { Node, Edge };