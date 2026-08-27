import { useEffect, useRef } from 'react';
import { usePlayer } from '../../system';

const BAR_COUNT = 48;

/** Lazy-initialise the spectrum levels exactly once (module-level helper). */
function makeLevels(): number[] {
  return Array.from({ length: BAR_COUNT }, () => 0.35);
}

/**
 * Cava — decorative, CAVA-style background audio visualizer.
 *
 * Renders a full-viewport bar spectrum behind the content. It is deliberately
 * lazy and cheap:
 *   - It is mounted by AppShell only when heavy-animations (non-optimized)
 *     mode is on; the rAF loop then runs while the radio player is actually
 *     playing (the `active` gate — it fully stops when the music pauses).
 *   - When there is no real-time audio source feeding the visualizer, it
 *     synthesises a smooth, self-animated spectrum so the decoration still
 *     looks alive while a track streams.
 *   - Bars are quantised to theme colours (no per-frame gradients), and the
 *     canvas resizes only when the viewport actually changes.
 *
 * Because the loop is gated by usePlayer().isPlaying (and the mount already
 * guarantees the heavy-animations condition), pausing the music stops
 * scheduling rAF work immediately.
 */
export function Cava() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const levelsRef = useRef<number[]>(makeLevels());

  const { isPlaying } = usePlayer();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth || window.innerWidth;
      h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Smoothly drift a synthetic spectrum toward a target so it reads as
    // "audio" rather than static bars.
    const tick = () => {
      const levels = levelsRef.current;
      const now = performance.now();
      for (let i = 0; i < BAR_COUNT; i++) {
        const target =
          0.25 + 0.5 * (0.5 + 0.5 * Math.sin(i * 1.7 + now / 420));
        // Exponential smoothing gives the organic, audio-like attack/release.
        levels[i] += (target - levels[i]) * 0.12;
      }
      draw(ctx, w, h, levels);
      raf = requestAnimationFrame(tick);
    };

    const draw = (
      g: CanvasRenderingContext2D,
      width: number,
      height: number,
      levels: number[]
    ) => {
      const css = getComputedStyle(document.documentElement);
      const primary = css.getPropertyValue('--primary') || '#aa3bff';
      const secondary = css.getPropertyValue('--secondary') || '#6b6375';
      g.clearRect(0, 0, width, height);

      const gap = 6;
      const barW = (width - gap * (BAR_COUNT + 2)) / BAR_COUNT;
      for (let i = 0; i < BAR_COUNT; i++) {
        const v = Math.max(0.03, levels[i]);
        const hgt = Math.min(height, v * height);
        const x = gap + i * (barW + gap);
        const y = height - hgt;
        g.fillStyle = i % 2 === 0 ? primary : secondary;
        g.globalAlpha = 0.22 + 0.18 * levels[i];
        g.fillRect(x, y, barW, hgt);
      }
      g.globalAlpha = 1;
    };

    resize();
    window.addEventListener('resize', resize);

    // The canvas is mounted only when heavy animations are on; run the loop
    // while the radio player is playing and stop scheduling immediately when
    // it pauses (the `data-active` gate).
    if (isPlaying && !running) {
      running = true;
      tick();
    }

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="cava-canvas"
      aria-hidden="true"
      data-active={isPlaying ? 'on' : 'off'}
    />
  );
}
