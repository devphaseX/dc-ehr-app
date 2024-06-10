import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ContentCategory } from '@/types';
import Image from 'next/image';
import React from 'react';

interface ContentCardCategoryCardProps extends ContentCategory {}
export const ContentCatgoryCard = ({
  title,
  bannerUrl,
  grade,
  colour,
}: ContentCardCategoryCardProps) => {
  return (
    <Card className="w-[379px] rounded-[16px] p-0 border-none overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-[264px]">
          <Image
            src={bannerUrl}
            fill
            className="object-cover object-center"
            alt="banner"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6" style={{ backgroundColor: colour }}>
        <div className="w-full font-josefin space-y-2">
          <h4 className="text-xl font-bold text-white">{title}</h4>
          <p className="lowercase text-white font-medium text-base">
            CLASS: {grade}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
