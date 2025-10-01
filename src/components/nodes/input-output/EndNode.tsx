import React from 'react';
import { Square } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-red-50',
  border: 'border-red-200',
  icon: 'text-red-600',
  accent: 'text-red-100'
};

export const EndNode: React.FC<BaseNodeProps> = (props) => {
  return (
    <BaseNode
      {...props}
      icon={Square}
      style={style}
      hasInput={true}
      hasOutput={false}
    >
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          Workflow Termination
        </div>
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
            <Square size={12} className="text-white fill-current" />
          </div>
        </div>
      </div>
    </BaseNode>
  );
};

export default EndNode;