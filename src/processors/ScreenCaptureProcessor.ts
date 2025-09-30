import { BaseProcessor } from './BaseProcessor';
import { ExecutionContext, NodeOutput, NodeSchema } from '../types';

export class ScreenCaptureProcessor extends BaseProcessor {
  async execute(input: Record<string, any>, context: ExecutionContext): Promise<NodeOutput> {
    const config = input.config || {};
    
    try {
      // 模拟屏幕捕捉功能
      const captureMode = config.captureMode || 'fullScreen';
      const outputPath = config.outputPath || './screenshot.png';
      
      // 在实际应用中，这里会调用系统API进行屏幕捕捉
      console.log(`Capturing screen in ${captureMode} mode...`);
      
      return {
        success: true,
        data: {
          imagePath: outputPath,
          captureMode: captureMode,
          timestamp: new Date().toISOString()
        },
        metadata: {
          executionTime: 100
        }
      };
      
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
        metadata: {
          executionTime: 10
        }
      };
    }
  }
  
  getSchema(): NodeSchema {
    return {
      inputs: [
        { name: 'trigger', type: 'boolean', required: false, description: 'Trigger capture' }
      ],
      outputs: [
        { name: 'imagePath', type: 'string', description: 'Path to captured image' },
        { name: 'captureMode', type: 'string', description: 'Capture mode used' },
        { name: 'timestamp', type: 'string', description: 'Capture timestamp' }
      ],
      config: [
        { 
          key: 'captureMode', 
          type: 'select',
          label: 'Capture Mode',
          required: false,
          options: ['fullScreen', 'activeWindow', 'region'],
          description: 'Screen capture mode'
        },
        { 
          key: 'outputPath', 
          type: 'text',
          label: 'Output Path',
          required: false,
          placeholder: './screenshot.png',
          description: 'Path to save the screenshot'
        },
        { 
          key: 'imageFormat', 
          type: 'select',
          label: 'Image Format',
          required: false,
          options: ['png', 'jpg', 'bmp'],
          description: 'Image file format'
        }
      ]
    };
  }
}