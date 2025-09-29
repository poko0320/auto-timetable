import React from 'react';
import { IterationCw } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-sky-50',
  border: 'border-sky-200',
  icon: 'text-sky-600',
  accent: 'text-sky-100'
};

export const IterationNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={IterationCw}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          Batch Iteration
        </div>
        <div className="flex items-center justify-center">
          <div className="w-8 h-6 bg-sky-500 rounded flex items-center justify-center relative overflow-hidden">
            <IterationCw size={12} className="text-white" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 -skew-x-12 animate-pulse"></div>
          </div>
        </div>
        {config.currentIteration && config.totalIterations && (
          <div className="text-xs bg-sky-100 px-2 py-1 rounded text-sky-800">
            Progress: {config.currentIteration}/{config.totalIterations}
          </div>
        )}
        {config.batchSize && (
          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
            Batch: {config.batchSize} items
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default IterationNode;