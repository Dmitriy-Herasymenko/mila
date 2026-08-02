"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Reveal } from "./Reveal";

type ServiceItem = { title: string; description: string };

const easeApple = [0.16, 1, 0.3, 1] as const;

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="section-gap" style={{ backgroundColor: "var(--color-espresso)" }}>
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
            <p className="mt-4 text-[17px]" style={{ color: "var(--color-warm-cream)" }}>
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12">
          {/* breadcrumb-style trail */}
          <nav aria-label="Services" className="flex flex-wrap items-center gap-x-1 gap-y-3">
            {items.map((item, i) => (
              <div key={item.title} className="flex items-center gap-1">
                <button
                  onClick={() => setActive(i)}
                  className="rounded-[var(--radius-buttons)] px-3 py-2 text-[16px] transition-colors"
                  style={{
                    backgroundColor: active === i ? "var(--color-accent)" : "transparent",
                    color: active === i ? "var(--color-espresso)" : "var(--color-warm-cream)",
                    fontWeight: active === i ? 500 : 400,
                  }}
                >
                  <span style={{ color: active === i ? "rgba(35,24,21,0.65)" : "var(--color-driftwood)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>{" "}
                  {item.title}
                </button>
                {i < items.length - 1 && (
                  <span aria-hidden style={{ color: "var(--color-driftwood)" }}>
                    /
                  </span>
                )}
              </div>
            ))}
          </nav>

          <div
            className="mt-6"
            style={{ height: 2, backgroundColor: "var(--color-midnight-cocoa)" }}
          >
            <motion.div
              className="h-full"
              style={{ backgroundColor: "var(--color-warm-cream)" }}
              animate={{ width: `${((active + 1) / items.length) * 100}%` }}
              transition={{ duration: 0.4, ease: easeApple }}
            />
          </div>

          <div className="relative mt-8 min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: easeApple }}
                className="p-[24px]"
                style={{ backgroundColor: "var(--color-midnight-cocoa)", borderRadius: "var(--radius-cards)" }}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <h3
                    className="text-[24px]"
                    style={{ color: "var(--color-warm-cream)", fontWeight: 500 }}
                  >
                    {items[active].title}
                  </h3>
                  <span className="text-[14px] shrink-0" style={{ color: "var(--color-driftwood)" }}>
                    {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                </div>
                <p
                  className="mt-4 max-w-2xl text-[17px] leading-[1.5]"
                  style={{ color: "var(--color-warm-cream)" }}
                >
                  {items[active].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
