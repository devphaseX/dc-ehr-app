import {
  createServerQuery,
  serverQuerySchema,
} from "@/app/(pages)/(app)/(routes)/(protected)/results/schema";
import { SearchResultsProps } from "@/app/(pages)/(app)/(routes)/(protected)/results/search-results";
import {
  getCategoriesResSchema,
  getResourceResSchema,
  getResourcesResSchema,
} from "@/lib/response";
import { useApi } from "@/providers/auth";
import {
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { TypeOf } from "zod";

interface ResourceData {
  id: string;
  fileName: string;
  profilePicture: string | null;
  userId: string;
  email: string;
  username: string;
  categoryId: string;
  category: string;
  subject: string;
  tags: string[];
  isBookmarked: boolean;
  description: string;
}

interface PaginatedResponse {
  data: ResourceData[];
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

interface GetResourcesResponse {
  responseCode: number;
  responseMessage: string;
  responseData?: PaginatedResponse;
}

interface PageParam {
  pageNumber: number;
  pageSize: number;
}

interface ResourceData {
  id: string;
  fileName: string;
  profilePicture: string | null;
  userId: string;
  email: string;
  username: string;
  categoryId: string;
  category: string;
  subject: string;
  tags: string[];
  isBookmarked: boolean;
  description: string;
}

interface PaginatedResponse {
  data: ResourceData[];
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

interface GetResourcesResponse {
  responseCode: number;
  responseMessage: string;
  responseData?: PaginatedResponse;
}

interface PageParam {
  pageNumber: number;
  pageSize: number;
}

export const useSuspenseGetResources = (
  query: SearchResultsProps["query"],
  options?: Omit<
    UseInfiniteQueryOptions<
      PaginatedResponse,
      Error,
      PaginatedResponse,
      PaginatedResponse
    >,
    "queryKey" | "queryFn" | "getNextPageParam" | "getPreviousPageParam"
  >,
) => {
  const api = useApi();

  return useSuspenseInfiniteQuery({
    queryKey: ["resources", query],
    initialPageParam: {
      pageNumber: query.pageNumber,
      pageSize: query.pageNumber,
    },
    queryFn: async ({ pageParam }) => {
      const pageURL = new URL(location.href);
      const { data } = await api.get(`/Resource/GetAllResource`, {
        params: { ...query, ...(pageParam as Record<string, string>) },
        validateResponse: (data) => getResourcesResSchema.parse(data),
      });

      if (!data) {
        throw new Error("An error occurred fetching resources");
      }

      if (data.responseCode !== 200) {
        throw new Error(data.responseMessage);
      }

      if (!data.responseData) {
        throw new Error("No response data received");
      }

      return data.responseData;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber < lastPage.totalPages) {
        return {
          pageNumber: lastPage.pageNumber + 1,
          pageSize: lastPage.pageSize,
        };
      }
      return undefined;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.pageNumber > 1) {
        return {
          pageNumber: firstPage.pageNumber - 1,
          pageSize: firstPage.pageSize,
        };
      }
      return undefined;
    },
    ...options,
  });
};
