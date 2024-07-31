import { logout } from "@/auth";
import { createResponseSchema } from "@/lib/response";
import { useApi, useAuth } from "@/providers/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export const useDeleteUser = () => {
  const api = useApi();
  return useMutation({
    mutationKey: ["disactivate-user"],
    mutationFn: async (userId: string) => {
      const { data: payload } = await api.delete(
        "/User/DeleteUser",
        { userId },
        {
          validateResponse: (data) =>
            createResponseSchema({ sucessSchema: z.any().optional() }).parse(
              data,
            ),
        },
      );

      if (!payload) {
        return toast.error("failed to delete user account");
      }

      if (payload.responseCode !== 200) {
        toast.error(payload.responseMessage ?? "failed to delete user account");
      } else {
        toast.success("account delete successfully");
        await logout();
      }

      return payload.responseData;
    },
  });
};
