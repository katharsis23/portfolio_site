/**
 * Integrations — public boundary for external data sources.
 *
 * Keeps the rest of the app decoupled from the concrete API details.
 * New sources (e.g. LinkedIn, LeetCode) would each get their own sub-module
 * and be re-exported here.
 */
export * from './github';
