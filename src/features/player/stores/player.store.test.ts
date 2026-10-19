import { describe, it, expect, beforeEach } from 'vitest';
import { usePlayerStore } from './player.store';

describe('PlayerStore (Zustand)', () => {
    beforeEach(() => {
        usePlayerStore.getState().resetPlayer();
        usePlayerStore.setState({ volume: 1, isMuted: false });
    });

    it('debe inicializarse con el reproductor en pausa y en tiempo cero', () => {
        const state = usePlayerStore.getState();
        expect(state.isPlaying).toBe(false);
        expect(state.currentTime).toBe(0);
        expect(state.isBuffering).toBe(false);
    });

    it('debe alternar el estado de reproducción con setIsPlaying', () => {
        usePlayerStore.getState().setIsPlaying(true);
        expect(usePlayerStore.getState().isPlaying).toBe(true);

        usePlayerStore.getState().setIsPlaying(false);
        expect(usePlayerStore.getState().isPlaying).toBe(false);
    });

    it('debe mutar el volumen y ajustar isMuted automáticamente si el volumen es 0', () => {
        usePlayerStore.getState().setVolume(0);
        expect(usePlayerStore.getState().volume).toBe(0);
        expect(usePlayerStore.getState().isMuted).toBe(true);

        usePlayerStore.getState().setVolume(0.8);
        expect(usePlayerStore.getState().volume).toBe(0.8);
        expect(usePlayerStore.getState().isMuted).toBe(false);
    });

    it('debe resetear la metadata y tiempo al invocar resetPlayer', () => {
        usePlayerStore.getState().setCurrentTime(45);
        usePlayerStore.getState().setCurrentTrackId('track-99');
        usePlayerStore.getState().setIsPlaying(true);

        usePlayerStore.getState().resetPlayer();

        const state = usePlayerStore.getState();
        expect(state.currentTime).toBe(0);
        expect(state.currentTrackId).toBeNull();
        expect(state.isPlaying).toBe(false);
    });
});