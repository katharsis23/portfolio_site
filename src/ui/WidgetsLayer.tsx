import { Terminal, Settings, Shortcuts } from './widgets';
import type { ReactNode } from 'react';

export type WidgetId = 'terminal' | 'settings' | 'shortcuts';

interface WidgetsLayerProps {
  open: WidgetId[];
  onClose: (id: WidgetId) => void;
}

/**
 * WidgetsLayer — renders open utility windows (terminal, settings, shortcuts)
 * as floating Hyprland/Wayland-style surfaces layered above the content.
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
      {open.includes('shortcuts') && (
        <WidgetSlot id="shortcuts" onClose={() => onClose('shortcuts')}>
          <Shortcuts />
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
