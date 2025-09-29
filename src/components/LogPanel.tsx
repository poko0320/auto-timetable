import React, { useState } from 'react';
import { ChevronUp, ChevronDown, AlertCircle, CheckCircle, Play, Clock } from 'lucide-react';
import { useWorkflowStore } from '../store/workflowStore';

const LogPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { executionLogs, isExecuting } = useWorkflowStore();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Play size={14} className="text-blue-500" />;
      case 'success':
        return <CheckCircle size={14} className="text-green-500" />;
      case 'error':
        return <AlertCircle size={14} className="text-red-500" />;
      default:
        return <Clock size={14} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600';
    }
  };

  return (
    <div className={`bg-white border-t border-gray-200 transition-all duration-300 ${
      isExpanded ? 'h-80' : 'h-12'
    }`}>
      {/* Top control bar */}
      <div 
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isExecuting ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <span className="text-sm font-medium text-gray-700">Execution Logs</span>
          </div>
          {executionLogs.length > 0 && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {executionLogs.length} records
            </span>
          )}
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
      </div>

      {/* Log Content */}
      {isExpanded && (
        <div className="h-64 overflow-y-auto border-t border-gray-100">
          {executionLogs.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Clock size={32} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No execution logs</p>
                <p className="text-xs text-gray-400">Execution records will appear here after running workflows</p>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-2">
              {executionLogs.map((log) => (
                <div 
                  key={log.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg border ${getStatusColor(log.status)}`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getStatusIcon(log.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {log.message}
                      </span>
                      <span className="text-xs text-gray-500">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    {log.data && (
                      <div className="mt-2 text-xs bg-white bg-opacity-50 rounded p-2">
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(log.data, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LogPanel;