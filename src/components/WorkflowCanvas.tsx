import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
} from 'reactflow';

import { nodeTypes } from './nodes/nodeTypes';
import { NODE_REGISTRY } from '../processors';
import { useWorkflowStore } from '../store/workflowStore';

// Initial nodes - empty for clean start
const INITIAL_NODES: Node[] = [];

interface WorkflowCanvasProps {
  onNodeSelect?: (node: Node) => void;
}

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({ onNodeSelect }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [nodeIdCounter, setNodeIdCounter] = useState(1); // Start from 1

  const { selectNode, isExecuting } = useWorkflowStore();

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return;
      
      setEdges((eds) => addEdge({
        id: `edge-${Date.now()}`,
        source: params.source,
        target: params.target,
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
        type: 'smoothstep',
        animated: isExecuting,
        style: { 
          stroke: isExecuting ? '#3b82f6' : '#6b7280', 
          strokeWidth: 2,
          strokeDasharray: isExecuting ? '5,5' : undefined
        },
        markerEnd: 'arrowclosed'
      }, eds));
    },
    [setEdges, isExecuting]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const nodeType = event.dataTransfer.getData('application/reactflow');

      console.log('Drop event:', { nodeType, reactFlowBounds });

      if (!nodeType) {
        console.log('No node type found in drag data');
        return;
      }

      // 计算相对于画布的精确位置，添加偏移以避免节点被鼠标遮挡
      const position = {
        x: event.clientX - reactFlowBounds.left - 100,
        y: event.clientY - reactFlowBounds.top - 50,
      };

      console.log('Drop position:', position, 'Client:', { x: event.clientX, y: event.clientY });

      // 使用节点注册器获取节点信息
      const nodeInfo = Object.values(NODE_REGISTRY).find(info => info.type === nodeType);
      const nodeLabel = nodeInfo?.label || 'Unknown Node';

      const newNode: Node = {
        id: `node-${nodeIdCounter}`,
        type: nodeType, // 直接使用拖拽的节点类型
        position,
        data: { 
          label: nodeLabel,
          type: nodeType,
          status: 'idle'
        },
        draggable: true,
      };

      console.log('Creating new node:', newNode);
      setNodes((nds) => nds.concat(newNode));
      setNodeIdCounter(prev => prev + 1);
    },
    [nodeIdCounter, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    selectNode(node.id);
    onNodeSelect?.(node);
  }, [selectNode, onNodeSelect]);

  // Update edge animation when workflow is running
  React.useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        animated: isExecuting,
        style: {
          ...edge.style,
          stroke: isExecuting ? '#3b82f6' : '#94a3b8',
        }
      }))
    );
  }, [isExecuting, setEdges]);

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