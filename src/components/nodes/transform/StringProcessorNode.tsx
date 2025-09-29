import React from 'react';
import { Type } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-slate-50',
  border: 'border-slate-200',
  icon: 'text-slate-600',
  accent: 'text-slate-100'
};

export const StringProcessorNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Type}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          String Processor
        </div>
        <div className="bg-slate-100 rounded-lg p-2">
          <div className="flex items-center space-x-1">
            <Type size={12} className="text-slate-600" />
            <div className="flex-1 space-y-0.5">
              <div className="w-full h-1 bg-slate-300 rounded"></div>
              <div className="w-3/4 h-1 bg-slate-400 rounded"></div>
            </div>
          </div>
        </div>
        {config.operation && (
          <div className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-800">
            Op: {config.operation}
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default StringProcessorNode;