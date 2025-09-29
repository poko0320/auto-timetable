import React, { useState, useEffect } from 'react';
import { X, Settings, FileText, Filter, Code, Database } from 'lucide-react';
import { Node } from 'reactflow';
import { useWorkflowStore } from '../store/workflowStore';

interface NodePropertiesPanelProps {
  node: Node | null;
  onClose: () => void;
}

interface NodeProperty {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'checkbox' | 'file';
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

const getNodeProperties = (nodeType: string): NodeProperty[] => {
  const propertyMap: Record<string, NodeProperty[]> = {
    file: [
      {
        key: 'acceptedTypes',
        label: 'Accepted File Types',
        type: 'select',
        options: ['.csv', '.json', '.txt', '.xlsx', '.pdf'],
        required: true
      },
      {
        key: 'maxSize',
        label: 'Max File Size (MB)',
        type: 'number',
        placeholder: '10'
      },
      {
        key: 'encoding',
        label: 'File Encoding',
        type: 'select',
        options: ['utf-8', 'gbk', 'ascii'],
      }
    ],
    text: [
      {
        key: 'defaultText',
        label: 'Default Text',
        type: 'textarea',
        placeholder: 'Enter default text content...'
      },
      {
        key: 'maxLength',
        label: 'Max Length',
        type: 'number',
        placeholder: '1000'
      }
    ],
    filter: [
      {
        key: 'filterType',
        label: 'Filter Type',
        type: 'select',
        options: ['equal', 'contains', 'greater', 'less', 'regex'],
        required: true
      },
      {
        key: 'field',
        label: 'Field to Filter',
        type: 'text',
        placeholder: 'column_name',
        required: true
      },
      {
        key: 'value',
        label: 'Filter Value',
        type: 'text',
        placeholder: 'filter_value',
        required: true
      },
      {
        key: 'caseSensitive',
        label: 'Case Sensitive',
        type: 'checkbox'
      }
    ],
    javascript: [
      {
        key: 'code',
        label: 'JavaScript Code',
        type: 'textarea',
        placeholder: 'function process(input) {\n  // Your code here\n  return input;\n}',
        required: true
      },
      {
        key: 'timeout',
        label: 'Timeout (ms)',
        type: 'number',
        placeholder: '5000'
      }
    ],
    sort: [
      {
        key: 'field',
        label: 'Sort Field',
        type: 'text',
        placeholder: 'column_name',
        required: true
      },
      {
        key: 'order',
        label: 'Sort Order',
        type: 'select',
        options: ['asc', 'desc'],
        required: true
      }
    ],
    merge: [
      {
        key: 'mergeType',
        label: 'Merge Type',
        type: 'select',
        options: ['inner', 'left', 'right', 'outer'],
        required: true
      },
      {
        key: 'joinField',
        label: 'Join Field',
        type: 'text',
        placeholder: 'id',
        required: true
      }
    ]
  };

  return propertyMap[nodeType] || [
    {
      key: 'label',
      label: 'Node Label',
      type: 'text',
      placeholder: 'Enter node label'
    }
  ];
};

const NodePropertiesPanel: React.FC<NodePropertiesPanelProps> = ({ node, onClose }) => {
  const { updateNodeConfig, updateNodeLabel } = useWorkflowStore();
  const [config, setConfig] = useState<Record<string, any>>({});

  useEffect(() => {
    if (node?.data?.config) {
      setConfig(node.data.config);
    } else {
      setConfig({});
    }
  }, [node]);

  if (!node) return null;

  const properties = getNodeProperties(node.data.type);

  const handlePropertyChange = (key: string, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    
    // Update the node config in the store
    updateNodeConfig(node.id, newConfig);
  };

  const getIcon = (nodeType: string) => {
    const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
      file: FileText,
      filter: Filter,
      javascript: Code,
      default: Settings
    };
    return iconMap[nodeType] || iconMap.default;
  };

  const Icon = getIcon(node.data.type);

  const renderPropertyInput = (property: NodeProperty) => {
    const value = config[property.key] || '';

    switch (property.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handlePropertyChange(property.key, e.target.value)}
            placeholder={property.placeholder}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handlePropertyChange(property.key, parseInt(e.target.value) || '')}
            placeholder={property.placeholder}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handlePropertyChange(property.key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">Select {property.label}</option>
            {property.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handlePropertyChange(property.key, e.target.value)}
            placeholder={property.placeholder}
            rows={4}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
          />
        );

      case 'checkbox':
        return (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handlePropertyChange(property.key, e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Enable {property.label}</span>
          </label>
        );

      default:
        return null;
    }
  };

  return (
    <div className="absolute top-0 right-0 w-80 h-full bg-white border-l border-gray-200 shadow-lg z-10 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Icon size={16} className="text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Node Properties</h3>
            <p className="text-sm text-gray-500">{node.data.label}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Properties Form */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Basic Info */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 text-sm">Basic Information</h4>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Node Label
            </label>
            <input
              type="text"
              value={node.data.label}
              onChange={(e) => updateNodeLabel(node.id, e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Node Type
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
              {node.data.type}
            </div>
          </div>
        </div>

        {/* Type-specific Properties */}
        {properties.length > 1 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 text-sm">Configuration</h4>
            
            {properties.map((property) => (
              <div key={property.key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {property.label}
                  {property.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderPropertyInput(property)}
              </div>
            ))}
          </div>
        )}

        {/* Status */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 text-sm">Status</h4>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Execution Status
            </label>
            <div className={`px-3 py-2 border border-gray-200 rounded-lg text-sm ${
              node.data.status === 'success' ? 'bg-green-50 text-green-700' :
              node.data.status === 'error' ? 'bg-red-50 text-red-700' :
              node.data.status === 'running' ? 'bg-blue-50 text-blue-700' :
              'bg-gray-50 text-gray-600'
            }`}>
              {node.data.status || 'idle'}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
};

export default NodePropertiesPanel;