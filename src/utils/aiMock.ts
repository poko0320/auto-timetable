export interface AIResponse {
  message: string;
  suggestions?: WorkflowSuggestion[];
  code?: string;
}

export interface WorkflowSuggestion {
  type: 'create_node' | 'connect_nodes' | 'configure_node' | 'workflow_template';
  data: any;
  description: string;
}

export const mockAIChat = async (message: string): Promise<AIResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  const lowerMessage = message.toLowerCase();

  // Simple pattern matching for different types of requests
  if (lowerMessage.includes('csv') || lowerMessage.includes('excel') || lowerMessage.includes('data analysis')) {
    return {
      message: "I can help you create a data analysis workflow! Based on your needs, I suggest the following steps:\n\n1. First, add a file input node to read CSV/Excel files\n2. Then add a filter node to clean the data\n3. Finally, add a JavaScript node for custom analysis\n\nWhat type of data would you like to process?",
      suggestions: [
        {
          type: 'create_node',
          data: {
            type: 'file',
            position: { x: 100, y: 100 },
            config: { acceptedTypes: ['.csv', '.xlsx'] }
          },
          description: 'Create file input node'
        },
        {
          type: 'create_node',
          data: {
            type: 'filter',
            position: { x: 300, y: 100 },
            config: { filterType: 'contains' }
          },
          description: 'Add data filter'
        }
      ]
    };
  }

  if (lowerMessage.includes('javascript') || lowerMessage.includes('code') || lowerMessage.includes('js')) {
    return {
      message: "I'll help you write JavaScript code! Please tell me what functionality you want to implement.\n\nFor example:\n- Data transformation and processing\n- Statistical calculations\n- Format output\n- API calls\n\nHere's a simple data processing example:",
      code: `function processData(input) {
  // Data validation
  if (!input || !Array.isArray(input.data)) {
    throw new Error('Invalid input data format');
  }
  
  // Data processing
  const processed = input.data
    .filter(row => row.value > 0) // Filter positive values
    .map(row => ({
      ...row,
      processed: true,
      timestamp: new Date().toISOString()
    }));
  
  // Return result
  return {
    data: processed,
    count: processed.length,
    summary: 'Data processing completed'
  };
}`,
      suggestions: [
        {
          type: 'create_node',
          data: {
            type: 'javascript',
            position: { x: 200, y: 150 }
          },
          description: 'Create JavaScript execution node'
        }
      ]
    };
  }

  if (lowerMessage.includes('connect') || lowerMessage.includes('workflow') || lowerMessage.includes('link')) {
    return {
      message: "Workflow connections are simple! You can:\n\n1. Drag from the source node's output handle (bottom blue dot) to the target node's input handle (top blue dot)\n2. Ensure logical data flow and avoid circular dependencies\n3. After each node completes, data automatically passes to the next node\n\nWould you like me to help design a specific workflow structure?",
      suggestions: [
        {
          type: 'workflow_template',
          data: {
            name: 'Basic Data Processing Flow',
            nodes: ['file', 'filter', 'sort', 'javascript']
          },
          description: 'Create standard data processing workflow'
        }
      ]
    };
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('what')) {
    return {
      message: "Welcome to AutoFlow! I'm your AI assistant and can help you with:\n\n🔧 **Creating Workflows**\n- Drag components from the sidebar to the canvas\n- Connect nodes to create data flows\n\n⚙️ **Configuring Nodes**\n- Click on nodes to open the properties panel\n- Set node parameters and options\n\n▶️ **Running Workflows**\n- Click the run button in the top bar\n- View execution logs and results\n\n💬 **AI Assistant**\n- Describe your needs and I'll recommend solutions\n- Generate code and configurations\n\nWhere would you like to start?",
      suggestions: [
        {
          type: 'workflow_template',
          data: {
            name: 'Getting Started Template'
          },
          description: 'View tutorial guide'
        }
      ]
    };
  }

  if (lowerMessage.includes('api') || lowerMessage.includes('http')) {
    return {
      message: "API integration is under development! Currently you can use JavaScript nodes to call APIs:\n\n```javascript\nasync function callAPI(input) {\n  const response = await fetch('https://api.example.com/data', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(input)\n  });\n  \n  return await response.json();\n}\n```\n\nFuture versions will support dedicated HTTP request nodes!",
      code: `async function apiCall(input) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: input.title,
        body: input.body,
        userId: 1,
      }),
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}`
    };
  }

  // Default response
  const responses = [
    "That's an interesting question! I'm thinking about the best solution...",
    "Based on your description, I suggest you try creating a simple workflow to test first.",
    "Could you describe in detail what functionality you want to implement? This way I can give more precise advice.",
    "Let's solve this step by step. First, what type of data do you need to process?",
    "Great idea! There are several ways to implement this feature in AutoFlow. Let me recommend the most suitable approach for you."
  ];

  return {
    message: responses[Math.floor(Math.random() * responses.length)] + 
             "\n\nYou can try the following keywords for more specific help:\n- \"data analysis\" - Create data processing workflows\n- \"javascript\" - Get code examples\n- \"help\" - View feature introduction\n- \"connect\" - Learn how to connect nodes"
  };
};