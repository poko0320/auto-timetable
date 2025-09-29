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
  if (lowerMessage.includes('csv') || lowerMessage.includes('excel') || lowerMessage.includes('数据分析')) {
    return {
      message: "我可以帮您创建一个数据分析工作流！基于您的需求，我建议以下步骤：\n\n1. 首先添加文件输入节点来读取CSV/Excel文件\n2. 然后添加过滤节点来清洗数据\n3. 最后添加JavaScript节点进行自定义分析\n\n您想要处理什么类型的数据呢？",
      suggestions: [
        {
          type: 'create_node',
          data: {
            type: 'file',
            position: { x: 100, y: 100 },
            config: { acceptedTypes: ['.csv', '.xlsx'] }
          },
          description: '创建文件输入节点'
        },
        {
          type: 'create_node',
          data: {
            type: 'filter',
            position: { x: 300, y: 100 },
            config: { filterType: 'contains' }
          },
          description: '添加数据过滤器'
        }
      ]
    };
  }

  if (lowerMessage.includes('javascript') || lowerMessage.includes('代码') || lowerMessage.includes('js')) {
    return {
      message: "我来帮您编写JavaScript代码！请告诉我您想要实现什么功能。\n\n例如：\n- 数据转换和处理\n- 统计计算\n- 格式化输出\n- API调用\n\n这是一个简单的数据处理示例：",
      code: `function processData(input) {
  // 数据验证
  if (!input || !Array.isArray(input.data)) {
    throw new Error('输入数据格式错误');
  }
  
  // 数据处理
  const processed = input.data
    .filter(row => row.value > 0) // 过滤正值
    .map(row => ({
      ...row,
      processed: true,
      timestamp: new Date().toISOString()
    }));
  
  // 返回结果
  return {
    data: processed,
    count: processed.length,
    summary: '数据处理完成'
  };
}`,
      suggestions: [
        {
          type: 'create_node',
          data: {
            type: 'javascript',
            position: { x: 200, y: 150 }
          },
          description: '创建JavaScript执行节点'
        }
      ]
    };
  }

  if (lowerMessage.includes('连接') || lowerMessage.includes('connect') || lowerMessage.includes('workflow')) {
    return {
      message: "工作流连接很简单！您可以：\n\n1. 从源节点的输出端点（底部蓝色圆点）拖拽到目标节点的输入端点（顶部蓝色圆点）\n2. 确保数据流向合理，避免循环依赖\n3. 每个节点完成后，数据会自动传递给下一个节点\n\n需要我帮您设计特定的工作流结构吗？",
      suggestions: [
        {
          type: 'workflow_template',
          data: {
            name: '基础数据处理流',
            nodes: ['file', 'filter', 'sort', 'javascript']
          },
          description: '创建标准数据处理工作流'
        }
      ]
    };
  }

  if (lowerMessage.includes('帮助') || lowerMessage.includes('help') || lowerMessage.includes('怎么')) {
    return {
      message: "欢迎使用AutoFlow！我是您的AI助手，可以帮您：\n\n🔧 **创建工作流**\n- 拖拽左侧组件到画布\n- 连接节点创建数据流\n\n⚙️ **配置节点**\n- 点击节点打开属性面板\n- 设置节点参数和选项\n\n▶️ **执行工作流**\n- 点击顶部运行按钮\n- 查看执行日志和结果\n\n💬 **AI助手**\n- 描述您的需求，我来推荐方案\n- 生成代码和配置\n\n您想从哪里开始呢？",
      suggestions: [
        {
          type: 'workflow_template',
          data: {
            name: '新手入门模板'
          },
          description: '查看入门教程'
        }
      ]
    };
  }

  if (lowerMessage.includes('api') || lowerMessage.includes('接口') || lowerMessage.includes('http')) {
    return {
      message: "API集成功能正在开发中！目前您可以使用JavaScript节点来调用API：\n\n```javascript\nasync function callAPI(input) {\n  const response = await fetch('https://api.example.com/data', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(input)\n  });\n  \n  return await response.json();\n}\n```\n\n未来版本将支持专门的HTTP请求节点！",
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
    "这是个很有趣的问题！我正在思考最佳的解决方案...",
    "根据您的描述，我建议您先尝试创建一个简单的工作流来测试。",
    "您可以详细描述一下您想要实现的功能吗？这样我能给出更精确的建议。",
    "让我们一步步来解决这个问题。首先，您需要处理什么类型的数据？",
    "好的想法！在AutoFlow中实现这个功能有几种方式，让我为您推荐最适合的方案。"
  ];

  return {
    message: responses[Math.floor(Math.random() * responses.length)] + 
             "\n\n您可以尝试以下关键词来获得更具体的帮助：\n- \"数据分析\" - 创建数据处理工作流\n- \"JavaScript\" - 获取代码示例\n- \"帮助\" - 查看功能介绍\n- \"连接\" - 学习如何连接节点"
  };
};