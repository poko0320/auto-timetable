import React from 'react';
import { Mouse, Zap, RotateCw } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-gradient-to-r from-yellow-50 to-orange-50',
  border: 'border-yellow-300',
  icon: 'text-yellow-600',
  accent: 'bg-yellow-100'
};

export const MouseJigglerNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Mouse}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-yellow-700 font-medium flex items-center space-x-1">
          <Zap size={10} />
          <span>Mouse Jiggler</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center relative">
            <Mouse size={14} className="text-white" />
            <div className="absolute inset-0 rounded-full">
              <RotateCw size={16} className="text-yellow-300 animate-spin absolute top-0 left-0" />
            </div>
          </div>
        </div>
        <div className="text-xs text-center text-gray-600">
          {config.pattern || 'Random'}
        </div>
        <div className="flex justify-center items-center space-x-1">
          <div className="text-xs text-yellow-600">🖱️ Jiggling...</div>
        </div>
      </div>
    </BaseNode>
  );
};

export default MouseJigglerNode;