"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Reveal, RevealGroup, revealItem } from "./Reveal";

type FormatItem = { format: string; audience: string; result: string };
type DetailItem = { label: string; value: string };

export function Formats() {
  const t = useTranslations("formats");
  const items = t.raw("items") as FormatItem[];
  const headers = t.raw("tableHeaders") as string[];
  const cmoDetails = t.raw("cmoDetails") as DetailItem[];

  return (
    <section className="section-gap" style={{ backgroundColor: "var(--color-espresso)" }}>
      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal>
            <h2
              className="font-display text-[28px] md:text-[35px]"
              style={{ color: "var(--color-warm-cream)", letterSpacing: "-0.02em" }}
            >
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 text-[16px]" style={{ color: "var(--color-driftwood)" }}>
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-10">
          <div className="hidden grid-cols-[1fr_1.3fr_1.5fr] gap-6 pb-3 md:grid" style={{ borderBottom: "1px solid var(--color-walnut)" }}>
            {headers.map((h) => (
              <span key={h} className="text-[12px] uppercase" style={{ color: "var(--color-driftwood)", letterSpacing: "0.04em" }}>
                {h}
              </span>
            ))}
          </div>

          <RevealGroup stagger={0.06}>
            {items.map((item) => (
              <motion.div
                key={item.format}
                variants={revealItem}
                className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[1fr_1.3fr_1.5fr] md:gap-6 md:py-6"
                style={{ borderBottom: "1px solid var(--color-walnut)" }}
              >
                <div className="text-[19px]" style={{ color: "var(--color-warm-cream)", fontWeight: 500 }}>
                  {item.format}
                </div>
                <div className="text-[15px]" style={{ color: "var(--color-driftwood)" }}>
                  {item.audience}
                </div>
                <div className="text-[15px]" style={{ color: "var(--color-warm-cream)" }}>
                  {item.result}
                </div>
              </motion.div>
            ))}
          </RevealGroup>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <h3 className="text-[19px]" style={{ color: "var(--color-warm-cream)", fontWeight: 500 }}>
            {t("cmoDetailsTitle")}
          </h3>
          <RevealGroup className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2" stagger={0.05}>
            {cmoDetails.map((d) => (
              <motion.div key={d.label} variants={revealItem} className="hairline-card p-[16px]">
                <div className="text-[13px]" style={{ color: "var(--color-driftwood)" }}>
                  {d.label}
                </div>
                <div className="mt-1 text-[15px]" style={{ color: "var(--color-warm-cream)", fontWeight: 500 }}>
                  {d.value}
                </div>
              </motion.div>
            ))}
          </RevealGroup>
        </Reveal>
      </div>
    </section>
  );
}
