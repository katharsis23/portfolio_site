import { Terminal } from './widgets/Terminal';
import { Settings } from './widgets/Settings';
import { PlayerWidget } from './widgets/PlayerWidget';

/**
 * Sidebar — the tiling right-hand column (~30-35% width) from the Hyprland
 * concept (docs/general_theme_concept.md). Stacked windows:
 *   Settings → Player → Terminal.
 *
 * The Shortcuts cheat-sheet moved to the left column, directly under the hero
 * window (see AppShell `.shell-subrow`), so the terminal gets the whole
 * remaining vertical run of this column and stays the most prominent utility.
 *
 * A compact, non-native music player sits between Settings and the terminal.
 * The standalone PerformanceMetrics widget was folded into the terminal
 * (`performance` / `systemctl status` / `fastfetch` commands) so the terminal
 * gets even more room. Reuses the shared `.widget / .window` chrome from
 * widgets.css so the look stays consistent.
 */
export function Sidebar() {
  return (
    <aside className="app-sidebar" aria-label="Utility windows">
      <Settings />
      <PlayerWidget />
      <Terminal />
    </aside>
  );
}
