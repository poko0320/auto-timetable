import React, { useState, useEffect } from 'react';
import { X, Settings, Info, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Node } from 'reactflow';
import { useWorkflowStore } from '../store/workflowStore';
import { getNodeDefinition } from '../processors';
import { ConfigSchema } from '../types';

interface NodePropertiesPanelProps {
  node: Node | null;
  onClose: () => void;
}

interface FieldProps {
  schema: ConfigSchema;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

const FormField: React.FC<FieldProps> = ({ schema, value, onChange, error }) => {
  const { key, label, type, required, options, placeholder, description, validation } = schema;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    let newValue: any = e.target.value;
    
    if (type === 'number') {
      newValue = parseFloat(newValue) || 0;
    } else if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'json') {
      try {
        newValue = JSON.parse(newValue);
      } catch {
        newValue = newValue; // Keep as string if invalid JSON
      }
    }
    
    onChange(newValue);
  };

  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={handleChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={handleChange}
            placeholder={placeholder}
            min={validation?.min}
            max={validation?.max}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
        );
      
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          >
            <option value="">Select...</option>
            {options?.map((option) => (
              <option key={typeof option === 'string' ? option : option.value} 
                      value={typeof option === 'string' ? option : option.value}>
                {typeof option === 'string' ? option : option.label}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={handleChange}
            placeholder={placeholder}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
        );
      
      case 'checkbox':
        return (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!value}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{description || 'Enable this option'}</span>
          </label>
        );
      
      case 'json':
        return (
          <textarea
            value={typeof value === 'object' ? JSON.stringify(value, null, 2) : value || ''}
            onChange={handleChange}
            placeholder={placeholder || '{\n  "key": "value"\n}'}
            rows={6}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
        );
      
      case 'code':
        return (
          <textarea
            value={value || ''}
            onChange={handleChange}
            placeholder={placeholder || '// Enter your code here'}
            rows={8}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
        );
      
      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={handleChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {description && !error && (
        <div className="flex items-start mt-1">
          <Info className="w-4 h-4 text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      )}
      {error && (
        <div className="flex items-start mt-1">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 mr-1 flex-shrink-0" />
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
};

const NodePropertiesPanel: React.FC<NodePropertiesPanelProps> = ({ node, onClose }) => {
  const { updateNodeConfig, updateNodeLabel } = useWorkflowStore();
  const [config, setConfig] = useState<Record<string, any>>({});
  const [label, setLabel] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nodeDefinition = node ? getNodeDefinition(node.data?.type) : null;

  useEffect(() => {
    if (node) {
      setConfig(node.data?.config || nodeDefinition?.defaultConfig || {});
      setLabel(node.data?.label || '');
      setErrors({});
    }
  }, [node, nodeDefinition]);

  const validateField = (key: string, value: any, schema: ConfigSchema): string | undefined => {
    if (schema.required && (!value || value === '')) {
      return `${schema.label} is required`;
    }
    
    if (schema.validation) {
      const { min, max, pattern } = schema.validation;
      
      if (typeof value === 'number') {
        if (min !== undefined && value < min) return `Must be at least ${min}`;
        if (max !== undefined && value > max) return `Must be at most ${max}`;
      }
      
      if (typeof value === 'string' && pattern) {
        const regex = new RegExp(pattern);
        if (!regex.test(value)) return `Invalid format`;
      }
    }
    
    if (schema.type === 'json' && typeof value === 'string' && value.trim()) {
      try {
        JSON.parse(value);
      } catch {
        return 'Invalid JSON format';
      }
    }
    
    return undefined;
  };

  const handleConfigChange = (key: string, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    
    // Validate field
    const schema = nodeDefinition?.schema.config.find(c => c.key === key);
    if (schema) {
      const error = validateField(key, value, schema);
      setErrors(prev => {
        const newErrors = { ...prev };
        if (error) {
          newErrors[key] = error;
        } else {
          delete newErrors[key];
        }
        return newErrors;
      });
    }
  };

  const handleSave = () => {
    if (!node) return;
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    nodeDefinition?.schema.config.forEach(schema => {
      const error = validateField(schema.key, config[schema.key], schema);
      if (error) {
        newErrors[schema.key] = error;
      }
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      updateNodeConfig(node.id, config);
      updateNodeLabel(node.id, label || nodeDefinition?.label || 'Node');
      onClose();
    }
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  if (!node || !nodeDefinition) return null;

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl border-l border-gray-200 z-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: nodeDefinition.color }} />
          <h3 className="text-lg font-semibold text-gray-900">{nodeDefinition.label}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Node Info */}
        <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">Node Type</p>
              <p className="text-xs text-blue-700">{nodeDefinition.description}</p>
            </div>
          </div>
        </div>

        {/* Node Label */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Node Label
          </label>
          <input
            type="text"
            value={label}
            onChange={handleLabelChange}
            placeholder={nodeDefinition.label}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Configuration Fields */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">
            Configuration
          </h4>
          
          {nodeDefinition.schema.config.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No configuration options available</p>
            </div>
          ) : (
            nodeDefinition.schema.config.map((schema) => (
              <FormField
                key={schema.key}
                schema={schema}
                value={config[schema.key]}
                onChange={(value) => handleConfigChange(schema.key, value)}
                error={errors[schema.key]}
              />
            ))
          )}
        </div>

        {/* Schema Info */}
        {nodeDefinition.schema.inputs.length > 0 && (
          <div className="mt-6 p-3 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Expected Inputs</h5>
            <div className="space-y-1">
              {nodeDefinition.schema.inputs.map((input) => (
                <div key={input.name} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">
                    {input.name} {input.required && <span className="text-red-500">*</span>}
                  </span>
                  <span className="text-gray-400 font-mono">{input.type}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {nodeDefinition.schema.outputs.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Outputs</h5>
            <div className="space-y-1">
              {nodeDefinition.schema.outputs.map((output) => (
                <div key={output.name} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{output.name}</span>
                  <span className="text-gray-400 font-mono">{output.type}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={hasErrors}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              hasErrors
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {hasErrors ? (
              <span className="flex items-center justify-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                Fix Errors
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Save
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodePropertiesPanel;