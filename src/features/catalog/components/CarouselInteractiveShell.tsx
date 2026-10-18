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
        <section aria-label={title} className="relative py-7 group">
            <div className="flex items-center justify-between mb-4 px-6 md:px-12">
                <div className="flex items-center gap-3">
                    <span
                        aria-hidden="true"
                        className="h-5 w-1 rounded-full bg-gradient-to-b from-[var(--emerald-vivid)] to-[var(--emerald-chivor-teal)] shadow-[0_0_12px_var(--emerald-colombian)]"
                    />
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                        {title}
                    </h2>
                </div>

                <div className="flex items-center gap-2.5">
                    <button
                        type="button"
                        onClick={() => handleScroll('left')}
                        aria-label={`Desplazar ${title} a la izquierda`}
                        className="min-w-[38px] min-h-[38px] rounded-full apple-glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--emerald-colombian)]/50 hover:bg-[var(--emerald-colombian)]/15 active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer"
                    >
                        <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            className="w-4 h-4"
                            aria-hidden="true"
                        >
                            <path
                                d="M12.5 15L7.5 10L12.5 5"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleScroll('right')}
                        aria-label={`Desplazar ${title} a la derecha`}
                        className="min-w-[38px] min-h-[38px] rounded-full apple-glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--emerald-colombian)]/50 hover:bg-[var(--emerald-colombian)]/15 active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer"
                    >
                        <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            className="w-4 h-4"
                            aria-hidden="true"
                        >
                            <path
                                d="M7.5 15L12.5 10L7.5 5"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 md:px-12 py-2 no-scrollbar"
            >
                {children}
            </div>
        </section>
    );
}