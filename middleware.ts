import authconfig from "@/lib/auth.config";
import NextAuth from "next-auth";

import {
  publicRouts,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/lib/routes";

const { auth } = NextAuth(authconfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

 const isPublicRoute =
   publicRouts.includes(nextUrl.pathname) ||
   /^\/[^\/]+$/.test(nextUrl.pathname);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  console.log(nextUrl.pathname)

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // 👇 Yeh condition add ki hai: Agar logged-in user "/" par jaye to /feed bhejo
  if (isLoggedIn && nextUrl.pathname === "/") {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ], // Apply only to auth routes
};
