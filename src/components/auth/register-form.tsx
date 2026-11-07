"use client";

import Link from "next/link";
import { startTransition, useActionState, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { register } from "@/actions/auth";
import { PasswordInput } from "@/components/auth/password-input";
import { DatePicker } from "@/components/date-picker";
import type { AreaCode } from "@/lib/catalogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const GENDERS = [
  { value: "MALE", label: "Masculino" },
  { value: "FEMALE", label: "Femenino" },
  { value: "OTHER", label: "Otro" },
];

export function RegisterForm({ areaCodes }: { areaCodes: AreaCode[] }) {
  const [state, formAction, pending] = useActionState(register, undefined);
  const areaCodeItems = areaCodes.map((areaCode) => ({
    value: areaCode.dialCode,
    label: `${areaCode.country} (${areaCode.dialCode})`,
  }));
  const [pendingData, setPendingData] = useState<FormData | null>(null);
  const [clientError, setClientError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get("dateBirth")) {
      setClientError("Selecciona tu fecha de nacimiento");
      return;
    }
    if (data.get("password") !== data.get("confirmPassword")) {
      setClientError("Las contraseñas no coinciden");
      return;
    }
    setClientError(null);
    setPendingData(data);
  }

  function handleConfirm() {
    if (!pendingData) return;
    const data = pendingData;
    setPendingData(null);
    startTransition(() => formAction(data));
  }

  const error = clientError ?? state?.error;
  const phoneToConfirm = pendingData
    ? `${pendingData.get("areaCode")} ${pendingData.get("phone")}`
    : "";

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Link href="/login" aria-label="Volver al inicio de sesión">
            <ChevronLeft className="size-5" />
          </Link>
          <h1 className="text-2xl font-semibold">Cuéntanos de ti</h1>
        </div>
        <p className="text-muted-foreground">
          Completa la información de registro
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            name="name"
            placeholder="Digita tu nombre"
            maxLength={100}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Apellido</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Digita tu apellido"
            maxLength={100}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Sexo</Label>
          <Select name="gender" items={GENDERS} required>
            <SelectTrigger id="gender" className="w-full">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {GENDERS.map((gender) => (
                <SelectItem key={gender.value} value={gender.value}>
                  {gender.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateBirth">Fecha de nacimiento</Label>
          <DatePicker
            id="dateBirth"
            name="dateBirth"
            disabled={{ after: new Date() }}
            startMonth={new Date(1920, 0)}
            endMonth={new Date()}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Digitar correo"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Número de WhatsApp</Label>
          <div className="flex gap-2">
            <Select
              name="areaCode"
              items={areaCodeItems}
              defaultValue={areaCodeItems[0]?.value}
            >
              <SelectTrigger className="w-24">
                <SelectValue>{(value: string) => value}</SelectValue>
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false} className="min-w-52">
                {areaCodeItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="7777 7777"
              maxLength={20}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <PasswordInput
            id="password"
            name="password"
            placeholder="Digitar contraseña"
            minLength={8}
            maxLength={72}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Repetir contraseña</Label>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Digitar contraseña"
            required
          />
        </div>

        {error && (
          <p className="text-sm text-destructive sm:col-span-2">{error}</p>
        )}

        <Button
          type="submit"
          className="w-full sm:col-span-2"
          disabled={pending}
        >
          {pending ? "Registrando..." : "Siguiente"}
        </Button>
      </form>

      <AlertDialog
        open={pendingData !== null}
        onOpenChange={(open) => {
          if (!open) setPendingData(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar número de teléfono</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro de que desea continuar con el número{" "}
              <strong>{phoneToConfirm}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
