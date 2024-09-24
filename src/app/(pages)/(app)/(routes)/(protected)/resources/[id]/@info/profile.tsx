"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { addBase64Prefix } from "@/lib/utils";
import { useAuth } from "@/providers/auth";
import Image from "next/image";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { getServerResource } from "@/features/query/get-resource";
import { getAuthorProfile } from "@/features/query/get-author-profile";
import Link from "next/link";
import { useGetAuthorPublishCount } from "@/features/api/query/use-get-publications-count";
import { User } from "@/lib/response";

export const AuthorProfile = ({ user }: { user: User }) => {
  const { data } = useGetAuthorPublishCount(user.id);
  return (
    <div className="flex flex-col gap-y-6 max-w-[320px] w-full">
      <Card
        className="rounded-[24px] border border-neutral-100 p-0
      overflow-hidden shadow-none border-none drop-shadow-none"
      >
        <CardContent className="relative z-[20] pt-[44px] space-y-6">
          <div className="flex justify-center">
            <Avatar
              className="size-[88px] border-[4px]
           border-white"
            >
              <AvatarImage
                src={
                  user.profilePicture
                    ? addBase64Prefix(user.profilePicture)
                    : undefined
                }
                alt=""
              />

              <AvatarFallback />
            </Avatar>
          </div>

          <div className="space-y-[2px] flex flex-col mx-auto w-full items-center">
            <h4 className="font-bold text-base text-black">{`${user.firstName} ${user.lastName}`}</h4>
            <p className="text-sm text-neutral-500">{`@${user.userName}`}</p>
          </div>

          <div className="border border-neutral-100 rounded-[12px] p-6">
            <div className="w-full flex items-center gap-x-4">
              <div className="space-y-[6px] flex items-center flex-col w-[50%] flex-1">
                <p className="text-neutral-700 font-semibold text-base">
                  {data ?? "-"}
                </p>
                <p className="text-sm text-neutral-500">Publication</p>
              </div>

              {/*
              <div className="self-stretch  relative">
                <Separator
                  orientation="vertical"
                  className="absolute inset-y-0"
                />
              </div>
              <div className="space-y-[6px] flex items-center flex-col  w-[50%] flex-1">
                <p className="text-neutral-700 font-semibold text-base">9</p>
                <p className="text-sm text-neutral-500">Collections</p>
              </div>
                */}
            </div>
          </div>
          <Link
            href={`/author-profile/${user.userName}`}
            className="w-full h-fit flex items-center justify-center px-6 py-[14px] text-base text-white font-semibold
    rounded-[48px] bg-primary-500 text-center"
          >
            View creator profile
          </Link>
        </CardContent>
      </Card>

      {/*
      <Card className="p-6 rounded-[12px] space-y-6 shadow-none border-none drop-shadow-none">
        <CardHeader className="p-0">
          <CardTitle className="font-semibold text-xl font-josefin">
            Profile Details
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 psace-y-2">
          <h3 className="font-medium text-base text-neutral-900">Biography</h3>
          <CardDescription className="text-sm text-neutral-400">
            Lorem ipsum dolor sit amet consectetur. Pretium amet tellus sed
            feugiat pharetra. Habitant ornare a tempor dolor in enimut pharetra
            ipsum dolor sit a
          </CardDescription>
        </CardContent>
        <CardFooter className="p-0">
          <ul className="flex flex-col gap-y-4">
            <li className="text-base font-medium">
              <p className="text-primary-500 flex items-center gap-x-2">
                <span className="text-neutral-900">Profession :</span> Education
              </p>
            </li>
            <li className="text-base font-medium ">
              <p className="text-primary-500 flex items-center gap-x-2">
                <span className="text-neutral-900">Level :</span> Secondary
              </p>
            </li>
          </ul>
        </CardFooter>
      </Card>
        */}
    </div>
  );
};
