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
    <Card className="flex shadow-none  rounded-[8px] border-none overflow-hidden gap-x-6 p-6">
      <CardHeader className="p-0 inline-block">
        <div
          className="inline-flex flex-col items-center
         justify-center w-20 h-20 rounded-[8px] bg-neutral-900
          text-white font-satoshi font-bold text-base "
        >
          <span>{item.education.grade}</span>
          <span>{item.education.level}</span>
        </div>
      </CardHeader>

      <div className="">
        <CardContent className="p-0 flex flex-row">
          <div className="space-y-2 flex-1 self-stretch flex flex-col justify-between">
            <h5 className="font-satoshi text-2xl font-bold text-neutral-800">
              {item.title}
            </h5>
            <p className="text-neutral-500 text-lg font-normal">
              {item.topicSampleTitle}
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
