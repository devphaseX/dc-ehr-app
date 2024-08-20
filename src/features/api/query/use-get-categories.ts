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
    },
  });
};
