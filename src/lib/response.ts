import { ZodAny } from "zod";
import * as z from "zod";

export const baseResponseSchema = z.object({
  responseCode: z.number().int().positive(),
  responseMessage: z.string().optional(),
});

export function createResponseSchema<
  SucessRepSchema extends ZodAny,
  FailedRespSchema extends ZodAny,
>(sucessSchema: SucessRepSchema, failedSchema: FailedRespSchema) {
  return baseResponseSchema.and(z.union([sucessSchema, failedSchema]));
}
