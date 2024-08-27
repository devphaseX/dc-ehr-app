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

export const sendResetPasswordOtpSchema = createResponseSchema({
  sucessSchema: z.any(),
});
export const verifyResetPasswordOtpResSchema = createResponseSchema({
  sucessSchema: z.object({ token: z.string(), userId: z.string() }),
});

export const resetPasswordResSchema = createResponseSchema({
  sucessSchema: z.object({
    token: z.string().min(32),
    userId: z.string().min(26),
  }),
});

const categoryPayload = z.object({
  id: z.string().min(26),
  name: z.string().min(2),
  description: z.string().min(2),
  grade: z.string().min(2).optional(),
  createdDate: z.date({ coerce: true }),
  dateModified: z.date({ coerce: true }),
});

export type ContentCategory = TypeOf<typeof categoryPayload> & {
  colour: string;
  bannerUrl: string;
};
export const getCategoriesResSchema = createResponseSchema({
  sucessSchema: z.array(categoryPayload),
});

export const getSubjectsResSchema = createResponseSchema({
  sucessSchema: z.array(z.string().min(1)),
});

export const resourcePayload = z
  .object({
    Id: z.string().min(1),
    ResourceName: z.string().min(1),
    CategoryId: z.string().min(1),
    Subject: z.string().min(1),
    Description: z.string().min(1),
    ResourceFile: z.string().url(),
    Tags: z.string().array(),
    CreatedAt: z.date({ coerce: true }),
  })
  .transform(
    ({
      Id,
      ResourceName,
      Subject,
      CategoryId,
      Description,
      ResourceFile,
      Tags,
      CreatedAt,
    }) => {
      return {
        id: Id,
        fileName: ResourceName,
        category: CategoryId,
        subject: Subject,
        file: ResourceFile,
        tags: Tags,
        description: Description,
        createdAt: CreatedAt,
      };
    },
  );

export const getResourceResSchema = createResponseSchema({
  sucessSchema: resourcePayload,
});

export const createResourceResSchema = createResponseSchema({
  sucessSchema: z.string().min(1).optional(),
});
