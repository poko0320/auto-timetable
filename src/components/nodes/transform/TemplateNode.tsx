import React from 'react';
import { FileText } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-lime-50',
  border: 'border-lime-200',
  icon: 'text-lime-600',
  accent: 'text-lime-100'
};

export const TemplateNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={FileText}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2 overflow-hidden">
        <div className="text-xs text-gray-600 truncate">
          Template Renderer
        </div>
        <div className="bg-lime-50 border border-lime-200 rounded-lg p-2 overflow-hidden">
          <div className="flex items-center gap-1 min-w-0">
            <FileText size={12} className="text-lime-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="w-full h-1 bg-lime-200 rounded"></div>
              <div className="w-3/4 h-1 bg-lime-300 rounded mt-0.5"></div>
              <div className="w-1/2 h-1 bg-lime-400 rounded mt-0.5"></div>
            </div>
          </div>
        </div>
        {config.templateType && (
          <div className="text-xs bg-lime-100 px-2 py-1 rounded text-lime-800 truncate">
            Type: {config.templateType}
          </div>
        )}
        {config.variables && (
          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded truncate">
            Variables: {Object.keys(config.variables).length}
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default TemplateNode;