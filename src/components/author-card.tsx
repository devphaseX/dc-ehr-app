'use client';

import { Author } from '@/lib/validations/author';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

type Props = {
  author: Author;
  courseAuthorId: string;
};

export const AuthorCard = ({
  author: {
    id,
    fullName,
    avatarImg,
    bio,
    interests,
    instagramUrl,
    facebookUrl,
    portfolioUrl,
  },
  courseAuthorId,
}: Props) => {
  const socialHandles = [
    ['Instagram', instagramUrl],
    ['Facebook', facebookUrl],
    ['Website', portfolioUrl],
  ].filter(
    (handle): handle is [string, string] => typeof handle[1] !== 'undefined'
  );

  return (
    <Card className="p-8 rounded-[16px] shadow-none border-neutral-100">
      <CardHeader className="p-0 flex flex-col items-center gap-y-2">
        <Avatar className="size-20">
          <AvatarImage src={avatarImg ?? undefined} alt="avatar" />
          <AvatarFallback>
            {fullName.replace(/(?:(\w)\w*?)\s+(?:(\w)\w*)/, '$1$2')}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-[2px] text-center">
          <h4 className="font-medium text-black text-lg">{fullName}</h4>
          <p className="text-xs text-neutral-400">
            {courseAuthorId === id ? 'Original creator' : 'Editor'}
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-0 space-y-8">
        {bio && (
          <div className="space-y-4">
            <h6 className="font-bold text-black text-base">Biography</h6>
            <CardDescription className="text-ellipsis h-[60px] overflow-hidden text-sm">
              {bio}
            </CardDescription>
          </div>
        )}
        <div className="space-y-4">
          <h5 className="font-bold text-black text-lg mb-2">Skills</h5>
        </div>

        <Button className="bg-primary-500 text-white font-medium h-fit py-3.5 items-center w-full">
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};
