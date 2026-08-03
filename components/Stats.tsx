"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Counter } from "./Counter";
import { Reveal, RevealGroup, revealItem } from "./Reveal";

type StatItem = { value: string; suffix: string; label: string };

export function Stats() {
  const t = useTranslations("stats");
  const items = (t.raw("items") as StatItem[] | undefined) ?? [];

  return (
    <section className="py-24 md:py-36" style={{ backgroundColor: "var(--color-midnight-cocoa)" }}>
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
            <p className="mt-6 text-[17px]" style={{ color: "var(--color-warm-cream)" }}>
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4" stagger={0.1}>
          {items.map((item, i) => {
            const isFeatured = i === items.length - 1;
            return (
              <motion.div key={item.label} variants={revealItem} className="hairline-card p-[24px]">
                <div
                  className="font-display inline-block text-[36px] md:text-[42px]"
                  style={{
                    color: "var(--color-warm-cream)",
                    backgroundColor: isFeatured ? "var(--color-accent)" : "transparent",
                    borderRadius: isFeatured ? "6px" : undefined,
                    padding: isFeatured ? "0 6px" : undefined,
                  }}
                >
                  <Counter value={item.value} suffix={item.suffix} />
                </div>
                <div className="mt-4 text-[14px]" style={{ color: "var(--color-driftwood)" }}>
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
