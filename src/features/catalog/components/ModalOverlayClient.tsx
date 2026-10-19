'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

export function ModalOverlayClient({ children }: { children: ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') router.back();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [router]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => router.back()}
        >
            <div
                className="relative w-full max-w-2xl rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={() => router.back()}
                    aria-label="Cerrar vista previa"
                    className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center cursor-pointer"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}