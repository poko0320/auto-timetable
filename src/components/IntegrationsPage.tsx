import React, { useState } from 'react';
import { 
  Search, 
  Settings, 
  CheckCircle, 
  Clock, 
  Plus,
  ExternalLink,
  Shield,
  Zap,
  Mail,
  MessageSquare,
  Github,
  Calendar,
  FileText,
  Database,
  Cloud,
  Users,
  BarChart3,
  Camera,
  Music
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  connected: boolean;
  popular: boolean;
  comingSoon?: boolean;
  features: string[];
  website?: string;
}

const integrations: Integration[] = [
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    description: 'Connect Gmail, Drive, Calendar, and other Google services',
    category: 'Productivity',
    icon: <Mail className="w-8 h-8" />,
    connected: true,
    popular: true,
    features: ['Gmail automation', 'Calendar sync', 'Drive file management', 'Sheets integration'],
    website: 'https://workspace.google.com'
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Send notifications and manage Discord servers',
    category: 'Communication',
    icon: <MessageSquare className="w-8 h-8" />,
    connected: false,
    popular: true,
    features: ['Bot messages', 'Server management', 'Voice notifications', 'Role automation'],
    website: 'https://discord.com'
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Automate code deployments and repository management',
    category: 'Development',
    icon: <Github className="w-8 h-8" />,
    connected: true,
    popular: true,
    features: ['Repository automation', 'Issue tracking', 'PR notifications', 'CI/CD triggers'],
    website: 'https://github.com'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Team communication and workflow automation',
    category: 'Communication',
    icon: <MessageSquare className="w-8 h-8" />,
    connected: false,
    popular: true,
    features: ['Channel messages', 'Direct messages', 'Bot integration', 'File sharing'],
    website: 'https://slack.com'
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Manage databases, pages, and content in Notion',
    category: 'Productivity',
    icon: <FileText className="w-8 h-8" />,
    connected: false,
    popular: true,
    features: ['Database automation', 'Page creation', 'Content sync', 'Template management'],
    website: 'https://notion.so'
  },
  {
    id: 'airtable',
    name: 'Airtable',
    description: 'Database and spreadsheet automation',
    category: 'Database',
    icon: <Database className="w-8 h-8" />,
    connected: false,
    popular: false,
    features: ['Record management', 'Field automation', 'Base sync', 'View filtering'],
    website: 'https://airtable.com'
  },
  {
    id: 'aws',
    name: 'Amazon Web Services',
    description: 'Cloud infrastructure and services automation',
    category: 'Cloud',
    icon: <Cloud className="w-8 h-8" />,
    connected: false,
    popular: false,
    comingSoon: true,
    features: ['EC2 management', 'S3 operations', 'Lambda functions', 'CloudWatch alerts'],
    website: 'https://aws.amazon.com'
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: 'Enterprise communication and collaboration',
    category: 'Communication',
    icon: <Users className="w-8 h-8" />,
    connected: false,
    popular: false,
    comingSoon: true,
    features: ['Team messaging', 'Meeting automation', 'File collaboration', 'App integration'],
    website: 'https://teams.microsoft.com'
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Website analytics and reporting automation',
    category: 'Analytics',
    icon: <BarChart3 className="w-8 h-8" />,
    connected: false,
    popular: false,
    features: ['Report generation', 'Event tracking', 'Goal monitoring', 'Audience analysis'],
    website: 'https://analytics.google.com'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Social media content and engagement automation',
    category: 'Social Media',
    icon: <Camera className="w-8 h-8" />,
    connected: false,
    popular: false,
    comingSoon: true,
    features: ['Post scheduling', 'Story automation', 'Comment management', 'Analytics tracking'],
    website: 'https://instagram.com'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Music streaming and playlist automation',
    category: 'Entertainment',
    icon: <Music className="w-8 h-8" />,
    connected: false,
    popular: false,
    comingSoon: true,
    features: ['Playlist management', 'Music discovery', 'Play automation', 'Mood-based selection'],
    website: 'https://spotify.com'
  }
];

const categories = ['All', 'Productivity', 'Communication', 'Development', 'Database', 'Cloud', 'Analytics', 'Social Media', 'Entertainment'];

export default function IntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const connectedCount = integrations.filter(i => i.connected).length;

  const handleConnect = (integration: Integration) => {
    if (integration.comingSoon) return;
    // TODO: Implement connection logic
    console.log('Connecting to:', integration.name);
  };

  const handleDisconnect = (integration: Integration) => {
    // TODO: Implement disconnection logic
    console.log('Disconnecting from:', integration.name);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
            <p className="mt-2 text-lg text-gray-600">
              Connect your favorite apps and services to create powerful automations
            </p>
            <div className="mt-4 inline-flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>{connectedCount} Connected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>{integrations.filter(i => i.comingSoon).length} Coming Soon</span>
              </div>
            </div>
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
                placeholder="Search integrations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Category:</span>
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

        {/* Popular Integrations */}
        {selectedCategory === 'All' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Integrations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.filter(i => i.popular).map(integration => (
                <div key={integration.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                          {integration.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                          <p className="text-sm text-gray-500">{integration.category}</p>
                        </div>
                      </div>
                      {integration.connected && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                      {integration.comingSoon && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{integration.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {integration.features.slice(0, 3).map(feature => (
                          <span key={feature} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {feature}
                          </span>
                        ))}
                        {integration.features.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{integration.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {integration.connected ? (
                        <>
                          <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
                            <Settings className="w-4 h-4" />
                            <span>Configure</span>
                          </button>
                          <button 
                            onClick={() => handleDisconnect(integration)}
                            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            Disconnect
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => handleConnect(integration)}
                          disabled={integration.comingSoon}
                          className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                            integration.comingSoon 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          <Plus className="w-4 h-4" />
                          <span>{integration.comingSoon ? 'Coming Soon' : 'Connect'}</span>
                        </button>
                      )}
                      {integration.website && (
                        <a
                          href={integration.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Integrations */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedCategory === 'All' ? 'All Integrations' : selectedCategory} 
            <span className="text-lg text-gray-500 font-normal ml-2">({filteredIntegrations.length})</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredIntegrations.map(integration => (
              <div key={integration.id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-gray-100 rounded text-gray-600">
                        {integration.icon}
                      </div>
                      <h3 className="font-medium text-gray-900 text-sm">{integration.name}</h3>
                    </div>
                    {integration.connected && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {integration.comingSoon && (
                      <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs rounded">
                        Soon
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{integration.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {integration.features.slice(0, 2).map(feature => (
                      <span key={feature} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {integration.connected ? (
                    <div className="flex space-x-1">
                      <button className="flex-1 bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700 transition-colors">
                        Configure
                      </button>
                      <button 
                        onClick={() => handleDisconnect(integration)}
                        className="px-3 py-2 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleConnect(integration)}
                      disabled={integration.comingSoon}
                      className={`w-full px-3 py-2 rounded text-sm transition-colors flex items-center justify-center space-x-1 ${
                        integration.comingSoon 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <Plus className="w-3 h-3" />
                      <span>{integration.comingSoon ? 'Soon' : 'Connect'}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredIntegrations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900">Security & Privacy</h3>
              <p className="text-blue-700 text-sm mt-1">
                All integrations use industry-standard OAuth2 authentication and encryption. 
                We only access the data you explicitly authorize and never store sensitive credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}