import React from 'react';
import { Wifi, Search, Shield } from 'lucide-react';
import { BaseNode, BaseNodeProps, NodeStyle } from '../base/BaseNode';

const style: NodeStyle = {
  bg: 'bg-gradient-to-r from-orange-50 to-yellow-50',
  border: 'border-orange-300',
  icon: 'text-orange-600',
  accent: 'bg-orange-100'
};

export const NetworkScannerNode: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const config = data.config || {};
  
  return (
    <BaseNode
      {...props}
      icon={Wifi}
      style={style}
      hasInput={true}
      hasOutput={true}
      multipleOutputs={true}
    >
      <div className="space-y-2">
        <div className="text-xs text-orange-700 font-medium flex items-center space-x-1">
          <Shield size={10} />
          <span>Network Scanner</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center relative">
            <Wifi size={14} className="text-white" />
            <div className="absolute inset-0 rounded-full border-2 border-orange-300 animate-ping"></div>
          </div>
        </div>
        <div className="text-xs text-center text-gray-600">
          {config.ip_range || '192.168.1.0/24'}
        </div>
        <div className="flex justify-center space-x-1">
          <Search size={8} className="text-orange-500 animate-spin" />
          <div className="text-xs text-orange-600">Scanning...</div>
        </div>
      </div>
    </BaseNode>
  );
};

export default NetworkScannerNode;