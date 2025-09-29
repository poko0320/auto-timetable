export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'data' | 'ai' | 'filter' | 'action' | 'schedule' | 'rss' | 'file' | 'ai-analyze' | 'email';
  label: string;
  position: { x: number; y: number };
  data?: any;
  config?: Record<string, any>;
  status?: 'idle' | 'running' | 'success' | 'error';
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  status: 'draft' | 'active' | 'paused';
  createdAt: Date;
  updatedAt: Date;
}

export interface NodeTemplate {
  type: string;
  label: string;
  icon: string;
  color: string;
  category: 'trigger' | 'process' | 'action';
  description: string;
  configSchema?: any;
}

export interface ExecutionLog {
  id: string;
  workflowId: string;
  nodeId: string;
  status: 'success' | 'error' | 'running';
  message: string;
  timestamp: Date;
  data?: any;
}