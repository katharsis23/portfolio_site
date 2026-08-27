// Performance mode (animation / heavy visuals on | off)
export { PerformanceProvider, usePerformance } from './performance';

// Canonical workspace navigation (single source of truth for navigate()).
export { NavigationProvider, useNavigation } from './navigation';

// Three-layer lazy-loading utilities (static / dynamic / lazy canvas).
export { LazyMount, LazyWhenVisible } from './lazy';

// Navigation domain types.
export {
  WORKSPACES,
  resolveWorkspace,
  resolveWorkspaceByIndex,
  nextWorkspace,
  previousWorkspace,
  type WorkspaceDefinition,
  type WorkspaceId,
  type NavigationController,
} from './navigation';
