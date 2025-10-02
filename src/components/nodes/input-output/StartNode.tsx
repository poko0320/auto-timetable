import React from 'react';
import { Play } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-emerald-50',
  border: 'border-emerald-200',
  icon: 'text-emerald-600',
  accent: 'text-emerald-100'
};

export const StartNode: React.FC<BaseNodeProps> = (props) => {
  return (
    <BaseNode
      {...props}
      icon={Play}
      style={style}
      hasInput={false}
      hasOutput={true}
    >
      <div className="space-y-2 overflow-hidden">
        <div className="text-xs text-gray-600 truncate">
          Workflow Entry Point
        </div>
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse flex-shrink-0">
            <Play size={14} className="text-white ml-0.5" />
          </div>
        </div>
      </div>
    </BaseNode>
  );
};

export default StartNode;