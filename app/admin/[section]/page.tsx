import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionForm } from "@/components/admin/SectionForm";
import { EDITABLE_SECTIONS, getSectionRow, type EditableSection } from "@/lib/db";

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
};

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!EDITABLE_SECTIONS.includes(section as EditableSection)) {
    notFound();
  }

  const row = await getSectionRow(section as EditableSection);

  if (!row) {
    notFound();
  }

  return (
    <main className="container-page py-12">
      <Link href="/admin" className="text-[14px]" style={{ color: "var(--color-driftwood)" }}>
        ← Усі секції
      </Link>
      <h1 className="font-display mt-3 text-[28px]" style={{ color: "var(--color-warm-cream)" }}>
        {SECTION_LABELS[section] ?? section}
      </h1>

      <div className="mt-8">
        <SectionForm section={section as EditableSection} initialUk={row.uk} initialEn={row.en} />
      </div>
    </main>
  );
}
