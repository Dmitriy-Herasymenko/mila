"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Counter } from "./Counter";
import { Reveal, RevealGroup, revealItem } from "./Reveal";

type StatItem = { value: string; suffix: string; label: string };

export function Stats() {
  const t = useTranslations("stats");
  const items = t.raw("items") as StatItem[];

  return (
    <section className="section-gap" style={{ backgroundColor: "var(--color-fog-gray)" }}>
      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal>
            <h2
              className="font-display text-[32px] md:text-[42px]"
              style={{ color: "var(--color-ink-black)" }}
            >
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 text-[17px]" style={{ color: "var(--color-ink-black)" }}>
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4" stagger={0.1}>
          {items.map((item, i) => {
            const isFeatured = i === items.length - 1;
            return (
              <motion.div
                key={item.label}
                variants={revealItem}
                className="bg-[var(--color-paper-white)] p-[16px]"
                style={{ borderRadius: "var(--radius-cards)" }}
              >
                <div
                  className="font-display inline-block text-[36px] md:text-[42px]"
                  style={{
                    color: isFeatured ? "#ffffff" : "var(--color-ink-black)",
                    backgroundColor: isFeatured ? "var(--color-accent)" : "transparent",
                    borderRadius: isFeatured ? "6px" : undefined,
                    padding: isFeatured ? "0 6px" : undefined,
                  }}
                >
                  <Counter value={item.value} suffix={item.suffix} />
                </div>
                <div className="mt-2 text-[14px]" style={{ color: "var(--color-ash-gray)" }}>
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
