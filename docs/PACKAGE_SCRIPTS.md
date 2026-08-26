# Package Script Contract

When `package.json` is created, keep these script names stable:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:coverage": "vitest run --coverage",
    "check": "npm run lint && npm run format:check && npm run typecheck && npm run test && npm run build",
    "setup:hooks": "./scripts/setup-hooks.sh"
  }
}
```

Adjust commands to the actual tooling, but preserve the intent and stable names where practical.

The project should use a committed lockfile and CI should use:

```bash
npm ci
```
