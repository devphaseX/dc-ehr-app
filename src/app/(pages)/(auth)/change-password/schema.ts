import { TypeOf, z } from 'zod';

export const changePasswordSchema = z
  .object({
    password: z.string().min(8, 'minimum of 8 character is required'),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'confirm password not a match',
  });

export type ChangePasswordForm = TypeOf<typeof changePasswordSchema>;
