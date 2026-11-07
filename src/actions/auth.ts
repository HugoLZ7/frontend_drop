"use server";

import { redirect } from "next/navigation";
import { createSession } from "@/lib/session";

export type LoginState = { error?: string } | undefined;

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  let response: Response;
  try {
    response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    return { error: "No se pudo conectar con el servidor" };
  }

  if (!response.ok) {
    return { error: "Correo o contraseña incorrectos" };
  }

  const data: { access_token: string } = await response.json();
  await createSession(data.access_token);
  redirect("/orders/new");
}
