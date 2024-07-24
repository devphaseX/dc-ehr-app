"use server";
import { action } from "@/lib/action";
import { env } from "@/lib/env";
import { signInRespSchema } from "@/lib/response";
import { cookies } from "next/headers";
import { signUpFormSchema } from "@/app/(pages)/(auth)/sign-up/schema";

export const registerAction = action(
  signUpFormSchema,
  async (data): Promise<{ message?: string; error?: string }> => {
    try {
      const resp = await fetch(`${env.BACKEND_URL}/Auth/Register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });

      const result = signInRespSchema.parse(await resp.json());
      if (resp.statusText !== "ok") {
        throw new Error(result.responseMessage ?? "failed to create account");
      }
      return { message: `we have sent you an email to verify your account` };
    } catch (e) {
      return {
        error: (e as Error).message,
      };
    }
  },
);
