import { object, string, TypeOf } from 'zod';

export const signInSchema = object({
  email: string().email(),
  password: string().min(1),
});

export type SignInFormData = TypeOf<typeof signInSchema>;
