/**
 * GitHub data-source — pure, dependency-free fetch layer.
 *
 * The two external sources this portfolio integrates with:
 *
 *   1. GitHub REST API  → structured profile stats.
 *      https://api.github.com/users/:username
 *
 *   2. ghchart          → an SVG contribution-graph image.
 *      https://ghchart.rshah.org/:username
 *
 * Both are exposed as small, stable functions/constants so consumers never
 * hardcode the endpoints or the parsing. Fetch failures throw and are the
 * caller's responsibility to surface (see the AGENTS.md rule that optional
 * systems must fail independently).
 */
import type { GitHubProfile } from './types';
import { toGitHubProfile } from './types';

/** The canonical GitHub username this portfolio profiles. */
export const GITHUB_USERNAME = 'katharsis23';

/** REST endpoint for the user profile. */
export const GITHUB_PROFILE_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;

/** Endpoint for the user's GitHub activity chart (SVG image). */
export const GITHUB_CHART_URL = `https://ghchart.rshah.org/${GITHUB_USERNAME}`;

/** Absolute link to the user's GitHub profile page. */
export const GITHUB_HTML_URL = `https://github.com/${GITHUB_USERNAME}`;

/** Relative link to the downloadable CV asset in /public. */
export const CV_URL = '/Danylo.pdf';

function assertOk(res: Response): Response {
  if (!res.ok) {
    throw new Error(
      `GitHub profile request failed: ${res.status} ${res.statusText}`
    );
  }
  return res;
}

/**
 * Fetch and validate the GitHub profile.
 *
 * Uses the typed `toGitHubProfile` projection so the rest of the codebase only
 * ever sees the stable `GitHubProfile` contract, never raw JSON. Failed or
 * non-JSON responses reject with an Error the caller can handle locally.
 */
export async function fetchGitHubProfile(
  init?: RequestInit
): Promise<GitHubProfile> {
  const res = await fetch(GITHUB_PROFILE_URL, init);
  assertOk(res);
  const raw: unknown = await res.json();
  // Guard against null and arrays — both are `typeof 'object'` in JS but are
  // not valid profile records. `toGitHubProfile` expects a plain map.
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    throw new Error('GitHub profile response was not a JSON object');
  }
  return toGitHubProfile(raw as Record<string, unknown>);
}
