"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, TextSearch } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/orders/new", label: "Crear orden", icon: Plus },
  { href: "/orders", label: "Historial", icon: TextSearch },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {LINKS.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors",
            pathname === href
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted",
          )}
        >
          <Icon className="size-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
