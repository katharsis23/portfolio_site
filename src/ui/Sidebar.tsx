import { Terminal } from './widgets/Terminal';
import { Shortcuts } from './widgets/Shortcuts';
import { PerformanceMetrics } from './widgets/PerformanceMetrics';

/**
 * Sidebar — the tiling right-hand column (~30-35% width) from the Hyprland
 * concept (docs/general_theme_concept.md). Three stacked windows:
 *   Terminal → Performance Metrics → Shortcuts.
 *
 * Reuses the shared `.widget / .window` chrome from widgets.css so the look
 * stays consistent with the floating utility windows.
 */
export function Sidebar() {
  return (
    <aside className="app-sidebar" aria-label="Utility windows">
      <Terminal />
      <PerformanceMetrics />
      <Shortcuts />
    </aside>
  );
}
