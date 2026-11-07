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
      <aside className="hidden flex-col justify-end gap-3 bg-primary p-12 text-primary-foreground lg:flex">
        <p className="text-3xl font-bold">boxful</p>
        <p className="max-w-sm text-lg">
          Envíos el mismo día en el Área Metropolitana y al día siguiente a
          nivel nacional.
        </p>
      </aside>
    </div>
  );
}
