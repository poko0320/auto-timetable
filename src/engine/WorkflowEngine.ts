import { Node, Edge } from 'reactflow';
import { NodeData, WorkflowExecution, ExecutionLog, NodeOutput, ExecutionContext, NodeStatus } from '../types';
import { createNodeProcessor } from '../processors';

export class WorkflowEngine {
  private executionLogs: ExecutionLog[] = [];
  private executionId: string = '';
  
  async executeWorkflow(
    nodes: Node<NodeData>[],
    edges: Edge[],
    inputs: Record<string, any> = {}
  ): Promise<WorkflowExecution> {
    this.executionId = this.generateExecutionId();
    this.executionLogs = [];
    
    const execution: WorkflowExecution = {
      id: this.executionId,
      workflowId: 'current-workflow',
      status: 'running',
      startTime: new Date(),
      inputs,
      nodeResults: {},
      outputs: {}
    };
    
    try {
      // Create execution context
      const context: ExecutionContext = {
        variables: { ...inputs },
        globalState: {},
        executionId: this.executionId,
        timestamp: new Date()
      };
      
      // Sort nodes in topological order
      const sortedNodes = this.topologicalSort(nodes, edges);
      
      // Execute nodes in order
      for (const node of sortedNodes) {
        await this.executeNode(node, edges, context, execution);
      }
      
      execution.status = 'completed';
      execution.endTime = new Date();
      execution.outputs = context.variables;
      
    } catch (error) {
      execution.status = 'failed';
      execution.endTime = new Date();
      execution.error = (error as Error).message;
      
      this.addLog('error', '', 'Workflow execution failed', (error as Error).message);
    }
    
    return execution;
  }
  
  private async executeNode(
    node: Node<NodeData>,
    edges: Edge[],
    context: ExecutionContext,
    execution: WorkflowExecution
  ): Promise<void> {
    const startTime = Date.now();
    
    try {
      this.addLog('running', node.id, `Executing node: ${node.data?.label || node.id}`);
      
      // Get node processor
      const processor = createNodeProcessor(node.data?.type || 'start');
      
      // Prepare node input
      const nodeInput = await this.prepareNodeInput(node, edges, context);
      
      // Execute node
      const result = await processor.execute(nodeInput, context);
      
      // Store result
      execution.nodeResults[node.id] = result;
      
      // Update context with output
      if (result.success && result.data) {
        Object.assign(context.variables, result.data);
      }
      
      // Update node status
      const status: NodeStatus = result.success ? 'success' : 'error';
      this.addLog(status, node.id, 
        result.success ? 'Node executed successfully' : 'Node execution failed',
        result.error || JSON.stringify(result.data)
      );
      
    } catch (error) {
      const result: NodeOutput = {
        success: false,
        data: null,
        error: (error as Error).message,
        metadata: { executionTime: Date.now() - startTime }
      };
      
      execution.nodeResults[node.id] = result;
      this.addLog('error', node.id, 'Node execution error', (error as Error).message);
    }
  }
  
  private async prepareNodeInput(
    node: Node<NodeData>,
    edges: Edge[],
    context: ExecutionContext
  ): Promise<Record<string, any>> {
    const input: Record<string, any> = {
      config: node.data?.config || {}
    };
    
    // Add input from connected nodes
    const incomingEdges = edges.filter(edge => edge.target === node.id);
    for (const edge of incomingEdges) {
      // In a real implementation, you would map specific outputs from source nodes
      // For now, we'll just pass all context variables
      Object.assign(input, context.variables);
    }
    
    return input;
  }
  
  private topologicalSort(nodes: Node<NodeData>[], edges: Edge[]): Node<NodeData>[] {
    const sorted: Node<NodeData>[] = [];
    const visited = new Set<string>();
    const visiting = new Set<string>();
    
    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    
    function visit(nodeId: string): void {
      if (visiting.has(nodeId)) {
        throw new Error(`Circular dependency detected involving node: ${nodeId}`);
      }
      
      if (visited.has(nodeId)) {
        return;
      }
      
      visiting.add(nodeId);
      
      // Visit all dependencies (incoming edges)
      const dependencies = edges
        .filter(edge => edge.target === nodeId)
        .map(edge => edge.source);
      
      for (const depId of dependencies) {
        visit(depId);
      }
      
      visiting.delete(nodeId);
      visited.add(nodeId);
      
      const node = nodeMap.get(nodeId);
      if (node) {
        sorted.push(node);
      }
    }
    
    // Find start nodes (nodes with no incoming edges)
    const startNodes = nodes.filter(node => 
      !edges.some(edge => edge.target === node.id)
    );
    
    // If no start nodes found, start with the first node
    if (startNodes.length === 0 && nodes.length > 0) {
      startNodes.push(nodes[0]);
    }
    
    // Visit all start nodes
    for (const startNode of startNodes) {
      visit(startNode.id);
    }
    
    // Visit any remaining unvisited nodes
    for (const node of nodes) {
      if (!visited.has(node.id)) {
        visit(node.id);
      }
    }
    
    return sorted;
  }
  
  private addLog(
    status: NodeStatus,
    nodeId: string,
    message: string,
    data?: any
  ): void {
    const log: ExecutionLog = {
      id: this.generateLogId(),
      workflowId: 'current-workflow',
      nodeId,
      status,
      message,
      timestamp: new Date(),
      data,
      error: status === 'error' ? data : undefined
    };
    
    this.executionLogs.push(log);
  }
  
  private generateExecutionId(): string {
    return `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private generateLogId(): string {
    return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  getExecutionLogs(): ExecutionLog[] {
    return [...this.executionLogs];
  }
  
  clearLogs(): void {
    this.executionLogs = [];
  }
}