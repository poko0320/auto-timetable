import { useState, useEffect } from 'react';
import { useWorkflowStore } from '../store/workflowStore';

export const useWorkflowExecution = () => {
  const { nodes, edges, isExecuting, executeWorkflow } = useWorkflowStore();
  const [executionProgress, setExecutionProgress] = useState(0);

  const startExecution = async () => {
    setExecutionProgress(0);
    await executeWorkflow();
    setExecutionProgress(100);
  };

  // Calculate progress based on node statuses
  useEffect(() => {
    if (isExecuting) {
      const completedNodes = nodes.filter(node => 
        node.data?.status === 'success' || node.data?.status === 'error'
      ).length;
      const progress = nodes.length > 0 ? (completedNodes / nodes.length) * 100 : 0;
      setExecutionProgress(progress);
    }
  }, [nodes, isExecuting]);

  return {
    nodes,
    edges,
    isExecuting,
    executionProgress,
    startExecution
  };
};

// Hook for managing node properties
export const useNodeProperties = (nodeId: string | null) => {
  const { nodes } = useWorkflowStore();
  
  const selectedNode = nodeId ? nodes.find(node => node.id === nodeId) : null;
  
  return {
    selectedNode
  };
};

// Hook for keyboard shortcuts
export const useKeyboardShortcuts = () => {
  const { executeWorkflow, stopExecution, clearLogs, isExecuting } = useWorkflowStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + R: Run/Stop workflow
      if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
        if (isExecuting) {
          stopExecution();
        } else {
          executeWorkflow();
        }
      }

      // Ctrl/Cmd + L: Clear logs
      if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
        event.preventDefault();
        clearLogs();
      }

      // ESC: Stop execution
      if (event.key === 'Escape' && isExecuting) {
        stopExecution();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [executeWorkflow, stopExecution, clearLogs, isExecuting]);
};