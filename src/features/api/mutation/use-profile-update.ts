import { UpdateProfileForm } from "@/app/(pages)/(auth)/sign-up/schema";
import { useApi, useAuth } from "@/providers/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useProfileUpdate = () => {
  const api = useApi();
  const { user } = useAuth();
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["update-user-profile"],
    mutationFn: async (data: UpdateProfileForm) => {
      if (!user) {
        throw new Error("user session expired");
      }
      const resp = api.post("/User/UpdateUser", { ...data, userId: user.id });

      await client.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
