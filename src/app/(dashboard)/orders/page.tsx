import { DownloadOrdersButton } from "@/components/orders/download-orders-button";
import { OrdersFilter } from "@/components/orders/orders-filter";
import { OrdersPagination } from "@/components/orders/orders-pagination";
import { OrdersTable } from "@/components/orders/orders-table";
import { apiFetch } from "@/lib/api";
import type { OrdersResponse } from "@/lib/orders";

type OrdersPageProps = {
  searchParams: Promise<{
    startDate?: string;
    endDate?: string;
    page?: string;
    created?: string;
  }>;
};

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { startDate, endDate, page, created } = await searchParams;

  const filters: Record<string, string> = {};
  if (startDate) filters.startDate = startDate;
  if (endDate) filters.endDate = endDate;

  const query = new URLSearchParams({ ...filters, page: page || "1" });
  const response = await apiFetch(`/orders?${query}`);
  const result: OrdersResponse | null = response.ok
    ? await response.json()
    : null;

  return (
    <div className="space-y-6">
      {created && (
        <p className="rounded-md bg-green-50 p-3 text-sm text-green-700">
          La orden #{created} fue creada correctamente.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <OrdersFilter startDate={startDate} endDate={endDate} />
        <DownloadOrdersButton orders={result?.data ?? []} />
      </div>

      {result ? (
        <>
          <div className="overflow-hidden rounded-xl border bg-white">
            <OrdersTable orders={result.data} />
          </div>
          <OrdersPagination
            page={result.meta.page}
            totalPages={result.meta.totalPages}
            filters={filters}
          />
        </>
      ) : (
        <p className="text-sm text-destructive">
          No se pudieron cargar las órdenes. Revisa los filtros e intenta de
          nuevo.
        </p>
      )}
    </div>
  );
}
