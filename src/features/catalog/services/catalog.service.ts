export interface MediaItem {
  id: string;
  title: string;
  synopsis: string;
  backdropUrl: string;
  posterUrl: string;
  category: 'VOD' | 'LIVE';
  maturityRating: string;
  durationMinutes: number;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getFeaturedHero(): Promise<MediaItem> {
  // Low latency (120ms): Critical for LCP
  await delay(120);
  return {
    id: 'ns-hero-01',
    title: 'Horizonte Cuántico',
    synopsis: 'En un futuro donde la memoria se transmite por frecuencias de red, un ingeniero descubre una señal encriptada que podría reiniciar el sistema.',
    backdropUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    category: 'VOD',
    maturityRating: '16+',
    durationMinutes: 134,
  };
}

export async function getCatalogRail(railType: string): Promise<MediaItem[]> {
  // Simulate a slow recommendation microservice (1500ms)
  await delay(1500);
  return Array.from({ length: 8 }).map((_, idx) => ({
    id: `${railType}-${idx + 1}`,
    title: `${railType.toUpperCase()} — Título #${idx + 1}`,
    synopsis: ' Producción original con transmisión adaptativa DASH/HLS.',
    backdropUrl: `https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80`,
    posterUrl: `https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&q=80`,
    category: idx % 2 === 0 ? 'VOD' : 'LIVE',
    maturityRating: '13+',
    durationMinutes: 95 + idx * 5,
  }));
}