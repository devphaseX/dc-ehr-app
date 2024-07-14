import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { z } from "zod";
import { ProfileForm } from "./profile-form";
import { ChangePassword } from "./change-password";
import { DeleteUserAccount } from "./delete-account";

const SettingPage = () => {
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
                <AvatarImage src="/imgs/avatar-2.png" alt="" />

                <AvatarFallback />
              </Avatar>
              <div
                className="absolute flex items-center justify-center size-9
            bg-primary-500 rounded-full bottom-0 right-[4px] border-[2px] border-white"
              >
                <Image
                  src="/icons/camera-r.svg"
                  alt="icon"
                  width={16}
                  height={16}
                  className="object-fill"
                />
              </div>
            </div>

            <div className="flex items-center gap-x-6">
              <Button className="rounded-[48px] px-6 py-3 w-fit h-fit text-primary-500 bg-primary-50 font-semibold text-sm">
                Change cover photo
              </Button>
              <Button className="rounded-[48px] px-6 py-3 w-fit h-fit bg-primary-500 text-white font-semibold text-sm">
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
            <ProfileForm preview />
            <ChangePassword />
            <DeleteUserAccount />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
