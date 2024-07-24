"use client";
import createApi from "@/lib/api";
import { User } from "@/lib/response";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";

type JwtAuthContextData = Partial<{
  jwt?: string | null;
  user?: User | null;
}> & { api: ReturnType<typeof createApi> };

const jwtAuthContext = createContext<JwtAuthContextData>(
  {} as JwtAuthContextData,
);

type JwtAuthProvider = {
  children: React.ReactNode;
  baseUrl: string;
} & Pick<JwtAuthContextData, "jwt" | "user">;

export const JwtAuthProvider = ({
  children,
  jwt,
  user,
  baseUrl,
}: JwtAuthProvider) => {
  const api = useMemo(
    () => createApi({ getToken: () => jwt ?? null }),
    [jwt, baseUrl],
  );

  return (
    <jwtAuthContext.Provider value={{ jwt, user, api }}>
      {children}
    </jwtAuthContext.Provider>
  );
};

export const useJwtToken = () => {
  const { jwt } = useContext(jwtAuthContext);
  return jwt;
};

export const useAuth = () => {
  const data = useContext(jwtAuthContext);
  return data;
};

export const useApi = () => {
  const { api } = useContext(jwtAuthContext);
  return api;
};
