import { object, string, TypeOf } from 'zod';

export const signUpSchema = object({
  firstName: string().min(3).max(50),
  lastName: string().min(3).max(50),
  email: string().email(),
  password: string().min(8),
});

export type SignUpFormData = TypeOf<typeof signUpSchema>;
