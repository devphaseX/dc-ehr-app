"use client";

import { Author, ContentResource } from "@/lib/schema/data";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Forward, Heart, Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useBookmarkResource } from "@/features/api/mutation/use-resource-bookmark";
import { toast } from "sonner";
import { addBase64Prefix, cn } from "@/lib/utils";
import { useUnbookmarkResource } from "@/features/api/mutation/use-resource-unbookmark";
import { ResourceFile } from "@/lib/response";

type Props = {
  data: ResourceFile;
};

export const ResourceFileCard = ({ data }: Props) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `/api/Resource/DownloadResourceFile/${data.fileId}`;
    link.download = data.fileName || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="flex gap-x-4 border-none drop-shadow-content-card px-4 py-[18px]">
      <CardHeader className="inline-flex p-0 shadow-none space-y-0">
        <div className="size-[100px] bg-neutral-50 rounded-[8px] relative">
          {<Image src={addBase64Prefix(data.fileImage)} alt="image" fill />}
        </div>
      </CardHeader>

      <CardContent className="p-0 shadow-none self-stretch flex-1">
        <div className="flex flex-col w-full justify-between gap-y-3">
          <div className="space-y-1">
            <p
              className="text-black font-semibold
           text-ellipsis break-words text-lg"
            >
              {data.fileName}
            </p>
            <p className="text-xs text-neutral-400">Upload on May 16, 2024</p>
          </div>
          <div className="flex w-full items-baseline justify-between">
            <div className="inline-flex items-center gap-x-4 ">
              <Button
                className={cn(
                  `size-10 rounded-[48px] flex items-center
                    justify-center !bg-neutral-50 p-0`,
                )}
              >
                <Heart
                  className={cn(
                    `size-5 text-neutral-900`,
                    "fill-rose-500 text-rose-500",
                  )}
                />
              </Button>

              <Button
                className={cn(
                  `size-10 rounded-[48px] flex items-center
                      justify-center !bg-neutral-50 p-0`,
                )}
              >
                <Forward className={cn(`size-5 text-neutral-900`)} />
              </Button>
            </div>

            <Button
              onClick={handleDownload}
              className="text-xs px-5 py-[10px] w-fit h-fit rounded-[40px]"
            >
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
