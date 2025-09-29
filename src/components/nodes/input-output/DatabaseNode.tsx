import React from 'react';
import { Database } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-purple-50',
  border: 'border-purple-200',
  icon: 'text-purple-600',
  accent: 'text-purple-100'
};

export const DatabaseNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Database}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          Database Operations
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            {config.operation && (
              <div className="text-xs font-mono bg-purple-100 px-2 py-1 rounded text-purple-800">
                {config.operation.toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-0.5">
            <div className="w-4 h-1 bg-purple-400 rounded"></div>
            <div className="w-4 h-1 bg-purple-500 rounded"></div>
            <div className="w-4 h-1 bg-purple-600 rounded"></div>
          </div>
        </div>
        {config.table && (
          <div className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">
            Table: {config.table}
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default DatabaseNode;