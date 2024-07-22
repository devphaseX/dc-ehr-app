import { TypeOf, z } from "zod";

export const securityQuestionSchema = z.object({
  questions: z
    .object({
      question: z.string().min(3).max(255),
      answer: z.string().min(3).max(255),
    })
    .array(),
});

export type SecurityQuestionForm = TypeOf<typeof securityQuestionSchema>;
