import React from 'react';
import { Phone, Zap } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-gradient-to-r from-purple-50 to-indigo-50',
  border: 'border-purple-300',
  icon: 'text-purple-600',
  accent: 'bg-purple-100'
};

export const DiscordCallerNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Phone}
      style={style}
      hasInput={true}
      hasOutput={true}
      multipleOutputs={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-purple-700 font-medium flex items-center space-x-1">
          <Zap size={10} />
          <span>Discord Caller</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center relative">
            <Phone size={14} className="text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
          </div>
        </div>
        <div className="text-xs text-center text-gray-600">
          {config.friend_username || 'Auto Call'}
        </div>
        <div className="flex justify-center">
          <div className="px-2 py-1 bg-purple-200 rounded-full text-xs text-purple-700">
            📞 Ready
          </div>
        </div>
      </div>
    </BaseNode>
  );
};

export default DiscordCallerNode;