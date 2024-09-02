"use client";
import { getJwt, logout } from "@/auth";
import createApi from "@/lib/api";
import { NonCompliantResponseError } from "@/lib/error";
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
    queryKey: ["jwt"],
    queryFn: () => getJwt(),
    initialData: initialJwt,
    refetchInterval: ({ state: { data } }) => (data ? 1000 * 60 * 5 : false),
    enabled: initialJwt != null,
    refetchOnMount: true,
  });
  const client = useQueryClient();

  const api = useMemo(
    () =>
      createApi({
        getToken: () => client.getQueryData<string>(["jwt"]) ?? null,
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
        const { status, data, fetchError } = await api.get<GetUserResp>(
          "/User/GetUser",
          {
            validateResponse: (data) => getUserRespSchema.parse(data),
          },
        );

        if (status === 401) {
          await logout();
        }

        console.log({ data, status });

        if (fetchError || status != 200) {
          return initialUserData;
        }

        if (!data) {
          throw new NonCompliantResponseError();
        }

        return data.responseData;
      } catch (e) {
        console.log("[GET USER]", e);
        return null;
      }
    },
    queryKey: ["user-profile"],
    initialData: initialUserData,
    refetchOnMount: false,
    refetchInterval: ({ state: { data } }) => {
      return data ? 1000 * 20 : false;
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
