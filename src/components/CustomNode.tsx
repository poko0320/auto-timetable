import React from 'react';
import { Handle, Position } from 'reactflow';
import { 
  Database, 
  FileText, 
  Filter, 
  Code,
  Palette,
  MapPin,
  Users,
  ArrowUpDown,
  Merge,
  Table,
  Play,
  Check,
  X,
  Loader
} from 'lucide-react';

interface CustomNodeProps {
  data: {
    label: string;
    type: string;
    status?: 'idle' | 'running' | 'success' | 'error';
  };
  selected?: boolean;
}

const getIcon = (type: string) => {
  const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    file: FileText,
    text: FileText,
    sheets: Table,
    data: Database,
    filter: Filter,
    merge: Merge,
    group: Users,
    sort: ArrowUpDown,
    javascript: Code,
    geocode: MapPin,
    colorize: Palette,
    custom: Database,
  };
  return iconMap[type] || Database;
};

const getStatusIcon = (status?: string) => {
  switch (status) {
    case 'running':
      return <Loader size={12} className="animate-spin text-blue-600" />;
    case 'success':
      return <Check size={12} className="text-green-600" />;
    case 'error':
      return <X size={12} className="text-red-600" />;
    default:
      return <Play size={12} className="text-gray-400" />;
  }
};

const getNodeColor = (type: string) => {
  const colorMap: Record<string, { bg: string; border: string; icon: string }> = {
    file: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600' },
    text: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600' },
    sheets: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600' },
    data: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600' },
    filter: { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600' },
    merge: { bg: 'bg-cyan-50', border: 'border-cyan-200', icon: 'text-cyan-600' },
    group: { bg: 'bg-lime-50', border: 'border-lime-200', icon: 'text-lime-600' },
    sort: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600' },
    javascript: { bg: 'bg-indigo-50', border: 'border-indigo-200', icon: 'text-indigo-600' },
    geocode: { bg: 'bg-pink-50', border: 'border-pink-200', icon: 'text-pink-600' },
    colorize: { bg: 'bg-teal-50', border: 'border-teal-200', icon: 'text-teal-600' },
    custom: { bg: 'bg-gray-50', border: 'border-gray-200', icon: 'text-gray-600' },
  };
  return colorMap[type] || colorMap.custom;
};

const CustomNode: React.FC<CustomNodeProps> = ({ data, selected }) => {
  const Icon = getIcon(data.type);
  const colors = getNodeColor(data.type);

  return (
    <div className={`
      relative rounded-lg border-2 transition-all duration-200 cursor-pointer
      min-w-[140px] max-w-[180px] p-0 overflow-hidden
      ${selected ? 'ring-2 ring-blue-400 ring-offset-2 shadow-lg' : 'shadow-sm hover:shadow-md'}
      ${data.status === 'running' ? 'ring-2 ring-blue-400 shadow-lg' : ''}
      ${data.status === 'success' ? 'ring-2 ring-green-400 shadow-lg' : ''}
      ${data.status === 'error' ? 'ring-2 ring-red-400 shadow-lg' : ''}
      ${colors.bg} ${colors.border}
    `}>
      {/* Dotted background pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" className="w-full h-full">
          <defs>
            <pattern id={`dots-${data.type}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="currentColor" className={colors.icon} opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dots-${data.type})`}/>
        </svg>
      </div>

      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-gray-400 !border-2 !border-white shadow-sm"
        style={{ 
          background: '#9ca3af',
          border: '2px solid white',
          left: -6
        }}
      />
      
      {/* Node Header */}
      <div className="relative px-3 py-2 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`p-1.5 rounded ${colors.icon}`}>
              <Icon size={16} />
            </div>
            <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
              {data.type}
            </span>
          </div>
          <div className="flex items-center">
            {getStatusIcon(data.status)}
          </div>
        </div>
      </div>

      {/* Node Content */}
      <div className="relative px-3 py-3">
        <div className="text-sm font-medium text-gray-800 leading-tight">
          {data.label}
        </div>
        
        {/* Connection indicators */}
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <span>Input</span>
          </span>
          <span className="flex items-center space-x-1">
            <span>Output</span>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          </span>
        </div>
      </div>
      
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-gray-400 !border-2 !border-white shadow-sm"
        style={{ 
          background: '#9ca3af',
          border: '2px solid white',
          right: -6
        }}
      />

      {/* Running indicator */}
      {data.status === 'running' && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-sm"></div>
      )}
    </div>
  );
};

export default React.memo(CustomNode);