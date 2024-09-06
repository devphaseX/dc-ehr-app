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
import { addBase64Prefix, cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth";
import { useUnbookmarkResource } from "@/features/api/mutation/use-resource-unbookmark";
import { ResourceFile } from "@/lib/response";

type Props = {
  data: ResourceFile;
};

export const ContentFileCard = ({ data }: Props) => {
  const { user } = useAuth();

  return (
    <Card
      className="relative min-w-[379px] rounded-[12px]
      overflow-hidden  p-0 border-none drop-shadow-content-card"
    >
      <CardHeader
        className="flex flex-row items-center justify-between
         p-0 shadow-none px-5 py-4 space-y-0"
      >
        <div className="flex items-center gap-x-2">
          {/*
          <Avatar className="size-10">
            <AvatarImage src={avatarUrl} alt="photo" />
            <AvatarFallback className="bg-neutral-50">
              <span className="text-lg">{fullName.at(0)}</span>
            </AvatarFallback>
          </Avatar>
          <p className="text-sm text-neutral-900 font-josefin">
            by <span className="capitalize font-bold">{fullName}</span>
          </p>
          */}
        </div>
      </CardHeader>

      <CardContent className="p-0 shadow-none">
        <div className="h-[240px] bg-neutral-50 relative">
          <Image
            src={addBase64Prefix(data.fileImage)}
            alt="banner photo"
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="bg-white p-6">
          <p className="text-black font-medium font-josefin text-base text-ellipsis break-words">
            {data.fileName}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
