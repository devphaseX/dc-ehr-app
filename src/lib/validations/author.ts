import { TypeOf, z } from 'zod';

export const authorSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(1),
  avatarImg: z.string().url().optional(),
  skills: z
    .string()
    .array()
    .default(() => [])
    .optional(),
  contributeCounts: z.number().int().positive().optional(),
  bookPublishedCounts: z.number().int().positive().optional(),
  email: z.string().email().optional(),
  bio: z.string(),
  role: z.enum(['owner', 'contributor']).optional(),
  facebookUrl: z.string().url().optional(),
  portfolioUrl: z.string().url().optional(),
  instagramUrl: z.string().url().optional(),
  interests: z.string().array().optional(),
});

export type Author = TypeOf<typeof authorSchema>;
