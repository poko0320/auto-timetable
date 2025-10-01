import React from 'react';
import { VenetianMask } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-rose-50',
  border: 'border-rose-200',
  icon: 'text-rose-600',
  accent: 'text-rose-100'
};

export const VariableAggregatorNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={VenetianMask}
      style={style}
      hasInput={true}
      hasOutput={true}
      multipleInputs={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          Variable Aggregator
        </div>
        <div className="flex items-center justify-center space-x-1">
          <div className="flex flex-col space-y-0.5">
            <div className="w-4 h-1 bg-rose-300 rounded"></div>
            <div className="w-4 h-1 bg-rose-400 rounded"></div>
            <div className="w-4 h-1 bg-rose-500 rounded"></div>
          </div>
          <div className="text-xs text-rose-600">→</div>
          <div className="w-6 h-6 bg-rose-500 rounded flex items-center justify-center">
            <VenetianMask size={12} className="text-white" />
          </div>
        </div>
        {config.aggregationType && (
          <div className="text-xs bg-rose-100 px-2 py-1 rounded text-rose-800">
            Type: {config.aggregationType}
          </div>
        )}
        {config.outputFormat && (
          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
            Format: {config.outputFormat}
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default VariableAggregatorNode;