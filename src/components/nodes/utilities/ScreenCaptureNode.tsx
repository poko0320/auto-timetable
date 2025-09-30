import React from 'react';
import { Camera } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-gradient-to-r from-indigo-50 to-purple-50',
  border: 'border-indigo-200',
  icon: 'text-indigo-600',
  accent: 'bg-indigo-100'
};

export const ScreenCaptureNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Camera}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          Screen Capture
        </div>
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center relative">
            <Camera size={14} className="text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="text-xs text-center text-gray-500">
          {config.captureMode || 'Full Screen'}
        </div>
      </div>
    </BaseNode>
  );
};

export default ScreenCaptureNode;