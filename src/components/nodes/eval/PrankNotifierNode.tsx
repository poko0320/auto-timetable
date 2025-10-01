import React from 'react';
import { Smile, Zap, AlertCircle } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-gradient-to-r from-yellow-50 to-amber-50',
  border: 'border-yellow-300',
  icon: 'text-yellow-600',
  accent: 'bg-yellow-100'
};

export const PrankNotifierNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Smile}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-yellow-700 font-medium flex items-center space-x-1">
          <Zap size={10} />
          <span>Prank Notifier</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center relative">
            <span className="text-white text-sm">😈</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
          </div>
        </div>
        <div className="text-xs text-center text-gray-600">
          {config.notification_type || 'Toast'}
        </div>
        <div className="flex justify-center items-center space-x-1">
          <AlertCircle size={8} className="text-yellow-600" />
          <div className="text-xs text-yellow-600">Harmless Fun</div>
        </div>
      </div>
    </BaseNode>
  );
};

export default PrankNotifierNode;