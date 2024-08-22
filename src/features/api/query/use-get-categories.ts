import { getCategoriesResSchema } from "@/lib/response";
import { useApi } from "@/providers/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  const api = useApi();

  return useQuery({
    queryKey: ["resource-categories"],
    queryFn: async () => {
      const { data } = await api.get("/Category/GetCategories", {
        validateResponse: (data) => getCategoriesResSchema.parse(data),
      });

      if (!data) {
        throw new Error("An error occurred fetching categories");
      }

      if (data?.responseCode !== 200) {
        throw new Error(data?.responseMessage);
      }

      return data.responseData!;
    },
  });
};
