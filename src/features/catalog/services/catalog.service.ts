import { cacheTag, cacheLife } from 'next/cache';
import { cookies } from 'next/headers';
import { connection } from 'next/server';

export interface MediaItem {
    id: string;
    title: string;
    synopsis: string;
    backdropUrl: string;
    posterUrl: string;
    category: 'VOD' | 'LIVE';
    maturityRating: string;
    durationMinutes: number;
    progressPercent?: number;
    fetchedAt?: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getFeaturedHero(): Promise<MediaItem> {
    'use cache';
    cacheTag('catalog-hero');
    cacheLife('minutes');

    await delay(300);
    const timestamp = new Date().toLocaleTimeString('es-CO');

    return {
        id: 'ns-hero-01',
        title: 'Horizonte Cuántico',
        synopsis: 'En un futuro donde la memoria se transmite por frecuencias de red, un ingeniero descubre una señal encriptada que podría reiniciar el sistema.',
        backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85',
        posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
        category: 'VOD',
        maturityRating: '16+',
        durationMinutes: 134,
        fetchedAt: timestamp,
    };
}

export async function getCatalogRail(railType: string): Promise<MediaItem[]> {
    'use cache';
    cacheTag('catalog-rails', `rail-${railType}`);
    cacheLife('minutes');

    await delay(1200);
    const timestamp = new Date().toLocaleTimeString('es-CO');

    return Array.from({ length: 8 }).map((_, idx) => ({
        id: `${railType}-${idx + 1}`,
        title: `${railType.toUpperCase()} — Título #${idx + 1}`,
        synopsis: ' Producción original con transmisión adaptativa DASH/HLS.',
        backdropUrl: `https://picsum.photos/seed/${railType}-${idx}-bg/800/450`,
        posterUrl: `https://picsum.photos/seed/${railType}-${idx}-poster/400/600`,
        category: idx % 2 === 0 ? 'VOD' : 'LIVE',
        maturityRating: '13+',
        durationMinutes: 95 + idx * 5,
        fetchedAt: timestamp,
    }));
}

export async function getContinueWatchingRail(): Promise<MediaItem[]> {
    await connection();

    const cookieStore = await cookies();
    const userProfile = cookieStore.get('ns_profile')?.value ?? 'Perfil Estándar';

    await delay(1800);
    const timestamp = new Date().toLocaleTimeString('es-CO');

    return Array.from({ length: 4 }).map((_, idx) => ({
        id: `cw-${idx + 1}`,
        title: `[${userProfile}] Episodio ${idx + 1}`,
        synopsis: 'Reanuda exactamente en el milisegundo donde pausaste el reproductor.',
        backdropUrl: `https://picsum.photos/seed/cw-${idx}/800/450`,
        posterUrl: `https://picsum.photos/seed/cw-poster-${idx}/400/600`,
        category: 'VOD',
        maturityRating: '16+',
        durationMinutes: 48,
        progressPercent: 25 + idx * 20,
        fetchedAt: timestamp,
    }));
}

export async function getMediaById(id: string): Promise<MediaItem> {
  'use cache';
  cacheTag(`media-${id}`);
  cacheLife('minutes');

  await delay(150);
  return {
    id,
    title: `Título Exclusivo (${id.toUpperCase()})`,
    synopsis:
      'Transmisión disponible en Ultra HD 4K con audio espacial Dolby Atmos y protección de contenido Widevine/FairPlay.',
    backdropUrl: `https://picsum.photos/seed/${id}-bg/1280/720`,
    posterUrl: `https://picsum.photos/seed/${id}/400/600`,
    category: id.includes('live') ? 'LIVE' : 'VOD',
    maturityRating: '16+',
    durationMinutes: 118,
    fetchedAt: new Date().toLocaleTimeString('es-CO'),
  };
}