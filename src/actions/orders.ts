"use server";

import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api";

export type PackageInput = {
  length: number;
  height: number;
  width: number;
  weight: number;
  content: string;
};

export type OrderDetails = {
  pickupAddress: string;
  scheduledDate: string;
  clientName: string;
  clientLastName: string;
  clientEmail: string;
  areaCode: string;
  clientPhone: string;
  deliveryAddress: string;
  department: string;
  city: string;
  reference?: string;
  indications?: string;
};

export type CreateOrderInput = OrderDetails & { packages: PackageInput[] };

export type CreateOrderState = { error?: string } | undefined;

export async function createOrder(
  _prevState: CreateOrderState,
  input: CreateOrderInput,
): Promise<CreateOrderState> {
  const response = await apiFetch("/orders", {
    method: "POST",
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    return {
      error:
        typeof data?.message === "string"
          ? data.message
          : "Revisa los datos de la orden",
    };
  }

  const order: { orderNumber: string } = await response.json();
  redirect(`/orders?created=${order.orderNumber}`);
}
