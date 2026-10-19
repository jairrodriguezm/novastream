import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/lib/get-query-client';
import { fetchLiveChannelStatus } from '@/features/player/services/live-epg.service';
import { LiveChannelBadgeClient } from '@/features/player/components/LiveChannelBadgeClient';
import { PlayerControlsMini } from '@/features/player/components/PlayerControlsMini';
import { Suspense } from 'react';
import Image from 'next/image';
import { getFeaturedHero } from '@/features/catalog/services/catalog.service';
import { CatalogRailServer, ContinueWatchingRailServer } from '@/features/catalog/components/CatalogRailServer';
import { AppleEmeraldNavbar } from '@/shared/components/AppleEmeraldNavbar';
import { CacheInspectorBar } from '@/features/catalog/components/CacheInspectorBar';

function HeroSkeleton() {
  return (
    <section className="relative w-full aspect-[21/9] min-h-[460px] max-h-[75vh] bg-[var(--skeleton-base)] animate-pulse border-b border-[var(--border-subtle)] flex items-end p-8 md:p-16">
      <div className="max-w-2xl space-y-5 w-full">
        <div className="h-7 w-52 bg-[var(--skeleton-sub)] rounded-full border border-[var(--border-subtle)]" />
        <div className="h-14 w-3/4 bg-[var(--skeleton-sub)] rounded-2xl" />
        <div className="h-16 w-full bg-[var(--skeleton-sub)] rounded-xl" />
        <div className="flex gap-3 pt-1">
          <div className="h-11 w-44 bg-[var(--skeleton-sub)] rounded-full" />
          <div className="h-11 w-36 bg-[var(--skeleton-sub)] rounded-full" />
        </div>
      </div>
    </section>
  );
}

// Skeleton with identical dimensions (w-52 aspect-[2/3] + py-7 + px-6 md:px-12) to guarantee CLS = 0.000
function RailSkeleton({ title }: { title: string }) {
  return (
    <div className="py-7">
      <div className="flex items-center justify-between mb-4 px-6 md:px-12">
        <div className="h-7 w-56 bg-[var(--skeleton-sub)] rounded-lg animate-pulse" aria-hidden="true" />
        <div className="flex gap-2.5" aria-hidden="true">
          <div className="h-[38px] w-[38px] rounded-full bg-[var(--skeleton-sub)] animate-pulse" />
          <div className="h-[38px] w-[38px] rounded-full bg-[var(--skeleton-sub)] animate-pulse" />
        </div>
      </div>
      <div className="flex gap-5 overflow-hidden px-6 md:px-12 py-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-52 shrink-0 aspect-[2/3] rounded-2xl bg-[var(--skeleton-base)] animate-pulse ring-1 ring-inset ring-[var(--border-subtle)]"
          />
        ))}
      </div>
      <span className="sr-only">Cargando sección {title}...</span>
    </div>
  );
}

export default async function HomePage() {
  const hero = await getFeaturedHero();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['live-channel', 'canal-1'],
    queryFn: () => fetchLiveChannelStatus('canal-1'),
  });

  return (
    <main className="min-h-screen bg-transparent text-[var(--text-primary)] pb-20 selection:bg-[var(--emerald-colombian)] selection:text-white">
      <AppleEmeraldNavbar />
      <CacheInspectorBar heroTimestamp={hero.fetchedAt} />

      <section className="px-6 py-4 pt-20 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4 bg-zinc-900/40">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <LiveChannelBadgeClient channelId="canal-1" />
        </HydrationBoundary>

        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-400">Control Rápido de Reproductor:</span>
          <PlayerControlsMini />
        </div>
      </section>

      <section className="relative w-full aspect-[21/9] max-h-[70vh] bg-zinc-900 flex items-end p-8 md:p-14 border-b border-zinc-800 overflow-hidden">
        <Image
          src={hero.backdropUrl}
          alt={hero.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

        <div className="max-w-2xl z-10 space-y-4 relative">
          <span className="inline-block px-2.5 py-1 text-xs font-bold uppercase bg-red-600 text-white rounded">
            Destacado • Cacheado a las {hero.fetchedAt}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            {hero.title}
          </h1>
          <p className="text-zinc-200 text-sm md:text-base line-clamp-3">{hero.synopsis}</p>
        </div>
      </section>

      <Suspense fallback={<RailSkeleton title="Continuar Viendo" />}>
        <ContinueWatchingRailServer />
      </Suspense>

      <CatalogRailServer title="Tendencias en Vivo" railType="trending" />
      <CatalogRailServer title="Estrenos Encriptados (DRM)" railType="drm-premieres" />
    </main>
  );
}

