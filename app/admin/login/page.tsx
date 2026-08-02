import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, hashPassword } from "@/lib/adminAuth";

async function login(formData: FormData) {
  "use server";
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (!expected || password !== expected) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, await hashPassword(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/admin");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form action={login} className="surface-card w-full max-w-sm p-[32px]">
        <h1 className="font-display text-[24px]" style={{ color: "var(--color-warm-cream)" }}>
          Admin
        </h1>
        <p className="mt-2 text-[14px]" style={{ color: "var(--color-driftwood)" }}>
          Введи пароль, щоб редагувати контент сайту.
        </p>

        <label className="mt-6 flex flex-col gap-2 text-[14px]">
          <span style={{ color: "var(--color-warm-cream)", fontWeight: 500 }}>Пароль</span>
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="pill-input px-[16px] py-[12px] text-[16px]"
          />
        </label>

        {error && (
          <p className="mt-3 text-[14px]" style={{ color: "#d1242f" }}>
            Невірний пароль
          </p>
        )}

        <button type="submit" className="btn-primary mt-6 w-full">
          Увійти
        </button>
      </form>
    </main>
  );
}
