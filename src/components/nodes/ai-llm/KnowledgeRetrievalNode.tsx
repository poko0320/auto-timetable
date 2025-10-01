import React from 'react';
import { Search } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-teal-50',
  border: 'border-teal-200',
  icon: 'text-teal-600',
  accent: 'text-teal-100'
};

export const KnowledgeRetrievalNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Search}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          Knowledge Retrieval
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            {config.indexName && (
              <div className="text-xs bg-teal-100 px-2 py-1 rounded text-teal-800">
                Index: {config.indexName}
              </div>
            )}
          </div>
          <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center relative">
            <Search size={12} className="text-white" />
            <div className="absolute inset-0 rounded-full border-2 border-teal-300 animate-ping"></div>
          </div>
        </div>
        {config.topK && (
          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
            Return: {config.topK} results
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default KnowledgeRetrievalNode;