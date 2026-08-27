import { describe, it, expect } from 'vitest';
import { workspaceFromHash } from './navigation';

describe('workspaceFromHash (URL synchronization)', () => {
  it('parses a normal workspace hash', () => {
    expect(workspaceFromHash('#/projects')).toBe('projects');
    expect(workspaceFromHash('#/experience')).toBe('experience');
    expect(workspaceFromHash('#/contact')).toBe('contact');
  });

  it('parses a hash without the leading #/', () => {
    expect(workspaceFromHash('skills')).toBe('skills');
  });

  it('falls back to about for an empty or root hash', () => {
    expect(workspaceFromHash('')).toBe('about');
    expect(workspaceFromHash('#/')).toBe('about');
  });

  it('falls back to about for an unknown workspace', () => {
    expect(workspaceFromHash('#/nope')).toBe('about');
    expect(workspaceFromHash('#/123')).toBe('about');
  });

  it('ignores trailing query/fragment noise', () => {
    expect(workspaceFromHash('#/projects?x=1')).toBe('about');
  });
});
