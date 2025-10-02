export interface EvalModeNodeDefinition {
  id: string;
  label: string;
  category: string;
  description: string;
  color: string;
  icon: string;
  inputs: string[];
  outputs: string[];
  config: Record<string, any>;
}

import { NodeCategory } from '../../types';

export const EVAL_MODE_NODES: EvalModeNodeDefinition[] = [
  {
    id: 'system-monitor',
    label: 'System Monitor',
    category: 'system',
    description: 'Monitor system processes and applications',
    color: '#dc2626',
    icon: '🔍',
    inputs: ['trigger'],
    outputs: ['process_detected', 'system_info'],
    config: [
      { key: 'process_name', type: 'text', label: 'Process Name', placeholder: 'Discord.exe' },
      { key: 'check_interval', type: 'number', label: 'Check Interval (ms)', default: 5000 },
      { key: 'alert_threshold', type: 'number', label: 'Alert Threshold', default: 1 }
    ]
  },
  
  {
    id: 'discord-caller',
    label: 'Discord Caller',
    category: 'automation',
    description: 'Automatically call friends on Discord',
    color: '#7c3aed',
    icon: '📞',
    inputs: ['friend_detected'],
    outputs: ['call_initiated', 'call_status'],
    config: [
      { key: 'friend_username', type: 'text', label: 'Friend Username', placeholder: 'friend#1234' },
      { key: 'call_message', type: 'text', label: 'Call Message', default: 'Hey! Stop gaming and talk to me!' },
      { key: 'retry_attempts', type: 'number', label: 'Retry Attempts', default: 3 }
    ]
  },

  {
    id: 'network-scanner',
    label: 'Network Scanner',
    category: 'network',
    description: 'Scan network for active devices (educational)',
    color: '#ea580c',
    icon: '🌐',
    inputs: ['scan_trigger'],
    outputs: ['devices_found', 'network_map'],
    config: [
      { key: 'ip_range', type: 'text', label: 'IP Range', default: '192.168.1.0/24' },
      { key: 'scan_ports', type: 'text', label: 'Ports to Scan', default: '22,80,443' },
      { key: 'timeout', type: 'number', label: 'Timeout (ms)', default: 3000 }
    ]
  },

  {
    id: 'prank-notifier',
    label: 'Prank Notifier',
    category: 'pranks',
    description: 'Send harmless prank notifications',
    color: '#eab308',
    icon: '😈',
    inputs: ['trigger'],
    outputs: ['notification_sent'],
    config: [
      { key: 'message', type: 'text', label: 'Prank Message', default: 'Your computer has been hacked! Just kidding 😄' },
      { key: 'notification_type', type: 'select', label: 'Type', options: ['toast', 'modal', 'sound'] },
      { key: 'delay', type: 'number', label: 'Delay (seconds)', default: 5 }
    ]
  },

  {
    id: 'auto-typer',
    label: 'Auto Typer',
    category: 'automation',
    description: 'Automatically type messages',
    color: '#7c3aed',
    icon: '⌨️',
    inputs: ['text_input'],
    outputs: ['typing_complete'],
    config: [
      { key: 'typing_speed', type: 'number', label: 'Typing Speed (WPM)', default: 60 },
      { key: 'target_app', type: 'text', label: 'Target Application', placeholder: 'Notepad' },
      { key: 'message', type: 'textarea', label: 'Message to Type', rows: 3 }
    ]
  },

  {
    id: 'system-info',
    label: 'System Info',
    category: 'system',
    description: 'Gather detailed system information',
    color: '#dc2626',
    icon: '💻',
    inputs: ['info_request'],
    outputs: ['cpu_info', 'memory_info', 'disk_info'],
    config: [
      { key: 'info_types', type: 'multi-select', label: 'Information Types', options: ['CPU', 'Memory', 'Disk', 'Network', 'Processes'] },
      { key: 'refresh_interval', type: 'number', label: 'Refresh Interval (seconds)', default: 10 }
    ]
  },

  {
    id: 'file-watcher',
    label: 'File Watcher',
    category: 'system',
    description: 'Monitor file system changes',
    color: '#dc2626',
    icon: '👁️',
    inputs: ['watch_path'],
    outputs: ['file_changed', 'file_created', 'file_deleted'],
    config: [
      { key: 'watch_directory', type: 'text', label: 'Directory to Watch', placeholder: '/path/to/watch' },
      { key: 'file_types', type: 'text', label: 'File Types', default: '*.*' },
      { key: 'recursive', type: 'boolean', label: 'Watch Subdirectories', default: true }
    ]
  },

  {
    id: 'port-scanner',
    label: 'Port Scanner',
    category: 'network',
    description: 'Educational port scanning tool',
    color: '#ea580c',
    icon: '🔍',
    inputs: ['target_host'],
    outputs: ['open_ports', 'scan_results'],
    config: [
      { key: 'host', type: 'text', label: 'Target Host', default: 'localhost' },
      { key: 'port_range', type: 'text', label: 'Port Range', default: '1-1000' },
      { key: 'scan_type', type: 'select', label: 'Scan Type', options: ['TCP', 'UDP', 'SYN'] }
    ]
  },

  {
    id: 'dns-resolver',
    label: 'DNS Resolver',
    category: 'network',
    description: 'Resolve domain names to IP addresses',
    color: '#ea580c',
    icon: '🌍',
    inputs: ['domain_name'],
    outputs: ['ip_address', 'dns_records'],
    config: [
      { key: 'domain', type: 'text', label: 'Domain Name', placeholder: 'example.com' },
      { key: 'record_type', type: 'select', label: 'Record Type', options: ['A', 'AAAA', 'MX', 'TXT', 'CNAME'] },
      { key: 'dns_server', type: 'text', label: 'DNS Server', default: '8.8.8.8' }
    ]
  },

  {
    id: 'fake-crash',
    label: 'Fake Crash',
    category: 'pranks',
    description: 'Display a fake system crash screen',
    color: '#eab308',
    icon: '💥',
    inputs: ['trigger'],
    outputs: ['crash_displayed'],
    config: [
      { key: 'crash_type', type: 'select', label: 'Crash Type', options: ['Blue Screen', 'Kernel Panic', 'System Error'] },
      { key: 'duration', type: 'number', label: 'Duration (seconds)', default: 10 },
      { key: 'exit_key', type: 'text', label: 'Exit Key', default: 'ESC' }
    ]
  },

  {
    id: 'screen-recorder',
    label: 'Screen Recorder',
    category: 'system',
    description: 'Record screen activity',
    color: '#dc2626',
    icon: '🎥',
    inputs: ['start_recording'],
    outputs: ['recording_file', 'recording_stopped'],
    config: [
      { key: 'output_format', type: 'select', label: 'Output Format', options: ['MP4', 'AVI', 'GIF'] },
      { key: 'quality', type: 'select', label: 'Quality', options: ['Low', 'Medium', 'High'] },
      { key: 'capture_area', type: 'select', label: 'Capture Area', options: ['Full Screen', 'Window', 'Custom'] }
    ]
  },

  {
    id: 'mouse-jiggler',
    label: 'Mouse Jiggler',
    category: 'pranks',
    description: 'Subtly move mouse to prevent sleep',
    color: '#eab308',
    icon: '🖱️',
    inputs: ['activate'],
    outputs: ['mouse_moved'],
    config: [
      { key: 'movement_distance', type: 'number', label: 'Movement Distance (pixels)', default: 1 },
      { key: 'interval', type: 'number', label: 'Interval (seconds)', default: 60 },
      { key: 'pattern', type: 'select', label: 'Movement Pattern', options: ['Random', 'Circle', 'Square'] }
    ]
  },

  {
    id: 'keyboard-logger',
    label: 'Keyboard Logger',
    category: 'system',
    description: 'Log keyboard input (educational)',
    color: '#dc2626',
    icon: '⌨️',
    inputs: ['start_logging'],
    outputs: ['key_pressed', 'log_file'],
    config: [
      { key: 'log_file', type: 'text', label: 'Log File Path', default: './keylog.txt' },
      { key: 'filter_passwords', type: 'boolean', label: 'Filter Password Fields', default: true },
      { key: 'log_format', type: 'select', label: 'Log Format', options: ['Plain Text', 'JSON', 'CSV'] }
    ]
  },

  {
    id: 'web-crawler',
    label: 'Web Crawler',
    category: 'network',
    description: 'Crawl websites for information',
    color: '#ea580c',
    icon: '🕷️',
    inputs: ['start_url'],
    outputs: ['crawled_data', 'links_found'],
    config: [
      { key: 'max_depth', type: 'number', label: 'Max Crawl Depth', default: 3 },
      { key: 'delay', type: 'number', label: 'Delay Between Requests (ms)', default: 1000 },
      { key: 'user_agent', type: 'text', label: 'User Agent', default: 'AutoFlow-Bot/1.0' }
    ]
  },

  {
    id: 'window-manipulator',
    label: 'Window Manipulator',
    category: 'pranks',
    description: 'Move and resize windows for pranks',
    color: '#eab308',
    icon: '🪟',
    inputs: ['target_window'],
    outputs: ['window_moved'],
    config: [
      { key: 'window_title', type: 'text', label: 'Window Title', placeholder: 'Calculator' },
      { key: 'action', type: 'select', label: 'Action', options: ['Move', 'Resize', 'Minimize', 'Shake'] },
      { key: 'repeat_count', type: 'number', label: 'Repeat Count', default: 5 }
    ]
  },

  {
    id: 'sound-player',
    label: 'Sound Player',
    category: 'pranks',
    description: 'Play sounds for pranks or alerts',
    color: '#eab308',
    icon: '🔊',
    inputs: ['play_trigger'],
    outputs: ['sound_played'],
    config: [
      { key: 'sound_file', type: 'file', label: 'Sound File', accept: 'audio/*' },
      { key: 'volume', type: 'range', label: 'Volume', min: 0, max: 100, default: 50 },
      { key: 'loop', type: 'boolean', label: 'Loop Sound', default: false }
    ]
  },

  {
    id: 'clipboard-monitor',
    label: 'Clipboard Monitor',
    category: 'system',
    description: 'Monitor clipboard changes',
    color: '#dc2626',
    icon: '📋',
    inputs: ['start_monitoring'],
    outputs: ['clipboard_changed', 'clipboard_content'],
    config: [
      { key: 'content_types', type: 'multi-select', label: 'Monitor Content Types', options: ['Text', 'Images', 'Files'] },
      { key: 'log_changes', type: 'boolean', label: 'Log All Changes', default: false }
    ]
  },

  {
    id: 'process-killer',
    label: 'Process Killer',
    category: 'system',
    description: 'Terminate running processes',
    color: '#dc2626',
    icon: '💀',
    inputs: ['process_name'],
    outputs: ['process_killed'],
    config: [
      { key: 'process_name', type: 'text', label: 'Process Name', placeholder: 'notepad.exe' },
      { key: 'force_kill', type: 'boolean', label: 'Force Kill', default: false },
      { key: 'confirm_before_kill', type: 'boolean', label: 'Confirm Before Kill', default: true }
    ]
  },

  {
    id: 'network-traffic',
    label: 'Network Traffic Monitor',
    category: 'network',
    description: 'Monitor network traffic and bandwidth',
    color: '#ea580c',
    icon: '📊',
    inputs: ['start_monitoring'],
    outputs: ['traffic_data', 'bandwidth_usage'],
    config: [
      { key: 'interface', type: 'select', label: 'Network Interface', options: ['All', 'WiFi', 'Ethernet'] },
      { key: 'sample_interval', type: 'number', label: 'Sample Interval (seconds)', default: 5 },
      { key: 'data_format', type: 'select', label: 'Data Format', options: ['Bytes', 'KB', 'MB'] }
    ]
  },

  {
    id: 'desktop-wallpaper',
    label: 'Desktop Wallpaper Changer',
    category: 'pranks',
    description: 'Change desktop wallpaper for pranks',
    color: '#eab308',
    icon: '🖼️',
    inputs: ['image_path'],
    outputs: ['wallpaper_changed'],
    config: [
      { key: 'image_path', type: 'file', label: 'Image File', accept: 'image/*' },
      { key: 'restore_original', type: 'boolean', label: 'Restore Original After', default: true },
      { key: 'restore_delay', type: 'number', label: 'Restore Delay (minutes)', default: 5 }
    ]
  }
];

export const EVAL_CATEGORIES = {
  'system': {
    label: '⚠️ System Control',
    color: '#dc2626',
    description: 'System monitoring and control nodes'
  },
  'network': {
    label: '🌐 Network Operations',
    color: '#ea580c',
    description: 'Network scanning and connection nodes'
  },
  'automation': {
    label: '⚡ Advanced Automation',
    color: '#7c3aed',
    description: 'Advanced automation and scripting'
  },
  'pranks': {
    label: '🎭 Fun & Pranks',
    color: '#eab308',
    description: 'Harmless fun and prank automation'
  }
};

export function isEvalModeNode(nodeType: string): boolean {
  return EVAL_MODE_NODES.some(node => node.id === nodeType);
}

export function getEvalModeNode(nodeType: string): EvalModeNodeDefinition | undefined {
  return EVAL_MODE_NODES.find(node => node.id === nodeType);
}

export function getEvalModeNodesByCategory(): Record<string, EvalModeNodeDefinition[]> {
  const grouped: Record<string, EvalModeNodeDefinition[]> = {};
  
  EVAL_MODE_NODES.forEach(node => {
    if (!grouped[node.category]) {
      grouped[node.category] = [];
    }
    grouped[node.category].push(node);
  });
  
  return grouped;
}