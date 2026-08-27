import { useTheme } from '../../themes';
import { usePerformance } from '../../system';

export function Settings() {
  const { currentTheme, cachedThemes, themeSet, setTheme } = useTheme();
  const { mode, setMode } = usePerformance();

  return (
    <section
      className="widget window"
      data-widget="settings"
      aria-label="Settings"
    >
      <header className="window-titlebar">
        <span className="window-title">settings</span>
      </header>

      <div className="widget-body">
        <fieldset className="setting-field">
          <legend className="setting-label">Performance mode</legend>
          <label className="setting-toggle">
            <input
              type="checkbox"
              checked={mode}
              onChange={(e) => setMode(e.target.checked)}
            />
            Reduce heavy motion &amp; effects
          </label>
          <p className="setting-hint">
            When off, the glassmorphism blur and heavy visuals are disabled.
          </p>
        </fieldset>

        <fieldset className="setting-field">
          <legend className="setting-label">Theme</legend>
          <p className="setting-hint">
            Colours are extracted from the wallpaper (ColorThief).
          </p>
          {themeSet.size > 0 && (
            <ul className="setting-themes">
              {[...themeSet].map((id) => {
                const theme = cachedThemes[id];
                return (
                  <li key={id}>
                    <button
                      type="button"
                      className={
                        id === currentTheme.id
                          ? 'theme-button is-active'
                          : 'theme-button'
                      }
                      aria-pressed={id === currentTheme.id}
                      onClick={() => setTheme(id)}
                    >
                      {theme?.name ?? id}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </fieldset>
      </div>
    </section>
  );
}
