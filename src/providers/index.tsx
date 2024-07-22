import { cookies } from "next/headers";
import { JwtAuthProvider } from "./auth";
import { DataQueryProvider } from "./query";

export const Provider = async ({ children }: { children: React.ReactNode }) => {
  const jwt = cookies().get("jwt")?.value ?? null;
  return (
    <>
      <JwtAuthProvider jwt={jwt}>
        <DataQueryProvider>{children}</DataQueryProvider>
      </JwtAuthProvider>
    </>
  );
};
