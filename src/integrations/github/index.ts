/**
 * GitHub integration — public boundary.
 *
 * External consumers should import from here, not from deep internal files.
 * This mirrors the "module/index.ts" contract in docs/ARCHITECTURE.md §5.
 */
export {
  GITHUB_USERNAME,
  GITHUB_PROFILE_URL,
  GITHUB_CHART_URL,
  GITHUB_HTML_URL,
  CV_URL,
  fetchGitHubProfile,
} from './github';

export { useGitHubProfile, normalizeProfileCounters } from './useGitHubProfile';
export type { GitHubProfileController } from './useGitHubProfile';

export { GitHubWidget, profileToCells } from './GitHubWidget';
export type { GitHubCounterCell } from './GitHubWidget';

export type { GitHubProfile } from './types';
export { toGitHubProfile } from './types';
