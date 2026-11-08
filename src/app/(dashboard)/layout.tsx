import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { apiFetch } from "@/lib/api";

type Profile = { name: string; lastName: string };

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profileResponse, balanceResponse] = await Promise.all([
    apiFetch("/auth/me"),
    apiFetch("/orders/balance"),
  ]);
  if (!profileResponse.ok) {
    redirect("/logout");
  }
  const profile: Profile = await profileResponse.json();
  const balance: number | null = balanceResponse.ok
    ? (await balanceResponse.json()).balance
    : null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col bg-slate-50">
        <DashboardHeader
          userName={`${profile.name} ${profile.lastName}`}
          balance={balance}
        />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
