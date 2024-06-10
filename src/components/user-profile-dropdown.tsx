'use client';

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Button } from './ui/button';

type Props = {
  user: {
    id: string;
    name: string;
    avatarUrl?: string;
    username: string;
  };

  offset?: number;
};

export const UserProfileDropDown = ({
  user: { id, name, avatarUrl, username },
  offset,
}: Props) => {
  const [profileDropDownOpen, setProfileDropDownOpen] = useState(false);

  return (
    <DropdownMenu
      open={profileDropDownOpen}
      onOpenChange={setProfileDropDownOpen}
    >
      <DropdownMenuTrigger>
        <Avatar className="size-12">
          <AvatarImage src={avatarUrl} alt="avatar" />
          <AvatarFallback className="uppercase">A</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        sideOffset={offset}
        align="end"
        alignOffset={0}
        className="w-[280px] rounded-[16px] p-6 shadow-none border-none"
      >
        <div className="w-full space-y-5">
          <div className="space-y-1 w-full">
            <h3 className="font-medium text-base text-black font-josefin">
              {name}
            </h3>
            <p className="text-neutral-500 text-xs font-josefin">@{username}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="p-0 space-y-6">
            <DropdownMenuItem className="flex item-center gap-x-4 p-0 text-base text-neutral-700">
              <div className="size-5 relative flex item-center gap-x-4">
                <Image
                  src="/icons/person.svg"
                  alt="icon"
                  className="absolute inset-0 object-fill"
                  fill
                />
              </div>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex item-center gap-x-4 p-0 text-base text-neutral-700">
              <div className="size-5 relative flex item-center gap-x-4">
                <Image
                  src="/icons/favourite.svg"
                  alt="icon"
                  className="absolute inset-0 object-fill"
                  fill
                />
              </div>
              Favorites
            </DropdownMenuItem>
            <DropdownMenuItem className="flex item-center gap-x-4 p-0 text-base text-neutral-700">
              <div className="size-5 relative flex item-center gap-x-4">
                <Image
                  src="/icons/profile-archieve.svg"
                  alt="icon"
                  className="absolute inset-0 object-fill"
                  fill
                />
              </div>
              Archieve
            </DropdownMenuItem>
            <DropdownMenuItem className="flex item-center gap-x-4 p-0 text-base text-neutral-700">
              <div className="size-5 relative flex item-center gap-x-4">
                <Image
                  src="/icons/settings.svg"
                  alt="icon"
                  className="absolute inset-0 object-fill"
                  fill
                />
              </div>
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Button className="text-sm text-white bg-[#FA5A5A] border-none font-semibold py-[14px] w-full h-fit rounded-[24px]">
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
