import {
  getCategoriesResSchema,
  getResourceResSchema,
  getResourcesResSchema,
} from "@/lib/response";
import { useApi } from "@/providers/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetResources = () => {
  const api = useApi();

  return useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const { data } = await api.get(`/Resource/GetAllResource`, {
        validateResponse: (data) => getResourcesResSchema.parse(data),
      });

      if (!data) {
        throw new Error("An error occurred fetching resources");
      }

      if (data?.responseCode !== 200) {
        throw new Error(data?.responseMessage);
      }

      return data.responseData!;
    },
  });
};
