import { ZodAny, ZodSchema, TypeOf } from "zod";
import * as z from "zod";

export const baseResponseSchema = z.object({
  responseCode: z.number().int().positive().optional(),
  responseMessage: z.string().optional(),
});

export function createResponseSchema<SucessRepSchema extends ZodSchema>({
  sucessSchema,
}: {
  sucessSchema: SucessRepSchema;
}) {
  return baseResponseSchema.and(
    z.object({ responseData: sucessSchema.optional() }),
  );
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

export type GetSecurityQuestionData = NonNullable<
  TypeOf<typeof getSecurityQuestionRespSchema>["responseData"]
>;

export const signInRespSchema = createResponseSchema({
  sucessSchema: z.object({
    token: z.string().min(32),
    userId: z.string().min(26),
  }),
});

export const getUserPayloadSchema = z.object({
  id: z.string().min(26),
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string(),
  email: z.string().email(),
  profilePicture: z.string().nullable(),
  isVerified: z.boolean({ coerce: true }).default(false),
  isDeactivated: z.boolean({ coerce: true }).default(false),
  securityQuestion: z.any(),
  createdDate: z.date({ coerce: true }),
  dateModified: z.date({ coerce: true }),
});

export type User = TypeOf<typeof getUserPayloadSchema>;
export const getUserRespSchema = createResponseSchema({
  sucessSchema: getUserPayloadSchema,
});

export type GetUserResp = NonNullable<TypeOf<typeof getUserRespSchema>>;
