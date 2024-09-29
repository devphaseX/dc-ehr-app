"use client";

import { Container } from "@/components/container";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  info: React.ReactNode;
  children: React.ReactNode;
  settings: React.ReactNode;
  editProfile: React.ReactNode;
};

const Layout = ({ info, children, settings, editProfile }: Props) => {
  const { tab } = Object.fromEntries(useSearchParams()) as {
    tab: "string" | "settings" | "edit-profile";
  };

  const router = useRouter();
  return (
    <div className="bg-neutral-50 pt-14 pb-[111px] min-h-screen">
      <Container className="min-h-full">
        <div>
          <div
            onClick={() => {
              router.back();
            }}
            className="text-primary-500 text-sm flex items-center gap-x-2 mb-8"
          >
            <ChevronLeft className="size-5" />
            Back
          </div>
        </div>

        <div className="flex gap-x-6">
          {info}
          <div className="flex-1 relative flex flex-col">
            {tab === "settings"
              ? settings
              : tab === "edit-profile"
                ? editProfile
                : children}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Layout;
