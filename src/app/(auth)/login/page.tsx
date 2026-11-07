import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const { registered } = await searchParams;

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Bienvenido</h1>
        <p className="text-muted-foreground">
          Por favor ingresa tus credenciales
        </p>
      </div>
      {registered && (
        <p className="rounded-md bg-green-50 p-3 text-sm text-green-700">
          Tu cuenta fue creada. Inicia sesión para continuar.
        </p>
      )}
      <LoginForm />
    </div>
  );
}
