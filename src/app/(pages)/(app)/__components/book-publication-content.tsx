"use client";

import ContentCardSkeleton, { ContentCard } from "@/components/content-card";
import { useGetResourcesByUsername } from "@/features/api/query/use-get-resource-by-username";
import { ResourcePayload } from "@/lib/response";
import { Author, ContentResource } from "@/lib/schema/data";
import { addBase64Prefix } from "@/lib/utils";
import { Loader2, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

type BookPublicationContentProps = {
  username: string;
  isOwner?: boolean;
};
export const BookPublicationContent = (props: BookPublicationContentProps) => {
  const { data, isLoading } = useGetResourcesByUsername(props.username);
  let items = useMemo(() => {
    return (data || []).map<[ContentResource, Author]>((resource) => [
      {
        id: resource.id,
        isBookmarked: resource.isBookmarked,
        title: resource.fileName,
        bannerImgUrl: addBase64Prefix(resource.resourceImage),
        href: `/resources/${resource.id}`,
      },
      {
        userId: resource.userId,
        avatarUrl: resource.profilePicture
          ? addBase64Prefix(resource.profilePicture)
          : "",
        email: resource.email,
        fullName: resource.username,
        username: resource.username,
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
    <>
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[400px] bg-background border border-dashed rounded-lg p-8 text-center">
          <div className="w-48 h-48 mb-6 relative">
            <Image src={"/imgs/page_not_found_bg.png"} alt="" fill />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            No resources found
          </h2>
          {props.isOwner ? (
            <>
              <p className="text-muted-foreground mb-6">
                You haven't added any resources to your profile yet. Start by
                adding your first resource.
              </p>
              <Link
                href="/create/new"
                className="flex items-center justify-center px-8 py-4 w-full
    rounded-[48px] bg-primary-500 text-white font-semibold text-base font-josefin full h-fit"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Resource
              </Link>
            </>
          ) : (
            <p className="text-muted-foreground mb-6">
              This author haven't added any resources to their profile yet.
            </p>
          )}
        </div>
      )}
      <div
        className="grid gap-8 w-full"
        style={{
          gridTemplateColumns:
            items.length < 2
              ? "repeat(2, 1fr)"
              : "repeat(auto-fit, minmax(379px, 1fr))",
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
    </>
  );
};
