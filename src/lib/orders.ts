export type Order = {
  id: string;
  orderNumber: string;
  clientName: string;
  clientLastName: string;
  clientEmail: string;
  areaCode: string;
  clientPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  department: string;
  city: string;
  scheduledDate: string;
  createdAt: string;
  isCod: boolean;
  expectedAmount: number | null;
  collectedAmount: number | null;
  shippingCost: number;
  status: "PENDING" | "DELIVERED";
  settlement: number;
  packages: {
    length: number;
    height: number;
    width: number;
    weight: number;
    content: string;
  }[];
};

export type OrdersResponse = {
  data: Order[];
  meta: { total: number; page: number; limit: number; totalPages: number };
};

export const STATUS_LABELS: Record<Order["status"], string> = {
  PENDING: "Pendiente",
  DELIVERED: "Entregada",
};

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("es-SV", {
    timeZone: "America/El_Salvador",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
