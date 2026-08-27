import {type WallpaperTheme} from './theme.types';

// Default theme used for fallback and initial state
export const DEFAULT_THEME: WallpaperTheme = {
    id: 'default',
    wallpaperUrl: '/wallpapers/default.jpg',
    name: 'Default',
    colours: {
        primary: '#6200EE',
        surface: '#FFFFFF',
        onSurface: '#000000',
        background: '#F5F5F5',
        secondary: '#03DAC6',
        borders: '#E0E0E0',
    },
}

// Stores initial cached themes for quick access and fallback
export const INITIAL_CACHED_THEMES: Record<string, WallpaperTheme> = {
  [DEFAULT_THEME.id]: DEFAULT_THEME,
};