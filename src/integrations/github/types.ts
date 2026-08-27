/**
 * GitHub API — public user payload (subset of GET /users/:username).
 *
 * Kept intentionally narrow: we only describe the fields this portfolio
 * actually reads. The remote response is a superset; unknown fields are
 * dropped, never promoted to `any`.
 *
 * Docs: https://docs.github.com/en/rest/users/users#get-a-user
 */

export interface GitHubProfile {
  readonly login: string;
  readonly id: number;
  readonly node_id: string;
  readonly avatar_url: string;
  readonly html_url: string;
  readonly name: string | null;
  readonly company: string | null;
  readonly blog: string;
  readonly location: string | null;
  readonly email: string | null;
  readonly bio: string | null;
  readonly twitter_username: string | null;
  readonly hireable: boolean | null;
  readonly public_repos: number;
  readonly public_gists: number;
  readonly followers: number;
  readonly following: number;
  readonly created_at: string;
  readonly updated_at: string;
}

/**
 * The full REST response for a user contains more fields than we type.
 * `toGitHubProfile` is the single projection that keeps the typed contract
 * in sync with the live payload, so the UI never touches raw JSON.
 */
export function toGitHubProfile(raw: Record<string, unknown>): GitHubProfile {
  return {
    login: String(raw.login ?? ''),
    id: Number(raw.id ?? 0),
    node_id: String(raw.node_id ?? ''),
    avatar_url: String(raw.avatar_url ?? ''),
    html_url: String(raw.html_url ?? ''),
    name: raw.name == null ? null : String(raw.name),
    company: raw.company == null ? null : String(raw.company),
    blog: String(raw.blog ?? ''),
    location: raw.location == null ? null : String(raw.location),
    email: raw.email == null ? null : String(raw.email),
    bio: raw.bio == null ? null : String(raw.bio),
    twitter_username:
      raw.twitter_username == null ? null : String(raw.twitter_username),
    hireable: raw.hireable == null ? null : Boolean(raw.hireable),
    public_repos: Number(raw.public_repos ?? 0),
    public_gists: Number(raw.public_gists ?? 0),
    followers: Number(raw.followers ?? 0),
    following: Number(raw.following ?? 0),
    created_at: String(raw.created_at ?? ''),
    updated_at: String(raw.updated_at ?? ''),
  };
}
