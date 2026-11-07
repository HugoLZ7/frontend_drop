import Link from "next/link";
import { cn } from "@/lib/utils";

type OrdersPaginationProps = {
  page: number;
  totalPages: number;
  filters: Record<string, string>;
};

export function OrdersPagination({
  page,
  totalPages,
  filters,
}: OrdersPaginationProps) {
  if (totalPages <= 1) return null;

  function pageHref(target: number) {
    const params = new URLSearchParams({ ...filters, page: String(target) });
    return `/orders?${params}`;
  }

  const linkClass = "rounded-md border bg-white px-3 py-1.5 text-sm";
  const disabledClass = "pointer-events-none opacity-50";

  return (
    <div className="flex items-center justify-end gap-3">
      <Link
        href={pageHref(page - 1)}
        className={cn(linkClass, page <= 1 && disabledClass)}
      >
        Anterior
      </Link>
      <span className="text-sm text-muted-foreground">
        Página {page} de {totalPages}
      </span>
      <Link
        href={pageHref(page + 1)}
        className={cn(linkClass, page >= totalPages && disabledClass)}
      >
        Siguiente
      </Link>
    </div>
  );
}
