import { cache } from "react";
import { serverApi } from "../server-api";
import { getJwt } from "@/auth";
import { getCategoriesResSchema } from "@/lib/response";

export const serverGetCategories = cache(async () => {
  const jwt = await getJwt();
  return serverApi.get("/Category/GetCategories", {
    headers: jwt ? { Authorization: `bearer ${jwt}` } : undefined,
    validateResponse: (data) => getCategoriesResSchema.parse(data),
    ignoreJwt: true,
  });
});
