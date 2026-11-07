import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Order } from "@/lib/orders";

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
          <TableHead>Nombre</TableHead>
          <TableHead>Apellidos</TableHead>
          <TableHead>Departamento</TableHead>
          <TableHead>Municipio</TableHead>
          <TableHead className="text-center">Paquetes en orden</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-semibold">{order.orderNumber}</TableCell>
            <TableCell>{order.clientName}</TableCell>
            <TableCell>{order.clientLastName}</TableCell>
            <TableCell>{order.department}</TableCell>
            <TableCell>{order.city}</TableCell>
            <TableCell className="text-center">
              <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                {order.packages.length}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
