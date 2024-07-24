"use server";
import { action } from "@/lib/action";
import { signInSchema } from "./schema";
import { env } from "@/lib/env";
import { signInRespSchema } from "@/lib/response";
import { cookies } from "next/headers";
import { TimeSpan } from "oslo";

export const signInAction = action(signInSchema, async (form) => {
  try {
    const resp = await fetch(`${env.BACKEND_URL}/Auth/Login`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "application/json",
      },
    });

    const result = signInRespSchema.parse(await resp.json());
    if (resp.status !== 200) {
      throw new Error(result.responseMessage ?? "failed to sign in");
    }

    const data = result.responseData!;

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
