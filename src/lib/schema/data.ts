import { TypeOf, z } from "zod";

const authorSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  avatarUrl: z.string().url(),
});

export type Author = TypeOf<typeof authorSchema>;

export const contentResourceSchema = z.object({
  title: z.string().min(1),
  href: z.string().url(),
  bookmarked: z.boolean().default(false),
  bannerImgUrl: z.string().url(),
});

export type ContentResource = TypeOf<typeof contentResourceSchema>;

export const securityQuestionSchema = z.object({
  id: z.string().min(1).optional(),
  question: z.string().min(3),
  createdDate: z.date({ coerce: true }),
  dateModified: z.date({ coerce: true }),
  isDeleted: z.boolean().default(false),
});
