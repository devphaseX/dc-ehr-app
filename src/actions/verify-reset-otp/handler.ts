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
    const { data, status } = await serverApi.get(
      `/Auth/VerifyOTP/${email}?otp=${otp}`,
      {
        validateResponse: (data) => verifyResetPasswordOtpResSchema.parse(data),
        ignoreJwt: true,
      },
    );

    console.log({ data, status });

    if (!data) {
      throw new Error("failed to submit security answers");
    }

    if (data.responseCode !== 200) {
      return { error: data.responseMessage };
    }

    setRecoveryJwt(data.responseData!.token);
    return { message: "otp verification completed" };
  } catch (e) {
    console.log("[VERIFY_RESET_PASSWORD_OTP]", e);
    return { error: "otp not valid" };
  }
};
