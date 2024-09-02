import { env } from "@/lib/env";
import { SecurityQuestionsSetForm } from "./_page";
import { getSecurityQuestionRespSchema } from "@/lib/response";

export default async function SecurityPage() {
  const payload = await fetch(`${env.BACKEND_URL}/Utility/GetQuestions`, {
    headers: { "content-type": "application/json" },
  }).then((res) => res.json());

  const result = getSecurityQuestionRespSchema.parse(payload);
  return <SecurityQuestionsSetForm questions={result.responseData ?? []} />;
}
