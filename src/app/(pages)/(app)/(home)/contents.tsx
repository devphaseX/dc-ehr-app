"use client";

import React, { useMemo } from "react";
import { ContentFilters } from "../__components/content-filters";
import { Container } from "@/components/container";
import { Author, ContentResource } from "@/lib/schema/data";
import { ContentCard } from "@/components/content-card";
import { useGetResources } from "@/features/api/query/use-get-resources";

type Props = {};

const author: Author = {
  userId: "adudjfjfjgjg",
  fullName: "Austin Smiths",
  email: "austin.smiths@gmail.com",
  avatarUrl: "/",
};

const content: ContentResource = {
  id: "1gdhdhfyr",
  title: "The History of Numbers and Counting Systems",
  href: "https://www.web.com/come",
  bannerImgUrl: "/imgs/category-3.png",
  isBookmarked: false,
};

const items = [
  [content, author],
  [content, author],
  [content, author],
  [content, author],
  [content, author],
  [content, author],
  [content, author],
] as Array<[ContentResource, Author]>;

export const Contents = (props: Props) => {
  const { data } = useGetResources();

  const items = useMemo(() => {
    return (data?.data || []).map<[ContentResource, Author]>((resource) => [
      {
        id: resource.id,
        isBookmarked: resource.isBookmarked,
        title: resource.fileName,
        bannerImgUrl: "/imgs/category-3.png",
        href: `/resources/${resource.id}`,
      },
      {
        userId: resource.userId,
        avatarUrl: resource.profilePicture ?? "",
        email: resource.email,
        fullName: resource.username,
      },
    ]);
  }, [data?.data]);

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

          <ContentFilters />

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
