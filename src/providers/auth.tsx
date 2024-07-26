"use client";
import { getJwt } from "@/auth";
import createApi from "@/lib/api";
import { GetUserResp, getUserRespSchema, User } from "@/lib/response";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo } from "react";

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
  jwt: initialJwt,
  user,
  baseUrl,
}: JwtAuthProvider) => {
  const { data: jwt } = useQuery({
    queryKey: ["token"],
    queryFn: () => getJwt(),
    initialData: initialJwt,
    refetchInterval: ({ state: { data } }) => (data ? 1000 : false),
    enabled: initialJwt != null,
    refetchOnMount: true,
  });
  const client = useQueryClient();

  const api = useMemo(
    () =>
      createApi({
        getToken: () => client.getQueryData<string>(["token"]) ?? null,
      }),
    [],
  );

  return (
    <jwtAuthContext.Provider value={{ jwt, user, api }}>
      {children}
    </jwtAuthContext.Provider>
  );
};

export const useJwtToken = () => {
  const { jwt } = useContext(jwtAuthContext);
  return { jwt };
};

export const useAuth = () => {
  const { jwt } = useJwtToken();
  const { api, user: initialUserData } = useContext(jwtAuthContext);
  const {
    data: user,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      try {
        const { data } = await api.get<GetUserResp>("/User/GetUser", {
          validateResponse: (data) => getUserRespSchema.parse(data),
        });

        if (data.responseCode === 200) {
          return data.responseData;
        }
        return null;
      } catch (e) {
        console.log("[GET USER]", e);
        return null;
      }
    },
    queryKey: ["user-profile"],
    initialData: initialUserData,
    refetchOnMount: true,
    refetchInterval: ({ state: { data } }) => {
      return data ? 1000 : false;
    },
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isFetching) return;
    if (jwt && !user) {
      refetch();
    }
  }, [user, jwt]);

  return { isLoading, user, error };
};

export const useApi = () => {
  const { api } = useContext(jwtAuthContext);
  return api;
};
