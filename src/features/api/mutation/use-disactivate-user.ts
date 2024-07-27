import { logout } from "@/auth";
import { changePasswordResSchema, createResponseSchema } from "@/lib/response";
import { useApi, useAuth } from "@/providers/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export const useDisactivatUser = () => {
  const api = useApi();
  return useMutation({
    mutationKey: ["disactivate-user"],
    mutationFn: async (userId: string) => {
      const { data: payload } = await api.post(
        "/User/DeactivateUser",
        { userId },
        {
          validateResponse: (data) =>
            createResponseSchema({ sucessSchema: z.any().optional() }).parse(
              data,
            ),
        },
      );

      if (payload.responseCode !== 200) {
        toast.error(
          payload.responseMessage ?? "failed to deactivate user account",
        );
      } else {
        toast.success("account deactivated successfully");
        await logout();
      }

      return payload.responseData;
    },
  });
};
