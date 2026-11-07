"use client";

import { startTransition, useActionState, useState } from "react";
import { createOrder, type OrderDetails } from "@/actions/orders";
import { OrderDetailsStep } from "@/components/orders/order-details-step";
import type { PackageDraft } from "@/components/orders/package-fields";
import { PackagesStep } from "@/components/orders/packages-step";
import type { AreaCode, Department } from "@/lib/catalogs";

type CreateOrderFormProps = {
  areaCodes: AreaCode[];
  departments: Department[];
};

export function CreateOrderForm({
  areaCodes,
  departments,
}: CreateOrderFormProps) {
  const [state, formAction, pending] = useActionState(createOrder, undefined);
  const [details, setDetails] = useState<OrderDetails | null>(null);

  function handleSubmit(packages: PackageDraft[]) {
    if (!details) return;
    const input = {
      ...details,
      packages: packages.map((item) => ({
        length: Number(item.length),
        height: Number(item.height),
        width: Number(item.width),
        weight: Number(item.weight),
        content: item.content.trim(),
      })),
    };
    startTransition(() => formAction(input));
  }

  return (
    <div className="rounded-xl border bg-white p-6">
      <div className={details ? "hidden" : undefined}>
        <OrderDetailsStep
          areaCodes={areaCodes}
          departments={departments}
          onNext={setDetails}
        />
      </div>
      <div className={details ? undefined : "hidden"}>
        <PackagesStep
          pending={pending}
          serverError={state?.error}
          onBack={() => setDetails(null)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
