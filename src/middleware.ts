import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getJwt } from "./auth";
import { serverApi } from "./features/server-api";
import { GetUserResp, getUserRespSchema } from "./lib/response";

const authRoutes: string[] = ["/sign-in", "/sign-up"];
const protectedRoutes: string[] = ["/profile", "/create"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define which paths are considered protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );

  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));
  // Check for the auth token in the cookies
  const jwt = await getJwt();

  if (isProtectedRoute && !jwt) {
    // Redirect to login if accessing a protected route without a token
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If it's not a protected route or the user has a token, continue
  return NextResponse.next();
}

// Configure which paths should be processed by this middleware
export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!api).*)"],
};
