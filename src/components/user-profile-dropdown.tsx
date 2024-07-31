"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "./ui/button";
import { User } from "@/lib/response";
import { logout } from "@/auth";
import Link from "next/link";
import { addBase64Prefix } from "@/lib/utils";

type Props = {
  user: User;
  offset?: number;
};

export const UserProfileDropDown = ({
  user: { id, firstName, lastName, userName, profilePicture },
  offset,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-12">
          <AvatarImage
            src={profilePicture ? addBase64Prefix(profilePicture) : undefined}
            alt="avatar"
          />
          <AvatarFallback className="uppercase">
            {firstName.slice(0, 1)}
          </AvatarFallback>
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
              {`${firstName} ${lastName}`}
            </h3>
            <p className="text-neutral-500 text-xs font-josefin">@{userName}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="p-0 space-y-6">
            <DropdownMenuItem className="p-0">
              <Link
                href="/user-profile"
                className="flex item-center gap-x-4 text-base text-neutral-700 w-full"
              >
                <div className="size-5 relative flex item-center gap-x-4">
                  <Image
                    src="/icons/person.svg"
                    alt="icon"
                    className="absolute inset-0 object-fill"
                    fill
                  />
                </div>
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <Link
                href="/user-profile"
                className="flex item-center gap-x-4 text-base text-neutral-700 w-full"
              >
                <div className="size-5 relative flex item-center gap-x-4">
                  <Image
                    src="/icons/favourite.svg"
                    alt="icon"
                    className="absolute inset-0 object-fill"
                    fill
                  />
                </div>
                <span>Favorites</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <Link
                href="/user-profile"
                className="flex item-center gap-x-4 text-base text-neutral-700 w-full"
              >
                <div className="size-5 relative flex item-center gap-x-4">
                  <Image
                    src="/icons/profile-archieve.svg"
                    alt="icon"
                    className="absolute inset-0 object-fill"
                    fill
                  />
                </div>
                <span>Archieve</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <Link
                href="/user-profile?tab=settings"
                className="flex item-center gap-x-4 text-base text-neutral-700 w-full"
              >
                <div className="size-5 relative flex item-center gap-x-4">
                  <Image
                    src="/icons/settings.svg"
                    alt="icon"
                    className="absolute inset-0 object-fill"
                    fill
                  />
                </div>
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Button
                className="text-sm text-white bg-[#FA5A5A] border-none font-semibold py-[14px] w-full h-fit rounded-[24px]"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
