import { auth } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdminPanel = req.nextUrl.pathname.startsWith("/admin");
  const isOnLoginPage = req.nextUrl.pathname.startsWith("/admin/login");

  if (isOnAdminPanel) {
    if (isOnLoginPage) {
      if (isLoggedIn) {
         return NextResponse.redirect(new URL("/admin", req.nextUrl));
      }
      return NextResponse.next(); // Allow access to login page
    }

    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
