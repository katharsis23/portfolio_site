export type ThemeType = 'light' | 'dark';

export interface ThemeColours {
  primary: string;
  surface: string;
  onSurface: string;
  background: string;
  secondary: string;
  borders: string;
  [key: string]: string; // For additional tokens of Material U
}

export interface WallpaperTheme {
  id: string;
  wallpaperUrl: string; // path to the wallpaper image
  name: string; //short name for the wallpaper
  colours: ThemeColours; // colours associated with the wallpaper
}
