import React from 'react';
import { Timer } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-zinc-50',
  border: 'border-zinc-200',
  icon: 'text-zinc-600',
  accent: 'text-zinc-100'
};

export const DelayNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Timer}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          Delay Timer
        </div>
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-zinc-500 rounded-full flex items-center justify-center relative">
            <Timer size={14} className="text-white" />
            <div className="absolute inset-0 rounded-full border-2 border-zinc-300 border-t-transparent animate-spin"></div>
          </div>
        </div>
        {config.delay && (
          <div className="text-xs font-mono bg-zinc-100 px-2 py-1 rounded text-zinc-800">
            Wait: {config.delay}ms
          </div>
        )}
        {config.unit && (
          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
            Unit: {config.unit}
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default DelayNode;