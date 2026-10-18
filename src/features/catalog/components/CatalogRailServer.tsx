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
            {items.map((item) => {
                const isLive = item.category === 'LIVE';
                return (
                    <article
                        key={item.id}
                        // aspect-[2/3] and shrink-0 are vital to prevent CLS (Cumulative Layout Shift)
                        className="relative w-52 shrink-0 aspect-[2/3] snap-start rounded-2xl overflow-hidden bg-[var(--surface-card)] apple-card-shadow ring-1 ring-inset ring-[var(--border-subtle)] hover:ring-[var(--emerald-vivid)]/70 transition-all duration-300 group/card"
                    >
                        <Image
                            src={item.posterUrl}
                            alt={`Póster de ${item.title}`}
                            fill
                            sizes="208px"
                            className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                        />

                        {/* Subtle Colombian Emerald top-right ambient sheen on hover */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_80%_15%,rgba(16,232,121,0.28),transparent_60%)] pointer-events-none"
                        />

                        {/* Top Badge Row */}
                        <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between">
                            <span
                                className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border ${
                                    isLive
                                        ? 'bg-[#041d11]/85 text-[#6bffb3] border-[#10e879]/50 shadow-[0_0_12px_rgba(16,232,121,0.35)]'
                                        : 'bg-black/55 text-zinc-100 border-white/20'
                                }`}
                            >
                                {isLive && (
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#10e879] animate-pulse" />
                                )}
                                {item.category}
                            </span>

                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-black/55 backdrop-blur-md text-zinc-200 border border-white/15">
                                {item.maturityRating}
                            </span>
                        </div>

                        {/* Apple TV+ Frosted Bottom Metadata Overlay */}
                        <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 pt-12 bg-gradient-to-t from-[#020805] via-[#020805]/85 to-transparent flex flex-col justify-end">
                            <div className="flex items-end justify-between gap-2">
                                <div className="min-w-0">
                                    <h3 className="text-sm font-semibold tracking-tight text-white line-clamp-1 group-hover/card:text-[#6bffb3] transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-zinc-300/90 mt-0.5 flex items-center gap-1.5">
                                        <span>{item.durationMinutes} min</span>
                                        <span className="text-[#10e879]">•</span>
                                        <span className="text-[11px] text-[#6bffb3] font-medium">
                                            Dolby Atmos
                                        </span>
                                    </p>
                                </div>

                                {/* Mini Apple Play Pill on Hover */}
                                <span
                                    aria-hidden="true"
                                    className="h-8 w-8 shrink-0 rounded-full emerald-cta-shine text-white flex items-center justify-center opacity-85 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-300"
                                >
                                    <svg
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-3.5 h-3.5 translate-x-[0.5px]"
                                    >
                                        <path d="M6.3 4.84a1 1 0 0 1 1.53-.85l8.12 5.16a1 1 0 0 1 0 1.7l-8.12 5.16a1 1 0 0 1-1.53-.85V4.84Z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </article>
                );
            })}
        </CarouselInteractiveShell>
    );
}