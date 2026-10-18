import { Suspense } from 'react';
import Image from 'next/image';
import { getFeaturedHero } from '@/features/catalog/services/catalog.service';
import { CatalogRailServer } from '@/features/catalog/components/CatalogRailServer';
import { AppleEmeraldNavbar } from '@/shared/components/AppleEmeraldNavbar';

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

async function HeroBannerServer() {
  const hero = await getFeaturedHero();

  return (
    <section
      id="inicio"
      className="relative w-full aspect-[21/9] min-h-[460px] max-h-[75vh] bg-[var(--skeleton-base)] flex items-end p-8 md:p-16 border-b border-[var(--border-subtle)] overflow-hidden isolate"
    >
      {/* LCP Element: priority + sizes="100vw" avoid lazy-loading and prioritize download */}
      <Image
        src={hero.backdropUrl}
        alt={hero.title}
        fill
        priority
        sizes="100vw"
        className="object-cover scale-[1.01]"
      />

      {/* Multi-layered Apple TV+ Vignette & Colombian Emerald Glow (Theme-adaptive) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'var(--hero-scrim-bottom)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'var(--hero-scrim-side)' }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-24 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(0,168,89,0.22)_0%,transparent_70%)] pointer-events-none"
      />

      <div className="max-w-2xl z-10 space-y-4 md:space-y-5 relative">
        {/* Apple Glass Capsule Badge with Colombian Emerald Jewel */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass">
          <span className="h-2 w-2 rounded-full bg-[var(--emerald-vivid)] shadow-[0_0_10px_var(--emerald-vivid)]" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--emerald-badge-text)]">
            Esmeralda Original • Estreno Mundial
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)]">
          {hero.title}
        </h1>

        {/* Apple TV+ Technical Metadata Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)] font-medium">
          <span className="px-2.5 py-0.5 rounded-md apple-glass text-[var(--text-primary)] font-semibold">
            4K UHD
          </span>
          <span className="px-2.5 py-0.5 rounded-md apple-glass text-[var(--text-primary)]">
            {hero.maturityRating}
          </span>
          <span className="text-[var(--text-secondary)]">• {hero.durationMinutes} min</span>
        </div>

        <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed line-clamp-3 max-w-xl">
          {hero.synopsis}
        </p>

        {/* Apple-style Tactile Action Bar */}
        <div className="flex flex-wrap items-center gap-3.5 pt-1">
          <a
            href="#tendencias"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-white emerald-cta-shine transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M6.3 4.84a1 1 0 0 1 1.53-.85l8.12 5.16a1 1 0 0 1 0 1.7l-8.12 5.16a1 1 0 0 1-1.53-.85V4.84Z" />
            </svg>
            Ver ahora
          </a>

          <a
            href="#drm"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-[var(--text-primary)] apple-glass hover:border-[var(--emerald-colombian)]/45 transition-all duration-300 active:scale-[0.98]"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="w-4 h-4 text-[var(--emerald-colombian)]"
              aria-hidden="true"
            >
              <path
                d="M10 4.5v11M4.5 10h11"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            Mi Lista
          </a>
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-transparent text-[var(--text-primary)] pb-20 selection:bg-[var(--emerald-colombian)] selection:text-white">
      <AppleEmeraldNavbar />

      <Suspense fallback={<HeroSkeleton />}>
        <HeroBannerServer />
      </Suspense>

      <div id="tendencias">
        <Suspense fallback={<RailSkeleton title="Tendencias en Vivo" />}>
          <CatalogRailServer title="Tendencias en Vivo" railType="trending" />
        </Suspense>
      </div>

      <div id="drm">
        <Suspense fallback={<RailSkeleton title="Estrenos Encriptados (DRM)" />}>
          <CatalogRailServer title="Estrenos Encriptados (DRM)" railType="drm-premieres" />
        </Suspense>
      </div>
    </main>
  );
}

