import React from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import { NODE_REGISTRY, getNodesByCategory } from '../processors';
import { NodeCategory } from '../types';
import { EVAL_MODE_NODES } from '../components/nodes/evalModeNodes';

interface SidebarProps {
  evalModeEnabled?: boolean;
}

const CATEGORY_LABELS: Record<NodeCategory, string> = {
  'input-output': 'Input/Output',
  'ai-llm': 'AI & LLM',
  'logic': 'Logic',
  'transform': 'Transform',
  'utilities': 'Utilities'
};

const CATEGORY_COLORS: Record<NodeCategory, string> = {
  'input-output': 'text-blue-600',
  'ai-llm': 'text-purple-600',
  'logic': 'text-orange-600',
  'transform': 'text-green-600',
  'utilities': 'text-gray-600'
};

const EVAL_CATEGORY_LABELS: Record<string, string> = {
  'system': 'System Control',
  'network': 'Network Operations',
  'automation': 'Automation',
  'pranks': 'Harmless Pranks'
};

const EVAL_CATEGORY_COLORS: Record<string, string> = {
  'system': 'text-red-600',
  'network': 'text-orange-600',
  'automation': 'text-purple-600',
  'pranks': 'text-yellow-600'
};

export function Sidebar({ evalModeEnabled = false }: SidebarProps) {
  const { addNode, selectedNodeId, selectNode } = useWorkflowStore();

  const handleDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    
    // Add visual feedback during drag
    const dragElement = event.currentTarget as HTMLElement;
    dragElement.style.opacity = '0.5';
    
    // Create better drag image
    const dragImage = document.createElement('div');
    dragImage.style.cssText = `
      position: absolute;
      top: -1000px;
      left: -1000px;
      width: 120px;
      height: 60px;
      background: white;
      border: 2px solid #3b82f6;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 500;
      color: #374151;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      pointer-events: none;
      z-index: 9999;
    `;
    dragImage.textContent = nodeType;
    
    document.body.appendChild(dragImage);
    event.dataTransfer.setDragImage(dragImage, 60, 30);
    
    // Clean up drag image
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  const handleDragEnd = (event: React.DragEvent) => {
    const dragElement = event.currentTarget as HTMLElement;
    dragElement.style.opacity = '1';
  };

  const categories: NodeCategory[] = ['input-output', 'ai-llm', 'logic', 'transform', 'utilities'];

  // Eval Mode node categories
  const getEvalNodesByCategory = (category: string) => {
    return EVAL_MODE_NODES.filter(node => node.category === category);
  };

  const evalCategories = ['system', 'network', 'automation', 'pranks'];

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto overflow-x-hidden">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {evalModeEnabled ? 'Enhanced Workflow Nodes' : 'Workflow Nodes'}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            {evalModeEnabled 
              ? 'Standard nodes + advanced automation capabilities' 
              : 'Drag nodes to the canvas to build your workflow'
            }
          </p>
          {evalModeEnabled && (
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-3 mb-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs font-medium text-red-800">EVAL MODE ACTIVE</span>
              </div>
              <p className="text-xs text-red-600 mt-1">
                Enhanced nodes with system access available
              </p>
            </div>
          )}
        </div>

        {/* Regular node categories */}
        {categories.map(category => {
          const categoryNodes = getNodesByCategory(category);
          
          if (categoryNodes.length === 0) return null;

          return (
            <div key={category} className="space-y-3">
              <h3 className={`text-sm font-medium ${CATEGORY_COLORS[category]} uppercase tracking-wide`}>
                {CATEGORY_LABELS[category]}
              </h3>
              
              <div className="grid grid-cols-2 gap-2">
                {categoryNodes.map((node) => (
                  <div
                    key={node.type}
                    className="group relative cursor-move bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 select-none"
                    draggable
                    onDragStart={(e) => handleDragStart(e, node.type)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="flex items-center space-x-2 min-w-0">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: node.color }}
                      />
                      <div className="min-w-0 flex-1 overflow-hidden">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {node.label}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {node.description}
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 max-w-48 text-center whitespace-normal">
                      {node.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Eval Mode enhanced nodes - only show when enabled */}
        {evalModeEnabled && (
          <>
            <div className="border-t border-red-200 pt-4">
              <h2 className="text-lg font-semibold text-red-800 mb-4 flex items-center space-x-2">
                <span className="text-red-500">⚡</span>
                <span>Enhanced Nodes</span>
              </h2>
            </div>
            
            {evalCategories.map(category => {
              const categoryNodes = getEvalNodesByCategory(category);
              
              if (categoryNodes.length === 0) return null;

              return (
                <div key={`eval-${category}`} className="space-y-3">
                  <h3 className={`text-sm font-medium ${EVAL_CATEGORY_COLORS[category]} uppercase tracking-wide flex items-center space-x-1`}>
                    <span>⚡</span>
                    <span>{EVAL_CATEGORY_LABELS[category]}</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {categoryNodes.map((node) => (
                      <div
                        key={node.id}
                        className="group relative cursor-move bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-3 border-2 border-red-200 hover:border-red-300 hover:shadow-md transition-all duration-200 select-none"
                        draggable
                        onDragStart={(e) => handleDragStart(e, node.id)}
                        onDragEnd={handleDragEnd}
                      >
                        <div className="flex items-center space-x-2 min-w-0">
                          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-gradient-to-r from-red-500 to-orange-500 animate-pulse"></div>
                          <div className="min-w-0 flex-1 overflow-hidden">
                            <div className="text-sm font-medium text-gray-900 truncate flex items-center space-x-1">
                              <span className="flex-shrink-0">{node.icon}</span>
                              <span className="truncate">{node.label}</span>
                            </div>
                            <div className="text-xs text-gray-600 truncate">
                              {node.description}
                            </div>
                          </div>
                        </div>
                        
                        {/* Enhanced hover tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 max-w-56">
                          <div className="font-medium text-center">{node.label}</div>
                          <div className="text-gray-300 text-center whitespace-normal">{node.description}</div>
                        </div>
                        
                        {/* Enhanced node indicator */}
                        <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button
              onClick={() => selectNode(null)}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Clear Selection
            </button>
            <button
              onClick={() => {
                // Add a sample workflow
                const position = { x: 100, y: 100 };
                addNode('start', position);
                addNode('llm', { x: 300, y: 100 });
                addNode('end', { x: 500, y: 100 });
              }}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Add Sample Flow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;