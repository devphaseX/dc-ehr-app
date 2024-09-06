import { cache } from "react";
import { serverApi } from "../server-api";
import { getResourceFilesResSchema } from "@/lib/response";

export const getServerResourceFiles = cache(async (id: string) => {
  const { data, status } = await serverApi.get(
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
});
