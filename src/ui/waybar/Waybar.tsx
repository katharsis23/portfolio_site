import { useEffect, useState } from 'react';
import { useNavigation, WORKSPACES, useLanguage } from '../../system';

/**
 * Waybar — the workspace + status bar (top floating bar on desktop).
 *
 * Workspace pills mirror Hyprland's workspace switching. Each pill is a real
 * link so it works via mouse, keyboard, URL hash and screen readers. Pills are
 * labelled with real workspace names, localised through `tWorkspace`.
 *
 * The right side reports a minimal clock. Per the design simplification the
 * CPU read-out and the Terminal / Settings / Shortcuts utility icons were
 * dropped — the floating widgets stay reachable via keyboard shortcuts or from
 * the terminal (`help`). docs/CONCEPT.md §12.
 */
export function Waybar() {
  const { current } = useNavigation();
  const { tWorkspace } = useLanguage();
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(formatTime(new Date()));
    }, 30000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="waybar" aria-label="Site header">
      <nav className="waybar-workspaces" role="group" aria-label="Workspaces">
        {WORKSPACES.map((ws) => (
          <a
            key={ws.id}
            href={`#/${ws.id}`}
            className={
              current.id === ws.id
                ? 'waybar-pill waybar-pill--active'
                : 'waybar-pill'
            }
            aria-label={tWorkspace(ws.id)}
            aria-current={current.id === ws.id ? 'page' : undefined}
            title={tWorkspace(ws.id)}
          >
            {ws.index}
          </a>
        ))}
      </nav>

      <div className="waybar-group waybar-group--right">
        <span
          className="waybar-clock mono"
          role="timer"
          aria-label="Current time"
        >
          {time}
        </span>
      </div>
    </header>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
