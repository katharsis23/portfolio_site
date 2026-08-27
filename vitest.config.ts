import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Pure-logic unit tests run in Node. Component tests that need the DOM
    // should use `// @vitest-environment jsdom` per-file (requires jsdom).
    environment: 'node',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
