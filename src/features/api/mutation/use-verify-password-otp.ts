import { verifyResetPasswordOtpAction } from "@/actions/verify-reset-otp/handler";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useVerifyPasswordOtp = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["reset-password-otp"],
    mutationFn: verifyResetPasswordOtpAction,
    onSuccess: (resp) => {
      if (resp.message) {
        toast.success(resp.message);
        router.push("/reset-password");
        return;
      }

      toast.error(resp.error);
    },
  });
};
