"use client";
import { createContext, useContext } from "react";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
};

type JwtAuthContextData = Partial<{
  jwt?: string | null;
  user?: User | null;
}>;

const jwtAuthContext = createContext<JwtAuthContextData>({});

type JwtAuthProvider = { children: React.ReactNode } & JwtAuthContextData;

export const JwtAuthProvider = ({ children, jwt, user }: JwtAuthProvider) => {
  return (
    <jwtAuthContext.Provider value={{ jwt, user }}>
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
