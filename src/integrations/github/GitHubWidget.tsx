/**
 * GitHubWidget — presentation for the GitHub integration.
 *
 * Renders the user's contribution chart (ghchart SVG) and, when the REST
 * profile has loaded, a compact set of live counters. It is intentionally a
 * thin consumer of the data sources; it holds no domain state other than the
 * fetch via `useGitHubProfile`.
 *
 * Failure is isolated: if the profile fetch fails, the chart and a retry hint
 * still render — the API must never break the rest of the portfolio.
 */
import { useGitHubProfile, normalizeProfileCounters } from './useGitHubProfile';
import { GITHUB_CHART_URL, GITHUB_HTML_URL } from './github';
import type { GitHubProfile } from './types';

export type GitHubCounterCell = {
  readonly key: string;
  readonly label: string;
  readonly value: number;
};

/** Map the live profile into presentable counter cells. */
export function profileToCells(profile: GitHubProfile): GitHubCounterCell[] {
  const { repos, followers, following, gists } =
    normalizeProfileCounters(profile);
  return [
    { key: 'repos', label: 'Repos', value: repos },
    { key: 'followers', label: 'Followers', value: followers },
    { key: 'following', label: 'Following', value: following },
    { key: 'gists', label: 'Gists', value: gists },
  ];
}

export function GitHubWidget() {
  const { state, reload } = useGitHubProfile(true);

  return (
    <section className="ws-section" aria-labelledby="github-heading">
      <h2 id="github-heading" className="ws-h2">
        GitHub
      </h2>

      {/* Contribution chart — a static SVG image, no extra network cost. */}
      <a
        href={GITHUB_HTML_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="ws-gh-chart-link"
        aria-label="GitHub contribution graph"
      >
        <img
          src={GITHUB_CHART_URL}
          alt="GitHub contribution graph"
          loading="lazy"
          className="ws-gh-chart"
        />
      </a>

      {state.status === 'loading' && (
        <p className="ws-meta" role="status">
          Loading profile…
        </p>
      )}
      {state.status === 'error' && (
        <p className="ws-meta" role="alert">
          {state.error.message}
        </p>
      )}
      {state.status === 'success' && (
        <div className="ws-gh-stats" role="list" aria-label="GitHub stats">
          {profileToCells(state.data).map((cell) => (
            <div key={cell.key} className="ws-gh-stat" role="listitem">
              <span className="ws-gh-stat-value">{cell.value}</span>
              <span className="ws-gh-stat-label">{cell.label}</span>
            </div>
          ))}
          {/* <button
            type="button"
            className="ws-btn ws-btn--ghost ws-gh-retry"
            onClick={reload}
          >
            Refresh
          </button> */}
        </div>
      )}
    </section>
  );
}
