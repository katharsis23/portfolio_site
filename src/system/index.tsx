// Performance mode (animation / heavy visuals on | off)
export { PerformanceProvider, usePerformance } from './performance';

// Canonical workspace navigation (single source of truth for navigate()).
export { NavigationProvider, useNavigation } from './navigation';

// Three-layer lazy-loading utilities (static / dynamic / lazy canvas).
export { LazyMount, LazyWhenVisible } from './lazy';

// Bilingual content + UI chrome strings.
export { LanguageProvider, useLanguage } from './language';
export type { LanguageId } from './language';

// Shared music player (sidebar widget + CAVA visualizer).
export { PlayerProvider, usePlayer } from './player';

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
