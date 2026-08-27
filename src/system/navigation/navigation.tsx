import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  nextWorkspace,
  previousWorkspace,
  resolveWorkspace,
  resolveWorkspaceByIndex,
  WORKSPACES,
  type WorkspaceDefinition,
  type WorkspaceId,
} from './workspaces';

const STORAGE_KEY = 'portfolio_active_workspace';

export interface NavigationController {
  /** The currently active workspace. */
  readonly current: WorkspaceDefinition;
  /** Canonical navigation operation. Every input adapter calls this. */
  navigate(target: WorkspaceId): void;
  /** Navigate by Hyprland-style workspace number (1-indexed). */
  navigateByIndex(index: number): void;
  /** Move to the next workspace (wraps). */
  next(): void;
  /** Move to the previous workspace (wraps). */
  previous(): void;
}

const NavigationContext = createContext<NavigationController | undefined>(
  undefined
);

export function workspaceFromHash(hash: string): WorkspaceId {
  return resolveWorkspace(hash.replace(/^#\/?/, '').trim()).id;
}

function readInitial(): WorkspaceDefinition {
  if (typeof window === 'undefined') {
    return WORKSPACES[0];
  }
  // The URL hash is the canonical source of truth for the current workspace.
  if (window.location.hash) {
    return resolveWorkspace(workspaceFromHash(window.location.hash));
  }
  // Fall back to a previously persisted workspace on first load.
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return resolveWorkspace(saved);
  }
  return WORKSPACES[0];
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<WorkspaceDefinition>(readInitial);

  const navigate = useCallback((target: WorkspaceId) => {
    const resolved = resolveWorkspace(target);
    setCurrent(resolved);
    syncHash(resolved.id);
  }, []);

  const navigateByIndex = useCallback((index: number) => {
    const resolved = resolveWorkspaceByIndex(index);
    setCurrent(resolved);
    syncHash(resolved.id);
  }, []);

  const next = useCallback(() => {
    const resolved = nextWorkspace(current.id);
    setCurrent(resolved);
    syncHash(resolved.id);
  }, [current.id]);

  const previous = useCallback(() => {
    const resolved = previousWorkspace(current.id);
    setCurrent(resolved);
    syncHash(resolved.id);
  }, [current.id]);

  // URL → state: react to browser Back/Forward, anchor clicks and manual hash
  // edits. This is what makes plain `<a href="#/projects">` navigation work.
  useEffect(() => {
    const onHashChange = () => {
      setCurrent(resolveWorkspace(workspaceFromHash(window.location.hash)));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Persist the active workspace for a friendlier first-load experience.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, current.id);
    } catch {
      /* best effort persistence */
    }
  }, [current.id]);

  return (
    <NavigationContext.Provider
      value={useMemo(
        () => ({ current, navigate, navigateByIndex, next, previous }),
        [current, navigate, navigateByIndex, next, previous]
      )}
    >
      {children}
    </NavigationContext.Provider>
  );
}

/** Update the URL hash without clobbering the scroll/anchor, idempotent. */
function syncHash(id: WorkspaceId) {
  if (typeof window === 'undefined') {
    return;
  }
  const next = id === 'about' ? '#/' : `#/${id}`;
  if (window.location.hash !== next) {
    window.history.pushState(null, '', next);
  }
}

export function useNavigation(): NavigationController {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
