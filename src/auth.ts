"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
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
