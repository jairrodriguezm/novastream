'use server';

import { revalidateTag } from 'next/cache';

export async function purgeHeroCacheAction() {
  revalidateTag('catalog-hero', 'max');
}

export async function purgeTrendingRailAction() {
  revalidateTag('rail-trending', 'max');
}