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
  Table
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

const getColor = (type: string) => {
  const colorMap: Record<string, string> = {
    file: 'bg-blue-500',
    text: 'bg-green-500',
    sheets: 'bg-yellow-500',
    data: 'bg-purple-500',
    filter: 'bg-red-500',
    merge: 'bg-cyan-500',
    group: 'bg-lime-500',
    sort: 'bg-orange-500',
    javascript: 'bg-indigo-500',
    geocode: 'bg-pink-500',
    colorize: 'bg-teal-500',
    custom: 'bg-gray-500',
  };
  return colorMap[type] || 'bg-gray-500';
};

const CustomNode: React.FC<CustomNodeProps> = ({ data, selected }) => {
  const Icon = getIcon(data.type);
  const colorClass = getColor(data.type);

  return (
    <div className={`
      bg-white rounded-xl border-2 transition-all duration-200 cursor-pointer shadow-lg
      min-w-[80px] max-w-[100px] p-3 relative
      ${selected ? 'ring-2 ring-blue-400 ring-offset-2' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'}
      ${data.status === 'running' ? 'border-blue-400 shadow-lg shadow-blue-100' : ''}
      ${data.status === 'success' ? 'border-green-400 shadow-lg shadow-green-100' : ''}
      ${data.status === 'error' ? 'border-red-400 shadow-lg shadow-red-100' : ''}
    `}>
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-blue-500 !border-2 !border-white"
        style={{ 
          background: '#3b82f6',
          border: '2px solid white',
          top: -6
        }}
      />
      
      {/* Node Content */}
      <div className="flex flex-col items-center text-center space-y-2">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center shadow-sm`}>
          <Icon size={18} className="text-white" />
        </div>
        
        {/* Label */}
        <div className="text-xs font-medium text-gray-700 leading-tight">
          {data.label}
        </div>
        
        {/* Status Indicator */}
        {data.status && data.status !== 'idle' && (
          <div className="flex items-center space-x-1">
            {data.status === 'running' && (
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            )}
            {data.status === 'success' && (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )}
            {data.status === 'error' && (
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            )}
          </div>
        )}
      </div>
      
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-blue-500 !border-2 !border-white"
        style={{ 
          background: '#3b82f6',
          border: '2px solid white',
          bottom: -6
        }}
      />
    </div>
  );
};

export default React.memo(CustomNode);