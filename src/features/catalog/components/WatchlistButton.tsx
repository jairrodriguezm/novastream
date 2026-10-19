'use client';

import { useOptimistic, useTransition, useState } from 'react';
import { toggleWatchlistAction } from '../actions/watchlist.actions';

interface WatchlistButtonProps {
    mediaId: string;
    initialIsSaved?: boolean;
}

export function WatchlistButton({ mediaId, initialIsSaved = false }: WatchlistButtonProps) {
    const [confirmedState, setConfirmedState] = useState(initialIsSaved);
    const [isPending, startTransition] = useTransition();

    const [optimisticIsSaved, setOptimisticIsSaved] = useOptimistic(
        confirmedState,
        (_currentState, newOptimisticValue: boolean) => newOptimisticValue
    );

    const handleToggle = () => {
        const nextValue = !optimisticIsSaved;

        startTransition(async () => {
            setOptimisticIsSaved(nextValue);

            const serverResult = await toggleWatchlistAction(mediaId, nextValue);
            setConfirmedState(serverResult);
        });
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            aria-pressed={optimisticIsSaved}
            className={`px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition cursor-pointer ${optimisticIsSaved
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                    : 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700'
                }`}
        >
            <span>{optimisticIsSaved ? '✓ En Mi Lista' : '+ Agregar a Mi Lista'}</span>
            {isPending && (
                <span className="text-[10px] opacity-80 font-mono">(Sincronizando...)</span>
            )}
        </button>
    );
}