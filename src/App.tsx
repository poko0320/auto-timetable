import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import WorkflowCanvas from './components/WorkflowCanvas';
import AIChatPanel from './components/AIChatPanel';
import NodePropertiesPanel from './components/NodePropertiesPanel';
import LogPanel from './components/LogPanel';
import { useWorkflowStore } from './store/workflowStore';

function App() {
  const { selectedNode, setSelectedNode } = useWorkflowStore();
  const [showProperties, setShowProperties] = useState(false);

  const handleNodeSelect = (node: any) => {
    setSelectedNode(node);
    setShowProperties(true);
  };

  const handleCloseProperties = () => {
    setShowProperties(false);
    setSelectedNode(null);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <TopBar />
      
      {/* Main Content */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Left Sidebar */}
        <Sidebar />
        
        {/* Center Canvas */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <WorkflowCanvas onNodeSelect={handleNodeSelect} />
          </div>
          {/* Bottom Log Panel */}
          <LogPanel />
        </div>
        
        {/* Right AI Chat Panel */}
        <AIChatPanel />
        
        {/* Node Properties Panel (overlay) */}
        {showProperties && selectedNode && (
          <NodePropertiesPanel 
            node={selectedNode} 
            onClose={handleCloseProperties}
          />
        )}
      </div>
    </div>
  );
}

export default App;