import React from 'react';
import { Calculator } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-blue-50',
  border: 'border-blue-200',
  icon: 'text-blue-600',
  accent: 'text-blue-100'
};

export const MathCalculatorNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Calculator}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          Math Calculator
        </div>
        <div className="bg-blue-900 rounded-lg p-2 text-white">
          <div className="grid grid-cols-3 gap-1 text-xs">
            <div className="bg-blue-700 rounded px-1 py-0.5 text-center">7</div>
            <div className="bg-blue-700 rounded px-1 py-0.5 text-center">8</div>
            <div className="bg-blue-700 rounded px-1 py-0.5 text-center">9</div>
            <div className="bg-blue-600 rounded px-1 py-0.5 text-center">+</div>
            <div className="bg-blue-600 rounded px-1 py-0.5 text-center">-</div>
            <div className="bg-blue-600 rounded px-1 py-0.5 text-center">×</div>
          </div>
          <div className="mt-1 bg-blue-800 rounded px-2 py-0.5 text-center text-xs">
            = {config.result || '0'}
          </div>
        </div>
        {config.operation && (
          <div className="text-xs bg-blue-100 px-2 py-1 rounded text-blue-800">
            {config.operation}
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default MathCalculatorNode;