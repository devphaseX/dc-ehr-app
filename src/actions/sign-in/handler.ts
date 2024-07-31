"use server";
import { action } from "@/lib/action";
import { signInSchema } from "./schema";
import { env } from "@/lib/env";
import { signInRespSchema } from "@/lib/response";
import { serverApi } from "@/features/server-api";
import { setJwt } from "@/auth";

export const signInAction = action(signInSchema, async (form) => {
  try {
    const { data: payload } = await serverApi.post(
      "/Auth/Login",
      {
        ...form,
        redirectUrl: `${env.NEXT_PUBLIC_BASE_URL}/verify-email`,
      },
      {
        validateResponse: (data) => signInRespSchema.parse(data),
        ignoreJwt: true,
      },
    );

    if (!payload) {
      throw new Error("failed to sign in");
    }

    if (payload.responseCode !== 200) {
      throw new Error(payload.responseMessage ?? "failed to sign in");
    }

    const data = payload.responseData!;

    await setJwt(data.token);
    return { message: "Login sucessful", userId: data.userId };
  } catch (e) {
    console.log({ type: e });
    return {
      error: (e as Error).message,
    };
  }
});
