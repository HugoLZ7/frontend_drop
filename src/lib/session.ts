import { cookies } from "next/headers";

const TOKEN_COOKIE = "token";
const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

export async function createSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ONE_DAY_IN_SECONDS,
  });
}

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE)?.value;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE);
}
