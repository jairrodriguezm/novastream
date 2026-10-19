import { Suspense } from 'react';
import Image from 'next/image';
import { getMediaById } from '@/features/catalog/services/catalog.service';
import { ModalOverlayClient } from '@/features/catalog/components/ModalOverlayClient';
import { WatchlistButton } from '@/features/catalog/components/WatchlistButton';

function ModalSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="aspect-video w-full bg-zinc-800 rounded-t-2xl" />
      <div className="p-6 space-y-4">
        <div className="h-4 w-32 bg-zinc-800 rounded" />
        <div className="h-8 w-3/4 bg-zinc-800 rounded" />
        <div className="h-12 w-full bg-zinc-800 rounded" />
      </div>
    </div>
  );
}

async function ModalContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const media = await getMediaById(id);

  return (
    <>
      <div className="relative aspect-video w-full bg-zinc-950">
        <Image
          src={media.backdropUrl}
          alt={media.title}
          fill
          sizes="(max-width: 768px) 100vw, 672px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold">
            MODAL INTERCEPTADO
          </span>
          <span>{media.durationMinutes} min</span>
          <span>•</span>
          <span>{media.maturityRating}</span>
        </div>

        <h2 className="text-2xl font-bold text-white">{media.title}</h2>
        <p className="text-sm text-zinc-300">{media.synopsis}</p>

        <div className="pt-2 flex items-center gap-3">
          <a
            href={`/watch/${media.id}`}
            className="px-5 py-2.5 rounded-lg bg-white text-black font-bold text-sm hover:bg-zinc-200 transition"
          >
            ▶ Reproducir en Pantalla Completa
          </a>
          <WatchlistButton mediaId={media.id} />
        </div>
      </div>
    </>
  );
}

export default function InterceptedWatchModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <ModalOverlayClient>
      <Suspense fallback={<ModalSkeleton />}>
        <ModalContent params={params} />
      </Suspense>
    </ModalOverlayClient>
  );
}