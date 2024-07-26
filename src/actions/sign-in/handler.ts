"use server";
import { action } from "@/lib/action";
import { signInSchema } from "./schema";
import { env } from "@/lib/env";
import { signInRespSchema } from "@/lib/response";
import { cookies } from "next/headers";
import { TimeSpan } from "oslo";
import { serverApi } from "@/features/server-api";

export const signInAction = action(signInSchema, async (form) => {
  try {
    const { data: payload } = await serverApi.post(
      "/Auth/Login",
      {
        ...form,
        redirectUrl: env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      },
      {
        validateResponse: (data) => signInRespSchema.parse(data),
      },
    );

    if (payload.responseCode !== 200) {
      throw new Error(payload.responseMessage ?? "failed to sign in");
    }

    const data = payload.responseData!;

    cookies().set({
      name: "jwt",
      value: data.token,
      httpOnly: true,
      path: "/",
      maxAge: new TimeSpan(1, "h").milliseconds(),
    });

    return { message: "Login sucessful", userId: data.userId };
  } catch (e) {
    console.log({ type: e });
    return {
      error: (e as Error).message,
    };
  }
});
