import React from 'react';
import { MessageSquare } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-cyan-50',
  border: 'border-cyan-200',
  icon: 'text-cyan-600',
  accent: 'text-cyan-100'
};

export const QuestionClassificationNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={MessageSquare}
      style={style}
      hasInput={true}
      hasOutput={true}
      multipleOutputs={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          Question Classification
        </div>
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
          <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 gap-1 text-xs">
          {config.categories && (
            <div className="text-gray-500 bg-gray-50 px-1 py-0.5 rounded">
              Categories: {config.categories.length}
            </div>
          )}
          {config.confidence && (
            <div className="text-gray-500 bg-gray-50 px-1 py-0.5 rounded">
              Confidence: {config.confidence}
            </div>
          )}
        </div>
      </div>
    </BaseNode>
  );
};

export default QuestionClassificationNode;