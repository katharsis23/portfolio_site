/**
 * Music track catalogue for the sidebar player widget.
 *
 * The tracks are real bundled audio assets (src/assets/*.mp3).
 * Vite emits typed URLs that are only requested by the browser when a track
 * is actually selected/played (media resources are deferred, so loading the
 * catalogue costs nothing at first paint).
 */

export interface Track {
  readonly id: string;
  readonly title: string;
  /** Bundled audio asset URL (Vite emits a fingerprinted path). */
  readonly src: string;
}

import quietFocus from '../assets/Quiet Focus.mp3';
import glassPanel from '../assets/Glass Panel Saints.mp3';
import keybindKingdom from '../assets/Keybind Kingdom.mp3';

export const TRACKS: readonly Track[] = [
  {
    id: 'quiet-focus',
    title: 'Quiet Focus',
    src: quietFocus,
  },
  {
    id: 'glass-panel-saints',
    title: 'Glass Panel Saints',
    src: glassPanel,
  },
  {
    id: 'keybind-kingdom',
    title: 'Keybind Kingdom',
    src: keybindKingdom,
  },
];

export const DEFAULT_TRACK_ID = TRACKS[0].id;
