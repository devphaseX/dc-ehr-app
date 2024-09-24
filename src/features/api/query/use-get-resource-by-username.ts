import {
  getResourcesByUsernameResSchema,
  getResourcesResSchema,
} from "@/lib/response";
import { useApi, useAuth } from "@/providers/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetResourcesByUsername = (username: string) => {
  const api = useApi();
  return useQuery({
    queryKey: ["get_resources_by_username", username],
    queryFn: async () => {
      const { data, status } = await api.get(
        `/Resource/GetResourceForUser/${username}/false`,
        {
          validateResponse: (data) =>
            getResourcesByUsernameResSchema.parse(data),
        },
      );

      if (!(data || status)) {
        throw new Error(
          "failed to fetch resources. Issue with internet connectivity",
        );
      }

      if (!(data?.responseCode === 200 || status === 200)) {
        throw new Error(data?.responseMessage ?? "failed to fetch resources");
      }

      return data?.responseData!;
    },
  });
};
