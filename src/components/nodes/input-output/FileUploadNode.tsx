import React from 'react';
import { FileText } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-amber-50',
  border: 'border-amber-200',
  icon: 'text-amber-600',
  accent: 'text-amber-100'
};

export const FileUploadNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={FileText}
      style={style}
      hasInput={false}
      hasOutput={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          File Upload Handler
        </div>
        <div className="border-2 border-dashed border-amber-300 rounded-lg p-2 bg-amber-50">
          <div className="flex items-center justify-center space-x-1">
            <FileText size={12} className="text-amber-600" />
            <span className="text-xs text-amber-700">Drop files here</span>
          </div>
        </div>
        {config.fileTypes && (
          <div className="text-xs text-gray-500">
            Types: {config.fileTypes.join(', ')}
          </div>
        )}
        {config.maxSize && (
          <div className="text-xs text-gray-500">
            Max: {config.maxSize}
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default FileUploadNode;