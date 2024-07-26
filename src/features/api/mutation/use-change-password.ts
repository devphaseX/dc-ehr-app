import { ChangePasswordForm } from "@/app/(pages)/(auth)/(recover-password)/reset-password/schema";
import { useApi } from "@/providers/auth";
import { useMutation } from "@tanstack/react-query";

export const useChangePassword = () => {
  const api = useApi();
  return useMutation({
    mutationKey: ["change-user-password"],
    mutationFn: async (data: ChangePasswordForm) => {
      const resp = await api.put("/User/ChangePassword", data);
    },
  });
};
