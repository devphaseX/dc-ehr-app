"use server";
import { serverApi } from "@/features/server-api";
import { action } from "@/lib/action";
import { NonCompliantResponseError } from "@/lib/error";
import { verifyEmailResSchema } from "@/lib/response";
import { cookies } from "next/headers";
import { TimeSpan } from "oslo";
import { z } from "zod";

export const verifyEmailAction = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  try {
    const { data, status } = await serverApi.put(
      `/User/SetUserToIsVerified?userId=${userId}`,
      undefined,
      {
        headers: { Authorization: `bearer ${token}` },
        validateResponse: (data) => verifyEmailResSchema.parse(data),
      },
    );

    if (!data) {
      return { error: new NonCompliantResponseError().message };
    }

    if (status !== 200) {
      return { error: data.responseMessage ?? "failed to verify email" };
    }

    return { user: data.responseData! };
  } catch (e) {
    console.log("[VERIFY EMAIL ERROR]", e);
    return { error: "failed to verify email" };
  }
};
