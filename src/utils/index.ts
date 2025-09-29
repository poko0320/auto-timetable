import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};

export const validateWorkflow = (nodes: any[], edges: any[]): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (nodes.length === 0) {
    errors.push('Workflow requires at least one node');
  }
  
  // Check for isolated nodes
  const connectedNodes = new Set();
  edges.forEach(edge => {
    connectedNodes.add(edge.source);
    connectedNodes.add(edge.target);
  });
  
  const isolatedNodes = nodes.filter(node => !connectedNodes.has(node.id));
  if (isolatedNodes.length > 1) {
    errors.push(`Found ${isolatedNodes.length} isolated nodes`);
  }
  
  // Check for circular dependencies
  const visited = new Set();
  const recursionStack = new Set();
  
  const hasCycle = (nodeId: string): boolean => {
    if (recursionStack.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;
    
    visited.add(nodeId);
    recursionStack.add(nodeId);
    
    const outgoingEdges = edges.filter(edge => edge.source === nodeId);
    for (const edge of outgoingEdges) {
      if (hasCycle(edge.target)) return true;
    }
    
    recursionStack.delete(nodeId);
    return false;
  };
  
  for (const node of nodes) {
    if (hasCycle(node.id)) {
      errors.push('Circular dependency detected in workflow');
      break;
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const exportWorkflow = (workflow: any) => {
  const dataStr = JSON.stringify(workflow, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `workflow-${new Date().toISOString().slice(0, 10)}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};