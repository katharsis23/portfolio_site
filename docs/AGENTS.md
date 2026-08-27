# AGENTS.md

## Purpose

This repository contains a portfolio website whose visual language is inspired by Hyprland, Wayland, Linux ricing, terminal workflows, and Material You.

The goal is not to emulate an operating system for its own sake.

> **Linux is the visual metaphor, not a requirement for using the site.**

The portfolio must remain understandable to a non-technical visitor while giving technically minded visitors progressively deeper interaction.

This file is the primary instruction set for AI coding agents working in this repository.

---

# 1. Instruction Priority

When making changes, use this order of authority:

1. Explicit user request in the current task.
2. This `AGENTS.md`.
3. `docs/CONCEPT.md`.
4. `docs/ARCHITECTURE.md`.
5. `docs/WORKFLOW.md`.
6. `docs/TESTING.md`.
7. Existing code conventions and local documentation.

Do not silently change architectural rules because a different implementation is easier.

If requirements conflict, stop and explain the conflict before making a destructive architectural decision.

---

# 2. Core Product Principles

## 2.1 Portfolio first

A visitor must be able to:

- understand who the author is;
- understand what the author does;
- navigate the portfolio;
- inspect projects;
- find contact information;

without knowing Linux, Hyprland, terminals, Vim, or keyboard shortcuts.

The Linux/rice layer is enhancement, not a prerequisite.

## 2.2 Progressive complexity

The interface has three interaction levels:

### Normal user

- visible navigation;
- ordinary links and buttons;
- normal scrolling;
- visible help.

### Power user

- keyboard shortcuts;
- workspace shortcuts;
- touch gestures;
- floating utility windows;
- quick settings.

### Linux enthusiast

- terminal commands;
- fastfetch;
- system-like diagnostics;
- optional easter eggs.

Every advanced interaction must have a discoverable alternative.

## 2.3 Accessibility is architecture

Do not build a visually complete UI and add accessibility afterward.

Semantic HTML, keyboard navigation, focus management, reduced motion, touch behavior, and screen-reader behavior are part of the component design.

## 2.4 Performance is a feature

Every visual effect has a resource cost.

Do not keep expensive:

- animation loops;
- polling;
- Web Audio processing;
- canvas rendering;
- API requests;

active when the corresponding feature is inactive.

## 2.5 Mobile is a first-class platform

Do not create a desktop UI and merely shrink it.

Mobile has its own interaction model while preserving the same information architecture.

Normal vertical scrolling must never be sacrificed for the desktop metaphor.

---

# 3. Mandatory Modularity Rule

## The site MUST be modular.

Do not create a giant component, giant store, giant hook, or giant utility file that owns unrelated behavior.

A feature should have a clear boundary:

```text
feature/
├── component/
├── state/
├── logic/
├── tests/
└── index.ts
```

Exact folder structure may evolve, but ownership must remain explicit.

### Single responsibility

A module should answer one primary question.

Bad:

```text
PortfolioApp.tsx
├── routing
├── touch gestures
├── terminal parser
├── audio
├── theme generation
├── GitHub API
└── accessibility
```

Good:

```text
navigation/
terminal/
theme/
audio/
integrations/
accessibility/
performance/
```

### Dependency direction

Prefer:

```text
Content
  ↓
Domain/System state
  ↓
Interaction adapters
  ↓
UI
  ↓
Visual effects
```

Do not allow low-level visual components to become the source of truth for application state.

### No duplicated business logic

Mouse, keyboard, touch, URL navigation, and terminal commands must eventually call the same system action.

For example:

```ts
navigate("projects")
```

must be the canonical operation.

Do not implement five independent versions of project navigation.

---

# 4. Before Coding

For every non-trivial task:

1. Read the relevant documentation.
2. Inspect the existing implementation.
3. Identify the module that owns the behavior.
4. Identify existing tests.
5. Make the smallest coherent change.
6. Add or update tests.
7. Run the relevant quality gates.
8. Review the diff for architectural regressions.

Do not rewrite unrelated code.

Do not introduce a new dependency when the existing stack already solves the problem adequately.

---

# 5. AI Coding Workflow

Work in small, verifiable increments.

Preferred loop:

```text
Understand
   ↓
Plan
   ↓
Implement one module
   ↓
Test
   ↓
Review
   ↓
Commit-sized change
```

Do not implement multiple unrelated systems in one pass.

For example, do not implement:

```text
terminal + Cava + themes + mobile gestures
```

in a single change.

Instead:

```text
navigation
→ tests
→ review

terminal
→ tests
→ review

theme
→ tests
→ review
```

---

# 6. Required Test Expectations

Every behavior change must include tests appropriate to the layer.

At minimum:

### Pure logic

Unit tests.

### React/UI behavior

Component/integration tests.

### Navigation

Test:

- direct navigation;
- keyboard navigation;
- URL synchronization;
- browser history;
- current workspace state.

### Accessibility

Test:

- semantic landmarks;
- keyboard reachability;
- accessible names;
- focus behavior;
- dialog behavior;
- important dynamic announcements.

Use automated accessibility checks where practical, but do not treat automated checks as proof of full accessibility.

### Performance-sensitive systems

Test lifecycle behavior where possible:

- inactive components do not keep loops alive;
- hidden features stop expensive work;
- polling is cleaned up;
- listeners are removed.

### Build

The production build must pass.

---

# 7. Quality Gates

The project uses:

- TypeScript strict mode;
- ESLint;
- Prettier;
- Vitest;
- Testing Library;
- automated accessibility checks where appropriate;
- production build checks;
- GitHub Actions CI.

The exact commands are defined in `package.json`.

The canonical local gate is:

```bash
npm run check
```

A change is not complete if the relevant quality gate fails.

Never hide a failing test or lint rule merely to make CI green.

---

# 8. Git Workflow

Prefer small commits with one coherent purpose.

Examples:

```text
feat(navigation): add workspace controller
feat(terminal): add command parser
feat(theme): add material palette state
test(navigation): cover browser history
fix(mobile): prevent terminal viewport overflow
refactor(system): isolate interaction adapters
docs(architecture): define module boundaries
```

Avoid meaningless commits such as:

```text
fix
changes
update
stuff
```

Do not commit generated build artifacts unless the repository explicitly requires them.

---

# 9. Dependencies

Before adding a dependency:

1. Check whether the browser/platform already provides the capability.
2. Check whether the current project already has an equivalent.
3. Consider bundle size and runtime cost.
4. Consider accessibility implications.
5. Consider maintenance cost.
6. Add the smallest dependency that solves the problem.

Do not add a library just because it is popular.

---

# 10. Forbidden Shortcuts

Do not:

- use `any` to bypass TypeScript errors;
- disable ESLint rules without a documented reason;
- disable accessibility rules merely to silence warnings;
- duplicate navigation state;
- put unrelated state into a global store;
- create invisible click targets for important actions;
- hijack normal vertical scrolling;
- make hover the only way to access functionality;
- use animation as the only way to communicate state;
- add permanent polling or animation loops without lifecycle handling;
- fake performance metrics;
- claim browser capabilities that are not actually measured.

---

# 11. When Requirements Are Unclear

Do not invent large architectural decisions silently.

If the ambiguity is local and low-risk, choose the smallest reversible solution.

If it affects:

- architecture;
- accessibility;
- data model;
- navigation;
- dependency strategy;
- performance model;

state the assumption and prefer a documented decision.

---

# 12. Definition of Done

A task is done when:

- the requested behavior works;
- the module boundary remains clean;
- tests cover the changed behavior;
- accessibility has been considered;
- mobile behavior has been considered where relevant;
- no unnecessary background work was introduced;
- lint/typecheck/tests/build pass;
- the diff contains no unrelated refactor;
- documentation is updated when the architecture or workflow changes.
