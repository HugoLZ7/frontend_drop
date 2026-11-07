import { CreateOrderForm } from "@/components/orders/create-order-form";
import { getAreaCodes, getDepartments } from "@/lib/catalogs";

export default async function NewOrderPage() {
  const [areaCodes, departments] = await Promise.all([
    getAreaCodes(),
    getDepartments(),
  ]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Crea una orden</h2>
        <p className="text-sm text-muted-foreground">
          Dale una ventaja competitiva a tu negocio con entregas{" "}
          <strong>el mismo día</strong> (Área Metropolitana) y{" "}
          <strong>el día siguiente</strong> a nivel nacional.
        </p>
      </div>
      <CreateOrderForm areaCodes={areaCodes} departments={departments} />
    </div>
  );
}
