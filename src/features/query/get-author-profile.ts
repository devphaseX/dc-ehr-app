import { cache } from "react";
import { serverApi } from "../server-api";
import { GetUserResp, getUserRespSchema } from "@/lib/response";

export const getAuthorProfile = cache(async (userName: string) => {
  const { data, fetchError } = await serverApi.get<GetUserResp>(
    `/User/GetUser/${userName}`,
    {
      validateResponse: (data) => getUserRespSchema.parse(data),
    },
  );

  console.log({ data });

  if (fetchError) {
    throw new Error("no internet connection");
  }

  if (!(data && data?.responseCode === 200)) {
    throw new Error(data?.responseMessage ?? "failed to fetch user");
  }

  return data.responseData!;
});
