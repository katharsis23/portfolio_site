import { Terminal } from './widgets/Terminal';
import { Shortcuts } from './widgets/Shortcuts';
import { Settings } from './widgets/Settings';

/**
 * Sidebar — the tiling right-hand column (~30-35% width) from the Hyprland
 * concept (docs/general_theme_concept.md). Stacked windows:
 *   Settings → Terminal → Shortcuts.
 *
 * The standalone PerformanceMetrics widget was folded into the terminal
 * (`performance` / `systemctl status` / `fastfetch` commands) so the terminal
 * gets the extra vertical space and stays the most prominent utility.
 *
 * The Settings window sits here so theme switching and the performance-mode
 * toggle are always at hand. Reuses the shared `.widget / .window` chrome from
 * widgets.css so the look stays consistent.
 */
export function Sidebar() {
  return (
    <aside className="app-sidebar" aria-label="Utility windows">
      <Settings />
      <Terminal />
      <Shortcuts />
    </aside>
  );
}
