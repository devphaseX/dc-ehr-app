"use server";
import { serverApi } from "@/features/server-api";
import { action } from "@/lib/action";
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
    const { data } = await serverApi.put(
      `/User/SetUserToIsVerified?userId=${userId}`,
      undefined,
      {
        headers: { Authorization: `bearer ${token}` },
        validateResponse: (data) => verifyEmailResSchema.parse(data),
      },
    );

    if (data.responseCode !== 200) {
      return { error: data.responseMessage ?? "failed to verify email" };
    }

    console.log({ res: data });
    return { data: data.responseData };
  } catch (e) {
    console.log("[VERIFY EMAIL ERROR]", e);
    return { error: "failed to verify email" };
  }
};
