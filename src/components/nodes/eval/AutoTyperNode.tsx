import React from 'react';
import { Keyboard, Bot, Activity } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-gradient-to-r from-purple-50 to-pink-50',
  border: 'border-purple-300',
  icon: 'text-purple-600',
  accent: 'bg-purple-100'
};

export const AutoTyperNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Keyboard}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-purple-700 font-medium flex items-center space-x-1">
          <Bot size={10} />
          <span>Auto Typer</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center relative">
            <Keyboard size={14} className="text-white" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full">
              <Activity size={8} className="text-white m-0.5 animate-pulse" />
            </div>
          </div>
        </div>
        <div className="text-xs text-center text-gray-600">
          {config.typing_speed ? `${config.typing_speed} WPM` : '60 WPM'}
        </div>
        <div className="flex justify-center">
          <div className="px-2 py-0.5 bg-purple-200 rounded text-xs text-purple-700">
            ⌨️ Typing...
          </div>
        </div>
      </div>
    </BaseNode>
  );
};

export default AutoTyperNode;