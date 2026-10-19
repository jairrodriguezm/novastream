import { LiveProgramSchema, type LiveProgram } from '../schemas/media.schema';

export async function fetchLiveChannelStatus(channelId: string): Promise<LiveProgram> {
    const rawPayload = {
        id: `prog-${channelId}`,
        channelId,
        channelName: channelId === 'canal-1' ? 'Nova Deportes HD' : 'Nova Cine 24/7',
        currentShow:
            channelId === 'canal-1'
                ? 'Torneo Continental: Final en Directo'
                : 'Maratón Sci-Fi: Películas de Culto',
        startsAt: '17:00',
        endsAt: '19:00',
        progressPercent: Math.min(100, Math.floor(((new Date().getSeconds() % 60) / 60) * 100)),
        isLive: true,
    };

    const result = LiveProgramSchema.safeParse(rawPayload);

    if (!result.success) {
        console.error('Error de contrato en LiveProgramSchema:', result.error.format());
        throw new Error('Respuesta inválida del servicio de EPG');
    }

    return result.data;
}