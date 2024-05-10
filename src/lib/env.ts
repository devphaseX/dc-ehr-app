import { object, string, TypeOf } from 'zod';

const EnvSchema = object({
  NEXT_PUBLIC_BACKEND_URL: string(),
  NEXT_PUBLIC_BASE_URL: string(),
});

export const env = EnvSchema.parse(process.env);

export type Env = TypeOf<typeof EnvSchema>;
