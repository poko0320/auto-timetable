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

const EVAL_NODE_COMPONENTS: Record<string, React.FC<BaseNodeProps>> = {
  'system-monitor': SystemMonitorNode,
  'discord-caller': DiscordCallerNode,
  'network-scanner': NetworkScannerNode,
  'prank-notifier': PrankNotifierNode,
  'auto-typer': AutoTyperNode,
  'file-watcher': FileWatcherNode,
  'mouse-jiggler': MouseJigglerNode,
  'screen-recorder': ScreenRecorderNode,
  'system-info': SystemMonitorNode,
  'port-scanner': NetworkScannerNode,
  'dns-resolver': NetworkScannerNode,
  'fake-crash': PrankNotifierNode,
  'keyboard-logger': SystemMonitorNode,
  'web-crawler': NetworkScannerNode,
  'window-manipulator': PrankNotifierNode,
  'sound-player': PrankNotifierNode,
  'clipboard-monitor': SystemMonitorNode,
  'process-killer': SystemMonitorNode,
  'network-traffic': NetworkScannerNode,
  'desktop-wallpaper': PrankNotifierNode,
};

export const EvalNodeRenderer: React.FC<BaseNodeProps> = (props) => {
  const { data } = props;
  const nodeType = data.type;
  
  const EvalComponent = EVAL_NODE_COMPONENTS[nodeType];
  
  if (EvalComponent) {
    return <EvalComponent {...props} />;
  }
  
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