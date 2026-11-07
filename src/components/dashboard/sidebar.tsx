import "@flaticon/flaticon-uicons/css/bold/straight.css";
import Link from "next/link";
import { NavLinks } from "@/components/dashboard/nav-links";

export function Sidebar() {
  return (
    <aside className="flex w-60 shrink-0 flex-col gap-8 border-r bg-white px-5 py-6">
      <Link
        href="/orders/new"
        className="flex items-center gap-2 font-brand text-3xl text-black"
      >
        <i className="fi fi-bs-rocket-lunch flex text-2xl" />
        Drop
      </Link>
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase">Menú</p>
        <NavLinks />
      </div>
    </aside>
  );
}
