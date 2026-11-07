import { redirect } from "next/navigation";
import { getToken } from "@/lib/session";

export async function apiFetch(path: string, init: RequestInit = {}) {
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...init.headers,
    },
  });

  if (response.status === 401) {
    redirect("/logout");
  }

  return response;
}
