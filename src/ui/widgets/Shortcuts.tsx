import { KEYMAP, type ShortcutDefinition } from '../../keyboard';

function formatKeys(shortcut: ShortcutDefinition): string {
  const key = shortcut.keys.join(' + ');
  return shortcut.alt ? `Alt + ${key}` : key;
}

/**
 * Shortcuts — keyboard shortcut reference shown as a floating window.
 *
 * Pure presentational mapping of KEYMAP so power users can look up the keys.
 * The window title is localised via the language context (`t`).
 */
export function Shortcuts({ t }: { t?: (key: string) => string }) {
  return (
    <section
      className="widget window"
      data-widget="shortcuts"
      aria-label="Keyboard shortcuts"
    >
      <header className="window-titlebar">
        <span className="window-title">
          {t ? t('shortcutsTitle') : 'shortcuts'}
        </span>
      </header>

      <dl className="shortcut-list">
        {Object.values(KEYMAP).map((shortcut) => (
          <div key={shortcut.id} className="shortcut-row">
            <dt className="shortcut-keys">
              <kbd>{formatKeys(shortcut)}</kbd>
            </dt>
            <dd className="shortcut-desc">{shortcut.description}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
