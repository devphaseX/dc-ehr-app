import { getCategoriesResSchema, getResourceResSchema } from "@/lib/response";
import { useApi } from "@/providers/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetResource = (id: string) => {
  const api = useApi();

  return useQuery({
    queryKey: ["resources", id],
    queryFn: async () => {
      const { data } = await api.get(`/Resource/GetResources/${id}`, {
        validateResponse: (data) => getResourceResSchema.parse(data),
      });

      if (!data) {
        throw new Error("An error occurred fetching resource");
      }

      if (data?.responseCode !== 200) {
        throw new Error(data?.responseMessage);
      }

      return data.responseData!;
    },
  });
};
