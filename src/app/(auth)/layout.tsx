import Image from "next/image";
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
      <aside className="relative hidden flex-col justify-end gap-3 overflow-hidden bg-black p-12 text-white lg:flex">
        <Image
          src="/login-cover.jpg"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        <div className="relative space-y-3">
          <Logo className="text-5xl" />
          <p className="max-w-sm text-lg">
            Envíos el mismo día en el Área Metropolitana y al día siguiente a
            nivel nacional.
          </p>
        </div>
      </aside>
    </div>
  );
}
