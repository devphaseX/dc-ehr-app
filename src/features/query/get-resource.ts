import { cache } from "react";
import { serverApi } from "../server-api";
import { getResourceResSchema } from "@/lib/response";

export const getServerResource = cache(async (id: string) => {
  const { data } = await serverApi.get(`/Resource/GetResource/${id}`, {
    validateResponse: (data) => getResourceResSchema.parse(data),
  });

  if (!data) {
    throw new Error("An error occurred fetching resource");
  }

  if (data?.responseCode !== 200) {
    throw new Error(data?.responseMessage);
  }

  return data.responseData!;
});
