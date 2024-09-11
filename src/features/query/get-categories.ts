import { cache } from "react";
import { serverApi } from "../server-api";
import { getJwt } from "@/auth";
import { getCategoriesResSchema } from "@/lib/response";

export const serverGetCategories = cache(async () => {
  return serverApi.get("/Category/GetCategories", {
    validateResponse: (data) => getCategoriesResSchema.parse(data),
    ignoreJwt: true,
  });
});
