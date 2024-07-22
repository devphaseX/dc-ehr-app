import { ZodAny, ZodSchema, TypeOf } from "zod";
import * as z from "zod";

export const baseResponseSchema = z.object({
  responseCode: z.number().int().positive(),
  responseMessage: z.string().optional(),
});

export function createResponseSchema<SucessRepSchema extends ZodSchema>({
  sucessSchema,
}: {
  sucessSchema: SucessRepSchema;
}) {
  return baseResponseSchema.and(z.object({ responseData: sucessSchema }));
}

const securityQuestionPayloadSchema = z.object({
  question: z.string().min(3),
  id: z.string().min(12),
  createdDate: z.date({ coerce: true }).optional(),
  dateModified: z.date({ coerce: true }).optional(),
  isDeleted: z.boolean().default(false),
});

export const getSecurityQuestionRespSchema = createResponseSchema({
  sucessSchema: z.array(securityQuestionPayloadSchema),
});

export type GetSecurityQuestionData = TypeOf<
  typeof getSecurityQuestionRespSchema
>["responseData"];

export const signInRespSchema = createResponseSchema({
  sucessSchema: z.any().optional(),
});
