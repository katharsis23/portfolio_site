import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { INITIAL_CACHED_THEMES, DEFAULT_THEME } from './themes.config';
import { type WallpaperTheme, type ThemeColours } from './theme.types';
import { extractColorsFromImage } from './extractColors';

interface ThemeContextType {
  currentTheme: WallpaperTheme;
  themeSet: Set<string>;
  cachedThemes: Record<string, WallpaperTheme>;
  setTheme: (id: string) => void;
  generateAndCacheTheme: (
    id: string,
    wallpaperUrl: string,
    name: string
  ) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Init themes
  const [cachedThemes, setCachedThemes] = useState<
    Record<string, WallpaperTheme>
  >(() => {
    try {
      const saved = localStorage.getItem('portfolio_theme_cache');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_CACHED_THEMES, ...parsed };
      }
    } catch (error) {
      console.error('Failed to load cached themes from localStorage:', error);
    }
    return INITIAL_CACHED_THEMES;
  });

  // Creating GLOBAL SET for themes
  const themeSet = useMemo(() => {
    return new Set<string>(Object.keys(cachedThemes));
  }, [cachedThemes]);

  // Current Theme
  const [currentThemeId, setCurrentThemeId] = useState<string>(() => {
    return (
      localStorage.getItem('portfolio_active_theme_id') || DEFAULT_THEME.id
    );
  });

  const currentTheme = cachedThemes[currentThemeId] || DEFAULT_THEME;

  const applyThemeColours = useCallback((colours: ThemeColours) => {
    const root = document.documentElement;
    Object.entries(colours).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, []);

  // Applying colours + exposing the active wallpaper as a CSS variable.
  // Crossfade between old and new wallpaper (layered backgrounds set in CSS).
  // Colours animate via the CSS transition rule on :root.
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      '--wallpaper-prev',
      root.style.getPropertyValue('--wallpaper') ||
        toWallpaperCss(currentTheme.wallpaperUrl)
    );
    applyThemeColours(currentTheme.colours);
    root.style.setProperty(
      '--wallpaper',
      toWallpaperCss(currentTheme.wallpaperUrl)
    );
    localStorage.setItem('portfolio_active_theme_id', currentTheme.id);
  }, [currentTheme, applyThemeColours]);

  useEffect(() => {
    try {
      localStorage.setItem(
        'portfolio_theme_cache',
        JSON.stringify(cachedThemes)
      );
    } catch (error) {
      console.error(`Failed to save theme cache, error: ${error}`);
    }
  }, [cachedThemes]);

  // Preload every wallpaper so switching themes is instant (the browser has
  // the image cached before it is used as the active background). Runs once
  // against the static theme catalogue. CSS-gradient wallpapers (Default) are
  // skipped — they need no network fetch.
  useEffect(() => {
    const urls = new Set<string>();
    Object.values(INITIAL_CACHED_THEMES).forEach((t) => {
      if (t.wallpaperUrl && !isCssGradient(t.wallpaperUrl)) {
        urls.add(t.wallpaperUrl);
      }
    });
    urls.forEach((url) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
    });
  }, []);

  // Selecting a theme switches IMMEDIATELY to its current colours (fallback or
  // previously extracted), then kicks off a background extraction that upgrades
  // the theme once ready. This removes the lag from the old eager-extract flow.
  const setTheme = (id: string) => {
    const theme = cachedThemes[id];
    if (!theme) {
      return;
    }
    // Switch wallpaper + fallback colours right away — no waiting for extraction.
    setCurrentThemeId(id);
    if (theme.wallpaperUrl && !theme.extracted) {
      void generateAndCacheTheme(id, theme.name, theme.wallpaperUrl);
    }
  };

  // Generating and caching. Upgrade the active theme's palette in place once
  // extraction finishes so the transition effect re-runs with real colours.
  const generateAndCacheTheme: ThemeContextType['generateAndCacheTheme'] =
    async (id, name, imageUrl) => {
      const existing = cachedThemes[id];
      if (existing && existing.extracted) {
        setCurrentThemeId(id);
        return;
      }

      try {
        const extractedColors = await extractColorsFromImage(imageUrl);
        const newTheme: WallpaperTheme = {
          id,
          name,
          wallpaperUrl: imageUrl,
          colours: extractedColors,
          extracted: true,
        };
        setCachedThemes((prev) => ({ ...prev, [id]: newTheme }));
      } catch (error) {
        console.error('Error generating theme from wallpaper:', error);
      }
    };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeSet,
        cachedThemes,
        setTheme,
        generateAndCacheTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/** True when a wallpaper value is an inline CSS gradient rather than a URL. */
function isCssGradient(wallpaperUrl: string): boolean {
  const trimmed = wallpaperUrl.trim();
  return (
    trimmed.startsWith('linear-gradient') ||
    trimmed.startsWith('radial-gradient') ||
    trimmed.startsWith('conic-gradient')
  );
}

/**
 * Turn a theme's wallpaper value into a usable `background-image` value.
 * - A CSS gradient (used by the Default theme) is used verbatim.
 * - Anything else is treated as an image URL and wrapped in url().
 */
function toWallpaperCss(wallpaperUrl: string): string {
  const trimmed = wallpaperUrl.trim();
  return isCssGradient(trimmed)
    ? trimmed
    : `url("${trimmed}")`;
}