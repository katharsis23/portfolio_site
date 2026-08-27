import { Terminal, Settings } from './widgets';
import type { ReactNode } from 'react';

export type WidgetId = 'terminal' | 'settings';

interface WidgetsLayerProps {
  open: WidgetId[];
  onClose: (id: WidgetId) => void;
}

/**
 * WidgetsLayer — renders open utility windows (terminal, settings) as floating
 * Hyprland/Wayland-style surfaces layered above the content.
 *
 * The Shortcuts cheat-sheet is not floating anymore: it now lives permanently
 * under the hero window in the tiling grid (AppShell `.shell-subrow`), so the
 * sidebar + floating layer stay focused on the terminal and settings.
 *
 * Each widget renders its own window shell (title bar + body). The layer
 * positions them and adds a visible close control. On touch/small screens
 * they stack as panels instead of floaters (see widgets.css).
 */
export function WidgetsLayer({ open, onClose }: WidgetsLayerProps) {
  return (
    <div className="widgets-layer" aria-label="Utility windows">
      {open.includes('terminal') && (
        <WidgetSlot id="terminal" onClose={() => onClose('terminal')}>
          <Terminal />
        </WidgetSlot>
      )}
      {open.includes('settings') && (
        <WidgetSlot id="settings" onClose={() => onClose('settings')}>
          <Settings />
        </WidgetSlot>
      )}
    </div>
  );
}

function WidgetSlot({
  id,
  onClose,
  children,
}: {
  id: WidgetId;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="widget-slot" data-widget={id}>
      <button
        type="button"
        className="widget-close"
        onClick={onClose}
        aria-label={`Close ${id} window`}
      >
        ✕
      </button>
      {children}
    </div>
  );
}
