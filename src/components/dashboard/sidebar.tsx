import Link from "next/link";
import { NavLinks } from "@/components/dashboard/nav-links";
import { Logo } from "@/components/logo";

export function Sidebar() {
  return (
    <aside className="flex w-60 shrink-0 flex-col gap-8 border-r bg-white px-5 py-6">
      <Link href="/orders/new">
        <Logo className="text-3xl text-black" />
      </Link>
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase">Menú</p>
        <NavLinks />
      </div>
    </aside>
  );
}
