"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Reveal, RevealGroup, revealItem } from "./Reveal";

type FaqItem = { question: string; answer: string };

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-gap" style={{ backgroundColor: "var(--color-fog-gray)" }}>
      <div className="container-page max-w-3xl">
        <div>
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

        <RevealGroup className="mt-10 flex flex-col" stagger={0.05}>
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.question}
                variants={revealItem}
                className="overflow-hidden"
                style={{
                  backgroundColor: "var(--color-paper-white)",
                  borderRadius: "var(--radius-cards)",
                  marginBottom: 12,
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-[16px] py-[16px] text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[16px]" style={{ color: "var(--color-ink-black)", fontWeight: 500 }}>
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl"
                    style={{ border: "1px solid var(--color-ink-black)", color: "var(--color-ink-black)" }}
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
                      <p className="px-[16px] pb-[16px] text-[16px]" style={{ color: "var(--color-ink-black)" }}>
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
