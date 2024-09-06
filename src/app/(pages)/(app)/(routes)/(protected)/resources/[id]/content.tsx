"use client";

import React, { useMemo } from "react";
import { Container } from "@/components/container";
import { Author, ContentResource } from "@/lib/schema/data";
import { ContentCard } from "@/components/content-card";
import { useGetResources } from "@/features/api/query/use-get-resources";
import { parseAsInteger, useQueryState } from "nuqs";
import { InfiniteData } from "@tanstack/react-query";
import { ContentCategory } from "@/lib/response";
import { useGetResourceFiles } from "@/features/api/query/use-resource-files";
import { ContentFileCard } from "@/components/content-file-card";

type Props = {
  id: string;
};

const author: Author = {
  userId: "adudjfjfjgjg",
  fullName: "Austin Smiths",
  email: "austin.smiths@gmail.com",
  avatarUrl: "/",
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

  const { data } = useGetResourceFiles(props.id);

  console.log({ data });
  return (
    <div className="w-full pb-[144px]">
      <Container>
        <div className="space-y-8">
          <div
            className="grid gap-8 w-full"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(379px, 1fr))",
            }}
          >
            {(data ?? []).map((item, i) => (
              <ContentFileCard data={item} key={item.fileId} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
