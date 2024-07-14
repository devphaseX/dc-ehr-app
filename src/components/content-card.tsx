import { Author, ContentResource } from '@/lib/schema/data';
import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Heart, Share } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  data: ContentResource;
  author: Author;
};

export const ContentCard = ({
  data: { title, bannerImgUrl, bookmarked, href },
  author: { fullName, email, avatarUrl },
}: Props) => {
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
                {fullName.at(0)}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm text-white font-josefin">
              by <span className="capitalize">{fullName}</span>
            </p>
          </div>

          <Button
            className="size-10 rounded-full flex items-center 
                justify-center !bg-neutral-50 p-0"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Heart className="size-5 text-neutral-900" />
          </Button>
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
