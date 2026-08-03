"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Reveal, RevealGroup, revealItem } from "./Reveal";

type FaqItem = { question: string; answer: string };

export function Faq() {
  const t = useTranslations("faq");
  const items = (t.raw("items") as FaqItem[] | undefined) ?? [];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-gap" style={{ backgroundColor: "var(--color-warm-cream)" }}>
      <div className="container-page max-w-3xl">
        <div>
          <Reveal>
            <h2
              className="font-display text-[28px] md:text-[35px]"
              style={{ color: "var(--color-espresso)", letterSpacing: "-0.02em" }}
            >
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 text-[16px]" style={{ color: "var(--color-espresso)", opacity: 0.65 }}>
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-10 flex flex-col" stagger={0.05}>
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.question}
                variants={revealItem}
                style={{ borderBottom: "1px solid var(--color-walnut)" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-[14px] text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[17px]" style={{ color: "var(--color-espresso)", fontWeight: 500 }}>
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0 text-xl"
                    style={{ color: "var(--color-espresso)" }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-[14px] text-[16px]" style={{ color: "var(--color-espresso)", opacity: 0.7 }}>
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
