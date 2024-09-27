"use client";

import { Container } from "@/components/container";
import { getQueryClient } from "@/providers/query-client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { serverApi } from "@/features/server-api";
import {
  GetUserResp,
  getAuthorPublicationsCountResSchema,
  getUserRespSchema,
} from "@/lib/response";
import { useApi } from "@/providers/auth";

type Props = {
  info: React.ReactNode;
  children: React.ReactNode;
  searchParams: { prevUrl?: string };
  params: { userName: string };
};

const Layout = (props: Props) => {
  const { info, children, searchParams } = props;
  const router = useRouter();

  return (
    <div className="bg-neutral-50 pt-14 pb-[111px] min-h-full">
      <Container>
        <div>
          <div
            onClick={() => {
              router.back();
            }}
            className="cursor-pointer text-primary-500 text-sm flex items-center gap-x-2 mb-8"
          >
            <ChevronLeft className="size-5" />
            Back
          </div>
        </div>

        <div className="flex gap-x-6">
          {info}
          <div className="flex-1 relative">{children}</div>
        </div>
      </Container>
    </div>
  );
};

export default Layout;
