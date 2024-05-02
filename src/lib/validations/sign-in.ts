import { object, string } from 'zod';

export const SignInSchema = object({
  email: string().email(),
  password: string().min(1),
});
