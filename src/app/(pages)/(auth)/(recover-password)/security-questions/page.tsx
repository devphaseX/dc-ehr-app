import { env } from "@/lib/env";
import { SecurityQuestionsForm } from "./security-questions-form";

export default async function SecurityPage() {
  const questions = await fetch(`${env.BACKEND_URL}/Utility/GetQuestions`);
  console.log({ questions });
  return <SecurityQuestionsForm />;
}
