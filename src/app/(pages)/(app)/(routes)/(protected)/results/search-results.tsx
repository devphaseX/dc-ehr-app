"use client";

import ContentCardSkeleton, { ContentCard } from "@/components/content-card";
import { useSuspenseGetResources } from "@/features/api/query/use-get-resources-suspense";
import { ContentCategory, ResourcePayload } from "@/lib/response";
import { Author, ContentResource } from "@/lib/schema/data";
import { addBase64Prefix } from "@/lib/utils";
import { InfiniteData, useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  ContentFilters,
  ContentFiltersSkeleton,
} from "../../../__components/content-filters";
import { PagePagination } from "@/components/pagination";
import NoSearchResult from "./no-search-results";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchResults({
  query,
  pageSize,
  pageNumber,
  categories,
}: Partial<{ query: string }> & {
  pageSize: number;
  pageNumber: number;
  categories: Array<ContentCategory>;
}) {
  const { data: dataResult } = useSuspenseGetResources(
    { pageSize, pageNumber },
    { q: query },
  );

  const payload = (
    dataResult as any as InfiniteData<NonNullable<typeof dataResult>>
  ).pages[pageNumber - 1];
  const data = payload.data;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const items = useMemo(() => {
    return (data || []).map<[ContentResource, Author]>((resource) => [
      {
        id: resource.id,
        isBookmarked: resource.isBookmarked,
        title: resource.fileName,
        bannerImgUrl: addBase64Prefix(
          (resource as ResourcePayload).resourceThumbnail,
        ),
        href: `/resources/${resource.id}`,
      },
      {
        userId: resource.userId,
        avatarUrl: resource.profilePicture
          ? addBase64Prefix(resource.profilePicture)
          : "",
        email: resource.email,
        fullName: resource.username,
      },
    ]);
  }, [data]);

  return (
    <div className="space-y-8">
      <ContentFilters categories={categories} />

      {items.length ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <ContentCard data={item[0]} author={item[1]} key={i} />
            ))}
          </div>

          <PagePagination
            paginationData={{
              pageNumber: payload.pageNumber,
              pageSize: payload.pageSize,
              totalPages: payload.totalPages,
              totalRecords: payload.totalRecords,
            }}
            onPageChange={(nextPage) => {}}
          />
        </>
      ) : (
        <NoSearchResult
          onReset={() => {
            const q = searchParams.get("q");
            const url = new URL(pathname, location.origin);
            if (q) {
              url.searchParams.set("q", q);
            }
            router.push(url.toString());
          }}
          onShowAll={() => {
            router.push(pathname);
          }}
        />
      )}
    </div>
  );
}

export const ResultsSkeleton = () => {
  return (
    <div className="space-y-8">
      <ContentFiltersSkeleton />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ContentCardSkeleton />
        <ContentCardSkeleton />
        <ContentCardSkeleton />
      </div>
    </div>
  );
};
