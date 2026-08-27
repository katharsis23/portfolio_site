import { usePlayer } from '../../system';
import { useLanguage } from '../../system';

/**
 * PlayerWidget — compact, non-native sidebar radio player.
 *
 * Radio-style: there is no track selector, just prev/play/next and a progress
 * bar cycling through the bundled Suno-generated tracks. It reuses a single
 * shared HTMLAudioElement via the PlayerProvider, so the decorative CAVA
 * visualizer listens to the same "is playing" signal. UI strings come from the
 * language context.
 */
export function PlayerWidget() {
  const { t } = useLanguage();
  const { current, isPlaying, progress, duration, toggle, next, prev, seek } =
    usePlayer();

  const fmt = (s: number) => {
    if (!Number.isFinite(s) || s <= 0) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <section
      className="widget window player-widget"
      data-widget="player"
      aria-label={t('playerTitle')}
    >
      <header className="window-titlebar">
        <span className="window-title">♪ {t('playerTitle')}</span>
        <span className="player-state mono" aria-hidden="true">
          {isPlaying ? t('playerPlaying') : t('playerPaused')}
        </span>
      </header>

      <div className="widget-body player-body">
        {/* Track info */}
        <div className="player-now">
          <span className="player-title">{current.title}</span>
          <span className="player-suno">{t('playerSuno')}</span>
        </div>

        {/* Progress + seek */}
        <div className="player-progress-row">
          <span className="player-time mono">{fmt(0)}</span>
          <input
            className="player-progress"
            type="range"
            min={0}
            max={1000}
            value={Math.round(progress * 1000)}
            aria-label="Seek"
            onChange={(e) => seek(Number(e.target.value) / 1000)}
          />
          <span className="player-time mono player-time--right">
            {fmt(progress * duration)}
          </span>
        </div>

        {/* Transport controls */}
        <div className="player-controls">
          <button
            type="button"
            className="player-btn"
            onClick={prev}
            aria-label="Previous"
          >
            ⏮
          </button>
          <button
            type="button"
            className="player-btn player-btn--primary"
            onClick={toggle}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            type="button"
            className="player-btn"
            onClick={next}
            aria-label="Next"
          >
            ⏭
          </button>
        </div>
      </div>
    </section>
  );
}

