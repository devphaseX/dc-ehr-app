"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { TimeSpan } from "oslo";
const JWT_NAME = "jwt";

export const getJwt = async () => {
  return cookies().get(JWT_NAME)?.value ?? null;
};

export const logout = async () => {
  const refererUrl = headers().get("referer");

  if (refererUrl) {
    revalidatePath(new URL(refererUrl).pathname);
  }
  return cookies().delete(JWT_NAME);
};

export const setJwt = async (token: string, maxAge?: number) => {
  cookies().set({
    name: JWT_NAME,
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: maxAge ?? new TimeSpan(1, "h").milliseconds(),
  });
};
