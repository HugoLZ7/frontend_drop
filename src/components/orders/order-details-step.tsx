"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { OrderDetails } from "@/actions/orders";
import { DatePicker } from "@/components/date-picker";
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
import type { AreaCode, Department } from "@/lib/catalogs";

type OrderDetailsStepProps = {
  areaCodes: AreaCode[];
  departments: Department[];
  onNext: (details: OrderDetails) => void;
};

export function OrderDetailsStep({
  areaCodes,
  departments,
  onNext,
}: OrderDetailsStepProps) {
  const [department, setDepartment] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const areaCodeItems = areaCodes.map((areaCode) => ({
    value: areaCode.dialCode,
    label: `${areaCode.country} (${areaCode.dialCode})`,
  }));
  const municipalities =
    departments.find((item) => item.name === department)?.municipalities ??
    [];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();

    if (!value("scheduledDate")) {
      setError("Selecciona la fecha programada");
      return;
    }
    if (!value("department") || !value("city")) {
      setError("Selecciona el departamento y el municipio");
      return;
    }
    setError(null);

    onNext({
      pickupAddress: value("pickupAddress"),
      scheduledDate: value("scheduledDate"),
      clientName: value("clientName"),
      clientLastName: value("clientLastName"),
      clientEmail: value("clientEmail"),
      areaCode: value("areaCode"),
      clientPhone: value("clientPhone"),
      deliveryAddress: value("deliveryAddress"),
      department: value("department"),
      city: value("city"),
      reference: value("reference") || undefined,
      indications: value("indications") || undefined,
    });
  }

  const today = new Date();
  const nextYear = new Date(today.getFullYear() + 1, today.getMonth());

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="font-semibold">Completa los datos</h3>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="pickupAddress">Dirección de recolección</Label>
          <Input
            id="pickupAddress"
            name="pickupAddress"
            placeholder="Colonia Las Magnolias, calle militar 1, San Salvador"
            maxLength={255}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="scheduledDate">Fecha programada</Label>
          <DatePicker
            id="scheduledDate"
            name="scheduledDate"
            disabled={{ before: today }}
            startMonth={today}
            endMonth={nextYear}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientName">Nombres</Label>
          <Input
            id="clientName"
            name="clientName"
            placeholder="Gabriela Reneé"
            maxLength={100}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientLastName">Apellidos</Label>
          <Input
            id="clientLastName"
            name="clientLastName"
            placeholder="Díaz López"
            maxLength={100}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientEmail">Correo electrónico</Label>
          <Input
            id="clientEmail"
            name="clientEmail"
            type="email"
            placeholder="gabbydiaz@gmail.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientPhone">Teléfono</Label>
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
              id="clientPhone"
              name="clientPhone"
              type="tel"
              placeholder="7777 7777"
              maxLength={20}
              required
            />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="deliveryAddress">Dirección del destinatario</Label>
          <Input
            id="deliveryAddress"
            name="deliveryAddress"
            placeholder="Final 49 Av. Sur y Bulevar Los Próceres, Smartcenter, Bodega #8, San Salvador"
            maxLength={255}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Departamento</Label>
          <Select
            name="department"
            value={department}
            onValueChange={(value) => setDepartment(value as string | null)}
          >
            <SelectTrigger id="department" className="w-full">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {departments.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Municipio</Label>
          <Select key={department} name="city" disabled={!department}>
            <SelectTrigger id="city" className="w-full">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {municipalities.map((municipality) => (
                <SelectItem key={municipality} value={municipality}>
                  {municipality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reference">Punto de referencia</Label>
          <Input
            id="reference"
            name="reference"
            placeholder="Cerca de redondel Árbol de la Paz"
            maxLength={255}
          />
        </div>

        <div className="space-y-2 md:col-span-3">
          <Label htmlFor="indications">Indicaciones</Label>
          <Input
            id="indications"
            name="indications"
            placeholder="Llamar antes de entregar"
            maxLength={500}
          />
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex justify-end">
        <Button type="submit">
          Siguiente
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </form>
  );
}
