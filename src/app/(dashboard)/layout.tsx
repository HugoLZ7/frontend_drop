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
  const response = await apiFetch("/auth/me");
  if (!response.ok) {
    redirect("/logout");
  }
  const profile: Profile = await response.json();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col bg-slate-50">
        <DashboardHeader userName={`${profile.name} ${profile.lastName}`} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
