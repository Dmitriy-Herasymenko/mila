"use client";

import { useTranslations } from "next-intl";

export function Marquee() {
  const t = useTranslations("marquee");
  const items = (t.raw("items") as string[] | undefined) ?? [];

  const track = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span
            className="px-10 text-[15px] uppercase md:text-[17px]"
            style={{ color: "var(--color-warm-cream)", letterSpacing: "0.04em" }}
          >
            {item}
          </span>
          <span aria-hidden style={{ color: "var(--color-cerulean)" }}>
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="overflow-hidden py-6"
      style={{
        backgroundColor: "var(--color-midnight-cocoa)",
        borderTop: "1px solid var(--color-walnut)",
        borderBottom: "1px solid var(--color-walnut)",
      }}
    >
      <div className="marquee-track">
        {track}
        {track}
      </div>
    </div>
  );
}
