import { Node, Edge } from 'reactflow';

export interface WorkflowData {
  id: string;
  name: string;
  description?: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  nodes: Node[];
  edges: Edge[];
  metadata?: {
    author?: string;
    tags?: string[];
    category?: string;
  };
}

const STORAGE_KEY = 'autoflow-workflows';
const CURRENT_WORKFLOW_KEY = 'autoflow-current-workflow';

export class WorkflowStorage {
  // Save workflow to localStorage
  static saveWorkflow(workflow: Omit<WorkflowData, 'id' | 'createdAt' | 'updatedAt'>): WorkflowData {
    const now = new Date().toISOString();
    const workflowData: WorkflowData = {
      id: this.generateId(),
      createdAt: now,
      updatedAt: now,
      ...workflow,
    };

    const existingWorkflows = this.getAllWorkflows();
    const updatedWorkflows = [...existingWorkflows, workflowData];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWorkflows));
    return workflowData;
  }

  // Update existing workflow
  static updateWorkflow(id: string, updates: Partial<Omit<WorkflowData, 'id' | 'createdAt'>>): WorkflowData | null {
    const workflows = this.getAllWorkflows();
    const index = workflows.findIndex(w => w.id === id);
    
    if (index === -1) return null;
    
    const updatedWorkflow = {
      ...workflows[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    workflows[index] = updatedWorkflow;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workflows));
    
    return updatedWorkflow;
  }

  // Get all saved workflows
  static getAllWorkflows(): WorkflowData[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to parse workflows from localStorage:', error);
      return [];
    }
  }

  // Get workflow by ID
  static getWorkflow(id: string): WorkflowData | null {
    const workflows = this.getAllWorkflows();
    return workflows.find(w => w.id === id) || null;
  }

  // Delete workflow
  static deleteWorkflow(id: string): boolean {
    const workflows = this.getAllWorkflows();
    const filteredWorkflows = workflows.filter(w => w.id !== id);
    
    if (filteredWorkflows.length === workflows.length) {
      return false; // Workflow not found
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredWorkflows));
    return true;
  }

  // Save current workflow state (auto-save)
  static saveCurrentWorkflow(nodes: Node[], edges: Edge[]): void {
    const currentState = {
      nodes,
      edges,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem(CURRENT_WORKFLOW_KEY, JSON.stringify(currentState));
  }

  // Load current workflow state
  static loadCurrentWorkflow(): { nodes: Node[]; edges: Edge[] } | null {
    try {
      const stored = localStorage.getItem(CURRENT_WORKFLOW_KEY);
      if (!stored) return null;
      
      const data = JSON.parse(stored);
      return {
        nodes: data.nodes || [],
        edges: data.edges || [],
      };
    } catch (error) {
      console.error('Failed to load current workflow:', error);
      return null;
    }
  }

  // Export workflow as JSON
  static exportWorkflow(workflow: WorkflowData): string {
    return JSON.stringify(workflow, null, 2);
  }

  // Import workflow from JSON
  static importWorkflow(jsonString: string): WorkflowData | null {
    try {
      const workflow = JSON.parse(jsonString);
      
      // Validate required fields
      if (!workflow.name || !workflow.version || !workflow.nodes || !workflow.edges) {
        throw new Error('Invalid workflow format');
      }
      
      // Generate new ID and timestamps for imported workflow
      const importedWorkflow: WorkflowData = {
        ...workflow,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      return this.saveWorkflow(importedWorkflow);
    } catch (error) {
      console.error('Failed to import workflow:', error);
      return null;
    }
  }

  // Download workflow as file
  static downloadWorkflow(workflow: WorkflowData): void {
    const dataStr = this.exportWorkflow(workflow);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `${workflow.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    link.click();
    
    // Clean up
    URL.revokeObjectURL(link.href);
  }

  // Upload workflow from file
  static uploadWorkflow(): Promise<WorkflowData | null> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      
      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) {
          resolve(null);
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const workflow = this.importWorkflow(content);
          resolve(workflow);
        };
        
        reader.onerror = () => resolve(null);
        reader.readAsText(file);
      };
      
      input.click();
    });
  }

  // Generate unique ID
  private static generateId(): string {
    return `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Clear all workflows (for development/testing)
  static clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CURRENT_WORKFLOW_KEY);
  }
}

// Auto-save hook
export const useAutoSave = (nodes: Node[], edges: Edge[], enabled = true) => {
  React.useEffect(() => {
    if (!enabled) return;
    
    const timeoutId = setTimeout(() => {
      WorkflowStorage.saveCurrentWorkflow(nodes, edges);
    }, 1000); // Auto-save after 1 second of inactivity
    
    return () => clearTimeout(timeoutId);
  }, [nodes, edges, enabled]);
};

import React from 'react';