import { getSubjectsResSchema } from "@/lib/response";
import { useApi } from "@/providers/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetSubjects = () => {
  const api = useApi();

  return useQuery({
    queryKey: ["resource-subjects"],
    queryFn: async () => {
      const { data } = await api.get("/Utility/GetAllSubjects", {
        validateResponse: (data) => getSubjectsResSchema.parse(data),
      });

      if (!data) {
        throw new Error("An error occurred fetching subjects");
      }

      if (data?.responseCode !== 200) {
        throw new Error(data?.responseMessage);
      }

      return data.responseData!;
    },
  });
};
