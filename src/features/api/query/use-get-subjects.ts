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
    },
  });
};
