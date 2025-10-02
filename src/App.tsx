import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import WorkflowCanvas from './components/WorkflowCanvas';
import AIChatPanel from './components/AIChatPanel';
import NodePropertiesPanel from './components/NodePropertiesPanel';
import LogPanel from './components/LogPanel';
import TemplatesPage from './components/TemplatesPage';
import IntegrationsPage from './components/IntegrationsPage';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/ToastProvider';
import { useWorkflowStore } from './store/workflowStore';
import { 
  MessageSquare, 
  X, 
  Settings2, 
  Terminal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

function App() {
  const { selectedNodeId, selectNode, isPropertiesPanelOpen, togglePropertiesPanel } = useWorkflowStore();
  
  const [currentPage, setCurrentPage] = useState('workflow');
  const [evalModeEnabled, setEvalModeEnabled] = useState(false);
  const [evalModeConfirmed, setEvalModeConfirmed] = useState(false);
  
  const [isAIPanelCollapsed, setIsAIPanelCollapsed] = useState(false);
  const [isLogPanelCollapsed, setIsLogPanelCollapsed] = useState(true);
  
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const handleNodeSelect = (node: any) => {
    console.log('Node selected:', node);
    setSelectedNode(node);
    selectNode(node?.id || null);
    if (node?.id && !isPropertiesPanelOpen) {
      togglePropertiesPanel();
    }
  };

  const handleCloseProperties = () => {
    console.log('Closing properties panel');
    if (isPropertiesPanelOpen) {
      togglePropertiesPanel();
    }
    selectNode(null);
    setSelectedNode(null);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleEvalModeToggle = (enabled: boolean) => {
    setEvalModeEnabled(enabled);
    if (enabled) {
      setEvalModeConfirmed(true);
    }
  };

  if (currentPage === 'templates') {
    return (
      <ToastProvider>
        <ErrorBoundary>
          <div className="h-screen flex flex-col bg-gray-50">
            <TopBar 
              currentPage={currentPage} 
              onPageChange={handlePageChange}
              evalModeEnabled={evalModeEnabled}
              evalModeConfirmed={evalModeConfirmed}
              onEvalModeToggle={handleEvalModeToggle}
            />
            <TemplatesPage onPageChange={handlePageChange} />
          </div>
        </ErrorBoundary>
      </ToastProvider>
    );
  }

  if (currentPage === 'integrations') {
    return (
      <ToastProvider>
        <ErrorBoundary>
          <div className="h-screen flex flex-col bg-gray-50">
            <TopBar 
              currentPage={currentPage} 
              onPageChange={handlePageChange}
              evalModeEnabled={evalModeEnabled}
              evalModeConfirmed={evalModeConfirmed}
              onEvalModeToggle={handleEvalModeToggle}
            />
            <IntegrationsPage />
          </div>
        </ErrorBoundary>
      </ToastProvider>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <ErrorBoundary fallback={<div className="p-4 text-red-500">Application error</div>}>
        <ToastProvider>
          <TopBar 
            currentPage={currentPage} 
            onPageChange={handlePageChange}
            evalModeEnabled={evalModeEnabled}
            evalModeConfirmed={evalModeConfirmed}
            onEvalModeToggle={handleEvalModeToggle}
          />
          
          <div className="flex-1 flex overflow-hidden">
            <ErrorBoundary fallback={<div className="p-4 text-gray-500">Sidebar error</div>}>
              <Sidebar evalModeEnabled={evalModeEnabled} />
            </ErrorBoundary>

            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <ErrorBoundary fallback={
                  <div className="w-full h-full flex items-center justify-center bg-gray-50">
                    <div className="text-center text-gray-500">Canvas error</div>
                  </div>
                }>
                  <WorkflowCanvas onNodeSelect={handleNodeSelect} evalModeEnabled={evalModeEnabled} />
                </ErrorBoundary>
              </div>

              <div className={`${isLogPanelCollapsed ? 'h-12' : 'h-64'} border-t border-gray-200 bg-white transition-all duration-300`}>
                <div className="h-full flex flex-col">
                  <div className="p-3 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                        <div className="p-1 bg-green-100 rounded">
                          <Terminal size={14} className="text-green-600" />
                        </div>
                        {!isLogPanelCollapsed && <span className="text-sm">Execution Logs</span>}
                      </h3>
                      <button
                        onClick={() => setIsLogPanelCollapsed(!isLogPanelCollapsed)}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded"
                        title={isLogPanelCollapsed ? 'Expand Execution Logs' : 'Collapse Execution Logs'}
                      >
                        {isLogPanelCollapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>
                  </div>
                  {!isLogPanelCollapsed && (
                    <div className="flex-1 overflow-hidden">
                      <ErrorBoundary fallback={<div className="p-4 text-gray-500">Log panel error</div>}>
                        <LogPanel />
                      </ErrorBoundary>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={`${isAIPanelCollapsed ? 'w-12' : 'w-80'} flex flex-col border-l border-gray-200 bg-white transition-all duration-300 overflow-hidden min-w-0`}>
              <div className={`${isPropertiesPanelOpen && selectedNode && !isAIPanelCollapsed ? 'min-h-0 flex-1' : 'flex-1'} flex flex-col border-b border-gray-200 overflow-hidden min-w-0`}>
                <div className="p-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 flex items-center space-x-2 min-w-0">
                      <div className="p-1 bg-purple-100 rounded flex-shrink-0">
                        <MessageSquare size={14} className="text-purple-600" />
                      </div>
                      {!isAIPanelCollapsed && <span className="text-sm truncate">AI Assistant</span>}
                    </h3>
                    <button
                      onClick={() => setIsAIPanelCollapsed(!isAIPanelCollapsed)}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded flex-shrink-0"
                      title={isAIPanelCollapsed ? 'Expand AI Assistant' : 'Collapse AI Assistant'}
                    >
                      {isAIPanelCollapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>
                {!isAIPanelCollapsed && (
                  <div className="flex-1 overflow-hidden min-w-0">
                    <ErrorBoundary fallback={<div className="p-4 text-gray-500">Chat panel error</div>}>
                      <AIChatPanel />
                    </ErrorBoundary>
                  </div>
                )}
              </div>

              {isPropertiesPanelOpen && selectedNode && !isAIPanelCollapsed && (
                <div className="h-80 flex flex-col border-t border-gray-200 overflow-hidden min-w-0">
                  <div className="p-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 flex items-center space-x-2 min-w-0">
                        <div className="p-1 bg-indigo-100 rounded flex-shrink-0">
                          <Settings2 size={14} className="text-indigo-600" />
                        </div>
                        <span className="text-sm truncate">Properties</span>
                      </h3>
                      <button
                        onClick={handleCloseProperties}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded flex-shrink-0"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden min-w-0">
                    <ErrorBoundary fallback={<div className="p-4 text-gray-500">Properties panel error</div>}>
                      <NodePropertiesPanel node={selectedNode} onClose={handleCloseProperties} />
                    </ErrorBoundary>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ToastProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;