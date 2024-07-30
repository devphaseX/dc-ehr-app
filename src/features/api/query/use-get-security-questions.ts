import { requestVerifyEmailResSchema } from "@/lib/response";
import { useApi } from "@/providers/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetUserSecurityQuestions = (email: string) => {
  const api = useApi();

  return useQuery({
    queryKey: ["verify-email"],
    queryFn: async () => {
      const resp = await api.get(
        `/Auth/GetUserSecurityQuestionsAndAnswer/${email}`,
        {
          validateResponse: (data) => requestVerifyEmailResSchema.parse(data),
        },
      );

      return resp.data;
    },
  });
};
