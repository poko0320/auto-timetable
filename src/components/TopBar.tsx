import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Play, 
  Square, 
  RotateCcw, 
  Save, 
  Upload, 
  Download, 
  Settings,
  AlertTriangle,
  Shield,
  UserPlus,
  X,
  Mail,
  Copy,
  Check
} from 'lucide-react';

interface TopBarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  evalModeEnabled: boolean;
  evalModeConfirmed: boolean;
  onEvalModeToggle: (enabled: boolean) => void;
}

export function TopBar({ currentPage, onPageChange, evalModeEnabled, evalModeConfirmed, onEvalModeToggle }: TopBarProps) {
  const [showEvalWarning, setShowEvalWarning] = useState(false);
  const [showInviteDropdown, setShowInviteDropdown] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteLink, setInviteLink] = useState('https://autoflow.app/invite/abc123');
  const [linkCopied, setLinkCopied] = useState(false);
  const inviteDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inviteDropdownRef.current && !inviteDropdownRef.current.contains(event.target as Node)) {
        setShowInviteDropdown(false);
      }
    };

    if (showInviteDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showInviteDropdown]);

  const handleEvalModeClick = () => {
    if (!evalModeEnabled) {
      if (evalModeConfirmed) {
        // If already confirmed, enable directly
        onEvalModeToggle(true);
      } else {
        // First time usage, show warning
        setShowEvalWarning(true);
      }
    } else {
      onEvalModeToggle(false);
    }
  };

  const confirmEvalMode = () => {
    setShowEvalWarning(false);
    onEvalModeToggle(true);
  };

  const cancelEvalMode = () => {
    setShowEvalWarning(false);
  };

  const handleInviteClick = () => {
    setShowInviteDropdown(!showInviteDropdown);
  };

  const handleSendInvite = () => {
    if (inviteEmail.trim()) {
      // TODO: Implement invite sending logic
      console.log('Sending invite to:', inviteEmail);
      setInviteEmail('');
      // Add success notification here
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const closeInviteDropdown = () => {
    setShowInviteDropdown(false);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <button onClick={() => onPageChange('workflow')}>
                    <Zap className="w-5 h-5 text-white" />
                  </button>
                </div>
                <button
                  onClick={() => onPageChange('workflow')}
                  className={`text-xl font-bold text-gray-900`}>AutoFlow
                </button>
              </div>

              {/* Navigation Tabs */}
              <nav className="flex space-x-1">
                <button
                  onClick={() => onPageChange('workflow')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 'workflow'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Workflow
                </button>
                <button
                  onClick={() => onPageChange('templates')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 'templates'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Templates
                </button>
                <button
                  onClick={() => onPageChange('integrations')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 'integrations'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Integrations
                </button>
              </nav>
            </div>

            {/* Center - Workflow Controls (only show on workflow page) */}
            {currentPage === 'workflow' && (
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Play size={16} />
                  <span>Run</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <Square size={16} />
                  <span>Stop</span>
                </button>
                
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <RotateCcw size={18} />
                </button>
                
                <div className="w-px h-6 bg-gray-300"></div>
                
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Save size={18} />
                </button>
                
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Upload size={18} />
                </button>
                
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download size={18} />
                </button>
              </div>
            )}

            {/* Right side - Status and Settings */}
            <div className="flex items-center space-x-4">
              {/* Eval Mode Toggle - Icon only */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleEvalModeClick}
                  className={`relative p-2 rounded-lg transition-all ${
                    evalModeEnabled
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={evalModeEnabled ? 'Eval Mode Active' : 'Safe Mode'}
                >
                  <Shield size={18} />
                  {evalModeEnabled && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </button>
              </div>

              {/* Invite Button */}
              <div className="relative" ref={inviteDropdownRef}>
                <button
                  onClick={handleInviteClick}
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  title="Invite collaborators"
                >
                  <UserPlus size={18} />
                </button>

                {/* Invite Dropdown */}
                {showInviteDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Invite Collaborators</h3>
                        <button
                          onClick={closeInviteDropdown}
                          className="p-1 text-gray-400 hover:text-gray-600 rounded"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      
                      {/* Email Invite */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Invite by email
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="email"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            placeholder="Enter email address"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            onKeyPress={(e) => e.key === 'Enter' && handleSendInvite()}
                          />
                          <button
                            onClick={handleSendInvite}
                            disabled={!inviteEmail.trim()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                          >
                            <Mail size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Share Link */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Share link
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={inviteLink}
                            readOnly
                            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-600"
                          />
                          <button
                            onClick={handleCopyLink}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center space-x-1"
                          >
                            {linkCopied ? (
                              <>
                                <Check size={14} className="text-green-600" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy size={14} />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Anyone with this link can join as a collaborator
                        </p>
                      </div>
                      
                      {/* Current Collaborators */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="text-sm font-medium text-gray-700 mb-2">Current collaborators</div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                              Y
                            </div>
                            <span className="text-sm text-gray-600">You (Owner)</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Invite collaborators to work together on this workflow
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Ready</span>
              </div>
              
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Eval Mode Warning Modal */}
      {showEvalWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Enable Eval Mode?</h3>
                <p className="text-sm text-gray-500">Advanced automation capabilities</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-700 mb-3">
                Eval Mode unlocks advanced automation nodes with enhanced system access. This includes:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• System monitoring and process control</li>
                <li>• Network scanning and operations</li>
                <li>• Advanced automation scripts</li>
                <li>• Fun prank and entertainment features</li>
              </ul>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800">
                  ⚠️ Use responsibly and only on systems you own or have permission to modify.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={cancelEvalMode}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmEvalMode}
                className="flex-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Enable Eval Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TopBar;