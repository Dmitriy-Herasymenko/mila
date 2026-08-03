"use client";

import { useTranslations } from "next-intl";
import { Reveal, RevealGroup, revealItem } from "./Reveal";
import { motion } from "framer-motion";

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M2.5 7.5L5.5 10.5L11.5 3.5"
        stroke="var(--color-accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 3L11 11M11 3L3 11"
        stroke="var(--color-driftwood)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Fit() {
  const t = useTranslations("fit");
  const fitItems = (t.raw("fitItems") as string[] | undefined) ?? [];
  const notFitItems = (t.raw("notFitItems") as string[] | undefined) ?? [];

  return (
    <section className="section-gap" style={{ backgroundColor: "var(--color-midnight-cocoa)" }}>
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

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="hairline-card p-[24px]">
            <span className="text-[14px]" style={{ color: "var(--color-accent)", fontWeight: 500 }}>
              {t("fitLabel")}
            </span>
            <RevealGroup className="mt-4 flex flex-col gap-3" stagger={0.05}>
              {fitItems.map((item) => (
                <motion.div
                  key={item}
                  variants={revealItem}
                  className="flex items-start gap-3 text-[15px]"
                  style={{ color: "var(--color-warm-cream)" }}
                >
                  <span className="mt-1 shrink-0">
                    <CheckIcon />
                  </span>
                  {item}
                </motion.div>
              ))}
            </RevealGroup>
          </div>

          <div className="hairline-card p-[24px]">
            <span className="text-[14px]" style={{ color: "var(--color-driftwood)", fontWeight: 500 }}>
              {t("notFitLabel")}
            </span>
            <RevealGroup className="mt-4 flex flex-col gap-3" stagger={0.05}>
              {notFitItems.map((item) => (
                <motion.div
                  key={item}
                  variants={revealItem}
                  className="flex items-start gap-3 text-[15px]"
                  style={{ color: "var(--color-driftwood)" }}
                >
                  <span className="mt-1 shrink-0">
                    <CrossIcon />
                  </span>
                  {item}
                </motion.div>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
