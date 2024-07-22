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
import { useBase64Encoder } from "@/hooks/use-base64";
import Image from "next/image";
import { toast } from "sonner";

const Info = () => {
  const { pick, base64, encoding } = useBase64Encoder();
  console.log({ base64, encoding });
  return (
    <div className="flex flex-col gap-y-6 max-w-[320px]">
      <Card
        className="rounded-[24px] border border-neutral-100 p-0
      overflow-hidden shadow-none border-none drop-shadow-none"
      >
        <CardHeader className="h-[140px] p-0 relative isolate">
          <div className="absolute inset-0 bg-neutral-100 z-[-1]">
            <Image src="/imgs/profile-bg-cover.png" alt="cover" fill />
          </div>

          <div className="flex justify-between items-center p-4">
            <Button className="!bg-white rounded-full size-8 p-0">
              <Image
                src="/icons/gear-alt-r.svg"
                alt="icon"
                width={16}
                height={16}
                className="object-fill"
              />
            </Button>

            <Button className="!bg-white rounded-full size-8 p-0">
              <Image
                src="/icons/pencil-r.svg"
                alt="icon"
                width={16}
                height={16}
                className="object-fill"
              />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="relative z-[20] pt-[44px] space-y-6">
          <div className="absolute top-0  left-1/2 -translate-y-1/2 -translate-x-1/2">
            <Avatar
              className="size-[88px] border-[4px]
           border-white"
            >
              <AvatarImage src={base64 ?? "/imgs/avatar-2.png"} alt="" />

              <AvatarFallback />
            </Avatar>
            <label
              htmlFor="small-image-picker"
              className="absolute flex items-center justify-center size-6
            bg-primary-500 rounded-full bottom-0 right-[4px] border-[2px] border-white"
            >
              <input
                className="hidden"
                id="small-image-picker"
                type="file"
                onChange={(ev) => {
                  const files = ev.target.files;
                  if (files) {
                    const [file] = files;
                    pick(file);
                  }
                }}
              />
              <Image
                src="/icons/camera-r.svg"
                alt="icon"
                width={12}
                height={12}
                className="object-fill"
              />
            </label>
          </div>

          <div className="space-y-[2px] flex flex-col mx-auto w-full items-center">
            <h4 className="font-bold text-base text-black">Adam James</h4>
            <p className="text-sm text-neutral-500">@admajames</p>
          </div>

          <div className="border border-neutral-100 rounded-[12px] p-6">
            <div className="w-full flex items-center gap-x-4">
              <div className="space-y-[6px] flex items-center flex-col w-[50%] flex-1">
                <p className="text-neutral-700 font-semibold text-base">56</p>
                <p className="text-sm text-neutral-500">Publication</p>
              </div>
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
            </div>
          </div>
          <Button className="text-sm text-white bg-[#FA5A5A] border-none font-semibold py-[14px] w-full h-fit rounded-[24px]">
            Logout
          </Button>
        </CardContent>
      </Card>

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
    </div>
  );
};

export default Info;
