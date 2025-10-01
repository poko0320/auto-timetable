import React from 'react';
import { Handle, Position } from 'reactflow';
import { LucideIcon } from 'lucide-react';

export interface BaseNodeProps {
  data: {
    label: string;
    type: string;
    status?: 'idle' | 'running' | 'success' | 'error';
    config?: Record<string, any>;
  };
  selected?: boolean;
}

export interface NodeStyle {
  bg: string;
  border: string;
  icon: string;
  accent: string;
}

export interface BaseNodeConfig {
  icon: LucideIcon;
  style: NodeStyle;
  hasInput?: boolean;
  hasOutput?: boolean;
  multipleInputs?: boolean;
  multipleOutputs?: boolean;
}

const getStatusIcon = (status?: string) => {
  switch (status) {
    case 'running':
      return (
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
      );
    case 'success':
      return (
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      );
    case 'error':
      return (
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
      );
    default:
      return (
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
      );
  }
};

export const BaseNode: React.FC<BaseNodeProps & BaseNodeConfig & { children?: React.ReactNode }> = ({
  data,
  selected,
  icon: Icon,
  style,
  hasInput = true,
  hasOutput = true,
  multipleInputs = false,
  multipleOutputs = false,
  children
}) => {
  return (
    <div className={`
      relative rounded-lg border-2 transition-all duration-200 cursor-pointer
      min-w-[160px] max-w-[200px] p-0 overflow-hidden
      ${selected ? 'ring-2 ring-blue-400 ring-offset-2 shadow-lg' : 'shadow-sm hover:shadow-md'}
      ${data.status === 'running' ? 'ring-2 ring-blue-400 shadow-lg' : ''}
      ${data.status === 'success' ? 'ring-2 ring-green-400 shadow-lg' : ''}
      ${data.status === 'error' ? 'ring-2 ring-red-400 shadow-lg' : ''}
      ${style.bg} ${style.border}
    `}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className={`w-full h-full ${style.accent} opacity-10`} 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
               backgroundSize: '8px 8px'
             }}
        />
      </div>

      {/* Input Handles */}
      {hasInput && (
        <>
          {multipleInputs ? (
            <>
              <Handle
                type="target"
                position={Position.Left}
                id="input-1"
                className="w-3 h-3 !bg-gray-400 !border-2 !border-white shadow-sm"
                style={{ 
                  background: '#9ca3af',
                  border: '2px solid white',
                  left: -6,
                  top: '30%'
                }}
              />
              <Handle
                type="target"
                position={Position.Left}
                id="input-2"
                className="w-3 h-3 !bg-gray-400 !border-2 !border-white shadow-sm"
                style={{ 
                  background: '#9ca3af',
                  border: '2px solid white',
                  left: -6,
                  top: '70%'
                }}
              />
            </>
          ) : (
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
          )}
        </>
      )}
      
      {/* Node Header */}
      <div className="relative px-3 py-2 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`p-1.5 rounded-md ${style.icon} ${style.bg}`}>
              <Icon size={14} />
            </div>
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
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
        <div className="text-sm font-medium text-gray-900 leading-tight mb-2">
          {data.label}
        </div>
        
        {/* Custom content */}
        {children}
      </div>
      
      {/* Output Handles */}
      {hasOutput && (
        <>
          {multipleOutputs ? (
            <>
              <Handle
                type="source"
                position={Position.Right}
                id="output-1"
                className="w-3 h-3 !bg-gray-600 !border-2 !border-white shadow-sm"
                style={{ 
                  background: '#4b5563',
                  border: '2px solid white',
                  right: -6,
                  top: '30%'
                }}
              />
              <Handle
                type="source"
                position={Position.Right}
                id="output-2"
                className="w-3 h-3 !bg-gray-600 !border-2 !border-white shadow-sm"
                style={{ 
                  background: '#4b5563',
                  border: '2px solid white',
                  right: -6,
                  top: '70%'
                }}
              />
            </>
          ) : (
            <Handle
              type="source"
              position={Position.Right}
              className="w-3 h-3 !bg-gray-600 !border-2 !border-white shadow-sm"
              style={{ 
                background: '#4b5563',
                border: '2px solid white',
                right: -6
              }}
            />
          )}
        </>
      )}

      {/* Running indicator */}
      {data.status === 'running' && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-sm"></div>
      )}
    </div>
  );
};

export default BaseNode;