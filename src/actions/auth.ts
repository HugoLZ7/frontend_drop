"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";

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

export type RegisterState = { error?: string } | undefined;

export async function register(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const password = formData.get("password");
  if (password !== formData.get("confirmPassword")) {
    return { error: "Las contraseñas no coinciden" };
  }

  const body = {
    name: formData.get("name"),
    lastName: formData.get("lastName"),
    gender: formData.get("gender"),
    dateBirth: formData.get("dateBirth"),
    email: formData.get("email"),
    areaCode: formData.get("areaCode"),
    phone: formData.get("phone"),
    password,
  };

  let response: Response;
  try {
    response = await fetch(`${process.env.API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return { error: "No se pudo conectar con el servidor" };
  }

  if (response.status === 409) {
    return { error: "El correo ya está registrado" };
  }
  if (!response.ok) {
    return { error: "Revisa los datos ingresados" };
  }

  redirect("/login?registered=1");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
