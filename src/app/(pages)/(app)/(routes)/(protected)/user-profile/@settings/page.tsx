"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { z } from "zod";
import { ChangePassword } from "./change-password";
import { DeleteUserAccount } from "./delete-account";
import { ProfileForm } from "../profile-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useBase64Encoder } from "@/hooks/use-base64";
import { useUploadProfileImg } from "@/features/api/mutation/use-upload-profile-img";
import { useAuth } from "@/providers/auth";
import { addBase64Prefix } from "@/lib/utils";

const SettingPage = () => {
  const {
    mutation: { mutate, status },
  } = useUploadProfileImg();
  const router = useRouter();

  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-[855px] w-full bg-white rounded-[24px]">
      <div className="p-8 h-full">
        <div className="space-y-8">
          <h3 className="font-semibold text-[40px] leading-[54px] text-neutral-800">
            Setting
          </h3>

          <div className="flex items-center justify-between">
            <div className="relative inline-block">
              <Avatar
                className="size-[120px] border-[4px]
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
              <label
                htmlFor="profile-setting-img-picker"
                className="absolute flex items-center justify-center size-9
            bg-primary-500 rounded-full bottom-0 right-[4px] border-[2px] border-white"
              >
                <input
                  type="file"
                  id="profile-setting-img-picker"
                  className="hidden"
                  onChange={(ev) => {
                    const files = ev.target.files;
                    if (files) {
                      const [file] = files;
                      mutate({ file });
                    }
                  }}
                />
                <Image
                  src="/icons/camera-r.svg"
                  alt="icon"
                  width={16}
                  height={16}
                  className="object-fill"
                />
              </label>
            </div>

            <div className="flex items-center gap-x-6">
              <Button className="rounded-[48px] px-6 py-3 w-fit h-fit text-primary-500 bg-primary-50 font-semibold text-sm">
                Change cover photo
              </Button>
              <Button
                onClick={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.set("tab", "edit-profile");
                  router.push(url.toString());
                }}
                className="rounded-[48px] px-6 py-3 w-fit h-fit bg-primary-500 text-white font-semibold text-sm"
              >
                Edit profile
              </Button>
            </div>
          </div>
          <div className="p-0 space-y-2">
            <h3 className="font-medium text-base text-neutral-900">
              Biography
            </h3>
            <div className="px-6 py-4 bg-neutral-50 rounded-[8px]">
              <p className="text-sm text-neutral-400">
                Lorem ipsum dolor sit amet consectetur. Pretium amet tellus sed
                feugiat pharetra. Habitant ornare a tempor dolor in enimut
                pharetra ipsum dolor sit a
              </p>
            </div>
          </div>

          <div className="!mt-10 space-y-16">
            <ProfileForm preview user={user} />
            <ChangePassword />
            <DeleteUserAccount />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
