"use client";

import { useState } from "react";
import { saveSectionAction } from "@/app/admin/actions";
import type { EditableSection } from "@/lib/db";
import { setAtPath, type PathKey } from "@/lib/objectPath";
import { FieldEditor } from "./FieldEditor";

type Status = "idle" | "saving" | "saved" | "error";

export function SectionForm({
  section,
  initialUk,
  initialEn,
}: {
  section: EditableSection;
  initialUk: unknown;
  initialEn: unknown;
}) {
  const [locale, setLocale] = useState<"uk" | "en">("uk");
  const [uk, setUk] = useState<unknown>(initialUk);
  const [en, setEn] = useState<unknown>(initialEn);
  const [status, setStatus] = useState<Status>("idle");

  const data = locale === "uk" ? uk : en;
  const setData = locale === "uk" ? setUk : setEn;

  function handleChange(path: PathKey[], value: unknown) {
    setData((prev: unknown) => setAtPath(prev, path, value));
  }

  async function handleSave() {
    setStatus("saving");
    try {
      await saveSectionAction(section, { uk, en });
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <div className="mb-6 flex gap-2">
        {(["uk", "en"] as const).map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => setLocale(loc)}
            className="rounded-[var(--radius-buttons)] px-4 py-2 text-[14px]"
            style={{
              backgroundColor: locale === loc ? "var(--color-cerulean)" : "transparent",
              color: locale === loc ? "var(--color-espresso)" : "var(--color-warm-cream)",
              border: locale === loc ? "none" : "1px solid var(--color-warm-cream)",
            }}
          >
            {loc.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="surface-card p-[24px] md:p-[32px]">
        <FieldEditor value={data} path={[]} onChange={handleChange} />
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button type="button" onClick={handleSave} disabled={status === "saving"} className="btn-admin-primary">
          {status === "saving" ? "Зберігаю…" : "Зберегти"}
        </button>
        {status === "saved" && (
          <span className="text-[14px]" style={{ color: "var(--color-warm-cream)", fontWeight: 500 }}>
            Збережено ✓
          </span>
        )}
        {status === "error" && (
          <span className="text-[14px]" style={{ color: "#d1242f", fontWeight: 500 }}>
            Помилка збереження, спробуй ще раз
          </span>
        )}
      </div>
    </div>
  );
}
