# Development Workflow

## 1. General Rule

Work in small, reversible, testable increments.

```text
Task
 ↓
Inspect
 ↓
Plan
 ↓
Implement
 ↓
Test
 ↓
Lint / Typecheck
 ↓
Review
 ↓
Commit
```

---

## 2. AI Agent Workflow

For every non-trivial request, the agent should:

### Step 1 — Understand

Read:

- `AGENTS.md`;
- relevant concept documentation;
- architecture documentation;
- existing implementation;
- relevant tests.

### Step 2 — Plan

Before editing, identify:

- affected modules;
- state ownership;
- accessibility implications;
- mobile implications;
- performance implications;
- tests required.

### Step 3 — Implement

Modify the smallest number of modules necessary.

Do not refactor unrelated code.

### Step 4 — Verify

Run the smallest useful test first.

Then run:

```bash
npm run check
npm run build
```

when the change is complete.

### Step 5 — Review

Inspect the final diff for:

- duplicated logic;
- architectural boundary violations;
- accessibility regressions;
- unnecessary dependencies;
- background work;
- unrelated modifications.

---

## 3. Task Sizing

Prefer tasks that can be completed in one focused change.

Good:

```text
Add keyboard navigation for workspaces.
```

Good:

```text
Add browser history synchronization to navigation.
```

Bad:

```text
Finish the entire portfolio.
```

Bad:

```text
Make the UI better.
```

---

## 4. Feature Development Order

When possible:

```text
semantic behavior
    ↓
state/controller
    ↓
tests
    ↓
basic UI
    ↓
responsive behavior
    ↓
visual polish
    ↓
performance optimization
```

Do not begin with animation.

---

## 5. Definition of Done

A feature is complete only when:

- behavior works;
- module ownership is clear;
- tests exist;
- keyboard behavior is considered;
- mobile behavior is considered;
- accessibility is considered;
- lifecycle is handled if resources are involved;
- lint passes;
- typecheck passes;
- tests pass;
- build passes.

---

## 6. Documentation Changes

Update documentation when a change affects:

- architecture;
- module boundaries;
- development commands;
- quality gates;
- accessibility principles;
- performance strategy;
- agent workflow.

Do not document implementation trivia that can be understood directly from clean code.

---

## 7. Git Commits

Use focused commits.

Recommended format:

```text
<type>(<scope>): <description>
```

Examples:

```text
feat(navigation): add workspace controller
fix(touch): restrict swipe handling to edge zone
test(terminal): cover command parsing
refactor(theme): isolate palette generation
docs(agent): define modularity rules
```

One conceptual change per commit where practical.
