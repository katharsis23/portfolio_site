import { describe, it, expect } from 'vitest';
import {
  WORKSPACES,
  resolveWorkspace,
  resolveWorkspaceByIndex,
  nextWorkspace,
  previousWorkspace,
  type WorkspaceId,
} from './workspaces';

describe('workspaces domain model', () => {
  it('defines the six canonical portfolio sections in order', () => {
    expect(WORKSPACES.map((w) => w.id)).toEqual([
      'about',
      'experience',
      'skills',
      'projects',
      'education',
      'contact',
    ]);
    expect(WORKSPACES.map((w) => w.index)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(new Set(WORKSPACES.map((w) => w.id)).size).toBe(WORKSPACES.length);
  });

  it('resolves a known workspace by id', () => {
    expect(resolveWorkspace('projects').index).toBe(4);
    expect(resolveWorkspace('projects').id).toBe('projects');
  });

  it('falls back to About for an unknown id', () => {
    expect(resolveWorkspace('unknown').id).toBe('about');
    expect(resolveWorkspace('').id).toBe('about');
  });

  it('resolves a workspace by its 1-indexed number', () => {
    expect(resolveWorkspaceByIndex(1).id).toBe('about');
    expect(resolveWorkspaceByIndex(6).id).toBe('contact');
    expect(resolveWorkspaceByIndex(3).id).toBe('skills');
  });

  it('falls back to About for an out-of-range index', () => {
    expect(resolveWorkspaceByIndex(0).id).toBe('about');
    expect(resolveWorkspaceByIndex(7).id).toBe('about');
  });

  it('moves to the next workspace, wrapping to the first', () => {
    expect(nextWorkspace('about').id).toBe('experience');
    expect(nextWorkspace('contact').id).toBe('about');
  });

  it('moves to the previous workspace, wrapping to the last', () => {
    expect(previousWorkspace('about').id).toBe('contact');
    expect(previousWorkspace('projects').id).toBe('skills');
  });

  it('round-trips through all workspaces via next/previous', () => {
    let current: WorkspaceId = 'about';
    for (let i = 0; i < WORKSPACES.length; i++) {
      current = nextWorkspace(current).id;
    }
    expect(current).toBe('about');
  });
});
