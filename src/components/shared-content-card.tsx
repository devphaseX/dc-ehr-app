import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { SharedContent } from '@/lib/validations/shared-content';
import { format } from 'date-fns';
import { Button } from './ui/button';
import Image from 'next/image';
import { Dot } from 'lucide-react';

type Props = {
  content: SharedContent;
};

export const SharedContentCard = ({
  content: { userId, fullName, fileName, fileSize, fileUrl, role, uploadedAt },
}: Props) => {
  return (
    <Card className="p-0 grid grid-cols-[min-content_1fr_min-content] grid-rows-[min-content_min-content] gap-x-4  gap-y-4 border-none rounded-none shadow-none">
      <div className="col-span-1 row-span-full">
        <Avatar className="size-8">
          <AvatarImage />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
      <CardHeader className="p-0 col-start-2 col-end-[-1] row-span-1 flex items-start justify-between flex-row gap-x-4">
        <div className="space-y-1">
          <div className="flex justify-between items-center gap-x-1.5">
            <div>
              <h6 className="font-bold text-black text-sm">{fullName}</h6>
            </div>

            <Dot className="stroke-[3px] size-4 text-[#D9D9D9]" />

            <div
              className="inline-flex items-center 
          justify-center
            text-neutral-300 text-[10px] font-medium"
            >
              {role}
            </div>
          </div>
          <p className="text-xs text-neutral-500">
            Uploaded: {format(uploadedAt, 'dd MMM, yyyy')}
          </p>
        </div>
        <Button className="font-bold text-sm text-white px-5 py-2.5 w-fit h-fit rounded-[4px]">
          Download
        </Button>
      </CardHeader>

      <CardFooter className="p-4 border-[1px] col-start-2 col-end-[-1] border-none bg-neutral-50 rounded-[4px] w-full flex items-center justify-between">
        <div className="inline-flex items-center font-medium text-neutral-500 gap-x-2">
          <Image src="/icons/pdf.svg" alt="icon" width={16} height={16} />
          {fileName}
        </div>
        <p className="text-xs font-bold text-neutral-300 uppercase">
          File size: {fileSize}
        </p>
      </CardFooter>
    </Card>
  );
};
