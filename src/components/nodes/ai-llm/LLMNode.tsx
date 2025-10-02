import React from 'react';
import { Brain } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-violet-50',
  border: 'border-violet-200',
  icon: 'text-violet-600',
  accent: 'text-violet-100'
};

export const LLMNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Brain}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2 overflow-hidden">
        <div className="text-xs text-gray-600 truncate">
          Large Language Model
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex-1 min-w-0">
            {config.model && (
              <div className="text-xs font-mono bg-violet-100 px-2 py-1 rounded text-violet-800 truncate">
                {config.model}
              </div>
            )}
          </div>
          <div className="w-6 h-6 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Brain size={12} className="text-white" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 text-xs overflow-hidden">
          {config.temperature && (
            <div className="text-gray-500 bg-gray-50 px-1 py-0.5 rounded truncate">
              Temp: {config.temperature}
            </div>
          )}
          {config.maxTokens && (
            <div className="text-gray-500 bg-gray-50 px-1 py-0.5 rounded truncate">
              Tokens: {config.maxTokens}
            </div>
          )}
        </div>
      </div>
    </BaseNode>
  );
};

export default LLMNode;