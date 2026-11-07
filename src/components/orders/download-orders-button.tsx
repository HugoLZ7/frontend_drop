"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Order } from "@/lib/orders";

const HEADERS = [
  "No. de orden",
  "Nombre",
  "Apellidos",
  "Correo",
  "Teléfono",
  "Departamento",
  "Municipio",
  "Dirección de entrega",
  "Fecha programada",
  "Paquetes",
];

function toCsvValue(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function buildCsv(orders: Order[]) {
  const rows = orders.map((order) => [
    order.orderNumber,
    order.clientName,
    order.clientLastName,
    order.clientEmail,
    `${order.areaCode} ${order.clientPhone}`,
    order.department,
    order.city,
    order.deliveryAddress,
    order.scheduledDate.slice(0, 10),
    order.packages.length,
  ]);

  return [HEADERS, ...rows]
    .map((row) => row.map(toCsvValue).join(";"))
    .join("\n");
}

export function DownloadOrdersButton({ orders }: { orders: Order[] }) {
  function handleDownload() {
    const blob = new Blob(["﻿" + buildCsv(orders)], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ordenes.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleDownload}
      disabled={orders.length === 0}
    >
      <Download className="size-4" />
      Descargar órdenes
    </Button>
  );
}
