"use client";

import { Container } from "@/components/container";
import { getQueryClient } from "@/providers/query-client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
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
  const { info, children, params } = props;
  const { prevUrl, userId } = Object.fromEntries(useSearchParams()) as {
    prevUrl?: string;
    userId?: string;
  };

  const client = getQueryClient();

  const api = useApi();
  client.prefetchQuery({
    queryKey: ["get_author_publication_counts", userId],
    queryFn: async () => {
      const { data, status } = await api.get(
        `/Resource/GetPublicationsCountForUser/${userId}`,
        {
          validateResponse: (data) =>
            getAuthorPublicationsCountResSchema.parse(data),
        },
      );

      if (!(data || status)) {
        throw new Error(
          "failed to fetch publication count. Issue with internet connectivity",
        );
      }

      if (!(data?.responseCode === 200 || status === 200)) {
        throw new Error(data?.responseMessage ?? "failed to fetch resources");
      }

      return data?.responseData!;
    },
  });

  return (
    <div className="bg-neutral-50 pt-14 pb-[111px] min-h-full">
      <Container>
        <div>
          <Link
            href="/security-questions"
            className="text-primary-500 text-sm flex items-center gap-x-2 mb-8"
          >
            <ChevronLeft className="size-5" />
            Back
          </Link>
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
