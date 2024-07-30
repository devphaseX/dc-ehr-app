import {
  RecoverySecurityQuestion,
  submitRecoverySecurityAnswerResSchema,
} from "@/lib/response";
import { useApi } from "@/providers/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSubmitRecoverySecurityAnswer = () => {
  const api = useApi();
  return useMutation({
    mutationKey: ["recover-security-questions"],
    mutationFn: async (answers: RecoverySecurityQuestion) => {
      const { data } = await api.post("/Auth/VerifySecurityAnswers", answers, {
        validateResponse: (data) =>
          submitRecoverySecurityAnswerResSchema.parse(data),
      });

      return data;
    },
  });
};
