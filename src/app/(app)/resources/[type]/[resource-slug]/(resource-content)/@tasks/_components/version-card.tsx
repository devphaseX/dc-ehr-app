import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Author } from '@/lib/validations/author';
import { format } from 'date-fns';
import { MoreVertical } from 'lucide-react';
import React from 'react';

type Props = {
  author: Author;
  changes: {
    changesMsg: string;
    downloadUrl: string;
    updatedAt: Date;
  };
};

export const VersionCard = ({ author, changes }: Props) => {
  const { fullName, avatarImg, role = 'contributor' } = author;
  const { changesMsg, downloadUrl, updatedAt } = changes;
  return (
    <Card
      className="p-0 grid grid-cols-[min-content_1fr_min-content] grid-rows-[min-content_min-content]
     gap-x-4  gap-y-4 border-none rounded-none shadow-none "
    >
      <div className="col-span-1 row-span-full flex flex-col space-y-[4px]">
        <Avatar className="size-8">
          <AvatarImage src={avatarImg} alt="avatar" />
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <div className="w-full flex-1 flex justify-center">
          <Separator orientation="vertical" className="w-[2px]" />
        </div>
      </div>
      <CardHeader className="p-0 col-start-2 col-end-[-1] row-span-1 flex items-start justify-between flex-row gap-x-4 space-y-0">
        <div className="space-y-1 ">
          <div className="flex justify-between items-center gap-x-1.5">
            <div>
              <h6 className="font-bold text-black text-sm">{fullName}</h6>
            </div>

            <div
              className="inline-flex items-center 
          justify-center px-1.5 py-0.5 rounded-[5px]
           bg-neutral-50 text-neutral-300 text-[10px] font-medium"
            >
              {role}
            </div>
          </div>
          <p className="text-xs text-neutral-500">
            {format(updatedAt, 'dd MMM yyyy | p')}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="!p-0 w-fit h-fit !bg-transparent"
            >
              <MoreVertical className="size-6 text-neutral-800 stroke-[1px]" />
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </CardHeader>

      <div className="pb-8 col-start-2 col-end-[-1]">
        <CardFooter className="py-4 px-6 border-[1px] w-full  border-none rounded-[4px]  flex items-center justify-between bg-neutral-50">
          <p className="text-sm text-neutral-800 font-medium">{changesMsg}</p>
          <div className="flex gap-x-4 items-center">
            <Button
              variant="ghost"
              className="text-sm text-[#1774FF] font-bold w-fit h-fit p-0"
            >
              Review
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};
