import React from 'react';
import { RotateCcw } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-indigo-50',
  border: 'border-indigo-200',
  icon: 'text-indigo-600',
  accent: 'text-indigo-100'
};

export const LoopNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={RotateCcw}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          Loop Iteration
        </div>
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center relative">
            <RotateCcw size={14} className="text-white animate-spin" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-0 rounded-full border-2 border-indigo-300 border-dashed animate-pulse"></div>
          </div>
        </div>
        {config.iterationType && (
          <div className="text-xs bg-indigo-100 px-2 py-1 rounded text-indigo-800">
            Type: {config.iterationType}
          </div>
        )}
        {config.maxIterations && (
          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
            Max: {config.maxIterations} iterations
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default LoopNode;