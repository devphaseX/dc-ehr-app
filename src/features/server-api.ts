import { getJwt } from "@/auth";
import createApi from "@/lib/api";
import { env } from "@/lib/env";

export const serverApi = createApi({
  getToken: getJwt,
  baseUrl: env.BACKEND_URL,
});
