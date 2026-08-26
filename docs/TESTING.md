# Testing and Quality Gates

## 1. Testing Philosophy

Tests are part of the architecture.

The goal is not maximum test count.

The goal is confidence that the interaction model remains stable while the visual layer evolves.

---

## 2. Test Layers

### Unit tests

For pure logic:

- command parser;
- navigation state;
- theme calculations;
- utility functions;
- lifecycle helpers.

### Component tests

For UI behavior:

- buttons;
- Waybar;
- terminal;
- dialogs;
- workspace controls.

### Integration tests

For interactions crossing module boundaries:

- keyboard → navigation;
- terminal → navigation;
- URL → navigation;
- settings → theme;
- audio → visualizer lifecycle.

### End-to-end tests

Add browser-level tests for critical user journeys when the project reaches that stage:

```text
open site
→ navigate to projects
→ open project
→ return
→ open help
→ use mobile layout
```

---

## 3. Mandatory Accessibility Coverage

Critical interactive components must be tested for:

- accessible name;
- keyboard reachability;
- focus visibility/management;
- correct role/state;
- dialog open/close behavior;
- `aria-current` where appropriate;
- dynamic announcement behavior where appropriate.

Automated axe checks are useful, but they do not replace manual keyboard and screen-reader testing.

---

## 4. Navigation Tests

Navigation tests must cover:

```text
navigate("projects")
next()
previous()
1–6 keyboard shortcuts
URL/hash synchronization
browser history
unknown section fallback
```

---

## 5. Lifecycle Tests

For resource-owning modules verify:

```text
mount → initialize
hide → pause
show → resume
unmount → cleanup
```

Especially for:

- Cava;
- Web Audio;
- polling;
- timers;
- event listeners;
- animation loops.

---

## 6. Performance Tests

Do not make fake performance assertions such as:

```text
expect(fps).toBe(60)
```

unless the test environment actually provides a meaningful measurement.

Prefer behavioral guarantees:

```text
hidden visualizer does not schedule frames
inactive polling is stopped
audio is not initialized before explicit play
external API is not required for initial render
```

---

## 7. Required Local Commands

The project should expose stable npm scripts:

```text
npm run lint
npm run format:check
npm run typecheck
npm run test
npm run test:coverage
npm run build
npm run check
```

`npm run check` is the local quality gate.

---

## 8. CI

CI should run on:

- pull requests;
- pushes to the protected/default branch.

At minimum:

```text
install
lint
format check
typecheck
unit/component tests
build
```

End-to-end tests may be added as a separate CI job once the application is ready for them.

---

## 9. Local Git Hook

The pre-commit hook should run the fast quality gate:

```text
lint
format check
typecheck
unit/component tests
```

Do not run expensive production or full browser tests on every commit unless they become fast enough.

CI remains the final authority.
