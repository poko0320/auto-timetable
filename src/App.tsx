import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import WorkflowCanvas from './components/WorkflowCanvas';
import AIChatPanel from './components/AIChatPanel';
import NodePropertiesPanel from './components/NodePropertiesPanel';
import LogPanel from './components/LogPanel';
import { useWorkflowStore } from './store/workflowStore';
import { MessageSquare, X } from 'lucide-react';

function App() {
  const { selectedNodeId, selectNode, isPropertiesPanelOpen, togglePropertiesPanel, isChatPanelOpen, toggleChatPanel, nodes } = useWorkflowStore();
  const [showAIChat, setShowAIChat] = useState(false);

  const selectedNode = selectedNodeId ? nodes.find(node => node.id === selectedNodeId) : null;

  const handleNodeSelect = (node: any) => {
    selectNode(node?.id || null);
    if (node?.id && !isPropertiesPanelOpen) {
      togglePropertiesPanel();
    }
  };

  const handleCloseProperties = () => {
    if (isPropertiesPanelOpen) {
      togglePropertiesPanel();
    }
    selectNode(null);
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
        
        {/* AI Chat Toggle Button */}
        {!showAIChat && (
          <button
            onClick={() => setShowAIChat(true)}
            className="absolute top-4 right-4 z-10 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            title="Open AI Assistant"
          >
            <MessageSquare size={20} />
          </button>
        )}
        
        {/* Right AI Chat Panel (collapsible) */}
        {showAIChat && (
          <div className="relative">
            <AIChatPanel />
            <button
              onClick={() => setShowAIChat(false)}
              className="absolute top-4 right-4 z-10 p-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
              title="Close AI Assistant"
            >
              <X size={16} />
            </button>
          </div>
        )}
        
        {/* Node Properties Panel (overlay) */}
        {isPropertiesPanelOpen && selectedNode && (
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