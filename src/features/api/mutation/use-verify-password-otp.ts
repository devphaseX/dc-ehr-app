import { verifyResetPasswordOtpAction } from "@/actions/verify-reset-otp/handler";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useVerifyPasswordOtp = () => {
  return useMutation({
    mutationKey: ["reset-password-otp"],
    mutationFn: verifyResetPasswordOtpAction,
    onError: () => {
      toast.error("failed to verify otp");
    },
  });
};
