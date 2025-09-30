import React from 'react';
import { 
  Play, 
  Save, 
  Settings, 
  Pause, 
  RotateCcw, 
  Users, 
  Copy, 
  Code, 
  Link,
  Download,
  Upload,
  Plus,
  Zap,
  Layers,
  Clock
} from 'lucide-react';
import { useWorkflowStore } from '../store/workflowStore';
import { useSuccessToast, useErrorToast, useInfoToast } from './ToastProvider';

const TopBar: React.FC = () => {
  const { isExecuting, executeWorkflow, stopExecution, clearLogs, saveWorkflow, exportWorkflow, importWorkflow, newWorkflow } = useWorkflowStore();
  const showSuccess = useSuccessToast();
  const showError = useErrorToast();
  const showInfo = useInfoToast();

  const handleRun = () => {
    if (isExecuting) {
      stopExecution();
      showInfo('Workflow Stopped', 'Execution has been halted');
    } else {
      executeWorkflow();
      showInfo('Workflow Started', 'Executing workflow nodes...');
    }
  };

  const handleSave = () => {
    try {
      const workflow = saveWorkflow();
      showSuccess('Workflow Saved', `Saved as "${workflow.name}"`);
    } catch (error) {
      showError('Save Failed', 'Unable to save workflow');
    }
  };

  const handleExport = () => {
    try {
      exportWorkflow();
      showSuccess('Workflow Exported', 'Download should start automatically');
    } catch (error) {
      showError('Export Failed', 'Unable to export workflow');
    }
  };

  const handleImport = async () => {
    try {
      await importWorkflow();
      showSuccess('Workflow Imported', 'Workflow loaded successfully');
    } catch (error) {
      showError('Import Failed', 'Unable to import workflow');
    }
  };

  const handleNew = () => {
    if (confirm('Create new workflow? Unsaved changes will be lost.')) {
      newWorkflow();
      showInfo('New Workflow', 'Started with a blank canvas');
    }
  };

  const handleClearLogs = () => {
    clearLogs();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and title */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AF</span>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">AutoFlow</h1>
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
              Workflows
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
              Templates
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
              History
            </button>
          </nav>
        </div>
        
        {/* Center - Workflow controls */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleRun}
            disabled={false}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 ${
              isExecuting 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isExecuting ? <Pause size={16} /> : <Play size={16} />}
            <span className="text-sm">{isExecuting ? 'Stop Execution' : 'Run Workflow'}</span>
          </button>
          
          <button
            onClick={handleClearLogs}
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Clear execution logs"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm">Clear</span>
          </button>
          
          <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1">
            <button 
              onClick={handleNew}
              className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-all"
              title="New workflow"
            >
              <Code size={14} />
              <span className="text-sm">New</span>
            </button>
            
            <button 
              onClick={handleSave}
              className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-all"
              title="Save workflow"
            >
              <Save size={14} />
              <span className="text-sm">Save</span>
            </button>
            
            <button 
              onClick={handleExport}
              className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-all"
              title="Export workflow"
            >
              <Copy size={14} />
              <span className="text-sm">Export</span>
            </button>
            
            <button 
              onClick={handleImport}
              className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-all"
              title="Import workflow"
            >
              <Link size={14} />
              <span className="text-sm">Import</span>
            </button>
          </div>
        </div>
        
        {/* Right side - User and settings */}
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Users size={16} />
            <span className="text-sm">Invite</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isExecuting ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <span className="text-xs text-gray-600">
              {isExecuting ? 'Running' : 'Ready'}
            </span>
          </div>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;