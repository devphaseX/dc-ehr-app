import { TypeOf, z } from 'zod';

export const signUpFormSchema = z
  .object({
    fullName: z
      .string({ required_error: 'fullName is required' })
      .min(3, 'fullName must contain at least 3 characters'),
    username: z
      .string({ required_error: 'username is required' })
      .min(1, 'username must contain at least 1 character'),
    email: z
      .string({ required_error: 'email is equired' })
      .email('email is not valid'),
    industry: z.string({ required_error: 'select an industry' }),
    categories: z.string({ required_error: 'select a category' }),
    password: z.string().min(8, 'minimum of 8 character is required'),
    confirmPassword: z.string(),
    securityQuestions: z
      .object({
        question: z.string().min(3).max(255),
        answer: z.string().min(3).max(255),
      })
      .array(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'confirm password not a match',
  });

export type SignUpForm = TypeOf<typeof signUpFormSchema>;
