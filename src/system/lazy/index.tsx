/**
 * Lazy-loading strategy for the site.
 *
 * Three layers, matching the progressive-loading model in docs/CONCEPT.md §10
 * and docs/ARCHITECTURE.md §10:
 *
 *   Layer 1 — Static / assets
 *     Fonts, CSS tokens, the wallpaper the active theme needs. Eager, but only
 *     what is required for first paint (the semantic content and navigation).
 *
 *   Layer 2 — Dynamic import of heavy components
 *     Secondary UI windows that are not needed for first paint: terminal,
 *     help, settings, fastfetch, audio visualizer shell. Loaded on demand
 *     with `LazyMount`.
 *
 *   Layer 3 — Lazy canvas
 *     requestAnimationFrame work (Cava-style visualization) is never started
 *     eagerly. It only mounts when the feature is BOTH visible (Intersection)
 *     and animation is active (usePerformance). See `LazyWhenVisible`.
 */
import {
  type ComponentType,
  type ReactNode,
  lazy as reactLazy,
  Suspense,
  useState,
  useEffect,
  useRef,
} from 'react';

/**
 * Layer 2 — dynamically imports a heavy component and renders it inside a
 * Suspense boundary. Only pays the import cost once the component first
 * renders. `fallback` is the light placeholder shown while loading.
 */
export function LazyMount({
  loader,
  fallback = null,
}: {
  loader: () => Promise<{ default: ComponentType }>;
  fallback?: ReactNode;
}) {
  // Create the lazy component once (lazy useState initializer) so the same
  // component instance and its module are reused across renders.
  const [Component] = useState(() => reactLazy(loader));

  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
}

/**
 * Layer 3 — lazy canvas / heavy effect mounting.
 *
 * The `children` render only once the target element is BOTH scrolled into
 * view AND animation is enabled (`usePerformance`). This prevents hidden or
 * animation-reduced configurations from ever scheduling rAF/fetch/polling
 * work. Pass `expectsAnimation` only if the media query already allows motion.
 */
export function LazyWhenVisible({
  children,
  showWhen,
  rootMargin = '200px',
}: {
  children: ReactNode;
  /** Whether to show children at all (e.g. animation mode toggle). */
  showWhen: boolean;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!showWhen || !ref.current) {
      setVisible(false);
      return;
    }
    const node = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible(entries.some((entry) => entry.isIntersecting));
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [showWhen, rootMargin]);

  return <div ref={ref}>{showWhen && visible ? children : null}</div>;
}
