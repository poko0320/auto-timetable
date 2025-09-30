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
  
  // Eval Nodes
  evalNode: EvalNodeRenderer
};

export default nodeTypes;