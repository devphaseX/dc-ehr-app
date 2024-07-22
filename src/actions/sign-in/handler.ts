"use server";
import { action } from "@/lib/action";
import { signInSchema } from "./schema";
import { env } from "@/lib/env";
import { signInRespSchema } from "@/lib/response";
import { cookies } from "next/headers";

export const signInAction = action(signInSchema, async (data) => {
  try {
    const resp = await fetch(`${env.BACKEND_URL}/Auth/Login`, {
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });

    const result = signInRespSchema.parse(await resp.json());

    if (resp.statusText !== "ok") {
      throw new Error(result.responseMessage ?? "failed to sign in");
    }

    cookies().set("jwt", "your_jwt_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return { message: "Login sucessful" };
  } catch (e) {
    return {
      error: (e as Error).message,
    };
  }
});
