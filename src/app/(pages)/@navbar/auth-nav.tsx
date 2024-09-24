"use client";

import { SearchInput } from "@/components/search";
import { TempLogo } from "@/components/temp-logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserProfileDropDown } from "@/components/user-profile-dropdown";
import { User } from "@/lib/response";
import { Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  user: User;
};

export const AuthNav = ({ user }: Props) => {
  const router = useRouter();
  const { q } = Object.fromEntries(useSearchParams()) as { q?: string };
  const pathname = usePathname();
  return (
    <div className="px-10 py-6 w-full border-b border-neutral-200">
      <div className="max-w-[1360px] mx-auto">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-x-6">
            <div className="text-black">
              <TempLogo />
            </div>
          </div>

          <div className="flex items-center gap-x-4">
            {/^\/results/.test(pathname) && (
              <div className="self-stretch">
                <SearchInput
                  initialSearch={q}
                  onSearch={(search) => {
                    const url = new URL(location.href);
                    url.searchParams.set("q", search);
                    router.push(`${url.pathname}${url.search}`);
                  }}
                />
              </div>
            )}
            <Button
              className="bg-primary-500  text-sm text-white font-semibold
            px-6 py-[14px] flex items-center w-fit h-fit rounded-[48px]"
              onClick={() => {
                router.push("/create/new");
              }}
            >
              <Plus className="size-6 mr-2" />
              New Upload
            </Button>

            <UserProfileDropDown user={user} offset={28} />
          </div>
        </div>
      </div>
    </div>
  );
};
