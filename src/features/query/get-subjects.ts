import { cache } from "react";
import { serverApi } from "../server-api";
import { getJwt } from "@/auth";
import { getCategoriesResSchema, getSubjectsResSchema } from "@/lib/response";

export const serverGetSubjects = cache(async () => {
  const jwt = await getJwt();
  return serverApi.get("/Category/GetAllSubjects", {
    headers: jwt ? { Authorization: `bearer ${jwt}` } : undefined,
    validateResponse: (data) => getSubjectsResSchema.parse(data),
  });
});
