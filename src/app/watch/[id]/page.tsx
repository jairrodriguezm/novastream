import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getMediaById } from '@/features/catalog/services/catalog.service';
import { WatchlistButton } from '@/features/catalog/components/WatchlistButton';

function WatchSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="h-5 w-48 bg-zinc-800 rounded" />
            <div className="aspect-video w-full rounded-2xl bg-zinc-900 border border-zinc-800" />
            <div className="h-8 w-1/2 bg-zinc-800 rounded" />
        </div>
    );
}

async function DedicatedWatchContent({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const media = await getMediaById(id);

    return (
        <>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-800 bg-black flex items-center justify-center">
                <Image
                    src={media.backdropUrl}
                    alt={media.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover opacity-50"
                />
                <div className="z-10 text-center space-y-2 p-6 bg-black/70 rounded-xl border border-zinc-700">
                    <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                        Ruta Dedicada Completa (/watch/{id})
                    </span>
                    <h1 className="text-3xl font-extrabold">{media.title}</h1>
                    <p className="text-xs text-zinc-300">
                        Aquí se inicializará el motor Shaka Player (DASH/HLS + DRM) en la Fase 4
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-zinc-300 max-w-2xl">{media.synopsis}</p>
                <WatchlistButton mediaId={media.id} />
            </div>
        </>
    );
}

export default function DedicatedWatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8 max-w-5xl mx-auto space-y-6">
      <Link href="/" className="text-sm text-zinc-400 hover:text-white inline-block">
        ← Volver al Catálogo de NovaStream
      </Link>
      <Suspense fallback={<WatchSkeleton />}>
        <DedicatedWatchContent params={params} />
      </Suspense>
    </main>
  );
}