import React from 'react';
import { Monitor, AlertTriangle } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-gradient-to-r from-red-50 to-orange-50',
  border: 'border-red-300',
  icon: 'text-red-600',
  accent: 'bg-red-100'
};

export const SystemMonitorNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Monitor}
      style={style}
      hasInput={true}
      hasOutput={true}
      multipleOutputs={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-red-700 font-medium flex items-center space-x-1">
          <AlertTriangle size={10} />
          <span>System Monitor</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center relative">
            <Monitor size={14} className="text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="text-xs text-center text-gray-600">
          {config.process_name || 'All Processes'}
        </div>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </BaseNode>
  );
};

export default SystemMonitorNode;