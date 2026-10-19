import { create } from 'zustand';

export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isBuffering: boolean;
  playbackRate: number;

  currentTrackId: string | null;

  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (currentTime: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setIsBuffering: (isBuffering: boolean) => void;
  setCurrentTrackId: (id: string | null) => void;
  resetPlayer: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  isBuffering: false,
  playbackRate: 1,
  currentTrackId: null,

  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setIsBuffering: (isBuffering) => set({ isBuffering }),
  setCurrentTrackId: (currentTrackId) => set({ currentTrackId }),
  resetPlayer: () =>
    set({
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      isBuffering: false,
      currentTrackId: null,
    }),
}));