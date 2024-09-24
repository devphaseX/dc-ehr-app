import { createServerQuery } from "@/app/(pages)/(app)/(routes)/(protected)/results/schema";
import {
  getCategoriesResSchema,
  getResourceResSchema,
  getResourcesResSchema,
} from "@/lib/response";
import { objectToURLParams } from "@/lib/utils";
import { useApi } from "@/providers/auth";
import {
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

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

export const useGetResources = (
  initialPageParam: PageParam = { pageNumber: 1, pageSize: 10 },
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

  const searchParams = Object.fromEntries(useSearchParams());
  return useInfiniteQuery({
    queryKey: ["resources", searchParams],
    initialPageParam: initialPageParam,
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get("/Resource/GetAllResource", {
        // params: createServerQuery(searchParams),
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
