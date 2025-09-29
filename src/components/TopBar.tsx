import React from 'react';
import { Play, Save, Settings, Pause, RotateCcw, Users, Copy, Code, Link } from 'lucide-react';
import { useWorkflowStore } from '../store/workflowStore';

const TopBar: React.FC = () => {
  const { isRunning, runWorkflow, stopWorkflow, clearLogs } = useWorkflowStore();

  const handleRun = () => {
    if (isRunning) {
      stopWorkflow();
    } else {
      runWorkflow();
    }
  };

  const handleSave = () => {
    console.log('Save workflow');
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
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white transition-colors ${
              isRunning 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
            <span className="text-sm font-medium">{isRunning ? 'Stop' : 'Run'}</span>
          </button>
          
          <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1">
            <button 
              onClick={handleSave}
              className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-all"
            >
              <Save size={14} />
              <span className="text-sm">Save</span>
            </button>
            
            <button className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-all">
              <Copy size={14} />
              <span className="text-sm">Copy</span>
            </button>
            
            <button className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-all">
              <Link size={14} />
              <span className="text-sm">Share</span>
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
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <span className="text-xs text-gray-600">
              {isRunning ? 'Running' : 'Ready'}
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