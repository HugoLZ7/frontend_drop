import "@flaticon/flaticon-uicons/css/bold/straight.css";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2 font-brand", className)}>
      <i className="fi fi-bs-rocket-lunch flex text-[0.8em]" />
      Drop
    </span>
  );
}
