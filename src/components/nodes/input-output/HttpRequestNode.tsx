import React from 'react';
import { Globe } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-blue-50',
  border: 'border-blue-200',
  icon: 'text-blue-600',
  accent: 'text-blue-100'
};

export const HttpRequestNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Globe}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2 overflow-hidden">
        <div className="text-xs text-gray-600 truncate">
          HTTP Request Handler
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex-1 min-w-0">
            {config.method && (
              <div className="text-xs font-mono bg-blue-100 px-2 py-1 rounded text-blue-800 truncate">
                {config.method.toUpperCase()}
              </div>
            )}
          </div>
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
            <Globe size={12} className="text-white" />
          </div>
        </div>
        {config.url && (
          <div className="text-xs text-gray-500 truncate font-mono bg-gray-50 px-2 py-1 rounded">
            {config.url}
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default HttpRequestNode;