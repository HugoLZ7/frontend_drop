import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatDate,
  formatMoney,
  STATUS_LABELS,
  type Order,
} from "@/lib/orders";
import { cn } from "@/lib/utils";

export function OrdersTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <p className="p-8 text-center text-sm text-muted-foreground">
        No hay órdenes para mostrar
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/60">
          <TableHead>No. de orden</TableHead>
          <TableHead>Fecha de creación</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Apellidos</TableHead>
          <TableHead>Departamento</TableHead>
          <TableHead>Municipio</TableHead>
          <TableHead className="text-center">Paquetes en orden</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Liquidación</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-semibold">{order.orderNumber}</TableCell>
            <TableCell>{formatDate(order.createdAt)}</TableCell>
            <TableCell>{order.clientName}</TableCell>
            <TableCell>{order.clientLastName}</TableCell>
            <TableCell>{order.department}</TableCell>
            <TableCell>{order.city}</TableCell>
            <TableCell className="text-center">
              <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                {order.packages.length}
              </Badge>
            </TableCell>
            <TableCell>
              {order.isCod
                ? `COD ${formatMoney(order.collectedAmount ?? order.expectedAmount ?? 0)}`
                : "Estándar"}
            </TableCell>
            <TableCell>
              <Badge variant={order.status === "DELIVERED" ? "default" : "outline"}>
                {STATUS_LABELS[order.status]}
              </Badge>
            </TableCell>
            <TableCell
              className={cn(
                "text-right font-medium",
                order.settlement < 0 ? "text-destructive" : "text-green-700",
              )}
            >
              {formatMoney(order.settlement)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
