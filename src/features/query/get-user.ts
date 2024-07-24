"use server";

import { cache } from "react";
import { env } from "@/lib/env";
import { GetUserResp, getUserRespSchema, User } from "@/lib/response";
import { serverApi } from "../server-api";

export const getUser = cache(async () => {
  try {
    const { data } = await serverApi.get<GetUserResp>("/User/GetUser", {
      validateResponse: (data) => getUserRespSchema.parse(data),
    });

    if (data.responseCode === 200) {
      return data.responseData;
    }
    return null;
  } catch (e) {
    console.log("[GET USER]", e);
    return null;
  }
});
