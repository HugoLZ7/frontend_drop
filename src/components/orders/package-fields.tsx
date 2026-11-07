"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type PackageDraft = {
  length: string;
  height: string;
  width: string;
  weight: string;
  content: string;
};

export const EMPTY_PACKAGE: PackageDraft = {
  length: "",
  height: "",
  width: "",
  weight: "",
  content: "",
};

const DIMENSIONS = [
  { key: "length", label: "Largo" },
  { key: "height", label: "Alto" },
  { key: "width", label: "Ancho" },
] as const;

type PackageFieldsProps = {
  value: PackageDraft;
  onChange: (value: PackageDraft) => void;
};

export function PackageFields({ value, onChange }: PackageFieldsProps) {
  function update(field: keyof PackageDraft, fieldValue: string) {
    onChange({ ...value, [field]: fieldValue });
  }

  return (
    <div className="grid flex-1 gap-4 md:grid-cols-[repeat(3,5.5rem)_8rem_1fr]">
      {DIMENSIONS.map(({ key, label }) => (
        <div key={key} className="space-y-2">
          <Label>{label}</Label>
          <div className="relative">
            <Input
              type="number"
              min="0"
              step="any"
              placeholder="15"
              value={value[key]}
              onChange={(event) => update(key, event.target.value)}
              className="pr-9"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
              cm
            </span>
          </div>
        </div>
      ))}

      <div className="space-y-2">
        <Label>Peso en libras</Label>
        <Input
          type="number"
          min="0"
          step="any"
          placeholder="3"
          value={value.weight}
          onChange={(event) => update("weight", event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Contenido</Label>
        <Input
          placeholder="iPhone 14 pro Max"
          maxLength={200}
          value={value.content}
          onChange={(event) => update("content", event.target.value)}
        />
      </div>
    </div>
  );
}

export function isValidPackage(draft: PackageDraft) {
  const numbers = [draft.length, draft.height, draft.width, draft.weight];
  return (
    numbers.every((field) => Number(field) > 0) &&
    draft.content.trim().length > 0
  );
}
