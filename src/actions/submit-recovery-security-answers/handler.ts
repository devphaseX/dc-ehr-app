"use server";

import { setJwt, setRecoveryJwt } from "@/auth";
import { serverApi } from "@/features/server-api";
import { action } from "@/lib/action";
import {
  RecoverySecurityAnswer,
  recoverySecurityAnswerSchema,
  submitRecoverySecurityAnswerResSchema,
} from "@/lib/response";
import { z } from "zod";

export const submitRecoverSecurityAnswersAction = async ({
  answers,
  email,
}: {
  answers: RecoverySecurityAnswer;
  email: string;
}) => {
  try {
    const { data } = await serverApi.post(
      `/Auth/VerifySecurityAnswers?email=${email}`,
      answers,
      {
        validateResponse: (data) =>
          submitRecoverySecurityAnswerResSchema.parse(data),
        ignoreJwt: true,
      },
    );

    if (data.responseCode !== 200) {
      return { error: data.responseMessage };
    }

    setRecoveryJwt(data.responseData!.token);
    return { message: data.responseMessage ?? "security answers are valid" };
  } catch (e) {
    console.log("[SUBMIT_RECOVERY_SECURITY_ANSWER]", e);
    return { error: "failed to submit security answers" };
  }
};
