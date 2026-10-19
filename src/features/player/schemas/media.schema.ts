import { z } from 'zod';

export const StreamSourceSchema = z.object({
  type: z.enum(['HLS', 'DASH']),
  src: z.string().url(),
  drm: z
    .object({
      keySystem: z.enum(['com.widevine.alpha', 'com.apple.fps', 'org.w3.clearkey']),
      licenseServer: z.string().url(),
    })
    .optional(),
});

export const LiveProgramSchema = z.object({
  id: z.string(),
  channelId: z.string(),
  channelName: z.string(),
  currentShow: z.string(),
  startsAt: z.string(),
  endsAt: z.string(),
  progressPercent: z.number().min(0).max(100),
  isLive: z.boolean(),
});

export const VideoTrackSchema = z.object({
  id: z.string(),
  title: z.string(),
  synopsis: z.string(),
  backdropUrl: z.string().url(),
  sources: z.array(StreamSourceSchema).min(1),
});

export type StreamSource = z.infer<typeof StreamSourceSchema>;
export type LiveProgram = z.infer<typeof LiveProgramSchema>;
export type VideoTrack = z.infer<typeof VideoTrackSchema>;