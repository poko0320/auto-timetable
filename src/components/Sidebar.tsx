import React from 'react';
import { 
  FileText, 
  Database, 
  Filter,
  Code,
  Palette,
  MapPin,
  Users,
  ArrowUpDown,
  Merge,
  Table,
  Search
} from 'lucide-react';

const nodeTemplates = [
  { 
    type: 'file', 
    label: 'File', 
    icon: FileText, 
    color: 'bg-blue-500',
    description: 'Process uploaded files'
  },
  { 
    type: 'text', 
    label: 'Text content', 
    icon: FileText, 
    color: 'bg-green-500',
    description: 'Handle text input and processing'
  },
  { 
    type: 'sheets', 
    label: 'Sheets', 
    icon: Table, 
    color: 'bg-yellow-500',
    description: 'Work with spreadsheet data'
  },
  { 
    type: 'data', 
    label: 'Example data', 
    icon: Database, 
    color: 'bg-purple-500',
    description: 'Use sample data for testing'
  },
  { 
    type: 'filter', 
    label: 'Filter', 
    icon: Filter, 
    color: 'bg-red-500',
    description: 'Filter and transform data'
  },
  { 
    type: 'merge', 
    label: 'Merge', 
    icon: Merge, 
    color: 'bg-cyan-500',
    description: 'Combine multiple data sources'
  },
  { 
    type: 'group', 
    label: 'Group', 
    icon: Users, 
    color: 'bg-lime-500',
    description: 'Group and aggregate data'
  },
  { 
    type: 'sort', 
    label: 'Sort', 
    icon: ArrowUpDown, 
    color: 'bg-orange-500',
    description: 'Sort data by criteria'
  },
  { 
    type: 'javascript', 
    label: 'Javascript', 
    icon: Code, 
    color: 'bg-indigo-500',
    description: 'Execute custom JavaScript code'
  },
  { 
    type: 'geocode', 
    label: 'Geocode', 
    icon: MapPin, 
    color: 'bg-pink-500',
    description: 'Convert addresses to coordinates'
  },
  { 
    type: 'colorize', 
    label: 'Colorize', 
    icon: Palette, 
    color: 'bg-teal-500',
    description: 'Apply color transformations'
  },
  { 
    type: 'custom', 
    label: 'Custom data', 
    icon: Database, 
    color: 'bg-gray-500',
    description: 'Custom data processing'
  }
];

const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    console.log('Drag started:', nodeType);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Items search"
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Inputs Section */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">Inputs</h3>
          <div className="space-y-2">
            {nodeTemplates.slice(0, 4).map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.type}
                  draggable
                  onDragStart={(e) => onDragStart(e, template.type)}
                  className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-move transition-colors group"
                >
                  <div className={`p-1.5 rounded ${template.color} text-white`}>
                    <Icon size={14} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {template.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transform Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">Transform</h3>
          <div className="space-y-2">
            {nodeTemplates.slice(4, 9).map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.type}
                  draggable
                  onDragStart={(e) => onDragStart(e, template.type)}
                  className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-move transition-colors group"
                >
                  <div className={`p-1.5 rounded ${template.color} text-white`}>
                    <Icon size={14} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {template.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Database Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">Database</h3>
          <div className="space-y-2">
            {nodeTemplates.slice(9).map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.type}
                  draggable
                  onDragStart={(e) => onDragStart(e, template.type)}
                  className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-move transition-colors group"
                >
                  <div className={`p-1.5 rounded ${template.color} text-white`}>
                    <Icon size={14} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {template.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;