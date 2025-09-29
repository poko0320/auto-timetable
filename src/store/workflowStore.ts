import { create } from 'zustand';
import { Node, Edge } from 'reactflow';
import { ExecutionLog } from '../types';

interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  isRunning: boolean;
  executionLogs: ExecutionLog[];
  
  // Node management
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node) => void;
  updateNode: (id: string, data: any) => void;
  updateNodeData: (id: string, data: any) => void;
  deleteNode: (id: string) => void;
  setSelectedNode: (node: Node | null) => void;
  
  // Execution management
  setIsRunning: (running: boolean) => void;
  addExecutionLog: (log: ExecutionLog) => void;
  clearLogs: () => void;
  
  // Workflow operations
  runWorkflow: () => Promise<void>;
  stopWorkflow: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  isRunning: false,
  executionLogs: [],
  
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  
  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node]
  })),
  
  updateNode: (id, data) => set((state) => ({
    nodes: state.nodes.map(node => 
      node.id === id ? { ...node, data: { ...node.data, ...data } } : node
    ),
    selectedNode: state.selectedNode?.id === id 
      ? { ...state.selectedNode, data: { ...state.selectedNode.data, ...data } }
      : state.selectedNode
  })),

  updateNodeData: (id: string, data: any) => set((state) => ({
    nodes: state.nodes.map(node => 
      node.id === id ? { ...node, data } : node
    ),
    selectedNode: state.selectedNode?.id === id 
      ? { ...state.selectedNode, data }
      : state.selectedNode
  })),
  
  deleteNode: (id) => set((state) => ({
    nodes: state.nodes.filter(node => node.id !== id),
    edges: state.edges.filter(edge => edge.source !== id && edge.target !== id)
  })),
  
  setSelectedNode: (node) => set({ selectedNode: node }),
  setIsRunning: (running) => set({ isRunning: running }),
  
  addExecutionLog: (log) => set((state) => ({
    executionLogs: [...state.executionLogs, log]
  })),
  
  clearLogs: () => set({ executionLogs: [] }),
  
  runWorkflow: async () => {
    const { nodes, edges, addExecutionLog } = get();
    set({ isRunning: true });
    
    try {
      // Simulate workflow execution
      for (const node of nodes) {
        addExecutionLog({
          id: `${Date.now()}-${node.id}`,
          workflowId: 'current',
          nodeId: node.id,
          status: 'running',
          message: `Executing node: ${node.data.label}`,
          timestamp: new Date()
        });
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        addExecutionLog({
          id: `${Date.now()}-${node.id}-complete`,
          workflowId: 'current',
          nodeId: node.id,
          status: 'success',
          message: `Node execution completed: ${node.data.label}`,
          timestamp: new Date()
        });
      }
    } catch (error) {
      addExecutionLog({
        id: `${Date.now()}-error`,
        workflowId: 'current',
        nodeId: 'system',
        status: 'error',
        message: `Execution error: ${error}`,
        timestamp: new Date()
      });
    } finally {
      set({ isRunning: false });
    }
  },
  
  stopWorkflow: () => {
    set({ isRunning: false });
  }
}));