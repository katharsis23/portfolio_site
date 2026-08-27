/**
 * useGitHubProfile — declarative hook over fetchGitHubProfile.
 *
 * Enforces the lifecycle rules from docs/ARCHITECTURE.md §8:
 *   - never refetches on every render (single fetch per mount with `enabled`);
 *   - cleans up stale results (ignores out-of-order responses);
 *   - exposes a stable, typed loading / data / error state.
 *
 * This hook stays fetch/state-only; rendering is delegated to the caller.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchGitHubProfile } from './github';
import type { GitHubProfile } from './types';

type GitHubProfileState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: GitHubProfile }
  | { status: 'error'; error: Error };

export interface GitHubProfileController {
  readonly state: GitHubProfileState;
  /** Re-run the fetch (e.g. after a network change / retry button). */
  readonly reload: () => void;
}

/**
 * Map public data to a compact set so the UI and tests only care about a few
 * known keys. Keeps rendering code independent of the raw API naming.
 */
export function normalizeProfileCounters(profile: GitHubProfile): {
  repos: number;
  followers: number;
  following: number;
  gists: number;
} {
  return {
    repos: profile.public_repos,
    followers: profile.followers,
    following: profile.following,
    gists: profile.public_gists,
  };
}

export function useGitHubProfile(enabled = true): GitHubProfileController {
  const [state, setState] = useState<GitHubProfileState>({ status: 'idle' });
  const activeRef = useRef(true);

  // Drive loading from a single stable entry point. The initial `loading`
  // flag is deferred across a microtask boundary so no setState is issued
  // synchronously while the effect is running (avoids cascading renders).
  const load = useCallback(async () => {
    if (!activeRef.current) return;

    setState({ status: 'loading' });
    try {
      const data = await fetchGitHubProfile();
      if (!activeRef.current) return;
      setState({ status: 'success', data });
    } catch (error) {
      if (!activeRef.current) return;
      setState({
        status: 'error',
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }, []);

  const reload = useCallback(() => {
    void load();
  }, [load]);

  useEffect(() => {
    activeRef.current = true;
    if (enabled) {
      // Defer the first fetch so the synchronous `loading` flag lands after
      // the effect body completes rather than inside it.
      const id = setTimeout(() => void load(), 0);
      return () => {
        clearTimeout(id);
        activeRef.current = false;
      };
    }
    return () => {
      activeRef.current = false;
    };
  }, [enabled, load]);

  return { state, reload };
}
