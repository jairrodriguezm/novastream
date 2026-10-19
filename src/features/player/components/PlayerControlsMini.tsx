'use client';

import { usePlayerStore } from '../stores/player.store';

export function PlayerControlsMini() {
    const isPlaying = usePlayerStore((state) => state.isPlaying);
    const isMuted = usePlayerStore((state) => state.isMuted);
    const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);
    const toggleMute = usePlayerStore((state) => state.toggleMute);

    return (
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-2 rounded-lg">
            <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1 rounded bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition"
            >
                {isPlaying ? '⏸ Pausa' : '▶ Reproducir'}
            </button>

            <button
                type="button"
                onClick={toggleMute}
                className="px-3 py-1 rounded bg-zinc-800 text-zinc-200 font-medium text-xs hover:bg-zinc-700 transition"
            >
                {isMuted ? '🔇 Desmutear' : '🔊 Silenciar'}
            </button>
        </div>
    );
}