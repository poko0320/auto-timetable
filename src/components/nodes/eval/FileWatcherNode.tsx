import React from 'react';
import { Eye, FolderOpen, AlertTriangle } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-gradient-to-r from-red-50 to-pink-50',
  border: 'border-red-300',
  icon: 'text-red-600',
  accent: 'bg-red-100'
};

export const FileWatcherNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Eye}
      style={style}
      hasInput={true}
      hasOutput={true}
      multipleOutputs={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-red-700 font-medium flex items-center space-x-1">
          <AlertTriangle size={10} />
          <span>File Watcher</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center relative">
            <Eye size={14} className="text-white animate-pulse" />
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
          </div>
        </div>
        <div className="text-xs text-center text-gray-600 flex items-center justify-center space-x-1">
          <FolderOpen size={8} />
          <span>{config.watch_directory ? '...' + config.watch_directory.slice(-8) : 'Watching'}</span>
        </div>
        <div className="flex justify-center space-x-1">
          <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
        </div>
      </div>
    </BaseNode>
  );
};

export default FileWatcherNode;