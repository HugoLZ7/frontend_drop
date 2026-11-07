import { NextResponse, type NextRequest } from "next/server";
import { TOKEN_COOKIE } from "@/lib/session";

const PUBLIC_ROUTES = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has(TOKEN_COOKIE);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (!hasSession && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (hasSession && isPublicRoute) {
    return NextResponse.redirect(new URL("/orders/new", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logout|.*\\..*).*)"],
};
