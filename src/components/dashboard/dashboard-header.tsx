"use client";

import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/orders";
import { cn } from "@/lib/utils";

const TITLES: Record<string, string> = {
  "/orders/new": "Crear orden",
  "/orders": "Mis envíos",
};

type DashboardHeaderProps = {
  userName: string;
  balance: number | null;
};

export function DashboardHeader({ userName, balance }: DashboardHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-5">
      <h1 className="text-lg">{TITLES[pathname] ?? ""}</h1>
      <div className="flex items-center gap-4">
        {balance !== null && (
          <div className="rounded-md border px-3 py-1.5 text-sm">
            <span className="text-muted-foreground">Monto a liquidar: </span>
            <span
              className={cn(
                "font-semibold",
                balance < 0 ? "text-destructive" : "text-green-700",
              )}
            >
              {formatMoney(balance)}
            </span>
          </div>
        )}
        <span className="text-sm font-medium">{userName}</span>
        <form action={logout}>
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            aria-label="Cerrar sesión"
          >
            <LogOut className="size-4" />
          </Button>
        </form>
      </div>
    </header>
  );
}
