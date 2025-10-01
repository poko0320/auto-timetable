import React from 'react';
import { GitBranch } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-orange-50',
  border: 'border-orange-200',
  icon: 'text-orange-600',
  accent: 'text-orange-100'
};

export const IfElseNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={GitBranch}
      style={style}
      hasInput={true}
      hasOutput={true}
      multipleOutputs={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          Conditional Branch
        </div>
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <GitBranch size={14} className="text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-400 rounded-full"></div>
          </div>
        </div>
        {config.condition && (
          <div className="text-xs font-mono bg-orange-100 px-2 py-1 rounded text-orange-800">
            {config.condition}
          </div>
        )}
        <div className="flex justify-between text-xs">
          <span className="bg-green-100 text-green-700 px-1 py-0.5 rounded">TRUE</span>
          <span className="bg-red-100 text-red-700 px-1 py-0.5 rounded">FALSE</span>
        </div>
      </div>
    </BaseNode>
  );
};

export default IfElseNode;