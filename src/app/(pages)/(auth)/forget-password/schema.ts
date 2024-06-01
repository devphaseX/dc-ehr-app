import { TypeOf, z } from 'zod';

export const resetPasswordSchema = z.object({
  email: z
    .string({ required_error: 'email is required' })
    .email('email not valid'),
});

export type ResetPasswordForm = TypeOf<typeof resetPasswordSchema>;
