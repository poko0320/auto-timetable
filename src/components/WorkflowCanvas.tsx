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
  NodeTypes,
} from 'reactflow';

import CustomNode from './CustomNode';
import { useWorkflowStore } from '../store/workflowStore';

const NODE_TYPES: NodeTypes = Object.freeze({
  custom: CustomNode,
});

// Initial nodes - empty for clean start
const INITIAL_NODES: Node[] = [];

interface WorkflowCanvasProps {
  onNodeSelect?: (node: Node) => void;
}

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({ onNodeSelect }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [nodeIdCounter, setNodeIdCounter] = useState(1); // Start from 1

  const { setSelectedNode, isRunning } = useWorkflowStore();

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
        animated: isRunning,
        style: { 
          stroke: '#94a3b8', 
          strokeWidth: 2 
        },
      }, eds));
    },
    [setEdges, isRunning]
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

      // Use ReactFlow's project method to get correct position
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      console.log('Drop position:', position, 'Client:', { x: event.clientX, y: event.clientY });

      const nodeLabels: Record<string, string> = {
        file: 'File',
        text: 'Text',
        sheets: 'Sheets',
        data: 'Example data',
        filter: 'Filter',
        merge: 'Merge',
        group: 'Group',
        sort: 'Sort',
        javascript: 'Javascript',
        geocode: 'Geocode',
        colorize: 'Colorize',
        custom: 'Custom data'
      };

      const newNode: Node = {
        id: `node-${nodeIdCounter}`,
        type: 'custom',
        position,
        data: { 
          label: nodeLabels[nodeType] || 'New Node',
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
    setSelectedNode(node);
    onNodeSelect?.(node);
  }, [setSelectedNode, onNodeSelect]);

  // Update edge animation when workflow is running
  React.useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        animated: isRunning,
        style: {
          ...edge.style,
          stroke: isRunning ? '#3b82f6' : '#94a3b8',
        }
      }))
    );
  }, [isRunning, setEdges]);

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
        nodeTypes={NODE_TYPES}
        snapToGrid={true}
        snapGrid={[15, 15]}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        minZoom={0.1}
        maxZoom={2}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
        deleteKeyCode={['Backspace', 'Delete']}
        multiSelectionKeyCode={['Meta', 'Control']}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={16} 
          size={1} 
          color="#e2e8f0"
          className="bg-white"
        />
        
        <Controls 
          position="top-right"
          showInteractive={false}
          className="bg-white border border-gray-200 rounded-lg shadow-sm"
        />
        
        <MiniMap 
          position="top-left"
          nodeColor={(node) => {
            const colorMap: Record<string, string> = {
              file: '#3b82f6',
              text: '#10b981', 
              sheets: '#f59e0b',
              data: '#8b5cf6',
              filter: '#ef4444',
              merge: '#06b6d4',
              group: '#84cc16',
              sort: '#f97316',
              javascript: '#6366f1',
              geocode: '#ec4899',
              colorize: '#14b8a6',
              custom: '#6b7280'
            };
            return colorMap[node.data?.type] || '#6b7280';
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
          className="bg-white border border-gray-200 rounded-lg"
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