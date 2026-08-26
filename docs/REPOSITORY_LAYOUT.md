# Repository Layout

Recommended initial layout:

```text
.
├── AGENTS.md
├── README.md
├── package.json
├── .gitignore
├── .githooks/
│   └── pre-commit
├── .github/
│   └── workflows/
│       └── ci.yml
├── scripts/
│   └── setup-hooks.sh
├── docs/
│   ├── CONCEPT.md
│   ├── ARCHITECTURE.md
│   ├── WORKFLOW.md
│   ├── TESTING.md
│   └── REPOSITORY_LAYOUT.md
└── src/
    ├── app/
    ├── content/
    ├── system/
    ├── ui/
    ├── theme/
    ├── audio/
    └── integrations/
```

The exact source tree can evolve.

The important constraint is that responsibilities remain separated and public module boundaries remain understandable.
