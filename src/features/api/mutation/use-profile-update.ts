import { UpdateProfileForm } from "@/app/(pages)/(auth)/(none_auth_access)/sign-up/schema";
import { updateProfileResSchema } from "@/lib/response";
import { useApi, useAuth } from "@/providers/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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

      const { data: payload } = await api.put(
        "/User/UpdateUser",
        { ...data, userId: user.id },
        { validateResponse: (data) => updateProfileResSchema.parse(data) },
      );

      console.log({ payload });

      if (!payload) {
        return toast.error("failed to update user profile");
      }

      if (payload.responseCode !== 200) {
        return toast.error(
          payload.responseMessage ?? "failed to update user profile",
        );
      }

      toast.success("profile updated");

      await client.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
