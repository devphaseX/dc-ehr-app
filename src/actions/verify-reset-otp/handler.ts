"use server";

import { setJwt, setRecoveryJwt } from "@/auth";
import { serverApi } from "@/features/server-api";
import {
  recoverySecurityAnswerSchema,
  verifyResetPasswordOtpResSchema,
} from "@/lib/response";
import { z } from "zod";

export const verifyResetPasswordOtpAction = async ({
  otp,
  email,
}: {
  otp: string;
  email: string;
}) => {
  try {
    const { data } = await serverApi.post(
      `/Auth/VerifyOTP?email=${email}`,
      { otp },
      {
        validateResponse: (data) => verifyResetPasswordOtpResSchema.parse(data),
        ignoreJwt: true,
      },
    );

    if (!data) {
      throw new Error("failed to submit security answers");
    }

    if (data.responseCode !== 200) {
      return { error: data.responseMessage };
    }

    setRecoveryJwt(data.responseData!.token);
    return { message: data.responseMessage ?? "otp not valid" };
  } catch (e) {
    console.log("[VERIFY_RESET_PASSWORD_OTP]", e);
    return { error: "otp not valid" };
  }
};
