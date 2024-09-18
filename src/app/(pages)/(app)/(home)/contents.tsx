"use client";

import React, { Suspense, useMemo } from "react";

import ContentCardSkeleton, { ContentCard } from "@/components/content-card";
import { useGetResources } from "@/features/api/query/use-get-resources";
import { parseAsInteger, useQueryState } from "nuqs";
import { InfiniteData } from "@tanstack/react-query";
import { ContentCategory } from "@/lib/response";
import ErrorBoundary, {
  DefaultErrorComponent,
} from "@/components/error-boundary";
import SearchResults, {
  ResultsSkeleton,
} from "../(routes)/(protected)/results/search-results";
import { TypeOf } from "zod";
import { serverQuerySchema } from "../(routes)/(protected)/results/schema";

type Props = {
  categories: Array<ContentCategory>;
  serverQuery: TypeOf<typeof serverQuerySchema>;
};

export const ResourceContentList = ({ categories, serverQuery }: Props) => {
  return (
    <ErrorBoundary fallback={DefaultErrorComponent}>
      <Suspense fallback={<ResultsSkeleton />}>
        <SearchResults query={serverQuery} categories={categories} />
      </Suspense>
    </ErrorBoundary>
  );
};
