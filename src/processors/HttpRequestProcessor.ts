import { BaseProcessor } from './BaseProcessor';
import { HttpRequestNodeConfig, NodeOutput, ExecutionContext, NodeSchema } from '../types';

export class HttpRequestProcessor extends BaseProcessor {
  async execute(input: Record<string, any>, context: ExecutionContext): Promise<NodeOutput> {
    const config = input.config as HttpRequestNodeConfig;
    const startTime = Date.now();
    
    try {
      // Validate configuration
      const validation = this.validate(config);
      if (!validation.isValid) {
        return this.createOutput(null, false, `Configuration error: ${validation.errors.join(', ')}`);
      }
      
      // Replace variables in URL and body
      const url = this.replaceVariables(config.url, { ...context.variables, ...input });
      const body = config.body ? this.replaceVariables(config.body, { ...context.variables, ...input }) : undefined;
      
      // Prepare headers
      const headers = this.prepareHeaders(config.headers, config.authentication);
      
      // Execute request with retries
      const response = await this.executeWithRetries({
        method: config.method,
        url,
        headers,
        body,
        timeout: config.timeout
      }, config.retries);
      
      const executionTime = Date.now() - startTime;
      
      return this.createOutput({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      }, true, undefined, {
        executionTime,
        outputSize: JSON.stringify(response.data).length
      });
      
    } catch (error) {
      const executionTime = Date.now() - startTime;
      return this.createOutput(null, false, (error as Error).message, { executionTime });
    }
  }
  
  getSchema(): NodeSchema {
    return {
      inputs: [
        {
          name: 'url_variables',
          type: 'object',
          required: false,
          description: 'Variables to replace in URL and body'
        }
      ],
      outputs: [
        {
          name: 'status',
          type: 'number',
          description: 'HTTP status code'
        },
        {
          name: 'statusText',
          type: 'string',
          description: 'HTTP status text'
        },
        {
          name: 'headers',
          type: 'object',
          description: 'Response headers'
        },
        {
          name: 'data',
          type: 'any',
          description: 'Response body data'
        }
      ],
      config: [
        {
          key: 'method',
          label: 'HTTP Method',
          type: 'select',
          required: true,
          options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
          description: 'HTTP request method'
        },
        {
          key: 'url',
          label: 'URL',
          type: 'text',
          required: true,
          placeholder: 'https://api.example.com/data',
          description: 'Request URL (supports variable substitution)'
        },
        {
          key: 'headers',
          label: 'Headers',
          type: 'json',
          required: false,
          placeholder: '{"Content-Type": "application/json"}',
          description: 'HTTP headers as JSON object'
        },
        {
          key: 'body',
          label: 'Request Body',
          type: 'textarea',
          required: false,
          placeholder: 'Request body content (for POST/PUT/PATCH)',
          description: 'Request body (supports variable substitution)'
        },
        {
          key: 'timeout',
          label: 'Timeout (ms)',
          type: 'number',
          required: true,
          validation: { min: 1000, max: 60000 },
          description: 'Request timeout in milliseconds'
        },
        {
          key: 'retries',
          label: 'Retry Attempts',
          type: 'number',
          required: true,
          validation: { min: 0, max: 5 },
          description: 'Number of retry attempts on failure'
        },
        {
          key: 'authentication',
          label: 'Authentication',
          type: 'json',
          required: false,
          placeholder: '{"type": "bearer", "credentials": {"token": "your-token"}}',
          description: 'Authentication configuration'
        }
      ]
    };
  }
  
  private prepareHeaders(
    headers: Record<string, string>,
    authentication?: HttpRequestNodeConfig['authentication']
  ): Record<string, string> {
    const finalHeaders = { ...headers };
    
    // Add authentication headers
    if (authentication && authentication.type !== 'none') {
      switch (authentication.type) {
        case 'bearer':
          if (authentication.credentials.token) {
            finalHeaders['Authorization'] = `Bearer ${authentication.credentials.token}`;
          }
          break;
        case 'basic':
          if (authentication.credentials.username && authentication.credentials.password) {
            const credentials = btoa(`${authentication.credentials.username}:${authentication.credentials.password}`);
            finalHeaders['Authorization'] = `Basic ${credentials}`;
          }
          break;
        case 'apikey':
          if (authentication.credentials.header && authentication.credentials.key) {
            finalHeaders[authentication.credentials.header] = authentication.credentials.key;
          }
          break;
      }
    }
    
    return finalHeaders;
  }
  
  private async executeWithRetries(
    requestConfig: {
      method: string;
      url: string;
      headers: Record<string, string>;
      body?: string;
      timeout: number;
    },
    retries: number
  ): Promise<{
    status: number;
    statusText: string;
    headers: Record<string, string>;
    data: any;
  }> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await this.executeRequest(requestConfig);
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on client errors (4xx)
        if (error instanceof HttpError && error.status >= 400 && error.status < 500) {
          throw error;
        }
        
        // Wait before retry (exponential backoff)
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }
    
    throw lastError!;
  }
  
  private async executeRequest(config: {
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: string;
    timeout: number;
  }): Promise<{
    status: number;
    statusText: string;
    headers: Record<string, string>;
    data: any;
  }> {
    // Mock HTTP request (in real implementation, use fetch or axios)
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Request timeout after ${config.timeout}ms`));
      }, config.timeout);
      
      // Simulate network delay
      setTimeout(() => {
        clearTimeout(timeoutId);
        
        // Mock response based on URL patterns
        if (config.url.includes('error') || config.url.includes('fail')) {
          reject(new HttpError(500, 'Internal Server Error', 'Mock server error'));
          return;
        }
        
        if (config.url.includes('notfound')) {
          reject(new HttpError(404, 'Not Found', 'Resource not found'));
          return;
        }
        
        // Mock successful response
        const mockData = {
          success: true,
          message: `Mock response for ${config.method} ${config.url}`,
          timestamp: new Date().toISOString(),
          requestHeaders: config.headers,
          requestBody: config.body ? JSON.parse(config.body) : null
        };
        
        resolve({
          status: 200,
          statusText: 'OK',
          headers: {
            'content-type': 'application/json',
            'x-mock-response': 'true'
          },
          data: mockData
        });
      }, 500 + Math.random() * 1000);
    });
  }
}

class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string
  ) {
    super(message);
    this.name = 'HttpError';
  }
}