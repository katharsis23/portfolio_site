/**
 * Dynamic colour extraction (docs/CONCEPT.md §9 "Dynamic Theme").
 *
 * The heavy colour extractor (ColorThief) is imported lazily via a dynamic
 * import() so it stays out of the initial bundle (Layer 2 of the lazy-loading
 * model — src/system/lazy). Only the code below runs eagerly; ColorThief and
 * its canvas work mount on demand inside `generateAndCacheTheme`.
 */
import type { ThemeColours } from './theme.types';

interface RGB {
  r: number;
  g: number;
  b: number;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Local bundled assets are same-origin so the canvas is never tainted.
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** Relative luminance in [0,1]; used to pick readable text/borders. */
function luminance({ r, g, b }: RGB): number {
  const s = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * s(r) + 0.7152 * s(g) + 0.0722 * s(b);
}

function mix(a: RGB, b: RGB, t: number): RGB {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

/**
 * Turn a palette (array of RGB tuples) into a readable set of theme tokens.
 * Guarantees:
 *   - onSurface contrasts with background (light or dark text on bg).
 *   - onPrimary contrasts with primary — text on primary-coloured pills and
 *     buttons stays readable even for light/pastel wallpapers (the classic
 *     "light theme" bug where labels disappear on primary fills).
 */
function deriveTokens(palette: RGB[]): ThemeColours {
  const background = palette[0] ?? { r: 30, g: 30, b: 46 };
  // Brighter accent from the more saturated palette entries.
  const accent =
    palette.find((p) => luminance(p) > 0.3) ?? background;
  let secondary = palette[2] ?? accent;

  // Surface: background mixed slightly toward black/white for depth.
  const surface = mix(background, accent, 0.12);

  const lightBg = luminance(background) > 0.5;
  const onSurface: RGB = lightBg
    ? { r: 24, g: 22, b: 30 }
    : { r: 233, g: 234, b: 244 };

  // Secondary is heavily used for meta-text (labels, dim hints). If it happens
  // to be too close to the background (low contrast), nudge it toward the
  // readable foreground so it never "assimilates" into the backdrop.
  if (Math.abs(luminance(secondary) - luminance(background)) < 0.22) {
    secondary = lightBg ? { r: 60, g: 60, b: 72 } : { r: 190, g: 195, b: 210 };
  }

  // Text sitting on top of `primary` fills (active pill, primary button).
  // Choose black or white text based on primary's luminance so pastel/light
  // themes never end up with invisible labels.
  const lightAccent = luminance(accent) > 0.55;
  const onPrimary: RGB = lightAccent
    ? { r: 24, g: 22, b: 30 }
    : { r: 255, g: 255, b: 255 };

  const borders = mix(accent, background, 0.55);

  return {
    primary: rgbToHex(accent),
    secondary: rgbToHex(secondary),
    surface: rgbToHex(surface),
    onSurface: rgbToHex(onSurface),
    onPrimary: rgbToHex(onPrimary),
    background: rgbToHex(background),
    borders: rgbToHex(borders),
  };
}

function hexToRgb(hex: string): RGB {
  const clean = hex.replace('#', '');
  const value =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  const int = parseInt(value, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

/** A ColorThief palette colour exposes a `.hex()` string accessor. */
interface PaletteColor {
  hex(): string;
}

/**
 * Extract a Material-like palette from a wallpaper image and derive readable
 * theme tokens. Lazily pulls in ColorThief only when first called.
 *
 * Uses ColorThief's synchronous `getPaletteSync` (same API as the reference
 * implementation) after the image is loaded. Falls back to a known palette if
 * extraction fails, so a wallpaper problem never breaks rendering
 * (docs/CONCEPT.md §9, ARCHITECTURE.md §9).
 */
export async function extractColorsFromImage(
  url: string
): Promise<ThemeColours> {
  try {
    const mod = (await import('colorthief')) as {
      getPaletteSync?: (
        image: HTMLImageElement,
        options: { colorCount: number }
      ) => PaletteColor[];
    };
    if (!mod.getPaletteSync) {
      throw new Error('getPaletteSync unavailable');
    }

    const img = await loadImage(url);
    const palette = mod.getPaletteSync(img, { colorCount: 6 });

    if (!palette || palette.length < 4) {
      throw new Error('Not enough colors in palette');
    }

    const hexPalette = palette.map((color) => color.hex());
    return deriveTokens(hexPalette.map(hexToRgb));
  } catch (error) {
    console.error('Colour extraction failed, using fallback palette:', error);
    return {
      primary: '#94e2d5',
      secondary: '#f5c2e7',
      surface: '#181825',
      onSurface: '#cdd6f4',
      onPrimary: '#11111b',
      background: '#11111b',
      borders: '#313244',
    };
  }
}

