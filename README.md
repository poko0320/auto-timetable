# AutoFlow - Professional AI Workflow Builder

A production-grade visual workflow automation platform with AI capabilities, designed for building complex data processing pipelines. Built with React, TypeScript, and ReactFlow.

## ✨ Features

- 🎨 **Visual Workflow Designer** - Drag-and-drop interface with 20+ specialized node types
- 🤖 **AI Integration** - LLM nodes, agents, and knowledge retrieval
- 🔄 **Flow Control** - Conditional logic, loops, and iterations  
- 🛠️ **Data Processing** - String manipulation, math calculations, HTTP requests
- 💾 **State Management** - Zustand-based reactive state
- 🎯 **Type Safety** - Full TypeScript coverage
- 🎪 **Modern UI** - Tailwind CSS with animations and responsive design

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start

# Build for production
pnpm build

# Run tests  
pnpm test --passWithNoTests --watchAll=false
```

## 🏗️ Architecture Overview

### Node Categories

#### 🟢 Input/Output Layer
- **Start Node** - Workflow entry point
- **End Node** - Workflow completion  
- **HTTP Request** - API calls and webhooks
- **File Upload** - File processing
- **Database** - Data persistence

#### 🟣 AI & LLM Layer  
- **LLM Node** - Language model processing
- **Agent** - Autonomous AI agents with tools
- **Knowledge Retrieval** - RAG and search
- **Question Classification** - Intent routing

#### 🟠 Logic Layer
- **IF/ELSE** - Conditional branching
- **Loop** - Iterative processing  
- **Iteration** - Collection processing

#### 🔵 Transform Layer
- **Code** - Custom JavaScript execution
- **Template** - Text templating with variables
- **String Processor** - Text manipulation
- **Math Calculator** - Mathematical operations
- **Variable Operations** - Data assignment and aggregation

#### 🟡 Utilities Layer
- **Delay** - Time-based delays
- **Webhook** - HTTP endpoint handling
│   │   ├── utilities/        # Utility nodes
│   │   │   ├── DelayNode.tsx
│   │   │   └── WebhookNode.tsx
│   │   ├── index.ts          # Node exports
│   │   └── nodeTypes.ts      # ReactFlow node type mapping
│   ├── TopBar.tsx            # Top navigation
│   ├── Sidebar.tsx           # Enhanced node library
│   ├── WorkflowCanvas.tsx    # Main editor with optimized drag & drop
│   ├── NodePropertiesPanel.tsx # Node configuration
│   ├── AIChatPanel.tsx       # AI assistant
│   ├── LogPanel.tsx          # Execution logs
│   └── DragPreview.tsx       # Drag feedback component
├── engine/                   # Execution engine
│   └── WorkflowEngine.ts     # Core execution logic
├── processors/               # Node processors
│   ├── BaseProcessor.ts      # Abstract processor
│   ├── LLMProcessor.ts       # LLM processing
│   ├── IfElseProcessor.ts    # Conditional logic
│   ├── HttpRequestProcessor.ts # HTTP requests
│   ├── CodeProcessor.ts      # Code execution
│   ├── DefaultProcessor.ts   # Default handler
│   └── index.ts              # Processor registry
├── store/                    # State management
│   └── workflowStore.ts      # Zustand store
├── types/                    # TypeScript definitions
│   └── index.ts              # Complete type system
├── utils/                    # Utilities
└── hooks/                    # Custom React hooks
```

### Key Architectural Improvements

#### 1. **Modular Node System**
- **Separated by Category**: Each node type has its own component file
- **Consistent Interface**: All nodes extend the `BaseNode` component
- **Type Safety**: Full TypeScript support with proper interfaces
- **Customizable Styling**: Category-specific color schemes and icons

#### 2. **Enhanced Processing Engine**
- **Topological Sorting**: Ensures correct execution order
- **Async Processing**: Supports concurrent node execution
- **Error Handling**: Comprehensive error tracking and recovery
- **Status Management**: Real-time execution status updates

#### 3. **Professional UI/UX**
- **Improved Drag & Drop**: Precise positioning with visual feedback
- **Node Categories**: Organized by function (I/O, AI/LLM, Logic, etc.)
- **Visual Consistency**: Professional styling with hover states
- **Multiple Handles**: Support for complex node connections

#### 4. **Scalable Architecture**
- **Plugin System**: Easy to add new node types
- **Registry Pattern**: Centralized node and processor management
- **Separation of Concerns**: Clear separation between UI and logic
- **Type System**: Comprehensive TypeScript definitions

## Tech Stack

- **React 19** + **TypeScript** - Modern frontend framework
- **ReactFlow** - Professional flow builder library  
- **TailwindCSS** - Utility-first styling
- **Zustand** - Lightweight state management
- **Lucide React** - Consistent iconography

## Node Categories

### 🔄 Input/Output Nodes
- **Start Node**: Workflow entry point
- **End Node**: Workflow completion
- **HTTP Request**: RESTful API calls
- **File Upload**: File processing
- **Database**: Data operations

### 🤖 AI & LLM Nodes  
- **LLM Node**: Large language model processing
- **Agent Node**: Autonomous AI agents
- **Knowledge Retrieval**: Vector database queries
- **Question Classification**: Intent classification

### 🔀 Logic Nodes
- **If/Else**: Conditional branching
- **Loop**: Iteration control
- **Iteration**: Batch processing

### 🔄 Transform Nodes
- **Code Node**: Custom script execution
- **Template**: Template rendering
- **Variable Assign**: Data assignment
- **Variable Aggregator**: Data aggregation

### 🛠️ Utility Nodes
- **Delay**: Time-based delays
- **Webhook**: HTTP webhook handling

## Features

- ✅ **Professional Node Library**: 20+ specialized node types
- ✅ **Drag & Drop Builder**: Intuitive visual editor
- ✅ **Real-time Execution**: Live workflow processing
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Modular Architecture**: Extensible plugin system
- ✅ **AI Integration**: Built-in LLM and agent support
- ✅ **Error Handling**: Comprehensive error tracking
- ✅ **Visual Feedback**: Real-time status indicators

## Development

### Adding New Nodes

1. Create node component in appropriate category folder
2. Extend `BaseNode` with custom functionality
3. Add processor logic in `processors/` directory
4. Register in `NODE_REGISTRY`
5. Export in `nodes/index.ts`

### Running Locally

```bash
# Development server (with custom port)
PORT=3001 pnpm start

# Watch mode for development
pnpm start --watchAll
```

## Deployment

The application builds to static files and can be deployed to any static hosting service:

```bash
pnpm build
# Deploy contents of build/ folder
```

## License

MIT - Built for educational and demonstration purposes.

- Drag & drop workflow builder
- 12 predefined node types
- Real-time execution status
- AI chat assistant
- Node configuration panels

Created for AUTOMATE hackathon.