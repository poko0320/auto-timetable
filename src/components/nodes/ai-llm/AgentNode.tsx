import React from 'react';
import { Bot } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-pink-50',
  border: 'border-pink-200',
  icon: 'text-pink-600',
  accent: 'text-pink-100'
};

export const AgentNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Bot}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          AI Agent
        </div>
        <div className="relative">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center relative">
              <Bot size={14} className="text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        {config.strategy && (
          <div className="text-xs bg-pink-100 px-2 py-1 rounded text-pink-800">
            Strategy: {config.strategy}
          </div>
        )}
        {config.tools && (
          <div className="text-xs text-gray-500">
            Tools: {config.tools.length} available
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default AgentNode;