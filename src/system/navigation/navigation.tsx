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

function readInitial(): WorkspaceDefinition {
  if (typeof window === 'undefined') {
    return WORKSPACES[0];
  }
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return resolveWorkspace(saved);
  }
  // URL hash like #/projects
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash) {
    return resolveWorkspace(hash);
  }
  return WORKSPACES[0];
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<WorkspaceDefinition>(readInitial);

  const navigate = useCallback((target: WorkspaceId) => {
    setCurrent(resolveWorkspace(target));
  }, []);

  const navigateByIndex = useCallback((index: number) => {
    setCurrent(resolveWorkspaceByIndex(index));
  }, []);

  const next = useCallback(() => {
    setCurrent((cur) => nextWorkspace(cur.id));
  }, []);

  const previous = useCallback(() => {
    setCurrent((cur) => previousWorkspace(cur.id));
  }, []);

  return (
    <NavigationContext.Provider
      value={useMemo(
        () => ({ current, navigate, navigateByIndex, next, previous }),
        [current, navigate, navigateByIndex, next, previous]
      )}
    >
      {children}
      <NavigationSync activeId={current.id} />
    </NavigationContext.Provider>
  );
}

/**
 * Keeps the URL hash and a persisted value in sync with the active workspace.
 * Back/reload restores the workspace from the hash via readInitial.
 */
function NavigationSync({ activeId }: { activeId: WorkspaceId }) {
  useEffect(() => {
    const hash = activeId === 'about' ? '#/' : `#/${activeId}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash);
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, activeId);
    } catch {
      /* best effort persistence */
    }
  }, [activeId]);

  return null;
}

export function useNavigation(): NavigationController {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
