import React from 'react';
import { Webhook } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-yellow-50',
  border: 'border-yellow-200',
  icon: 'text-yellow-600',
  accent: 'text-yellow-100'
};

export const WebhookNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Webhook}
      style={style}
      hasInput={true}
      hasOutput={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-gray-600">
          Webhook Trigger
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            {config.method && (
              <div className="text-xs font-mono bg-yellow-100 px-2 py-1 rounded text-yellow-800">
                {config.method.toUpperCase()}
              </div>
            )}
          </div>
          <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center relative">
            <Webhook size={12} className="text-white" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          </div>
        </div>
        {config.endpoint && (
          <div className="text-xs text-gray-500 truncate font-mono bg-gray-50 px-2 py-1 rounded">
            {config.endpoint}
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default WebhookNode;