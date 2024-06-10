import { TypeOf, z } from 'zod';

export const createNewResourceSchema = z.object({
  fileName: z.string().min(1),
  category: z.string().min(1),
  subject: z.string().min(1),
  licenses: z.string().optional(),
  tags: z.string().min(1).array(),
  description: z.string().optional(),
});

export type CreateNewResource = TypeOf<typeof createNewResourceSchema>;
