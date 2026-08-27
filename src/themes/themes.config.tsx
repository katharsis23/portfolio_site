import { type WallpaperTheme } from './theme.types';

// Wallpapers are bundled static assets (src/assets). Vite emits typed URLs;
// the browser loads ONLY the active theme's wallpaper (Layer 1 - static), not
// all of them eagerly.

import doodleSpaceNord from '../assets/Doodle_Space_Nord.png';
import abstract from '../assets/abstract.jpg';
import acrylic from '../assets/acrylic.jpg';
import animeNord from '../assets/anime-nord.png';
import animeCafeTokyo from '../assets/anime_cafe_tokyonight.png';
import catppuccinLandscape from '../assets/catpuccin_landscape.png';
import catppuccinSamurai from '../assets/catpuccin_samurai.png';
import nordDarkCity from '../assets/nord_dark_city.png';

// The Default theme is a distinct choice from the wallpaper themes: instead of
// a bitmap it uses a purple→red→pink CSS gradient background, giving it a brand
// of its own that stays selectable at all times (it is always present in the
// theme cache / Settings list). It serves as the fallback + initial state.
export const DEFAULT_THEME: WallpaperTheme = {
  id: 'default',
  name: 'Default',
  wallpaperUrl:
    'linear-gradient(135deg, #4a1d8f 0%, #8f2f6f 45%, #e05a7a 100%)',
  extracted: true,
  colours: {
    background: '#1a1026',
    surface: 'rgba(30, 20, 44, 0.85)',
    onSurface: '#f4eefb',
    primary: '#ff8fab',
    secondary: '#c792ea',
    onPrimary: '#2a0a1e',
    borders: 'rgba(255, 143, 171, 0.35)',
  },
};

const DOODLE_SPACE_NORD_THEME: WallpaperTheme = {
  id: 'nord',
  name: 'nord',
  wallpaperUrl: doodleSpaceNord,
  extracted: true,
  colours: {
    background: '#12131c',

    surface: 'rgba(24, 26, 35, 0.85)',

    onSurface: '#e8e8f2',

    primary: '#ff8fa3',

    secondary: '#8ab4f8',

    borders: 'rgba(255, 143, 163, 0.35)',
  },
};

const ABSTRACT_THEME: WallpaperTheme = {
  id: 'abstract',
  name: 'abstract',
  wallpaperUrl: abstract,
  extracted: true,
  colours: {
    background: '#070d0e',
    surface: 'rgba(12, 22, 24, 0.85)',
    onSurface: '#e1f5f7',
    primary: '#3db8ba',
    secondary: '#237375',
    borders: 'rgba(61, 184, 186, 0.35)',
  },
};

const ACRYLIC_THEME: WallpaperTheme = {
  id: 'acrylic',
  name: 'acrylic',
  wallpaperUrl: acrylic,
  extracted: true,
  colours: {
    background: '#12131c',
    surface: 'rgba(24, 26, 35, 0.85)',
    onSurface: '#e8e8f2',
    primary: '#ff8fa3',
    secondary: '#8ab4f8',
    borders: 'rgba(255, 143, 163, 0.35)',
  },
};

const ANIME_NORD_THEME: WallpaperTheme = {
  id: 'anime-nord',
  name: 'anime-nord',
  wallpaperUrl: animeNord,
  extracted: true,
  colours: {
    background: '#1a1d24',
    surface: 'rgba(28, 31, 38, 0.88)',
    onSurface: '#f2f4f8',
    primary: '#d95360',
    secondary: '#a3b1c6',
    borders: 'rgba(217, 83, 96, 0.4)',
  },
};

const ANIME_CAFE_TOKYO_THEME: WallpaperTheme = {
  id: 'anime-cafe-tokyo',
  name: 'anime-cafe-tokyo',
  wallpaperUrl: animeCafeTokyo,
  extracted: true,
  colours: {
    background: '#18151e',
    surface: 'rgba(31, 27, 38, 0.85)',
    onSurface: '#f0eaf7',
    primary: '#d8a8e8',
    secondary: '#e5aa90',
    borders: 'rgba(216, 168, 232, 0.35)',
  },
};

const CATPPUCCIN_LANDSCAPE_THEME: WallpaperTheme = {
  id: 'catppuccin-landscape',
  name: 'catppuccin-landscape',
  wallpaperUrl: catppuccinLandscape,
  extracted: true,
  colours: {
    background: '#12111d',
    surface: 'rgba(22, 21, 36, 0.85)',
    onSurface: '#e8e5f5',
    primary: '#cc99bb',
    secondary: '#6c82a6',
    borders: 'rgba(204, 153, 187, 0.35)',
  },
};

const CATPPUCCIN_SAMURAI_THEME: WallpaperTheme = {
  id: 'catppuccin-samurai',
  name: 'Catppuccin Samurai',
  wallpaperUrl: catppuccinSamurai,
  extracted: true,
  colours: {
    background: '#0f141d',
    surface: 'rgba(19, 26, 38, 0.85)',
    onSurface: '#e6f1f8',
    primary: '#56b6f6',
    secondary: '#f0a868',
    borders: 'rgba(86, 182, 246, 0.35)',
  },
};

const NORD_DARK_CITY_THEME: WallpaperTheme = {
  id: 'nord-dark-city',
  name: 'Nord Dark City',
  wallpaperUrl: nordDarkCity,
  extracted: true,
  colours: {
    background: '#0f1115',
    surface: 'rgba(21, 24, 30, 0.88)',
    onSurface: '#e5e9f0',
    primary: '#d08770',
    secondary: '#88c0d0',
    borders: 'rgba(208, 135, 112, 0.35)',
  },
};

/**
 * Static wallpaper themes (bundled assets). Each carries a fallback palette
 * so the site is instantly usable; real colours are extracted lazily via
 * ColorThief when a theme is first selected (see theme.tsx setTheme).
 */
export const WALLPAPER_THEMES: WallpaperTheme[] = [
  DOODLE_SPACE_NORD_THEME,
  ABSTRACT_THEME,
  ACRYLIC_THEME,
  ANIME_NORD_THEME,
  ANIME_CAFE_TOKYO_THEME,
  CATPPUCCIN_LANDSCAPE_THEME,
  CATPPUCCIN_SAMURAI_THEME,
  NORD_DARK_CITY_THEME,
];

// export const WALLPAPER_THEMES: WallpaperTheme[] = [
//   {
//     id: 'nord',
//     name: 'Nord',
//     wallpaperUrl: doodleSpaceNord,
//     extracted: false,
//     colours: DEFAULT_THEME.colours,
//   },
//   {
//     id: 'abstract',
//     name: 'Abstract',
//     wallpaperUrl: abstract,
//     extracted: false,
//     colours: DEFAULT_THEME.colours,
//   },
//   {
//     id: 'acrylic',
//     name: 'Acrylic',
//     wallpaperUrl: acrylic,
//     extracted: false,
//     colours: DEFAULT_THEME.colours,
//   },
//   {
//     id: 'anime-nord',
//     name: 'Anime Nord',
//     wallpaperUrl: animeNord,
//     extracted: false,
//     colours: DEFAULT_THEME.colours,
//   },
//   {
//     id: 'tokyonight',
//     name: 'Tokyo Night',
//     wallpaperUrl: animeCafeTokyo,
//     extracted: false,
//     colours: DEFAULT_THEME.colours,
//   },
//   {
//     id: 'catppuccin',
//     name: 'Catppuccin Landscape',
//     wallpaperUrl: catppuccinLandscape,
//     extracted: false,
//     colours: DEFAULT_THEME.colours,
//   },
//   {
//     id: 'catppuccin-samurai',
//     name: 'Catppuccin Samurai',
//     wallpaperUrl: catppuccinSamurai,
//     extracted: false,
//     colours: DEFAULT_THEME.colours,
//   },
//   {
//     id: 'nord-city',
//     name: 'Nord City',
//     wallpaperUrl: nordDarkCity,
//     extracted: false,
//     colours: DEFAULT_THEME.colours,
//   },
// ];

// Stores initial cached themes for quick access and fallback
export const INITIAL_CACHED_THEMES: Record<string, WallpaperTheme> =
  Object.fromEntries(
    [DEFAULT_THEME, ...WALLPAPER_THEMES].map((t) => [t.id, t])
  );
