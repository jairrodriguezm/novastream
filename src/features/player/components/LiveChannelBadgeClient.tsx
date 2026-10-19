'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchLiveChannelStatus } from '../services/live-epg.service';

export function LiveChannelBadgeClient({ channelId }: { channelId: string }) {
    const { data, isFetching } = useQuery({
        queryKey: ['live-channel', channelId],
        queryFn: () => fetchLiveChannelStatus(channelId),
        refetchInterval: 5000,
    });

    if (!data) return null;

    return (
        <div className="flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 rounded-lg p-2.5 px-4 text-xs">
            <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
            </span>

            <div>
                <p className="font-semibold text-zinc-200">
                    {data.channelName} — <span className="text-red-400">{data.currentShow}</span>
                </p>
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-28 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-red-600 transition-all duration-500"
                            style={{ width: `${data.progressPercent}%` }}
                        />
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">
                        {data.progressPercent}% ({isFetching ? 'sincronizando...' : 'al aire'})
                    </span>
                </div>
            </div>
        </div>
    );
}