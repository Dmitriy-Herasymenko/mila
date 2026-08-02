"use client";

import type { PathKey } from "@/lib/objectPath";

const LONG_TEXT_HINT = /description|subtitle|answer|paragraph|desc|title/i;

export function FieldEditor({
  value,
  path,
  label,
  onChange,
}: {
  value: unknown;
  path: PathKey[];
  label?: string;
  onChange: (path: PathKey[], value: unknown) => void;
}) {
  if (typeof value === "string") {
    const useTextarea = value.length > 60 || (label ? LONG_TEXT_HINT.test(label) : false);
    return (
      <label className="mb-4 flex flex-col gap-1.5">
        {label && (
          <span className="text-[13px]" style={{ color: "var(--color-warm-cream)", fontWeight: 500 }}>
            {label}
          </span>
        )}
        {useTextarea ? (
          <textarea
            value={value}
            rows={value.length > 160 ? 5 : 3}
            onChange={(e) => onChange(path, e.target.value)}
            className="pill-input px-3 py-2 text-[15px]"
            style={{ borderRadius: "var(--radius-cards)" }}
          />
        ) : (
          <input
            value={value}
            onChange={(e) => onChange(path, e.target.value)}
            className="pill-input px-3 py-2 text-[15px]"
            style={{ borderRadius: "var(--radius-cards)" }}
          />
        )}
      </label>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="mb-4">
        {label && (
          <div className="mb-2 text-[13px]" style={{ color: "var(--color-warm-cream)", fontWeight: 500 }}>
            {label}
          </div>
        )}
        <div className="flex flex-col gap-3">
          {value.map((item, i) => (
            <div
              key={i}
              className="relative rounded-[12px] p-3"
              style={{ border: "1px solid var(--color-walnut)" }}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[12px]" style={{ color: "var(--color-driftwood)" }}>
                  #{i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => onChange(path, value.filter((_, idx) => idx !== i))}
                  className="text-[12px] underline"
                  style={{ color: "var(--color-driftwood)" }}
                >
                  Видалити
                </button>
              </div>
              <FieldEditor value={item} path={[...path, i]} onChange={onChange} />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            const template = value[value.length - 1];
            const copy = template && typeof template === "object" ? structuredClone(template) : "";
            onChange(path, [...value, copy]);
          }}
          className="btn-ghost mt-3 text-[14px]"
          style={{ padding: "8px 16px" }}
        >
          + Додати елемент
        </button>
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div>
        {Object.entries(value as Record<string, unknown>).map(([key, v]) => (
          <FieldEditor key={key} value={v} path={[...path, key]} label={key} onChange={onChange} />
        ))}
      </div>
    );
  }

  return null;
}
