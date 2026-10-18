import Image from 'next/image';
import { getCatalogRail } from '../services/catalog.service';
import { CarouselInteractiveShell } from './CarouselInteractiveShell';

interface CatalogRailServerProps {
    title: string;
    railType: string;
}

export async function CatalogRailServer({ title, railType }: CatalogRailServerProps) {
    const items = await getCatalogRail(railType);

    return (
        <CarouselInteractiveShell title={title}>
            {items.map((item) => (
                <article
                    key={item.id}
                    // aspect-[2/3] and shrink-0 are vital to prevent CLS (Cumulative Layout Shift)
                    className="relative w-48 shrink-0 aspect-[2/3] rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 group/card"
                >
                    <Image
                        src={item.posterUrl}
                        alt={`Póster de ${item.title}`}
                        fill
                        sizes="192px"
                        className="object-cover transition-transform duration-300 group-hover/card:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-10 p-4 flex flex-col justify-end">
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-600 text-white w-fit mb-2">
                            {item.category}
                        </span>
                        <h3 className="text-sm font-semibold text-white line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-zinc-300">
                            {item.durationMinutes} min • {item.maturityRating}
                        </p>
                    </div>
                </article>
            ))}
        </CarouselInteractiveShell>
    );
}