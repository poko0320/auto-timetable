import React from 'react';
import { BaseNodeProps } from '../base/BaseNode';
import SystemMonitorNode from '../eval/SystemMonitorNode';
import DiscordCallerNode from '../eval/DiscordCallerNode';
import NetworkScannerNode from '../eval/NetworkScannerNode';
import PrankNotifierNode from '../eval/PrankNotifierNode';
import AutoTyperNode from '../eval/AutoTyperNode';
import FileWatcherNode from '../eval/FileWatcherNode';
import MouseJigglerNode from '../eval/MouseJigglerNode';
import ScreenRecorderNode from '../eval/ScreenRecorderNode';

// Eval节点组件映射
const EVAL_NODE_COMPONENTS: Record<string, React.FC<BaseNodeProps>> = {
  'system-monitor': SystemMonitorNode,
  'discord-caller': DiscordCallerNode,
  'network-scanner': NetworkScannerNode,
  'prank-notifier': PrankNotifierNode,
  'auto-typer': AutoTyperNode,
  'file-watcher': FileWatcherNode,
  'mouse-jiggler': MouseJigglerNode,
  'screen-recorder': ScreenRecorderNode,
  'system-info': SystemMonitorNode, // 重用SystemMonitorNode
  'port-scanner': NetworkScannerNode, // 重用NetworkScannerNode
  'dns-resolver': NetworkScannerNode, // 重用NetworkScannerNode
  'fake-crash': PrankNotifierNode, // 重用PrankNotifierNode
  'keyboard-logger': SystemMonitorNode, // 重用SystemMonitorNode
  'web-crawler': NetworkScannerNode, // 重用NetworkScannerNode
  'window-manipulator': PrankNotifierNode, // 重用PrankNotifierNode
  'sound-player': PrankNotifierNode, // 重用PrankNotifierNode
  'clipboard-monitor': SystemMonitorNode, // 重用SystemMonitorNode
  'process-killer': SystemMonitorNode, // 重用SystemMonitorNode
  'network-traffic': NetworkScannerNode, // 重用NetworkScannerNode
  'desktop-wallpaper': PrankNotifierNode, // 重用PrankNotifierNode
};

export const EvalNodeRenderer: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const nodeType = data.type;
  
  // 检查是否是eval节点
  const EvalComponent = EVAL_NODE_COMPONENTS[nodeType];
  
  if (EvalComponent) {
    return <EvalComponent {...props} />;
  }
  
  // 如果不是eval节点或者没有对应组件，返回一个默认的eval节点
  return (
    <div className="min-w-[160px] p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-lg">
      <div className="text-sm font-medium text-red-800 flex items-center space-x-2">
        <span>⚡</span>
        <span>{data.label || 'Eval Node'}</span>
      </div>
      <div className="text-xs text-gray-600 mt-1">
        Enhanced automation node
      </div>
    </div>
  );
};

export default EvalNodeRenderer;