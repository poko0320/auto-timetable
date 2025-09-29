import { useState, useEffect } from 'react';
import { useWorkflowStore } from '../store/workflowStore';

export const useWorkflowExecution = () => {
  const { nodes, edges, isRunning, addExecutionLog } = useWorkflowStore();
  const [executionProgress, setExecutionProgress] = useState(0);

  const executeNode = async (nodeId: string, nodeData: any) => {
    addExecutionLog({
      id: `${Date.now()}-${nodeId}`,
      workflowId: 'current',
      nodeId,
      status: 'running',
      message: `Starting execution: ${nodeData.label}`,
      timestamp: new Date()
    });

    // Simulate node execution time
    const executionTime = Math.random() * 2000 + 1000;
    await new Promise(resolve => setTimeout(resolve, executionTime));

    // Simulate success/failure probability
    const success = Math.random() > 0.1; // 90% success rate

    if (success) {
      addExecutionLog({
        id: `${Date.now()}-${nodeId}-success`,
        workflowId: 'current',
        nodeId,
        status: 'success',
        message: `Execution successful: ${nodeData.label}`,
        timestamp: new Date(),
        data: { executionTime, result: 'Simulated execution result' }
      });
    } else {
      addExecutionLog({
        id: `${Date.now()}-${nodeId}-error`,
        workflowId: 'current',
        nodeId,
        status: 'error',
        message: `Execution failed: ${nodeData.label}`,
        timestamp: new Date(),
        data: { error: 'Simulated execution error' }
      });
      throw new Error(`Node execution failed: ${nodeData.label}`);
    }

    return { success, data: { executionTime } };
  };

  return {
    executeNode,
    executionProgress
  };
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};

export const useKeyboardShortcuts = () => {
  const { runWorkflow, stopWorkflow, clearLogs, isRunning } = useWorkflowStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + R: 运行/停止工作流
      if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
        if (isRunning) {
          stopWorkflow();
        } else {
          runWorkflow();
        }
      }

      // Ctrl/Cmd + L: 清空日志
      if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
        event.preventDefault();
        clearLogs();
      }

      // ESC: 停止执行
      if (event.key === 'Escape' && isRunning) {
        stopWorkflow();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [runWorkflow, stopWorkflow, clearLogs, isRunning]);
};