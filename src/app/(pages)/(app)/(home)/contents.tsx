"use client";

import React, { useMemo } from "react";
import { ContentFilters } from "../__components/content-filters";
import { Container } from "@/components/container";
import { Author, ContentResource } from "@/lib/schema/data";
import { ContentCard } from "@/components/content-card";
import { useGetResources } from "@/features/api/query/use-get-resources";
import { parseAsInteger, useQueryState } from "nuqs";
import { InfiniteData } from "@tanstack/react-query";
import { ContentCategory, ResourcePayload } from "@/lib/response";
import { addBase64Prefix } from "@/lib/utils";

type Props = {
  categories: Array<ContentCategory>;
};

export const Contents = (props: Props) => {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );

  const [pageSize, setPageSize] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );

  const { data: dataResult } = useGetResources({
    pageNumber: page,
    pageSize: pageSize,
  });
  const payload = dataResult as any as InfiniteData<
    NonNullable<typeof dataResult>
  >;
  const data = payload?.pages[page - 1]?.data;
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
    <div className="w-full pb-[144px]">
      <Container>
        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-[40px] leading-[54px] text-black font-josefin font-semibold">
              Popular Topic by Creators
            </h3>
            <p className="text-base text-neutral-500">
              Find most trending topics by top creators
            </p>
          </div>

          <ContentFilters categories={props.categories} />

          <div
            className="grid gap-8 w-full"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(379px, 1fr))",
            }}
          >
            {items.map((item, i) => (
              <ContentCard data={item[0]} author={item[1]} key={i} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
