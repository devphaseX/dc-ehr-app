import { TypeOf, z } from 'zod';

export const sharedContentSchema = z.object({
  userId: z.string().uuid(),
  fullName: z.string().min(3),
  role: z.enum(['owner', 'contributor']),
  uploadedAt: z.date({ coerce: true }),
  fileName: z.string(),
  fileSize: z.string(),
  fileUrl: z.string().url(),
});

export type SharedContent = TypeOf<typeof sharedContentSchema>;
