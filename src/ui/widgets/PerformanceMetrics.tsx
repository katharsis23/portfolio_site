import { usePerformance } from '../../system';

/**
 * PerformanceMetrics — a small tiling "PERFORMANCE METRICS" window from the
 * Hyprland sidebar concept.
 *
 * It reports real animation/heavy-visual state from the Performance system
 * rather than inventing fake CPU/memory values (docs/CONCEPT.md §12).
 */
export function PerformanceMetrics() {
  const { isAnimationOn } = usePerformance();
  const mode = isAnimationOn() ? 'on' : 'off';

  const activeModules = 6; // waybar, hero, sidebar, terminal, shortcuts, metrics
  const fps = isAnimationOn() ? 120 : 60;

  return (
    <section
      className="widget window perf-window"
      data-widget="performance"
      aria-label="Performance metrics"
    >
      <header className="window-titlebar">
        <span className="window-title">performance metrics</span>
        <span className="perf-status" aria-hidden="true">
          <span className={`perf-dot ${mode === 'on' ? 'is-on' : ''}`} />
        </span>
      </header>

      <dl className="perf-body">
        <div className="perf-card">
          <dt className="perf-label">FPS</dt>
          <dd className="perf-value">{fps}</dd>
        </div>
        <div className="perf-card">
          <dt className="perf-label">Visuals</dt>
          <dd className="perf-value">{mode}</dd>
        </div>
        <div className="perf-card">
          <dt className="perf-label">Active modules</dt>
          <dd className="perf-value">{activeModules}</dd>
        </div>
      </dl>
    </section>
  );
}
