'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

type Props = {};

export const ActionButtons = (props: Props) => {
  return (
    <div className="flex items-center gap-x-4">
      <Button
        className="bg-primary-500 rounded-[8px]
       px-6 py-4 text-white font-bold h-fit w-fit gap-x-2"
      >
        <Image src="/icons/add-circle.svg" alt="icon" width={20} height={20} />
        Add to library
      </Button>
      <Button
        variant="outline"
        className="border-neutral-200 rounded-[8px]
       px-6 py-4 text-neutral-900 font-bold h-fit w-fit gap-x-2"
      >
        <Image src="/icons/send.svg" alt="icon" width={20} height={20} />
        Share
      </Button>
      <Button
        variant="outline"
        className="border-neutral-200 rounded-[8px]
       px-6 py-4 text-neutral-900 font-bold h-fit w-fit gap-x-2"
      >
        <Image src="/icons/archive.svg" alt="icon" width={20} height={20} />
        Bookmark
      </Button>
    </div>
  );
};
