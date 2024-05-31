'use client';

import { Author } from '@/lib/validations/author';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  author: Author;
};

export const AuthorCard = ({
  author: {
    id,
    fullName,
    avatarImg,
    bio,
    interests,
    skills,
    bookPublishedCounts,
    contributeCounts,
    email,
    instagramUrl,
    facebookUrl,
    portfolioUrl,
  },
}: Props) => {
  const socialHandles = [
    [
      'Linkedin',
      [
        '',
        <Image
          src="/icons/linkedin.svg"
          fill
          className="object-fit"
          alt="icon"
        />,
      ],
    ],
    [
      'Instagram',
      [
        instagramUrl,
        <Image
          src="/icons/instagram.svg"
          fill
          className="object-fit"
          alt="icon"
        />,
      ],
    ],
    [
      'Twitter',
      ['', <Image src="/icons/x.svg" fill className="object-fit" alt="icon" />],
    ],
    [
      'Facebook',
      [
        facebookUrl,
        <Image
          src="/icons/facebook.svg"
          fill
          className="object-fit"
          alt="icon"
        />,
      ],
    ],
  ].filter(
    (handle): handle is [string, string] => typeof handle[1] !== 'undefined'
  );

  return (
    <Card className="p-8 rounded-[16px] border-neutral-200 shadow-none">
      <div className="space-y-8">
        <CardHeader className="p-0">
          {bio && (
            <div className="space-y-4">
              <h6 className="font-bold text-black text-base">Biography</h6>
              <CardDescription className="text-ellipsis h-[60px] overflow-hidden text-sm">
                {bio}
              </CardDescription>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-0 space-y-8">
          <div className="space-y-4">
            <h5 className="font-bold text-black text-lg mb-2">Skills</h5>
            <div className="flex items-center gap-2 flex-wrap">
              {skills?.map((skill) => (
                <div
                  className="inline-flex items-center justify-center
               rounded-[32px] bg-neutral-50 text-neutral-600 py-2 px-4 font-bold capitalize"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-0 space-y-4 flex-col items-start">
          <h4 className="text-black font-bold text-base">Social media</h4>
          <div className="flex flex-col gap-y-4">
            {socialHandles
              .filter((s) => Boolean(s[1][0]))
              .map(([name, [url, icon]]) => (
                <Link
                  href={url}
                  className="flex gap-x-2 items-center justify-center"
                >
                  <div className="flex items-center justify-center relative border border-100 rounded-[4px] size-8">
                    <div className="relative size-4">{icon}</div>
                  </div>
                  <p className="font-bold text-neutral-900 text-xs">{url}</p>
                </Link>
              ))}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

/* 
 <CardHeader className="p-0 space-y-6">
        <div className="space-y-6">
          <div className="flex items-center gap-x-">
            <p className="text-sm text-neutral-400 flex items-center gap-x-2">
              <span className="font-bold text-neutral-800">
                {bookPublishedCounts}
              </span>
              Published
            </p>
            <Dot className="size-[18px] text-[#D9D9D9]" />
            <p className="text-sm text-neutral-400 flex items-center gap-x-2">
              <span className="font-bold text-neutral-800">
                {contributeCounts}
              </span>
              contributions
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            {socialHandles
              .filter((s) => Boolean(s[1][0]))
              .map(([name, [url, icon]]) => (
                <div className="inline-flex items-center justify-center size-8 border border-100 rounded-[4px]">
                  <Link href={url} className="inline-block relative size-4">
                    {icon}
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </CardHeader>
 <div className="flex flex-row items-center gap-x-6">
          <Avatar className="size-20">
            <AvatarImage src={avatarImg ?? undefined} alt="avatar" />
            <AvatarFallback>
              {fullName.replace(/(?:(\w)\w*?)\s+(?:(\w)\w*)/, '$1$2')}
            </AvatarFallback>
          </Avatar> 
          <div className="space-y-[2px] text-center">
            <h4 className="font-medium text-black text-lg">{fullName}</h4>
            <p className="text-base text-neutral-800 font-medium">{email}</p>
          </div>
        </div>
*/
