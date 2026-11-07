import Form from "next/form";
import Link from "next/link";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";

type OrdersFilterProps = {
  startDate?: string;
  endDate?: string;
};

export function OrdersFilter({ startDate, endDate }: OrdersFilterProps) {
  return (
    <Form action="/orders" className="flex flex-wrap items-center gap-3">
      <div className="w-40">
        <DatePicker
          key={`start-${startDate}`}
          id="startDate"
          name="startDate"
          placeholder="Desde"
          defaultValue={startDate}
        />
      </div>
      <div className="w-40">
        <DatePicker
          key={`end-${endDate}`}
          id="endDate"
          name="endDate"
          placeholder="Hasta"
          defaultValue={endDate}
        />
      </div>
      <Button type="submit">Buscar</Button>
      {(startDate || endDate) && (
        <Link
          href="/orders"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Limpiar filtros
        </Link>
      )}
    </Form>
  );
}
