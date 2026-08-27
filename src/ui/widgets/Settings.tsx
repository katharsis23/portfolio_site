import { useTheme } from '../../themes';
import { usePerformance, useLanguage } from '../../system';

/**
 * Settings — performance toggle, language selector and theme picker.
 *
 * Reads all copy through the language context directly (no externally passed
 * `t`), so it localises identically whether it is rendered in the sidebar
 * (Sidebar.tsx) or as a floating window (WidgetsLayer.tsx). The language
 * selector re-mounts the workspace body with an entrance transition
 * (see AppShell).
 */
export function Settings() {
  const { currentTheme, cachedThemes, themeSet, setTheme } = useTheme();
  const { mode, setMode } = usePerformance();
  const { t, lang, setLang } = useLanguage();

  return (
    <section
      className="widget window"
      data-widget="settings"
      aria-label="Settings"
    >
      <header className="window-titlebar">
        <span className="window-title">{t('settingsTitle')}</span>
      </header>

      <div className="widget-body">
        <fieldset className="setting-field">
          <legend className="setting-label">{t('performanceLabel')}</legend>
          <label className="setting-toggle">
            <input
              type="checkbox"
              checked={mode}
              onChange={(e) => setMode(e.target.checked)}
            />
            {t('performanceToggle')}
          </label>
          <p className="setting-hint">{t('performanceHint')}</p>
        </fieldset>

        <fieldset className="setting-field">
          <legend className="setting-label">{t('languageLabel')}</legend>
          <div className="setting-segmented">
            <button
              type="button"
              className={
                lang === 'en' ? 'segmented-btn is-active' : 'segmented-btn'
              }
              aria-pressed={lang === 'en'}
              onClick={() => setLang('en')}
            >
              {t('languageEnglish')}
            </button>
            <button
              type="button"
              className={
                lang === 'uk' ? 'segmented-btn is-active' : 'segmented-btn'
              }
              aria-pressed={lang === 'uk'}
              onClick={() => setLang('uk')}
            >
              {t('languageUkrainian')}
            </button>
          </div>
          <p className="setting-hint">{t('languageHint')}</p>
        </fieldset>

        <fieldset className="setting-field">
          <legend className="setting-label">{t('themeLabel')}</legend>
          <p className="setting-hint">{t('themeHint')}</p>
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
