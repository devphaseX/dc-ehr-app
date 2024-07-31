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
    z.object({ responseData: sucessSchema.optional().nullable() }),
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
  country: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  dateOfBirth: z.date({ coerce: true }).nullish(),
  isVerified: z.boolean({ coerce: true }).default(false),
  isDeactivated: z.boolean({ coerce: true }).default(false),
  securityQuestion: z.any(),
  createdDate: z.date({ coerce: true }).optional(),
  dateModified: z.date({ coerce: true }).optional(),
});

export type User = TypeOf<typeof getUserPayloadSchema>;
export const getUserRespSchema = createResponseSchema({
  sucessSchema: getUserPayloadSchema,
});

export const changePasswordResSchema = createResponseSchema({
  sucessSchema: getUserPayloadSchema,
});

export const updateProfileResSchema = createResponseSchema({
  sucessSchema: getUserPayloadSchema,
});

export const verifyEmailResSchema = createResponseSchema({
  sucessSchema: getUserPayloadSchema,
});

export const requestVerifyEmailResSchema = createResponseSchema({
  sucessSchema: z.any(),
});

export const getRecoverySecurityQuestionResSchema = createResponseSchema({
  sucessSchema: z.array(
    z.object({ questionId: z.string(), question: z.string() }),
  ),
});

export type RecoverySecurityQuestion = NonNullable<
  TypeOf<typeof getRecoverySecurityQuestionResSchema>["responseData"]
>;
export type GetUserResp = NonNullable<TypeOf<typeof getUserRespSchema>>;

export const recoverySecurityAnswerSchema = z.array(
  z.object({
    questionId: z.string().min(1),
    securityAnswer: z.string().min(1),
  }),
);

export type RecoverySecurityAnswer = TypeOf<
  typeof recoverySecurityAnswerSchema
>;

export const submitRecoverySecurityAnswerResSchema = createResponseSchema({
  sucessSchema: z.object({ token: z.string(), userId: z.string() }),
});

export const resetPasswordResSchema = createResponseSchema({
  sucessSchema: z.object({
    token: z.string().min(32),
    userId: z.string().min(26),
  }),
});
