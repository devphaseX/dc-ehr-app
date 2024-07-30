import { env } from "@/lib/env";
import { serverApi } from "@/features/server-api";
import { redirect } from "next/navigation";
import { getRecoverySecurityQuestionResSchema } from "@/lib/response";
import { RecoverySecurityQuestionForm } from "./security-questions-form";

export default async function SecurityPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const email = searchParams.email;

  if (!email) {
    return redirect("/forget-password");
  }

  const { data } = await serverApi.get(
    `/Auth/GetUserSecurityQuestionsAndAnswer/${email}`,
    {
      validateResponse: (data) =>
        getRecoverySecurityQuestionResSchema.parse(data),
      ignoreJwt: true,
    },
  );

  if (data.responseCode !== 200) {
    return redirect(`/forget-password?error=${data.responseMessage}`);
  }

  return (
    <RecoverySecurityQuestionForm
      questions={data.responseData ?? []}
      email={email}
    />
  );
}
