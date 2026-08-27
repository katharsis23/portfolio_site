# Architecture

## 1. Architectural Goal

The site must remain modular as features grow.

The target architecture is:

```text
Content
  ↓
Domain / System State
  ↓
Interaction Adapters
  ↓
UI Components
  ↓
Presentation / Effects
```

Do not allow visual components to become the application's source of truth.

---

## 2. Suggested Module Boundaries

```text
src/
├── app/
├── content/
├── system/
│   ├── navigation/
│   ├── input/
│   ├── keyboard/
│   ├── touch/
│   ├── lifecycle/
│   └── performance/
├── ui/
│   ├── waybar/
│   ├── workspace/
│   ├── window/
│   ├── terminal/
│   ├── settings/
│   ├── help/
│   └── fastfetch/
├── theme/
├── audio/
├── integrations/
└── styles/
```

This is a starting point, not a rigid filesystem contract.

---

## 3. Single Source of Truth

Navigation should have one canonical operation:

```ts
navigate(workspace)
```

Input sources may include:

```text
Waybar click
keyboard
touch
terminal
URL
screen reader
```

They all converge on the same system operation.

---

## 4. State Ownership

State should live at the narrowest useful scope.

Examples:

```text
Terminal open/closed
→ terminal/system state

Current workspace
→ navigation state

Theme
→ theme state

Cava playback/render state
→ audio subsystem

Temporary button hover
→ local UI state
```

Do not put every piece of state into one global store.

---

## 5. Module Contract

A module should expose a small public API.

Example:

```ts
export interface NavigationController {
  current(): Workspace;
  navigate(target: Workspace): void;
  next(): void;
  previous(): void;
}
```

Internal implementation details stay private.

Prefer:

```text
module/index.ts
```

as the public boundary.

Avoid importing deep internal files from unrelated modules.

---

## 6. Dependency Rules

### Allowed

```text
UI → system
UI → feature module
feature → shared domain types
```

### Avoid

```text
theme → terminal
terminal → Cava
Cava → navigation UI
waybar → terminal internals
```

If two modules need to communicate, use a small stable interface or shared system action.

---

## 7. Presentation Must Be Replaceable

The semantic content should not depend on:

- Waybar;
- blur;
- floating windows;
- Cava;
- terminal decoration.

A Plain View should be possible without rewriting the portfolio content.

---

## 8. Lifecycle

Every expensive subsystem needs explicit lifecycle handling.

```text
initialize
    ↓
active
    ↓
pause
    ↓
resume
    ↓
cleanup
```

Examples:

### Audio

```text
play → start analysis
pause → stop analysis
hidden → stop rendering
unmount → cleanup AudioContext/listeners
```

### Polling

```text
start
→ fetch
→ cache
→ schedule next refresh

stop
→ clear timer
```

### Canvas

```text
visible + active → render
otherwise → no requestAnimationFrame loop
```

---

## 9. Error Boundaries

Optional systems must fail independently.

A GitHub API failure must not break:

- navigation;
- projects;
- theme;
- terminal.

An audio failure must not break the portfolio.

A theme generation failure must fall back to a known palette.

---

## 10. Performance Architecture

Initial rendering should prioritize:

```text
semantic content
navigation
readability
```

Then load:

```text
theme enhancement
external APIs
audio
visualizers
secondary windows
```

External systems must not block core rendering.

---

## 11. Architecture Smells

Stop and refactor if you see:

- a component > ~300 lines without a strong reason;
- a hook managing multiple unrelated subsystems;
- a global store containing unrelated UI state;
- duplicated navigation logic;
- `any` used to avoid fixing a type boundary;
- event listeners registered without cleanup;
- `setInterval` without cleanup;
- `requestAnimationFrame` without cancellation;
- feature modules importing each other's internals;
- a visual component owning domain state;
- tests that require unrelated systems to run.

The line counts are heuristics, not hard laws. Cohesion matters more than arbitrary numbers.
