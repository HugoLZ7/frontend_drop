import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Bienvenido</h1>
        <p className="text-muted-foreground">
          Por favor ingresa tus credenciales
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
