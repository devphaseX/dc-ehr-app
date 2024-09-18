"use client";

import { useResourcesDebug } from "@/features/api/query/debug";
import { TypeOf } from "zod";
import { serverQuerySchema } from "../../(routes)/(protected)/results/schema";
import { ContentFilters } from "../../__components/content-filters";
import { ContentCategory } from "@/lib/response";

export function Sample({
  serverQuery,
  categories,
}: {
  serverQuery: TypeOf<typeof serverQuerySchema>;
  categories: Array<ContentCategory>;
}) {
  const data = useResourcesDebug(serverQuery);
  return (
    <>
      <ContentFilters categories={categories} />
    </>
  );
}
