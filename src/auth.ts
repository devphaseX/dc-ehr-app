"use server";

import { cookies } from "next/headers";
const JWT_NAME = "jwt";

export const getJwt = () => {
  return cookies().get(JWT_NAME)?.value ?? null;
};

export const logout = () => {
  return cookies().delete(JWT_NAME);
};
