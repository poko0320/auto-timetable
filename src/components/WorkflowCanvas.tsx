import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Connection,
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
} from 'reactflow';

import { nodeTypes } from './nodes/nodeTypes';
import { useWorkflowStore } from '../store/workflowStore';

interface WorkflowCanvasProps {
  onNodeSelect?: (node: Node) => void;
  evalModeEnabled?: boolean;
}

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({ onNodeSelect, evalModeEnabled = false }) => {  
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect: storeOnConnect,
    addNode,
    selectNode, 
    isExecuting 
  } = useWorkflowStore();

  const onConnect = useCallback(
    (params: Connection) => {
      storeOnConnect(params);
    },
    [storeOnConnect]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const nodeType = event.dataTransfer.getData('application/reactflow');
      
      if (!nodeType) {
        return;
      }
      
      // Calculate more precise position relative to the ReactFlow viewport
      const position = {
        x: event.clientX - reactFlowBounds.left - 60, // Center the node on cursor
        y: event.clientY - reactFlowBounds.top - 30,  // Center the node on cursor
      };

      // Use store's addNode method
      addNode(nodeType as any, position);
    },
    [addNode]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('Node clicked:', node); // 调试日志
    selectNode(node.id);
    onNodeSelect?.(node);
  }, [selectNode, onNodeSelect]);

  // Update edge animation is now handled by the store

  return (
    <div className="flex-1 h-full bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={[20, 20]}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        minZoom={0.1}
        maxZoom={2}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
        deleteKeyCode={['Backspace', 'Delete']}
        multiSelectionKeyCode={['Meta', 'Control']}
        panOnScroll={true}
        selectionOnDrag={true}
        panOnDrag={[1, 2]}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={24} 
          size={1.5} 
          color="#e5e7eb"
          className="bg-gray-50"
        />
        
        <Controls 
          position="bottom-right"
          showInteractive={false}
          showZoom={true}
          showFitView={true}
          className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm"
        />
      </ReactFlow>
      
      {/* Empty state illustration */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center p-8 max-w-md">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Start Building Your Workflow
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Drag components from the left sidebar to create your automation workflow. 
              Connect nodes by dragging from the output handle of one node to the input handle of another.
            </p>
            <div className="mt-4 text-xs text-gray-400">
              Tip: Use the AI assistant on the right to help you build workflows automatically
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowCanvas;