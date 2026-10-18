import { Suspense } from 'react';
import Image from 'next/image';
import { getFeaturedHero } from '@/features/catalog/services/catalog.service';
import { CatalogRailServer } from '@/features/catalog/components/CatalogRailServer';

function HeroSkeleton() {
  return (
    <section className="relative w-full aspect-[21/9] max-h-[70vh] bg-zinc-900 animate-pulse border-b border-zinc-800 flex items-end p-8 md:p-14">
      <div className="max-w-2xl space-y-4 w-full">
        <div className="h-6 w-40 bg-zinc-800 rounded" />
        <div className="h-12 w-3/4 bg-zinc-800 rounded" />
        <div className="h-16 w-full bg-zinc-800 rounded" />
      </div>
    </section>
  );
}

// Skeleton with exactly the same height (aspect-[2/3] + paddings) to guarantee CLS = 0.000
function RailSkeleton({ title }: { title: string }) {
  return (
    <div className="py-6 px-6">
      <div className="h-7 w-48 bg-zinc-800 rounded animate-pulse mb-3" aria-hidden="true" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-48 shrink-0 aspect-[2/3] rounded-lg bg-zinc-900 animate-pulse border border-zinc-800"
          />
        ))}
      </div>
      <span className="sr-only">Cargando sección {title}...</span>
    </div>
  );
}

async function HeroBannerServer() {
  const hero = await getFeaturedHero();

  return (
    <section className="relative w-full aspect-[21/9] max-h-[70vh] bg-zinc-900 flex items-end p-8 md:p-14 border-b border-zinc-800 overflow-hidden">
      {/* LCP Element:  priority + sizes="100vw" avoid lazy-loading and prioritize download */}
      <Image
        src={hero.backdropUrl}
        alt={hero.title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Gradiente de legibilidad para cumplir contraste WCAG 2.2 */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

      <div className="max-w-2xl z-10 space-y-4 relative">
        <span className="inline-block px-2.5 py-1 text-xs font-bold uppercase bg-red-600 text-white rounded">
          Destacado en NovaStream
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          {hero.title}
        </h1>
        <p className="text-zinc-200 text-sm md:text-base line-clamp-3">{hero.synopsis}</p>
      </div>
    </section>
  );
}

export default async function HomePage() {

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-16">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroBannerServer />
      </Suspense>

      <Suspense fallback={<RailSkeleton title="Tendencias en Vivo" />}>
        <CatalogRailServer title="Tendencias en Vivo" railType="trending" />
      </Suspense>

      <Suspense fallback={<RailSkeleton title="Estrenos Encriptados (DRM)" />}>
        <CatalogRailServer title="Estrenos Encriptados (DRM)" railType="drm-premieres" />
      </Suspense>
    </main>
  );
}