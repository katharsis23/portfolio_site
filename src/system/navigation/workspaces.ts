/**
 * Workspace domain model.
 *
 * The six portfolio sections are the canonical set of workspaces.
 * All navigation entry points (waybar, keyboard, terminal, URL, touch)
 * converge on the single `navigate` operation in navigation.tsx.
 */

export type WorkspaceId =
  'about' | 'experience' | 'skills' | 'projects' | 'education' | 'contact';

export interface WorkspaceDefinition {
  /** Canonical id, used in URLs, keyboard, terminal and navigation. */
  readonly id: WorkspaceId;
  /** Human readable label shown in the UI. */
  readonly label: string;
  /** Workspace number used by Hyprland-style pills (1-indexed). */
  readonly index: number;
}

export const WORKSPACES: readonly WorkspaceDefinition[] = [
  { id: 'about', label: 'About', index: 1 },
  { id: 'experience', label: 'Experience', index: 2 },
  { id: 'skills', label: 'Skills', index: 3 },
  { id: 'projects', label: 'Projects', index: 4 },
  { id: 'education', label: 'Education', index: 5 },
  { id: 'contact', label: 'Contact', index: 6 },
] as const;

const byId = new Map<WorkspaceId, WorkspaceDefinition>(
  WORKSPACES.map((w) => [w.id, w])
);

const byIndex = new Map<number, WorkspaceDefinition>(
  WORKSPACES.map((w) => [w.index, w])
);

/** Resolve a workspace by id, falling back to the About workspace. */
export function resolveWorkspace(id: string): WorkspaceDefinition {
  return byId.get(id as WorkspaceId) ?? WORKSPACES[0];
}

/** Resolve a workspace by its 1-indexed workspace number. */
export function resolveWorkspaceByIndex(index: number): WorkspaceDefinition {
  return byIndex.get(index) ?? WORKSPACES[0];
}

/** The nearest previous workspace id, wrapping to the last one. */
export function previousWorkspace(id: WorkspaceId): WorkspaceDefinition {
  const current = byId.get(id) ?? WORKSPACES[0];
  const idx = WORKSPACES.indexOf(current);
  return WORKSPACES[(idx - 1 + WORKSPACES.length) % WORKSPACES.length];
}

/** The nearest next workspace id, wrapping to the first one. */
export function nextWorkspace(id: WorkspaceId): WorkspaceDefinition {
  const current = byId.get(id) ?? WORKSPACES[0];
  const idx = WORKSPACES.indexOf(current);
  return WORKSPACES[(idx + 1) % WORKSPACES.length];
}
