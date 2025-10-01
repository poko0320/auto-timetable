import React from 'react';
import { NodeTypes } from 'reactflow';
import {
  StartNode,
  EndNode,
  HttpRequestNode,
  FileUploadNode,
  DatabaseNode,
  LLMNode,
  AgentNode,
  KnowledgeRetrievalNode,
  QuestionClassificationNode,
  IfElseNode,
  LoopNode,
  IterationNode,
  CodeNode,
  TemplateNode,
  VariableAssignNode,
  VariableAggregatorNode,
  StringProcessorNode,
  MathCalculatorNode,
  DelayNode,
  WebhookNode,
  ScreenCaptureNode
} from './';
import EvalNodeRenderer from './eval/EvalNodeRenderer';
import { EVAL_MODE_NODES } from './evalModeNodes';

// Node type mappings
export const nodeTypes: NodeTypes = {
  // Input/Output
  start: StartNode,
  end: EndNode,
  httpRequest: HttpRequestNode,
  fileUpload: FileUploadNode,
  database: DatabaseNode,
  
  // AI & LLM
  llm: LLMNode,
  agent: AgentNode,
  knowledgeRetrieval: KnowledgeRetrievalNode,
  questionClassification: QuestionClassificationNode,
  
  // Logic
  ifElse: IfElseNode,
  loop: LoopNode,
  iteration: IterationNode,
  
  // Transform
  code: CodeNode,
  template: TemplateNode,
  variableAssign: VariableAssignNode,
  variableAggregator: VariableAggregatorNode,
  stringProcessor: StringProcessorNode,
  mathCalculator: MathCalculatorNode,
  
  // Utilities
  delay: DelayNode,
  webhook: WebhookNode,
  screenCapture: ScreenCaptureNode,
  
  // Register all eval node types to EvalNodeRenderer
  // The key must match the node.id from EVAL_MODE_NODES
  'system-monitor': EvalNodeRenderer,
  'discord-caller': EvalNodeRenderer,
  'network-scanner': EvalNodeRenderer,
  'prank-notifier': EvalNodeRenderer,
  'auto-typer': EvalNodeRenderer,
  'file-watcher': EvalNodeRenderer,
  'mouse-jiggler': EvalNodeRenderer,
  'screen-recorder': EvalNodeRenderer,
  'system-info': EvalNodeRenderer,
  'port-scanner': EvalNodeRenderer,
  'dns-resolver': EvalNodeRenderer,
  'fake-crash': EvalNodeRenderer,
  'keyboard-logger': EvalNodeRenderer,
  'web-crawler': EvalNodeRenderer,
  'window-manipulator': EvalNodeRenderer,
  'sound-player': EvalNodeRenderer,
  'clipboard-monitor': EvalNodeRenderer,
  'process-killer': EvalNodeRenderer,
  'network-traffic': EvalNodeRenderer,
  'desktop-wallpaper': EvalNodeRenderer,
  'systemMonitor': EvalNodeRenderer,  // Alias for camelCase compatibility
  'discordCaller': EvalNodeRenderer,  // Alias for camelCase compatibility
  'networkScanner': EvalNodeRenderer,  // Alias for camelCase compatibility
  'prankNotifier': EvalNodeRenderer,  // Alias for camelCase compatibility
  'autoTyper': EvalNodeRenderer,  // Alias for camelCase compatibility
  'fileWatcher': EvalNodeRenderer,  // Alias for camelCase compatibility
  'mouseJiggler': EvalNodeRenderer,  // Alias for camelCase compatibility
  'screenRecorder': EvalNodeRenderer  // Alias for camelCase compatibility
};

export default nodeTypes;
