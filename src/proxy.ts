import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const regionParam = request.nextUrl.searchParams.get('region');

    if (regionParam === 'blocked') {
        return new NextResponse(
            JSON.stringify({
                error: 'Contenido restringido por derechos de transmisión (DRM Geo-fence) fuera de tu región.',
            }),
            { status: 451, headers: { 'content-type': 'application/json' } }
        );
    }

    const response = NextResponse.next();
    response.headers.set('x-novastream-region', 'CO-BOG');
    return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};