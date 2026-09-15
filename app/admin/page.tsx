import Link from "next/link";
import { EDITABLE_SECTIONS } from "@/lib/db";
import { logoutAction } from "./actions";

const SECTION_LABELS: Record<string, string> = {
  hero: "Головний екран (Hero)",
  marquee: "Бігуча стрічка (скіли)",
  about: "Про мене",
  stats: "Цифри, які говорять самі за себе",
  work: "Роботи",
  services: "Чим я можу допомогти вашому бізнесу",
  fit: "Кому підходить/не підходить",
  formats: "Формати співпраці",
  faq: "Часті запитання",
  contact: "Контакти",
};

export default function AdminDashboard() {
  return (
    <main className="container-page py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-[28px]" style={{ color: "var(--color-warm-cream)" }}>
          Редагування сайту
        </h1>
        <form action={logoutAction}>
          <button type="submit" className="btn-ghost text-[14px]" style={{ padding: "8px 16px" }}>
            Вийти
          </button>
        </form>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {EDITABLE_SECTIONS.map((section) => (
          <Link
            key={section}
            href={`/admin/${section}`}
            className="surface-card block p-[24px] transition-transform hover:-translate-y-0.5"
          >
            <div className="text-[14px]" style={{ color: "var(--color-driftwood)" }}>
              {section}
            </div>
            <div className="mt-1 text-[20px]" style={{ color: "var(--color-warm-cream)", fontWeight: 500 }}>
              {SECTION_LABELS[section] ?? section}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
