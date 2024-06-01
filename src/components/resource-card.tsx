'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export type ResourceData = {
  title: string;
  education: { grade: string; level: string };
  topicSampleTitle: string;
  resourceUrl: string;
};

type ResourceCardProps = {
  item: ResourceData;
};

export const ResourceCard = ({ item }: ResourceCardProps) => {
  const router = useRouter();
  return (
    <Card
      className="flex flex-row shadow-none items-center rounded-[128px]
     border-none overflow-hidden p-6 bg-white gap-x-4"
    >
      <CardHeader className="p-0 inline-block">
        <div
          className="inline-flex flex-col items-center
         justify-center w-20 h-20 rounded-full bg-primary-50
          text-primary-500 font-satoshi font-bold text-base "
        >
          <span>{item.education.grade}</span>
          <span>{item.education.level}</span>
        </div>
      </CardHeader>

      <div className="flex-1">
        <CardContent className="p-0 flex flex-row w-full">
          <div className="space-y-2 flex-1 self-stretch flex flex-col justify-between">
            <h5 className="font-satoshi text-2xl font-bold text-neutral-800">
              {item.title}
            </h5>
            <p className="text-neutral-400 text-sm font-normal">
              {item.topicSampleTitle}
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
