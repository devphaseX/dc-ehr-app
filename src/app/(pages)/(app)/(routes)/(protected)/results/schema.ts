import { paginateQuerySchema } from "@/lib/schema/data";
import { TypeOf, z } from "zod";

export type ResourceFilterQuery = {
  q: string;
  category: string;
  tags: string[];
};

export const clientQuerySchema = z
  .object({
    q: z.string().optional(),
    category: z.string().min(1).optional(),
    tags: z.string().array().optional(),
  })
  .and(paginateQuerySchema);

export const serverQuerySchema = clientQuerySchema.transform(
  ({ q, category, tags, page, perPage }) => ({
    title: q,
    category,
    tags,
    pageNumber: page,
    pageSize: perPage,
  }),
);

export function createServerQuery(
  query: Record<string, unknown> | URLSearchParams,
) {
  query = query instanceof URLSearchParams ? Object.fromEntries(query) : query;
  return (serverQuerySchema.parse(query) ?? {}) as TypeOf<
    typeof serverQuerySchema
  >;
}
