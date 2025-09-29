import React from 'react';
import { Code } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-slate-50',
  border: 'border-slate-200',
  icon: 'text-slate-600',
  accent: 'text-slate-100'
};

export const CodeNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Code}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          Code Execution
        </div>
        <div className="bg-slate-900 rounded-lg p-2 text-xs font-mono">
          <div className="flex items-center space-x-1 mb-1">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
          </div>
          <div className="text-green-400">
            {config.language && (
              <span>// {config.language.toUpperCase()}</span>
            )}
          </div>
          <div className="text-slate-300 animate-pulse">
            {'> '}
            <span className="bg-slate-700 px-1 rounded">Execute</span>
          </div>
        </div>
        {config.timeout && (
          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
            Timeout: {config.timeout}ms
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default CodeNode;