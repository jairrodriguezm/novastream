import Image from 'next/image';
import { getCatalogRail, getContinueWatchingRail, type MediaItem } from '../services/catalog.service';
import { CarouselInteractiveShell } from './CarouselInteractiveShell';

interface CatalogRailServerProps {
    title: string;
    railType: string;
}

function MediaCard({ item }: { item: MediaItem }) {
    return (
        <article className="relative w-48 shrink-0 aspect-[2/3] rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 group/card">
            <Image
                src={item.posterUrl}
                alt={`Póster de ${item.title}`}
                fill
                sizes="192px"
                className="object-cover transition-transform duration-300 group-hover/card:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10 p-4 flex flex-col justify-end">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-600 text-white">
                        {item.category}
                    </span>
                    {item.fetchedAt && (
                        <span className="text-[10px] font-mono bg-black/70 px-1.5 py-0.5 rounded text-zinc-300">
                            {item.fetchedAt}
                        </span>
                    )}
                </div>
                <h3 className="text-sm font-semibold text-white line-clamp-1">{item.title}</h3>
                <p className="text-xs text-zinc-300">
                    {item.durationMinutes} min • {item.maturityRating}
                </p>

                {typeof item.progressPercent === 'number' && (
                    <div className="w-full h-1 bg-zinc-700 rounded-full mt-2 overflow-hidden">
                        <div
                            className="h-full bg-red-600"
                            style={{ width: `${item.progressPercent}%` }}
                        />
                    </div>
                )}
            </div>
        </article>
    );
}

export async function CatalogRailServer({ title, railType }: CatalogRailServerProps) {
    const items = await getCatalogRail(railType);

    return (
        <CarouselInteractiveShell title={`${title} (Cacheado: ${items[0]?.fetchedAt})`}>
            {items.map((item) => (
                <MediaCard key={item.id} item={item} />
            ))}
        </CarouselInteractiveShell>
    );
}

export async function ContinueWatchingRailServer() {
    const items = await getContinueWatchingRail();

    return (
        <CarouselInteractiveShell title={`Continuar Viendo (Dinámico SSR Stream: ${items[0]?.fetchedAt})`}>
            {items.map((item) => (
                <MediaCard key={item.id} item={item} />
            ))}
        </CarouselInteractiveShell>
    );
}
