import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import WorkflowCanvas from './components/WorkflowCanvas';
import AIChatPanel from './components/AIChatPanel';
import NodePropertiesPanel from './components/NodePropertiesPanel';
import LogPanel from './components/LogPanel';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/ToastProvider';
import { useWorkflowStore } from './store/workflowStore';
import { MessageSquare, X } from 'lucide-react';

function App() {
  const { selectedNodeId, selectNode, isPropertiesPanelOpen, togglePropertiesPanel, isChatPanelOpen, toggleChatPanel } = useWorkflowStore();
  const [showAIChat, setShowAIChat] = useState(false);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const handleNodeSelect = (node: any) => {
    console.log('Node selected:', node); // 调试日志
    setSelectedNode(node);
    selectNode(node?.id || null);
    if (node?.id && !isPropertiesPanelOpen) {
      togglePropertiesPanel();
    }
  };

  const handleCloseProperties = () => {
    console.log('Closing properties panel'); // 调试日志
    if (isPropertiesPanelOpen) {
      togglePropertiesPanel();
    }
    selectNode(null);
    setSelectedNode(null);
  };

  return (
    <ToastProvider>
      <ErrorBoundary>
        <div className="h-screen flex flex-col bg-gray-50">
        {/* Top Navigation */}
        <TopBar />
        
        {/* Main Content */}
        <div className="flex-1 flex min-h-0 relative">
          {/* Left Sidebar */}
          <ErrorBoundary fallback={
            <div className="w-80 bg-white border-r border-gray-200 p-4">
              <div className="text-center text-gray-500">Sidebar error</div>
            </div>
          }>
            <Sidebar />
          </ErrorBoundary>
          
          {/* Center Canvas */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <ErrorBoundary fallback={
                <div className="flex-1 flex items-center justify-center bg-gray-100">
                  <div className="text-center text-gray-500">Canvas error</div>
                </div>
              }>
                <WorkflowCanvas onNodeSelect={handleNodeSelect} />
              </ErrorBoundary>
            </div>
            {/* Bottom Log Panel */}
            <ErrorBoundary fallback={
              <div className="h-12 bg-white border-t border-gray-200 flex items-center px-4">
                <div className="text-sm text-gray-500">Log panel error</div>
              </div>
            }>
              <LogPanel />
            </ErrorBoundary>
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
              <ErrorBoundary fallback={
                <div className="w-80 bg-white border-l border-gray-200 p-4">
                  <div className="text-center text-gray-500">AI Chat error</div>
                </div>
              }>
                <AIChatPanel />
              </ErrorBoundary>
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
          {(() => {
            console.log('Properties panel check:', { 
              isPropertiesPanelOpen, 
              selectedNode: !!selectedNode, 
              selectedNodeId 
            });
            return isPropertiesPanelOpen && selectedNode;
          })() && (
            <ErrorBoundary fallback={
              <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl border-l border-gray-200 z-50 p-4">
                <div className="text-center text-gray-500">Properties panel error</div>
              </div>
            }>
              <NodePropertiesPanel 
                node={selectedNode} 
                onClose={handleCloseProperties}
              />
            </ErrorBoundary>
          )}
        </div>
      </div>
    </ErrorBoundary>
    </ToastProvider>
  );
}

export default App;