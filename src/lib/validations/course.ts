import { boolean, date, number, object, string, TypeOf } from 'zod';

export const courseItemSchema = object({
  id: string().uuid(),
  title: string().min(3).max(150),
  bannerImgUrl: string().url(),
  authorName: string().min(3).max(50),
  createdAt: date({ coerce: true }),
  releasedVersions: number().int().positive(),
  bookmarked: boolean().default(false),
  lastModifiedAt: date({ coerce: true }),
});

export type CourseItem = TypeOf<typeof courseItemSchema>;
