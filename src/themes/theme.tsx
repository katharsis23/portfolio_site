import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useMemo,
} from 'react';
import { INITIAL_CACHED_THEMES, DEFAULT_THEME } from './themes.config';
import { type WallpaperTheme, type ThemeColours } from './theme.types';

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

  const applyThemeColours = (colours: ThemeColours) => {
    const root = document.documentElement;
    Object.entries(colours).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  };

  // Applying colours
  useEffect(() => {
    applyThemeColours(currentTheme.colours);
    localStorage.setItem('portfolio_active_theme_id', currentTheme.id);
  }, [currentTheme]);

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

  // Changing currentThemeID
  const setTheme = (id: string) => {
    if (cachedThemes[id]) {
      setCurrentThemeId(id);
    }
  };

  // Generating and caching
  const generateAndCacheTheme = async (
    id: string,
    name: string,
    imageUrl: string
  ) => {
    if (themeSet.has(id)) {
      setTheme(id);
      return;
    }

    try {
      const extractedColors = await extractColorsFromImage(imageUrl);

      const newTheme: WallpaperTheme = {
        id,
        name,
        wallpaperUrl: imageUrl,
        colours: extractedColors,
      };

      setCachedThemes((prev) => ({
        ...prev,
        [id]: newTheme,
      }));

      setCurrentThemeId(id);
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

// THIS FUNCTION IS NOT WORKING YET
async function extractColorsFromImage(_imgUrl: string): Promise<ThemeColours> {
  return {
    primary: '#f9e2af',
    surface: '#181825',
    onSurface: '#bac2de',
    background: '#11111b',
    secondary: '#fab387',
    borders: '#0000',
  };
}
