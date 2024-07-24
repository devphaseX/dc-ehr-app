import { TypeOf, z } from "zod";

export const createNewResourceSchema = z.object({
  images: z
    .object({
      id: z.string(),
      fileUrl: z.string().optional(),
      file: z.unknown().optional(),
    })
    .array(),
  fileName: z.string().min(1),
  category: z.string().min(1),
  subject: z.string().min(1),
  licenses: z.string().optional(),
  tags: z.string().min(1).array(),
  description: z.string().optional(),
});

export type CreateNewResource = TypeOf<typeof createNewResourceSchema>;
export type FileItem = Omit<CreateNewResource["images"][number], "file"> & {
  file?: File;
};
