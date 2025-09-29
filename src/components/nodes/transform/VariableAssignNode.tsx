import React from 'react';
import { Variable } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-emerald-50',
  border: 'border-emerald-200',
  icon: 'text-emerald-600',
  accent: 'text-emerald-100'
};

export const VariableAssignNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Variable}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          Variable Assignment
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">$</span>
          </div>
          <div className="flex-1 h-2 bg-emerald-200 rounded relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-emerald-500 rounded animate-pulse"></div>
          </div>
        </div>
        {config.variableName && (
          <div className="text-xs font-mono bg-emerald-100 px-2 py-1 rounded text-emerald-800">
            ${config.variableName}
          </div>
        )}
        {config.valueType && (
          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
            Type: {config.valueType}
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default VariableAssignNode;