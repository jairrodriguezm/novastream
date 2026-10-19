import { purgeHeroCacheAction, purgeTrendingRailAction } from '../actions/cache.actions';

export function CacheInspectorBar({ heroTimestamp }: { heroTimestamp?: string }) {
    return (
        <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur border-b border-zinc-800 px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
                <span className="font-black text-sm tracking-wider text-red-500">NOVASTREAM</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
                    Hero Cache Timestamp: <strong className="text-emerald-400">{heroTimestamp}</strong>
                </span>
            </div>

            <div className="flex items-center gap-2">
                <form action={purgeHeroCacheAction}>
                    <button
                        type="submit"
                        className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium transition cursor-pointer"
                    >
                        Revalidar Hero (revalidateTag)
                    </button>
                </form>
                <form action={purgeTrendingRailAction}>
                    <button
                        type="submit"
                        className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium transition cursor-pointer"
                    >
                        Revalidar Carril Trending
                    </button>
                </form>
            </div>
        </header>
    );
}