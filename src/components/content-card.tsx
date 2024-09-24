"use client";

import { Author, ContentResource } from "@/lib/schema/data";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Heart, Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useBookmarkResource } from "@/features/api/mutation/use-resource-bookmark";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth";
import { useUnbookmarkResource } from "@/features/api/mutation/use-resource-unbookmark";
import { Skeleton } from "./ui/skeleton";

type Props = {
  data: ContentResource;
  author: Author;
};

export const ContentCard = ({
  data: { id, title, bannerImgUrl, isBookmarked: bookmarked, href },
  author: { fullName, email, avatarUrl, username },
}: Props) => {
  const { mutate: bookmarkResource } = useBookmarkResource();
  const { mutate: unbookmarkResource } = useUnbookmarkResource();
  const { user } = useAuth();
  const [bookmark, setBookmark] = useState(bookmarked);

  return (
    <Link href={href} className="isolate">
      <Card
        className="relative min-w-[379px] rounded-[12px]
      overflow-hidden  p-0 border-none drop-shadow-content-card"
      >
        <CardHeader
          className="flex flex-row items-center justify-between
         p-0 shadow-none px-5 py-4 space-y-0"
        >
          <div className="flex items-center gap-x-2">
            <Avatar className="size-10">
              <AvatarImage src={avatarUrl} alt="photo" />
              <AvatarFallback className="bg-neutral-50">
                <span className="text-lg">{fullName.at(0)}</span>
              </AvatarFallback>
            </Avatar>
            <p className="text-sm text-neutral-900 font-josefin">
              by{" "}
              <Link
                href={`/author-profile/${username}`}
                className="capitalize font-bold"
              >
                {fullName}
              </Link>
            </p>
          </div>
          {user && (
            <Button
              className={cn(
                `size-10 rounded-full flex items-center
                justify-center !bg-neutral-50 p-0`,
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (bookmark) {
                  setBookmark(false);
                  unbookmarkResource(
                    { id },
                    {
                      onSuccess: () => {
                        toast.success("removed resource from bookmarks");
                      },
                      onError: (err) => {
                        setBookmark(true);
                        let error: Error;

                        if (Object(err) === err && err instanceof Error) {
                          error = err;
                        } else {
                          error = new Error(String(err));
                        }
                        toast.error(error.message);
                      },
                    },
                  );
                  return;
                }

                setBookmark(true);

                bookmarkResource(
                  { id },
                  {
                    onSuccess: () => {
                      toast.success("resource bookmarked successfully");
                    },
                    onError: (err) => {
                      setBookmark(false);
                      let error: Error;

                      if (Object(err) === err && err instanceof Error) {
                        error = err;
                      } else {
                        error = new Error(String(err));
                      }
                      toast.error(error.message);
                    },
                  },
                );
              }}
            >
              <Heart
                className={cn(
                  `size-5 text-neutral-900`,
                  bookmark && "fill-rose-500 text-rose-500",
                )}
              />
            </Button>
          )}
        </CardHeader>

        <CardContent className="p-0 shadow-none">
          <div className="h-[240px] bg-neutral-50 relative">
            <Image
              src={bannerImgUrl}
              alt="banner photo"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="bg-white p-6">
            <p className="text-black font-medium font-josefin text-base text-ellipsis break-words">
              {title}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default function ContentCardSkeleton() {
  return (
    <div className="isolate" aria-busy="true" aria-live="polite">
      <Card className="relative min-w-[379px] rounded-xl overflow-hidden border-none drop-shadow-content-card">
        <CardHeader className="flex flex-row items-center justify-between p-4 space-y-0">
          <div className="flex items-center gap-x-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </CardHeader>

        <CardContent className="p-0">
          <Skeleton className="h-60 w-full" />
          <div className="bg-white p-6">
            <Skeleton className="h-5 w-3/4" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
