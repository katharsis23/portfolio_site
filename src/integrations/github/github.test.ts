/**
 * Tests for the GitHub integration data sources (pure logic, Node env).
 * Covers the typed projection, canonical source URLs, and counter mapping.
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  GITHUB_USERNAME,
  GITHUB_PROFILE_URL,
  GITHUB_CHART_URL,
  GITHUB_HTML_URL,
  CV_URL,
  fetchGitHubProfile,
} from './github';
import { toGitHubProfile } from './types';
import { normalizeProfileCounters } from './useGitHubProfile';
import { profileToCells } from './GitHubWidget';

describe('GitHub source URLs', () => {
  it('exposes the canonical endpoint URLs for the profiled user', () => {
    expect(GITHUB_PROFILE_URL).toBe(
      `https://api.github.com/users/${GITHUB_USERNAME}`
    );
    expect(GITHUB_CHART_URL).toBe(
      `https://ghchart.rshah.org/${GITHUB_USERNAME}`
    );
    expect(GITHUB_HTML_URL).toBe(`https://github.com/${GITHUB_USERNAME}`);
  });

  it('points the CV download at the static asset in public/', () => {
    expect(CV_URL).toBe('/Danylo.pdf');
  });
});

describe('toGitHubProfile (API response projection)', () => {
  it('projects only the typed fields and normalises primitives', () => {
    const profile = toGitHubProfile({
      login: 'katharsis23',
      id: 147269421,
      node_id: 'U_foo',
      avatar_url: 'https://avatars.example/u.png',
      html_url: 'https://github.com/katharsis23',
      name: 'Danylo',
      company: null,
      blog: '',
      location: null,
      email: null,
      bio: null,
      twitter_username: null,
      hireable: null,
      public_repos: 17,
      public_gists: 0,
      followers: 3,
      following: 2,
      created_at: '2023-10-07T16:55:43Z',
      updated_at: '2026-08-17T17:48:35Z',
    });

    expect(profile.login).toBe('katharsis23');
    expect(profile.id).toBe(147269421);
    expect(profile.public_repos).toBe(17);
    expect(profile.name).toBe('Danylo');
    expect(profile.company).toBeNull();
  });

  it('ignores extra fields from the live payload', () => {
    const profile = toGitHubProfile({
      login: 'katharsis23',
      id: 1,
      node_id: 'foo',
      avatar_url: 'a',
      html_url: 'b',
      blog: '',
      public_repos: 5,
      public_gists: 0,
      followers: 1,
      following: 1,
      created_at: 'x',
      updated_at: 'y',
      some_unknown_field: 'should-not-exist',
    });
    expect(profile).not.toHaveProperty('some_unknown_field');
  });
});

describe('normalizeProfileCounters', () => {
  it('maps the profile to the compact counter set', () => {
    const profile = toGitHubProfile({
      login: 'x',
      id: 1,
      node_id: '',
      avatar_url: '',
      html_url: '',
      blog: '',
      public_repos: 17,
      public_gists: 0,
      followers: 3,
      following: 2,
      created_at: '',
      updated_at: '',
    });
    expect(normalizeProfileCounters(profile)).toEqual({
      repos: 17,
      followers: 3,
      following: 2,
      gists: 0,
    });
  });
});

describe('profileToCells', () => {
  it('renders each counter as a stable labelled cell', () => {
    const profile = toGitHubProfile({
      login: 'x',
      id: 1,
      node_id: '',
      avatar_url: '',
      html_url: '',
      blog: '',
      public_repos: 17,
      public_gists: 0,
      followers: 3,
      following: 2,
      created_at: '',
      updated_at: '',
    });
    expect(profileToCells(profile)).toEqual([
      { key: 'repos', label: 'Repos', value: 17 },
      { key: 'followers', label: 'Followers', value: 3 },
      { key: 'following', label: 'Following', value: 2 },
      { key: 'gists', label: 'Gists', value: 0 },
    ]);
  });
});

describe('fetchGitHubProfile', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('resolves to a typed profile on a 200 response', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () =>
        Promise.resolve({
          login: 'katharsis23',
          id: 147269421,
          node_id: '',
          avatar_url: 'a',
          html_url: 'b',
          blog: '',
          public_repos: 17,
          public_gists: 0,
          followers: 3,
          following: 2,
          created_at: 'x',
          updated_at: 'y',
        }),
    }) as unknown as typeof fetch;

    await expect(fetchGitHubProfile()).resolves.toMatchObject({
      login: 'katharsis23',
      public_repos: 17,
    });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      `https://api.github.com/users/katharsis23`,
      undefined
    );
  });

  it('rejects on a non-OK response', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    }) as unknown as typeof fetch;

    await expect(fetchGitHubProfile()).rejects.toThrow(/404/);
  });

  it('rejects on a non-object JSON payload', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve(['not', 'an', 'object']),
    }) as unknown as typeof fetch;

    await expect(fetchGitHubProfile()).rejects.toThrow(/JSON object/);
  });
});
