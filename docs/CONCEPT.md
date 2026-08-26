# Product Concept

## 1. Identity

This is a portfolio presented as a lightweight desktop-like environment inspired by:

- Hyprland;
- Wayland;
- Linux ricing;
- terminal workflows;
- Material You;
- modern responsive web interfaces.

The key statement is:

> **Linux is the visual metaphor, not a requirement for using the site.**

A non-technical visitor should see a polished portfolio.

A Linux enthusiast should discover a deeper interaction layer.

---

## 2. Experience Model

```text
Semantic Portfolio
        ↓
Interaction Layer
        ↓
Hyprland / Ricing Presentation
        ↓
Optional System Toys
```

The lower layers must never become prerequisites for the upper layers.

---

## 3. Progressive Complexity

### Level 1 — Normal visitor

Visible:

- portfolio sections;
- buttons;
- links;
- workspace navigation;
- help;
- contact;
- projects.

No Linux knowledge required.

### Level 2 — Power user

Optional:

- keyboard shortcuts;
- workspace shortcuts;
- edge gestures;
- floating utility windows;
- quick settings.

### Level 3 — Linux enthusiast

Optional:

- terminal;
- `help`;
- `fastfetch`;
- `performance`;
- `systemctl status`;
- theme commands;
- music commands;
- easter eggs.

Advanced features are shortcuts to existing capabilities, not hidden requirements.

---

## 4. Portfolio Sections

The initial information architecture:

```text
1: about
2: experience
3: skills
4: education
5: projects
6: contact
```

Navigation must remain compatible with:

- visible controls;
- keyboard;
- touch;
- screen readers;
- URL/hash navigation;
- browser Back/Forward.

---

## 5. Visual Language

### Waybar

Desktop:

- top fixed/floating bar;
- workspace pills;
- system utilities;
- restrained blur;
- monospace typography;
- dynamic Material You colors.

Mobile:

- bottom dock;
- touch-friendly controls;
- same conceptual vocabulary;
- not a generic mobile navigation bar.

### Floating windows

Reserved for secondary tools:

- terminal;
- settings;
- help;
- fastfetch;
- music;
- project preview.

The primary portfolio content remains stable.

---

## 6. Accessibility

Accessibility is not a separate theme.

The semantic portfolio must remain usable if:

- animations are removed;
- blur is removed;
- floating windows become normal panels;
- terminal decoration is removed;
- JavaScript enhancements fail.

### Plain View

A clean semantic presentation with minimal effects.

### Focus Mode

A distraction-reduced presentation that hides non-essential visual systems.

### Motion

Respect `prefers-reduced-motion`.

System preference takes precedence over decorative animation settings.

---

## 7. Touch Philosophy

Normal vertical scrolling is sacred.

Horizontal navigation should only happen in carefully controlled interaction zones such as:

- the viewport edge;
- the mobile Waybar.

Do not globally hijack horizontal gestures.

Browser/OS gestures cannot be fully controlled by a web application, so the goal is to minimize conflicts rather than claim to eliminate them.

---

## 8. Terminal

The terminal is a secondary interface.

Example:

```text
> help
> about
> projects
> fastfetch
> performance
> systemctl status
> theme catppuccin
> music play
> sudo hire-me
```

Every important terminal command must have a visible equivalent.

The terminal uses real form/input semantics.

It is not a collection of fake clickable `<div>` elements.

---

## 9. Dynamic Theme

Wallpaper:

```text
Wallpaper
   ↓
Color extraction
   ↓
Material palette
   ↓
Contrast validation
   ↓
CSS tokens
```

Generated colors must not sacrifice readable contrast.

A fallback palette must always exist.

---

## 10. Music and Cava

Music is optional.

Cava is decorative.

The visualizer must stop when:

- audio is stopped;
- the module is hidden;
- the document becomes hidden;
- the component is unmounted.

The accessible information is the track metadata and controls, not the visualization itself.

---

## 11. External Integrations

Optional:

- GitHub;
- Last.fm.

Rules:

- never block initial rendering;
- cache when appropriate;
- handle failures gracefully;
- stop unnecessary polling;
- do not make external APIs a requirement for core portfolio navigation.

---

## 12. Optimization as a Feature

The site should demonstrate that visual complexity does not require wasteful runtime behavior.

Optional diagnostics may expose real information such as:

```text
> performance

FPS
Long tasks
Loaded assets
Active modules
Audio state
Animation state
Network state
```

Only measurements that can actually be obtained should be displayed.

Do not invent fake CPU, memory, or FPS values.

The stronger goal is lifecycle discipline:

```text
active → work
hidden → pause
inactive → sleep
destroyed → cleanup
```

---

## 13. The 3-Second Rule

A first-time visitor should understand within a few seconds:

1. this is a portfolio;
2. who the author is;
3. what the author does;
4. where projects can be found.

The rice should frame the content, not obscure it.

---

## 14. Core Product Rule

> **Portfolio first. Toy second.**

The website can be playful.

It must never become an operating-system simulator that makes recruiters work to find the portfolio.
