import * as z from "zod";

export const createVerifyOtpSchema = (size: number) =>
  z.object({
    otp: z.string().length(size),
  });
