import { GetUserResp, getUserRespSchema } from "@/lib/response";
import { useApi } from "@/providers/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetAuthor = (userName: string) => {
  const api = useApi();
  return useQuery({
    queryFn: async () => {
      try {
        const { data, fetchError } = await api.get<GetUserResp>(
          `/User/GetUser/${userName}`,
          {
            validateResponse: (data) => getUserRespSchema.parse(data),
          },
        );

        if (!fetchError) {
          throw new Error("no internet connection");
        }

        if (!(data && data?.responseCode === 200)) {
          throw new Error(data?.responseMessage ?? "failed to fetch user");
        }

        return data.responseData!;
      } catch (e) {
        console.log("[GET_USER_BY_USERNAME]", e);
        return null;
      }
    },
    queryKey: ["user-profile", userName],
  });
};
