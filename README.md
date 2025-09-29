# AutoFlow - AI-Powered Workflow Builder

A low-code visual workflow builder for the AUTOMATE hackathon, featuring drag-and-drop interface and AI assistance.

## Quick Start

### Prerequisites
- Node.js 16+
- pnpm (recommended) or npm

### Installation & Run

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start

# The app will open at http://localhost:3000
# If port 3000 is busy, it will use the next available port
```

### Build for Production

```bash
# Build the app
pnpm build

# Test the production build locally
npx serve -s build
```

### Run Tests

```bash
# Run tests once
pnpm test --passWithNoTests --watchAll=false

# Run tests in watch mode
pnpm test
```

## Project Structure

```
src/
├── components/           # React components
│   ├── TopBar.tsx       # Navigation bar with run/reset buttons
│   ├── Sidebar.tsx      # Component palette (inputs/transforms/database)
│   ├── WorkflowCanvas.tsx  # Main ReactFlow canvas
│   ├── CustomNode.tsx   # Custom node component
│   ├── AIChatPanel.tsx  # AI assistant chat interface
│   ├── NodePropertiesPanel.tsx  # Node configuration panel
│   └── LogPanel.tsx     # Execution logs display
├── store/               # State management
│   └── workflowStore.ts # Zustand store for workflow state
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Utility functions
│   ├── index.ts         # General utilities
│   └── aiMock.ts        # AI chat simulation
├── hooks/               # Custom React hooks
│   └── index.ts
├── App.tsx              # Main app component
└── index.tsx            # App entry point
```

## Features

- **Visual Workflow Editor**: Drag-and-drop interface built with ReactFlow
- **12 Node Types**: File input, data processing, filters, custom JavaScript, etc.
- **AI Assistant**: Intelligent chat helper for workflow creation
- **Real-time Execution**: Visual feedback during workflow runs
- **Node Configuration**: Dynamic property panels for each node type
- **Responsive Design**: Works on desktop and tablet devices

## Tech Stack

- **React 19** with TypeScript
- **ReactFlow** for visual workflow editing
- **TailwindCSS** for styling
- **Zustand** for state management
- **Lucide React** for icons

## Development

```bash
# Start with custom port
PORT=3001 pnpm start

# Type checking
npx tsc --noEmit

# Lint code
# (ESLint configuration can be added as needed)
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is created for the AUTOMATE hackathon.