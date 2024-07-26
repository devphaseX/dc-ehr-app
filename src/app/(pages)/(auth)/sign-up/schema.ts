import { TypeOf, z } from "zod";

export const signUpFormSchema = z
  .object({
    firstName: z
      .string({ required_error: "firstName is required" })
      .min(1, "firstName must contain at least 3 characters"),
    lastName: z
      .string({ required_error: "lastName is required" })
      .min(1, "lastName must contain at least 3 characters"),
    username: z
      .string({ required_error: "username is required" })
      .min(1, "username must contain at least 1 character"),
    email: z
      .string({ required_error: "email is equired" })
      .email("email is not valid"),
    password: z.string().min(8, "minimum of 8 character is required"),
    confirmPassword: z.string(),
    userSecurityQuestions: z
      .object({
        questionId: z.string().min(3).max(255),
        answer: z
          .string()
          .min(3, { message: "answer must be a min of 3 characters" })
          .max(255),
      })
      .array(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "confirm password not a match",
  });

export const updateProfileSchema = z.object({
  firstName: z
    .string({ required_error: "firstName is required" })
    .min(1, "firstName must contain at least 3 characters"),
  lastName: z
    .string({ required_error: "lastName is required" })
    .min(1, "lastName must contain at least 3 characters"),
  username: z
    .string({ required_error: "username is required" })
    .min(1, "username must contain at least 1 character"),
  email: z
    .string({ required_error: "email is equired" })
    .email("email is not valid"),

  dateOfBirth: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
});

export type SignUpForm = TypeOf<typeof signUpFormSchema>;
export type UpdateProfileForm = TypeOf<typeof updateProfileSchema>;
