import React from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import { NODE_REGISTRY, getNodesByCategory } from '../processors';
import { NodeCategory } from '../types';

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

export function Sidebar() {
  const { addNode, selectedNodeId, selectNode } = useWorkflowStore();

  const handleDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    
    // 添加拖拽时的视觉反馈
    const dragElement = event.currentTarget as HTMLElement;
    dragElement.style.opacity = '0.5';
    
    // 设置拖拽图像
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 120;
    canvas.height = 60;
    
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 120, 60);
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, 120, 60);
      ctx.fillStyle = '#374151';
      ctx.font = '12px sans-serif';
      ctx.fillText(nodeType, 10, 35);
    }
    
    event.dataTransfer.setDragImage(canvas, 60, 30);
  };

  const handleDragEnd = (event: React.DragEvent) => {
    const dragElement = event.currentTarget as HTMLElement;
    dragElement.style.opacity = '1';
  };

  const categories: NodeCategory[] = ['input-output', 'ai-llm', 'logic', 'transform', 'utilities'];

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Workflow Nodes</h2>
          <p className="text-sm text-gray-600 mb-6">
            Drag nodes to the canvas to build your workflow
          </p>
        </div>

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
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: node.color }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {node.label}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {node.description}
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                      {node.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

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