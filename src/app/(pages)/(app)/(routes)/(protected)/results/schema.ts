import { paginateQuerySchema } from "@/lib/schema/data";
import { z } from "zod";

export type ResourceFilterQuery = {
  q: string;
  category: string;
  tags: string[];
};

export const clientQuerySchema = z
  .object({
    q: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    tags: z.string().array().optional(),
  })
  .and(paginateQuerySchema);

export const serverQuerySchema = clientQuerySchema.transform(
  ({ q, category, tags }) => ({
    title: q,
    category,
    tags,
  }),
);

export function createServerQuery(
  query: Record<string, unknown> | URLSearchParams,
) {
  query = query instanceof URLSearchParams ? Object.fromEntries(query) : query;
  console.log(serverQuerySchema.safeParse(query));
  return serverQuerySchema.safeParse(query).data ?? {};
}
