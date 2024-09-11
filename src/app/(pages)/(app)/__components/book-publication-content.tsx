"use client";

import ContentCardSkeleton, { ContentCard } from "@/components/content-card";
import { useGetResourcesByUsername } from "@/features/api/query/use-get-resource-by-username";
import { ResourcePayload } from "@/lib/response";
import { Author, ContentResource } from "@/lib/schema/data";
import { addBase64Prefix } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";

type BookPublicationContentProps = {
  username: string;
};
export const BookPublicationContent = (props: BookPublicationContentProps) => {
  const { data, isLoading } = useGetResourcesByUsername(props.username);
  const items = useMemo(() => {
    return (data || []).map<[ContentResource, Author]>((resource) => [
      {
        id: resource.id,
        isBookmarked: resource.isBookmarked,
        title: resource.fileName,
        bannerImgUrl: addBase64Prefix(resource.resourceThumbnail),
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

  if (isLoading) {
    return (
      <div className="h-[564px] flex justify-center place-items-center">
        <Loader2 className="size-12 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="grid gap-8 w-full"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(379px, 1fr))",
      }}
    >
      {isLoading && (
        <>
          <ContentCardSkeleton />
          <ContentCardSkeleton />
          <ContentCardSkeleton />
        </>
      )}
      {items.map((item, i) => (
        <ContentCard data={item[0]} author={item[1]} key={i} />
      ))}
    </div>
  );
};
