"use server";

import { cache } from "react";
import { env } from "@/lib/env";
import { GetUserResp, getUserRespSchema, User } from "@/lib/response";
import { serverApi } from "../server-api";
import { getJwt, logout } from "@/auth";

export const getUser = cache(async (jwt?: string) => {
  try {
    const { data } = await serverApi.get<GetUserResp>("/User/GetUser", {
      validateResponse: (data) => {
        return getUserRespSchema.parse(data);
      },

      ...(jwt && {
        ignoreJwt: true,
        headers: { Authorization: `bearer ${jwt}` },
      }),
    });

    if (data?.responseCode === 200) {
      return data.responseData;
    }

    return null;
  } catch (e) {
    console.log("[GET USER]", e);
    return null;
  }
});
