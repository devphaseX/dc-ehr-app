import { TypeOf, z } from "zod";

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, "password cannot be empty"),
  newPassword: z.string().min(8, "minimum of 8 character is required"),
});

export type ChangePasswordForm = TypeOf<typeof changePasswordSchema>;
