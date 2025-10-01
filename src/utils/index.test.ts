import { validateWorkflow } from './index';

describe('validateWorkflow', () => {
  it('returns error when there are no nodes', () => {
    const result = validateWorkflow([], []);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Workflow requires at least one node');
  });

  it('accepts a single isolated node', () => {
    const nodes: any[] = [{ id: 'node-1' }];
    const result = validateWorkflow(nodes, []);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('detects circular dependencies', () => {
    const nodes = [
      { id: 'node-1' },
      { id: 'node-2' },
    ] as any[];

    const edges = [
      { id: 'edge-1', source: 'node-1', target: 'node-2' },
      { id: 'edge-2', source: 'node-2', target: 'node-1' },
    ] as any[];

    const result = validateWorkflow(nodes, edges);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Circular dependency detected in workflow');
  });
});
