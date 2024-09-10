import {
  getAuthorPublicationsCountResSchema,
  getResourcesByUsernameResSchema,
} from "@/lib/response";
import { useApi, useAuth } from "@/providers/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetAuthorPublishCount = (userId: string) => {
  const api = useApi();
  return useQuery({
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
};
