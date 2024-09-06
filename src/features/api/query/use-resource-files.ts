import { getResourceFilesResSchema } from "@/lib/response";
import { useApi } from "@/providers/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetResourceFiles = (id: string) => {
  const api = useApi();
  return useQuery({
    queryKey: ["resource-files", id],
    queryFn: async () => {
      const { data, status } = await api.get(
        `/Resource/GetResourceFiles/${id}`,
        {
          validateResponse: (data) => getResourceFilesResSchema.parse(data),
        },
      );

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
