'use client';

import { useRef, type ReactNode } from 'react';

interface CarouselInteractiveShellProps {
    title: string;
    children: ReactNode; // Here the RSC Payload already rendered on the server is injected
}

export function CarouselInteractiveShell({ title, children }: CarouselInteractiveShellProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        const { clientWidth } = scrollContainerRef.current;
        const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    return (
        <section aria-label={title} className="relative py-6 group">
            <div className="flex items-center justify-between mb-3 px-6">
                <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => handleScroll('left')}
                        aria-label={`Desplazar ${title} a la izquierda`}
                        className="min-w-[36px] min-h-[36px] rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white flex items-center justify-center transition"
                    >
                        ←
                    </button>
                    <button
                        type="button"
                        onClick={() => handleScroll('right')}
                        aria-label={`Desplazar ${title} a la derecha`}
                        className="min-w-[36px] min-h-[36px] rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white flex items-center justify-center transition"
                    >
                        →
                    </button>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scroll-smooth px-6 no-scrollbar"
            >
                {children}
            </div>
        </section>
    );
}