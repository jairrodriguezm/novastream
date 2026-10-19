'use server';

import { cookies } from 'next/headers';

export async function toggleWatchlistAction(mediaId: string, shouldAdd: boolean): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 600));
    const cookieStore = await cookies();
    const raw = cookieStore.get('ns_watchlist')?.value ?? '[]';
    const currentList: string[] = JSON.parse(raw);

    const updated = shouldAdd
        ? Array.from(new Set([...currentList, mediaId]))
        : currentList.filter((id) => id !== mediaId);

    cookieStore.set('ns_watchlist', JSON.stringify(updated), {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    });

    return shouldAdd;
}