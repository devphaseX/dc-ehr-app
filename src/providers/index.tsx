import { cookies } from "next/headers";
import { JwtAuthProvider } from "./auth";
import { DataQueryProvider } from "./query";
import { env } from "@/lib/env";
import { getUser } from "@/features/query/get-user";
import { User } from "@/lib/response";

export const Provider = async ({ children }: { children: React.ReactNode }) => {
  const jwt = cookies().get("jwt")?.value ?? null;
  let user: User | null = null;
  if (jwt) {
    user = (await getUser()) ?? null;
  }

  return (
    <>
      <JwtAuthProvider
        jwt={user ? jwt : null}
        baseUrl={env.BACKEND_URL}
        user={user}
      >
        <DataQueryProvider>{children}</DataQueryProvider>
      </JwtAuthProvider>
    </>
  );
};
