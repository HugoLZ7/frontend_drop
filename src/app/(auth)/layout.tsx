import { Logo } from "@/components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <main className="flex items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-md">{children}</div>
      </main>
      <aside className="hidden flex-col justify-end gap-3 bg-black p-12 text-white lg:flex">
        <Logo className="text-5xl" />
        <p className="max-w-sm text-lg">
          Envíos el mismo día en el Área Metropolitana y al día siguiente a
          nivel nacional.
        </p>
      </aside>
    </div>
  );
}
