import { TypeOf, z } from "zod";

export const createNewResourceSchema = z.object({
  fileName: z.string().min(1),
  category: z.string().min(1),
  subject: z.string().min(1),
  files: z.union([
    z
      .object({
        id: z.string(),
        fileUrl: z.string().optional(),
        file: z.any().optional(),
      })
      .array(),
    z.string().array(),
  ]),
  licenses: z.string().optional(),
  tags: z.array(z.object({ id: z.string(), tag: z.string() })),
  description: z.string().optional(),
});

export type NewResource = TypeOf<typeof createNewResourceSchema>;

export type ResourceWithFileObject<T extends NewResource> = Exclude<
  T["files"][number],
  string
>;

export type FileItem = ResourceWithFileObject<NewResource>;
