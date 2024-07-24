import { env } from "@/lib/env";
import { SecurityQuestionsForm } from "./security-questions-form";

export default async function SecurityPage() {
  const questions = await fetch(`${env.BACKEND_URL}/Utility/GetQuestions`);
  return <SecurityQuestionsForm />;
}
