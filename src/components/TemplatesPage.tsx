import React, { useState } from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import { NodeType, NodeCategory } from '../types';
import { 
  Search, 
  Star, 
  Download, 
  Eye, 
  Filter,
  Zap,
  Bot,
  Globe,
  Database,
  Clock,
  Mail
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  icon: React.ReactNode;
  featured: boolean;
  downloads: number;
  rating: number;
  preview: string;
  workflow: {
    nodes: Array<{
      id: string;
      type: string;
      position: { x: number; y: number };
      data?: any;
    }>;
    edges: Array<{
      id: string;
      source: string;
      target: string;
    }>;
  };
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Email Marketing Automation',
    description: 'Automated email sequences with personalization and analytics',
    category: 'AI Helper',
    tags: ['email', 'marketing', 'automation'],
    icon: <Mail className="w-6 h-6" />,
    featured: true,
    downloads: 1250,
    rating: 4.8,
    preview: 'A comprehensive email marketing workflow that segments users and sends personalized content',
    workflow: {
      nodes: [
        { id: 'start-1', type: 'start', position: { x: 100, y: 200 } },
        { id: 'llm-1', type: 'llm', position: { x: 350, y: 150 }, data: { config: { prompt: 'Generate personalized email content for {{user_data}}' } } },
        { id: 'http-1', type: 'httpRequest', position: { x: 350, y: 250 }, data: { config: { url: 'https://api.sendgrid.com/v3/mail/send', method: 'POST' } } },
        { id: 'end-1', type: 'end', position: { x: 600, y: 200 } }
      ],
      edges: [
        { id: 'e1-2', source: 'start-1', target: 'llm-1' },
        { id: 'e1-3', source: 'start-1', target: 'http-1' },
        { id: 'e2-4', source: 'llm-1', target: 'end-1' },
        { id: 'e3-4', source: 'http-1', target: 'end-1' }
      ]
    }
  },
  {
    id: '2',
    name: 'Data Processing Pipeline',
    description: 'Clean, transform and analyze large datasets automatically',
    category: 'Data Processing',
    tags: ['data', 'processing', 'analytics'],
    icon: <Database className="w-6 h-6" />,
    featured: true,
    downloads: 892,
    rating: 4.6,
    preview: 'Powerful data pipeline for ETL operations with error handling',
    workflow: {
      nodes: [
        { id: 'start-2', type: 'start', position: { x: 100, y: 200 } },
        { id: 'file-2', type: 'fileUpload', position: { x: 300, y: 150 } },
        { id: 'code-2', type: 'code', position: { x: 500, y: 200 }, data: { config: { code: 'import pandas as pd\ndf = pd.read_csv(input_file)\ndf_cleaned = df.dropna()\nreturn df_cleaned' } } },
        { id: 'db-2', type: 'database', position: { x: 300, y: 250 } },
        { id: 'end-2', type: 'end', position: { x: 700, y: 200 } }
      ],
      edges: [
        { id: 'e2-1', source: 'start-2', target: 'file-2' },
        { id: 'e2-2', source: 'file-2', target: 'code-2' },
        { id: 'e2-3', source: 'start-2', target: 'db-2' },
        { id: 'e2-4', source: 'code-2', target: 'end-2' },
        { id: 'e2-5', source: 'db-2', target: 'end-2' }
      ]
    }
  },
  {
    id: '3',
    name: 'Discord Bot Notifications',
    description: 'Real-time notifications and alerts through Discord',
    category: 'Automatic Notification',
    tags: ['discord', 'notifications', 'alerts'],
    icon: <Zap className="w-6 h-6" />,
    featured: false,
    downloads: 567,
    rating: 4.4,
    preview: 'Send automated notifications to Discord channels based on triggers',
    workflow: {
      nodes: [
        { id: 'start-3', type: 'start', position: { x: 100, y: 200 } },
        { id: 'if-3', type: 'ifElse', position: { x: 300, y: 200 }, data: { config: { condition: 'alert_level > 5' } } },
        { id: 'http-3', type: 'httpRequest', position: { x: 500, y: 150 }, data: { config: { url: 'https://discord.com/api/webhooks/...', method: 'POST' } } },
        { id: 'end-3', type: 'end', position: { x: 700, y: 200 } }
      ],
      edges: [
        { id: 'e3-1', source: 'start-3', target: 'if-3' },
        { id: 'e3-2', source: 'if-3', target: 'http-3' },
        { id: 'e3-3', source: 'http-3', target: 'end-3' },
        { id: 'e3-4', source: 'if-3', target: 'end-3' }
      ]
    }
  },
  {
    id: '4',
    name: 'AI Content Generator',
    description: 'Generate and publish content using AI models',
    category: 'AI Helper',
    tags: ['ai', 'content', 'generation'],
    icon: <Bot className="w-6 h-6" />,
    featured: true,
    downloads: 1456,
    rating: 4.9,
    preview: 'AI-powered content creation workflow with multiple output formats',
    workflow: {
      nodes: [
        { id: 'start-4', type: 'start', position: { x: 100, y: 200 } },
        { id: 'llm-4', type: 'llm', position: { x: 300, y: 200 }, data: { config: { prompt: 'Generate creative content about {{topic}}' } } },
        { id: 'template-4', type: 'template', position: { x: 500, y: 150 } },
        { id: 'http-4', type: 'httpRequest', position: { x: 500, y: 250 }, data: { config: { url: 'https://api.wordpress.com/rest/v1.1/sites/.../posts/new', method: 'POST' } } },
        { id: 'end-4', type: 'end', position: { x: 700, y: 200 } }
      ],
      edges: [
        { id: 'e4-1', source: 'start-4', target: 'llm-4' },
        { id: 'e4-2', source: 'llm-4', target: 'template-4' },
        { id: 'e4-3', source: 'llm-4', target: 'http-4' },
        { id: 'e4-4', source: 'template-4', target: 'end-4' },
        { id: 'e4-5', source: 'http-4', target: 'end-4' }
      ]
    }
  },
  {
    id: '5',
    name: 'API Integration Hub',
    description: 'Connect and sync data between multiple APIs',
    category: 'API Integration',
    tags: ['api', 'integration', 'sync'],
    icon: <Globe className="w-6 h-6" />,
    featured: false,
    downloads: 743,
    rating: 4.3,
    preview: 'Seamlessly integrate multiple third-party services',
    workflow: {
      nodes: [
        { id: 'start-5', type: 'start', position: { x: 100, y: 200 } },
        { id: 'http1-5', type: 'httpRequest', position: { x: 300, y: 150 }, data: { config: { url: 'https://api.service1.com/data', method: 'GET' } } },
        { id: 'http2-5', type: 'httpRequest', position: { x: 300, y: 250 }, data: { config: { url: 'https://api.service2.com/data', method: 'GET' } } },
        { id: 'code-5', type: 'code', position: { x: 500, y: 200 }, data: { config: { code: 'merged_data = {**data1, **data2}\nreturn merged_data' } } },
        { id: 'http3-5', type: 'httpRequest', position: { x: 700, y: 200 }, data: { config: { url: 'https://api.service3.com/sync', method: 'POST' } } },
        { id: 'end-5', type: 'end', position: { x: 900, y: 200 } }
      ],
      edges: [
        { id: 'e5-1', source: 'start-5', target: 'http1-5' },
        { id: 'e5-2', source: 'start-5', target: 'http2-5' },
        { id: 'e5-3', source: 'http1-5', target: 'code-5' },
        { id: 'e5-4', source: 'http2-5', target: 'code-5' },
        { id: 'e5-5', source: 'code-5', target: 'http3-5' },
        { id: 'e5-6', source: 'http3-5', target: 'end-5' }
      ]
    }
  },
  {
    id: '6',
    name: 'Scheduled Reports',
    description: 'Generate and send automated reports on schedule',
    category: 'Data Processing',
    tags: ['reports', 'scheduling', 'automation'],
    icon: <Clock className="w-6 h-6" />,
    featured: false,
    downloads: 389,
    rating: 4.2,
    preview: 'Automated report generation with customizable schedules',
    workflow: {
      nodes: [
        { id: 'start-6', type: 'start', position: { x: 100, y: 200 } },
        { id: 'db-6', type: 'database', position: { x: 300, y: 200 } },
        { id: 'code-6', type: 'code', position: { x: 500, y: 200 }, data: { config: { code: 'import matplotlib.pyplot as plt\n# Generate report charts\nreturn report_data' } } },
        { id: 'template-6', type: 'template', position: { x: 700, y: 150 } },
        { id: 'http-6', type: 'httpRequest', position: { x: 700, y: 250 }, data: { config: { url: 'https://api.email.com/send', method: 'POST' } } },
        { id: 'end-6', type: 'end', position: { x: 900, y: 200 } }
      ],
      edges: [
        { id: 'e6-1', source: 'start-6', target: 'db-6' },
        { id: 'e6-2', source: 'db-6', target: 'code-6' },
        { id: 'e6-3', source: 'code-6', target: 'template-6' },
        { id: 'e6-4', source: 'code-6', target: 'http-6' },
        { id: 'e6-5', source: 'template-6', target: 'end-6' },
        { id: 'e6-6', source: 'http-6', target: 'end-6' }
      ]
    }
  }
];

const categories = ['All', 'Data Processing', 'AI Helper', 'Automatic Notification', 'API Integration'];

interface TemplatesPageProps {
  onPageChange?: (page: string) => void;
}

export default function TemplatesPage({ onPageChange }: TemplatesPageProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [importingTemplate, setImportingTemplate] = useState<string | null>(null);
  const { setNodes, setEdges, newWorkflow } = useWorkflowStore();

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (templateId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(templateId)) {
      newFavorites.delete(templateId);
    } else {
      newFavorites.add(templateId);
    }
    setFavorites(newFavorites);
  };

  const handleImportTemplate = async (template: Template) => {
    setImportingTemplate(template.id);
    
    try {
      // Clear current workflow
      newWorkflow();
      
      // Create new nodes with correct data structure
      const newNodes = template.workflow.nodes.map(node => ({
        id: node.id,
        type: node.type, // Use actual node type
        position: node.position,
        data: {
          label: getNodeLabel(node.type),
          type: node.type as NodeType,
          category: getNodeCategory(node.type),
          status: 'idle' as const,
          config: node.data?.config || {}
        }
      }));
      
      // Create new edges
      const newEdges = template.workflow.edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: 'smoothstep'
      }));
      
      // Set new nodes and edges
      setNodes(newNodes);
      setEdges(newEdges);
      
      console.log('Template imported successfully:', template.name);
      
      // 等待一小段时间显示反馈
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 切换到工作流页面
      if (onPageChange) {
        onPageChange('workflow');
      }
    } catch (error) {
      console.error('Error importing template:', error);
    } finally {
      setImportingTemplate(null);
    }
  };
  
  // Helper function: Get node label based on node type
  const getNodeLabel = (type: string): string => {
    const labelMap: Record<string, string> = {
      'start': 'Start',
      'end': 'End',
      'llm': 'LLM Processing',
      'httpRequest': 'HTTP Request',
      'fileUpload': 'File Upload',
      'code': 'Code Execution',
      'database': 'Database',
      'ifElse': 'If/Else',
      'template': 'Template'
    };
    return labelMap[type] || type;
  };
  
  // Helper function: Get node category based on node type
  const getNodeCategory = (type: string): NodeCategory => {
    const categoryMap: Record<string, NodeCategory> = {
      'start': 'input-output',
      'end': 'input-output',
      'llm': 'ai-llm',
      'httpRequest': 'input-output',
      'fileUpload': 'input-output',
      'code': 'transform',
      'database': 'input-output',
      'ifElse': 'logic',
      'template': 'transform'
    };
    return categoryMap[type] || 'utilities';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Workflow Templates</h1>
            <p className="mt-2 text-lg text-gray-600">
              Jump-start your automation with pre-built workflow templates
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Category:</span>
              </div>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Featured Templates */}
        {selectedCategory === 'All' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.filter(t => t.featured).map(template => (
                <div key={template.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                          {template.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{template.name}</h3>
                          <p className="text-sm text-gray-500">{template.category}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(template.id)}
                        className={`p-1 rounded ${favorites.has(template.id) ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                      >
                        <Star className="w-5 h-5" fill={favorites.has(template.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{template.downloads} downloads</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                        <span>{template.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleImportTemplate(template)}
                        disabled={importingTemplate === template.id}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 group"
                      >
                        {importingTemplate === template.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Importing...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span>Import</span>
                          </>
                        )}
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Templates */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedCategory === 'All' ? 'All Templates' : selectedCategory} 
            <span className="text-lg text-gray-500 font-normal ml-2">({filteredTemplates.length})</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map(template => (
              <div key={template.id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-gray-100 rounded text-gray-600">
                        {template.icon}
                      </div>
                      <h3 className="font-medium text-gray-900 text-sm">{template.name}</h3>
                    </div>
                    <button
                      onClick={() => toggleFavorite(template.id)}
                      className={`p-1 rounded ${favorites.has(template.id) ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                    >
                      <Star className="w-4 h-4" fill={favorites.has(template.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{template.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{template.downloads} downloads</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
                      <span>{template.rating}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleImportTemplate(template)}
                    disabled={importingTemplate === template.id}
                    className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-1 group"
                  >
                    {importingTemplate === template.id ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Importing...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3 h-3 group-hover:scale-110 transition-transform" />
                        <span>Import</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}