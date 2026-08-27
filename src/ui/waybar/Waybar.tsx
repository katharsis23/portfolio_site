import { useEffect, useState } from 'react';
import { useNavigation, WORKSPACES } from '../../system';
import type { WidgetId } from '../WidgetsLayer';

interface WaybarProps {
  onToggleWidget?: (id: WidgetId) => void;
}

const UTILITY_BUTTONS: { id: WidgetId; label: string; glyph: string }[] = [
  { id: 'terminal', label: 'Terminal', glyph: '❯_' },
  { id: 'settings', label: 'Settings', glyph: '⚙' },
  { id: 'shortcuts', label: 'Shortcuts', glyph: '?' },
];

/**
 * Waybar — the workspace + status bar (top floating bar on desktop).
 *
 * Workspace pills mirror Hyprland's workspace switching. Each pill is a real
 * link so it works via mouse, keyboard, URL hash and screen readers.
 * Utility buttons open the floating windows; they are the visible equivalent
 * of the keyboard shortcuts (progressive accessibility).
 *
 * The right side reports the current time and CPU usage. CPU is a visible
 * status read-out; it does not claim to instrument the host machine
 * (docs/CONCEPT.md §12).
 */
export function Waybar({ onToggleWidget }: WaybarProps) {
  const { current } = useNavigation();
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [cpu, setCpu] = useState('8%');

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(formatTime(new Date()));
      setCpu(`${Math.floor(Math.random() * 14 + 4)}%`);
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="waybar" aria-label="Site header">
      <div className="waybar-group">
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
              aria-label={`${ws.label} workspace`}
              aria-current={current.id === ws.id ? 'page' : undefined}
              title={ws.label}
            >
              {ws.index}
            </a>
          ))}
        </nav>

        <span className="waybar-sep" aria-hidden="true">
          |
        </span>

        <div className="waybar-status" role="status">
          <span className="waybar-status-item">
            <span aria-hidden="true">⚡</span> CPU {cpu}
          </span>
          <span className="waybar-status-item waybar-status-item--wm">
            <span aria-hidden="true">▦</span> Hyprland
          </span>
        </div>
      </div>

      <div className="waybar-group waybar-group--right">
        <div className="waybar-utils" role="group" aria-label="Utilities">
          {UTILITY_BUTTONS.map((btn) => (
            <button
              key={btn.id}
              type="button"
              className="waybar-util"
              onClick={() => onToggleWidget?.(btn.id)}
              aria-label={`Open ${btn.label}`}
              title={btn.label}
            >
              <span aria-hidden="true">{btn.glyph}</span>
              <span className="waybar-util-label">{btn.label}</span>
            </button>
          ))}
        </div>

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
