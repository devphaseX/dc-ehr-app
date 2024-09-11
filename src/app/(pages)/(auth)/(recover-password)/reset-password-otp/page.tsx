import { env } from "@/lib/env";
import { serverApi } from "@/features/server-api";
import { redirect } from "next/navigation";
import { NonCompliantResponseError } from "@/lib/error";
import { sendResetPasswordOtpSchema } from "@/lib/response";
import { VerifyResetPasswordOTPForm } from "./reset-otp-form";

export default async function ResetPasswordOtpPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const email = searchParams.email;

  if (!email) {
    return redirect("/forget-password");
  }

  const { data, status } = await serverApi.get(`/Auth/SendOTP/${email}`, {
    validateResponse: (data) => sendResetPasswordOtpSchema.parse(data),
    ignoreJwt: true,
  });

  if (!data) {
    throw new NonCompliantResponseError();
  }

  if (data.responseCode !== 200 || status != 200) {
    return redirect(
      `/forget-password?error=${data.responseMessage || "failed to send otp"}`,
    );
  }

  return <VerifyResetPasswordOTPForm />;
}
