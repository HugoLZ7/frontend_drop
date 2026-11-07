import { NextResponse, type NextRequest } from "next/server";
import { TOKEN_COOKIE } from "@/lib/session";

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete(TOKEN_COOKIE);
  return response;
}
