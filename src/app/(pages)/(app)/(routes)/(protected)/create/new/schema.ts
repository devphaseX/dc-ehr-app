import { TypeOf, z } from "zod";

export const createNewResourceSchema = z.object({
  fileName: z.string().min(1),
  category: z.string().min(1),
  subject: z.string().min(1),
  files: z
    .object({
      id: z.string(),
      fileUrl: z.string().optional(),
      file: z.unknown().optional(),
    })
    .array(),
  licenses: z.string().optional(),
  tags: z.array(z.object({ id: z.string(), tag: z.string() })),
  description: z.string().optional(),
});

export type CreateNewResource = TypeOf<typeof createNewResourceSchema>;
export type FileItem = Omit<CreateNewResource["files"][number], "file"> & {
  file?: File;
};
