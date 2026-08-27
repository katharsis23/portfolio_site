import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from 'react';
import { TRACKS, type Track } from '../content/songs';

interface PlayerContextType {
  tracks: readonly Track[];
  current: Track;
  currentIndex: number;
  isPlaying: boolean;
  progress: number; // 0..1
  duration: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  selectTrack: (id: string) => void;
  seek: (fraction: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

/**
 * Shared audio player.
 *
 * A single HTMLAudioElement is created lazily (only on first play) and reused
 * across tracks — audio decoding/buffering is deferred until the user actually
 * presses play, so initial paint never pays for the music files. The state is
 * exposed so the sidebar player AND the decorative CAVA visualizer can react
 * to `isPlaying` without each owning their own audio element.
 */
export const PlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const indexRef = useRef(currentIndex);

  // Keep the imperative index in sync with the React state after each render,
  // so `next`/`prev`/`play` read the current track through an event handler
  // (never during render, per the react-hooks/refs rule).
  useEffect(() => {
    indexRef.current = currentIndex;
  }, [currentIndex]);

  const ensureAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = 'none';
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  // Play a specific track index, swapping the audio source.
  const loadTrack = useCallback((index: number) => {
    const audio = ensureAudio();
    setCurrentIndex(index);
    const track = TRACKS[index];
    audio.src = track.src;
    audio.load();
    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Autoplay/unavailable sources just leave the player paused.
      setIsPlaying(false);
    });
  }, []);

  const next = useCallback(() => {
    loadTrack((indexRef.current + 1) % TRACKS.length);
  }, [loadTrack]);

  const prev = useCallback(() => {
    loadTrack((indexRef.current - 1 + TRACKS.length) % TRACKS.length);
  }, [loadTrack]);

  const toggle = useCallback(() => {
    const audio = ensureAudio();
    if (audio.paused) {
      // If nothing is loaded yet, start with the current/default track.
      if (!audio.src) {
        loadTrack(indexRef.current);
        return;
      }
      void audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [loadTrack]);

  const play = useCallback(() => {
    const audio = ensureAudio();
    if (!audio.src) {
      loadTrack(indexRef.current);
      return;
    }
    void audio.play().catch(() => setIsPlaying(false));
  }, [loadTrack]);

  const pause = useCallback(() => {
    ensureAudio().pause();
  }, []);

  const selectTrack = useCallback(
    (id: string) => {
      const idx = TRACKS.findIndex((t) => t.id === id);
      if (idx >= 0) loadTrack(idx);
    },
    [loadTrack]
  );

  const seek = useCallback(
    (fraction: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      const t = fraction * (audio.duration || duration);
      audio.currentTime = t;
      setProgress(fraction);
    },
    [duration]
  );

  // Wire up media events on the shared element.
  useEffect(() => {
    const audio = ensureAudio();
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration);
      }
    };
    const onLoadedMeta = () => setDuration(audio.duration);
    const onEnded = () => next();
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMeta);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMeta);
      audio.removeEventListener('ended', onEnded);
    };
  }, [next]);

  const value: PlayerContextType = {
    tracks: TRACKS,
    current: TRACKS[currentIndex],
    currentIndex,
    isPlaying,
    progress,
    duration,
    play,
    pause,
    toggle,
    next,
    prev,
    selectTrack,
    seek,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
