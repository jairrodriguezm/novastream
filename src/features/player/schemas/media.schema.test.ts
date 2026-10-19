import { describe, it, expect } from 'vitest';
import { StreamSourceSchema, LiveProgramSchema } from './media.schema';

describe('Media Schemas (Zod Runtime Validation)', () => {
    it('debe validar un stream HLS/DASH con URL bien formada', () => {
        const validPayload = {
            type: 'DASH',
            src: 'https://cdn.novastream.tv/manifest.mpd',
            drm: {
                keySystem: 'com.widevine.alpha',
                licenseServer: 'https://license.novastream.tv/widevine',
            },
        };

        const result = StreamSourceSchema.safeParse(validPayload);
        expect(result.success).toBe(true);
    });

    it('debe fallar si el protocolo de streaming no es HLS ni DASH', () => {
        const invalidPayload = {
            type: 'RTMP',
            src: 'rtmp://stream.novastream.tv/live',
        };

        const result = StreamSourceSchema.safeParse(invalidPayload);
        expect(result.success).toBe(false);
    });

    it('debe rechazar un programa en vivo si el progreso porcentual supera 100', () => {
        const invalidProgram = {
            id: 'p-1',
            channelId: 'ch-1',
            channelName: 'Deportes HD',
            currentShow: 'Partido en Vivo',
            startsAt: '10:00',
            endsAt: '12:00',
            progressPercent: 125,
            isLive: true,
        };

        const result = LiveProgramSchema.safeParse(invalidProgram);
        expect(result.success).toBe(false);
    });
});