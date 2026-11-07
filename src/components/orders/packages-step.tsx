"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Box, Plus, Trash2 } from "lucide-react";
import {
  EMPTY_PACKAGE,
  isValidPackage,
  PackageFields,
  type PackageDraft,
} from "@/components/orders/package-fields";
import { Button } from "@/components/ui/button";

type PackagesStepProps = {
  pending: boolean;
  serverError?: string;
  onBack: () => void;
  onSubmit: (packages: PackageDraft[]) => void;
};

export function PackagesStep({
  pending,
  serverError,
  onBack,
  onSubmit,
}: PackagesStepProps) {
  const [draft, setDraft] = useState<PackageDraft>(EMPTY_PACKAGE);
  const [packages, setPackages] = useState<PackageDraft[]>([]);
  const [error, setError] = useState<string | null>(null);

  function handleAdd() {
    if (!isValidPackage(draft)) {
      setError("Completa las medidas, el peso y el contenido del paquete");
      return;
    }
    setError(null);
    setPackages([...packages, draft]);
    setDraft(EMPTY_PACKAGE);
  }

  function handleUpdate(index: number, value: PackageDraft) {
    setPackages(packages.map((item, i) => (i === index ? value : item)));
  }

  function handleRemove(index: number) {
    setPackages(packages.filter((_, i) => i !== index));
  }

  function handleSubmit() {
    if (packages.length === 0) {
      setError("Agrega al menos un paquete");
      return;
    }
    if (!packages.every(isValidPackage)) {
      setError("Revisa los paquetes: todos los campos son obligatorios");
      return;
    }
    setError(null);
    onSubmit(packages);
  }

  return (
    <div className="space-y-6">
      <h3 className="font-semibold">Agrega tus productos</h3>

      <div className="space-y-4 rounded-lg bg-slate-50 p-4">
        <div className="flex items-end gap-4">
          <Box className="mb-2 size-6 shrink-0 text-muted-foreground" />
          <PackageFields value={draft} onChange={setDraft} />
        </div>
        <div className="flex justify-end">
          <Button type="button" variant="outline" onClick={handleAdd}>
            Agregar
            <Plus className="size-4" />
          </Button>
        </div>
      </div>

      {packages.map((item, index) => (
        <div
          key={index}
          className="flex items-end gap-4 rounded-lg border border-green-500 p-4"
        >
          <Box className="mb-2 size-6 shrink-0 text-muted-foreground" />
          <PackageFields
            value={item}
            onChange={(value) => handleUpdate(index, value)}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Eliminar paquete"
            onClick={() => handleRemove(index)}
          >
            <Trash2 className="size-4 text-destructive" />
          </Button>
        </div>
      ))}

      {(error ?? serverError) && (
        <p className="text-sm text-destructive">{error ?? serverError}</p>
      )}

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="size-4" />
          Regresar
        </Button>
        <Button type="button" onClick={handleSubmit} disabled={pending}>
          {pending ? "Enviando..." : "Enviar"}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
