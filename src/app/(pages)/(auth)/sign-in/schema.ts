import { TypeOf, z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'email is required' })
    .email('email not valid'),

  password: z
    .string({ required_error: 'password is required' })
    .min(1, 'password cannot be empty'),
});

export type SignInForm = TypeOf<typeof signInSchema>;
