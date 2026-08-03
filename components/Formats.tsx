"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Reveal, RevealGroup, revealItem } from "./Reveal";

type DetailItem = { label: string; value: string };
type FormatItem = {
  format: string;
  audience: string;
  result: string;
  detailsTitle: string;
  details: DetailItem[];
};

const easeApple = [0.16, 1, 0.3, 1] as const;

export function Formats() {
  const t = useTranslations("formats");
  const items = (t.raw("items") as FormatItem[] | undefined) ?? [];
  const [active, setActive] = useState(Math.max(items.length - 1, 0));
  const current = items[active];

  if (items.length === 0 || !current) {
    return null;
  }

  return (
    <section className="section-gap" style={{ backgroundColor: "var(--color-espresso)" }}>
      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal>
            <h2
              className="font-display text-[24px] leading-[1.15] tracking-normal sm:text-[28px] md:text-[35px] md:tracking-[-0.02em]"
              style={{ color: "var(--color-warm-cream)" }}
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

        <RevealGroup className="mt-8 grid grid-cols-3 gap-2 md:mt-14 md:grid-cols-3 md:gap-6" stagger={0.08}>
          {items.map((item, i) => {
            const isActive = active === i;
            return (
              <motion.button
                key={item.format}
                type="button"
                onClick={() => setActive(i)}
                variants={revealItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: easeApple }}
                className="flex flex-col items-center p-[12px] text-center md:items-start md:p-[28px] md:text-left"
                style={{
                  borderRadius: "var(--radius-cards)",
                  border: `1px solid ${isActive ? "var(--color-accent)" : "var(--color-walnut)"}`,
                  background: isActive
                    ? "linear-gradient(160deg, rgba(178,51,71,0.14) 0%, rgba(178,51,71,0) 60%)"
                    : "transparent",
                }}
              >
                <span
                  className="hidden text-[12px] uppercase md:block"
                  style={{ color: "var(--color-driftwood)", letterSpacing: "0.06em" }}
                >
                  {item.audience}
                </span>

                <h3
                  className="font-display text-[14px] leading-[1.2] md:mt-3 md:text-[24px]"
                  style={{ color: "var(--color-warm-cream)", letterSpacing: "-0.01em" }}
                >
                  {item.format}
                </h3>

                <div className="mt-2 hidden h-[2px] w-20 md:block" style={{ backgroundColor: "var(--color-accent)" }} />

                <p className="mt-5 hidden text-[15px] leading-[1.5] md:block" style={{ color: "var(--color-warm-cream)" }}>
                  {item.result}
                </p>
              </motion.button>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.15} className="mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: easeApple }}
              className="p-[28px] md:p-[40px]"
              style={{
                borderRadius: "var(--radius-cards)",
                border: "1px solid var(--color-accent)",
                background: "linear-gradient(160deg, rgba(178,51,71,0.12) 0%, rgba(178,51,71,0) 55%)",
              }}
            >
              <h3
                className="font-display text-[22px] md:text-[26px]"
                style={{ color: "var(--color-warm-cream)", letterSpacing: "-0.01em" }}
              >
                {current.detailsTitle}
              </h3>

              <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
                {current.details.map((d) => (
                  <div
                    key={d.label}
                    className="pb-6"
                    style={{ borderBottom: "1px solid var(--color-walnut)" }}
                  >
                    <div className="text-[13px]" style={{ color: "var(--color-driftwood)" }}>
                      {d.label}
                    </div>
                    <div
                      className="mt-1 text-[16px]"
                      style={{ color: "var(--color-warm-cream)", fontWeight: 500 }}
                    >
                      {d.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
