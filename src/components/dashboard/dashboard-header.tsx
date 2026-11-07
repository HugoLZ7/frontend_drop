"use client";

import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";

const TITLES: Record<string, string> = {
  "/orders/new": "Crear orden",
  "/orders": "Mis envíos",
};

export function DashboardHeader({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-5">
      <h1 className="text-lg">{TITLES[pathname] ?? ""}</h1>
      <div className="flex items-center gap-3">
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
