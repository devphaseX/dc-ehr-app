import { ChangePasswordForm } from "@/app/(pages)/(auth)/(recover-password)/reset-password/schema";
import { changePasswordResSchema } from "@/lib/response";
import { useApi } from "@/providers/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useChangePassword = () => {
  const api = useApi();
  return useMutation({
    mutationKey: ["change-user-password"],
    mutationFn: async (data: ChangePasswordForm) => {
      const { data: payload } = await api.put("/User/ChangePassword", data, {
        validateResponse: (data) => changePasswordResSchema.parse(data),
      });

      if (payload.responseCode !== 200) {
        toast.error(payload.responseMessage ?? "failed to change password");
      } else {
        toast.success("password changed successfully");
      }

      return payload.responseData;
    },
  });
};
