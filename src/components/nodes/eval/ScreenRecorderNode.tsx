import React from 'react';
import { Video, Circle, Square } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-gradient-to-r from-red-50 to-rose-50',
  border: 'border-red-300',
  icon: 'text-red-600',
  accent: 'bg-red-100'
};

export const ScreenRecorderNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Video}
      style={style}
      hasInput={true}
      hasOutput={true}
      multipleOutputs={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-red-700 font-medium flex items-center space-x-1">
          <Circle size={10} className="animate-pulse" />
          <span>Screen Recorder</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center relative">
            <Video size={14} className="text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse">
              <div className="w-full h-full bg-red-600 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
        <div className="text-xs text-center text-gray-600">
          {config.output_format || 'MP4'}
        </div>
        <div className="flex justify-center items-center space-x-1">
          <Square size={6} className="text-red-500 animate-pulse" />
          <div className="text-xs text-red-600">Recording</div>
        </div>
      </div>
    </BaseNode>
  );
};

export default ScreenRecorderNode;