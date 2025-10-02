import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Copy, Code, Play } from 'lucide-react';
import { mockAIChat, AIResponse, WorkflowSuggestion } from '../utils/aiMock';
import { useWorkflowStore } from '../store/workflowStore';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: WorkflowSuggestion[];
  code?: string;
}

const AIChatPanel: React.FC = () => {
  const { setNodes, setEdges, newWorkflow } = useWorkflowStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hi! I can help you create workflows automatically. Just describe what you want to automate and I\'ll generate the workflow for you.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsGenerating(true);

    try {
      const aiResponse: AIResponse = await mockAIChat(currentInput);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.message,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
        code: aiResponse.code
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an issue. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickPrompt = async (prompt: string) => {
    // Clear canvas first
    setNodes([]);
    setEdges([]);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsGenerating(true);
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get the template workflow
    const workflow = templateWorkflows[prompt as keyof typeof templateWorkflows];
    
    if (workflow) {
      // Progressively add nodes with animation effect
      const currentNodes: any[] = [];
      for (let i = 0; i < workflow.nodes.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        currentNodes.push(workflow.nodes[i]);
        setNodes([...currentNodes]);
      }
      
      // Add edges after all nodes are placed
      await new Promise(resolve => setTimeout(resolve, 300));
      setEdges(workflow.edges as any);
      
      // Add AI response
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I've generated a workflow for "${prompt}". The workflow includes ${workflow.nodes.length} nodes with automated processing steps. You can customize each node by clicking on it and adjusting the properties panel.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } else {
      // Fallback response
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I'd be happy to help you create a workflow for "${prompt}". Could you provide more specific details about the requirements and expected outputs?`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }
    
    setIsGenerating(false);
  };

    const quickPrompts = [
    "Create a daily schedule optimizer",
    "Build a meeting conflict resolver", 
    "Generate automated email responses",
    "Design a task priority system"
  ];

  // Template workflows for quick prompts
  const templateWorkflows = {
    "Create a daily schedule optimizer": {
      nodes: [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 100, y: 200 },
          data: { label: 'Start Schedule Optimization' }
        },
        {
          id: 'data-input-1',
          type: 'fileUpload',
          position: { x: 300, y: 100 },
          data: { label: 'Upload Schedule Data', description: 'CSV/JSON file with tasks and constraints' }
        },
        {
          id: 'llm-optimizer-1',
          type: 'llm',
          position: { x: 500, y: 200 },
          data: { 
            label: 'AI Schedule Optimizer',
            model: 'gpt-4',
            prompt: 'Analyze the schedule data and optimize for minimal conflicts and maximum efficiency'
          }
        },
        {
          id: 'output-1',
          type: 'end',
          position: { x: 700, y: 200 },
          data: { label: 'Optimized Schedule' }
        }
      ],
      edges: [
        { id: 'e1-2', source: 'start-1', target: 'data-input-1' },
        { id: 'e1-3', source: 'data-input-1', target: 'llm-optimizer-1' },
        { id: 'e3-4', source: 'llm-optimizer-1', target: 'output-1' }
      ]
    },
    "Build a meeting conflict resolver": {
      nodes: [
        {
          id: 'start-2',
          type: 'start',
          position: { x: 100, y: 200 },
          data: { label: 'Conflict Detection Start' }
        },
        {
          id: 'calendar-input-2',
          type: 'httpRequest',
          position: { x: 300, y: 100 },
          data: { 
            label: 'Calendar API',
            method: 'GET',
            url: 'https://api.calendar.com/events'
          }
        },
        {
          id: 'conflict-detector-2',
          type: 'code',
          position: { x: 500, y: 200 },
          data: {
            label: 'Conflict Detector',
            language: 'javascript',
            code: 'function detectConflicts(events) {\n  // Detect overlapping meetings\n  return conflicts;\n}'
          }
        },
        {
          id: 'resolution-llm-2',
          type: 'llm',
          position: { x: 700, y: 150 },
          data: {
            label: 'Resolution Generator',
            model: 'gpt-4',
            prompt: 'Generate optimal solutions for detected meeting conflicts'
          }
        },
        {
          id: 'notification-2',
          type: 'webhook',
          position: { x: 900, y: 200 },
          data: {
            label: 'Send Notifications',
            url: 'https://api.notifications.com/send'
          }
        }
      ],
      edges: [
        { id: 'e2-1', source: 'start-2', target: 'calendar-input-2' },
        { id: 'e2-2', source: 'calendar-input-2', target: 'conflict-detector-2' },
        { id: 'e2-3', source: 'conflict-detector-2', target: 'resolution-llm-2' },
        { id: 'e2-4', source: 'resolution-llm-2', target: 'notification-2' }
      ]
    },
    "Generate automated email responses": {
      nodes: [
        {
          id: 'start-3',
          type: 'start',
          position: { x: 100, y: 200 },
          data: { label: 'Email Processing Start' }
        },
        {
          id: 'email-webhook-3',
          type: 'webhook',
          position: { x: 300, y: 200 },
          data: {
            label: 'Email Webhook',
            description: 'Receives incoming emails'
          }
        },
        {
          id: 'classifier-3',
          type: 'questionClassification',
          position: { x: 500, y: 100 },
          data: {
            label: 'Email Classifier',
            categories: ['support', 'sales', 'general', 'urgent']
          }
        },
        {
          id: 'response-generator-3',
          type: 'llm',
          position: { x: 700, y: 200 },
          data: {
            label: 'Response Generator',
            model: 'gpt-3.5-turbo',
            prompt: 'Generate appropriate email response based on classification and content'
          }
        },
        {
          id: 'send-email-3',
          type: 'httpRequest',
          position: { x: 900, y: 200 },
          data: {
            label: 'Send Response',
            method: 'POST',
            url: 'https://api.email.com/send'
          }
        }
      ],
      edges: [
        { id: 'e3-1', source: 'start-3', target: 'email-webhook-3' },
        { id: 'e3-2', source: 'email-webhook-3', target: 'classifier-3' },
        { id: 'e3-3', source: 'classifier-3', target: 'response-generator-3' },
        { id: 'e3-4', source: 'response-generator-3', target: 'send-email-3' }
      ]
    },
    "Design a task priority system": {
      nodes: [
        {
          id: 'start-4',
          type: 'start',
          position: { x: 100, y: 200 },
          data: { label: 'Task Analysis Start' }
        },
        {
          id: 'task-input-4',
          type: 'fileUpload',
          position: { x: 300, y: 150 },
          data: {
            label: 'Task Data Input',
            description: 'Upload task list with deadlines and requirements'
          }
        },
        {
          id: 'priority-calculator-4',
          type: 'mathCalculator',
          position: { x: 500, y: 100 },
          data: {
            label: 'Priority Calculator',
            formula: '(urgency * importance) / effort_required'
          }
        },
        {
          id: 'ai-optimizer-4',
          type: 'llm',
          position: { x: 700, y: 200 },
          data: {
            label: 'AI Task Optimizer',
            model: 'gpt-4',
            prompt: 'Analyze task priorities and suggest optimal scheduling considering dependencies'
          }
        },
        {
          id: 'schedule-output-4',
          type: 'end',
          position: { x: 900, y: 200 },
          data: { label: 'Prioritized Task Schedule' }
        }
      ],
      edges: [
        { id: 'e4-1', source: 'start-4', target: 'task-input-4' },
        { id: 'e4-2', source: 'task-input-4', target: 'priority-calculator-4' },
        { id: 'e4-3', source: 'priority-calculator-4', target: 'ai-optimizer-4' },
        { id: 'e4-4', source: 'ai-optimizer-4', target: 'schedule-output-4' }
      ]
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden min-w-0">
      {/* Messages - 严格控制高度 */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 min-w-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} min-w-0`}
          >
            <div className={`flex ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%] min-w-0`}>
              <div className={`p-2 rounded-full flex-shrink-0 ${message.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-blue-600" />
                ) : (
                  <Bot className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <div
                className={`p-3 rounded-lg overflow-hidden ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
                style={{ minWidth: 0 }}
              >
                <p className="text-sm break-words whitespace-pre-wrap" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isGenerating && (
          <div className="flex justify-start min-w-0">
            <div className="flex max-w-[80%] items-start gap-2 min-w-0">
              <div className="p-2 rounded-full bg-gray-100 flex-shrink-0">
                <Bot className="w-4 h-4 text-gray-600" />
              </div>
              <div className="bg-gray-100 text-gray-900 p-3 rounded-lg overflow-hidden" style={{ minWidth: 0 }}>
                <div className="flex items-center gap-2">
                  <div className="animate-spin flex-shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-sm whitespace-nowrap">Generating workflow...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 用于自动滚动的锚点 */}
        <div ref={messagesEndRef} />
      </div>

      {/* 底部固定区域 - Quick Prompts + Input */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 min-w-0">
        {/* Quick Prompts */}
        <div className="p-3 border-b border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Quick prompts:</p>
          <div className="space-y-1">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(prompt)}
                className="w-full text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border text-gray-700 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-3 min-w-0">
          <div className="flex gap-2 min-w-0">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe the workflow you want to create..."
              className="flex-1 min-w-0 p-2 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isGenerating}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatPanel;