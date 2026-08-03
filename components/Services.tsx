"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Reveal } from "./Reveal";

type ServiceItem = { title: string; description: string };

const easeApple = [0.16, 1, 0.3, 1] as const;

export function Services() {
  const t = useTranslations("services");
  const items = (t.raw("items") as ServiceItem[] | undefined) ?? [];
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

        <Reveal delay={0.1} className="mt-16 flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <nav aria-label="Services" className="relative flex flex-col md:w-[380px] md:shrink-0">
            {items.map((item, i) => {
              const isActive = active === i;
              return (
                <div key={item.title} style={{ borderBottom: i < items.length - 1 ? "1px solid var(--color-walnut)" : "none" }}>
                  <button
                    onClick={() => setActive(isActive ? active : i)}
                    aria-expanded={isActive}
                    className="group relative flex w-full items-center gap-5 py-5 pl-5 pr-2 text-left"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="services-indicator"
                        transition={{ duration: 0.35, ease: easeApple }}
                        className="absolute left-0 top-2 bottom-2 w-[2px]"
                        style={{ backgroundColor: "var(--color-accent)" }}
                      />
                    )}

                    <span
                      className="flex-1 text-[18px] transition-all duration-200 md:text-[21px]"
                      style={{
                        color: "var(--color-warm-cream)",
                        opacity: isActive ? 1 : 0.5,
                        fontWeight: isActive ? 500 : 400,
                      }}
                    >
                      {item.title}
                    </span>

                    <motion.span
                      aria-hidden
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: easeApple }}
                      className="text-[20px] md:hidden"
                      style={{ color: "var(--color-driftwood)" }}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: easeApple }}
                        className="overflow-hidden md:hidden"
                      >
                        <p
                          className="pb-5 pl-5 pr-2 text-[15px] leading-[1.6]"
                          style={{ color: "var(--color-driftwood)" }}
                        >
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="relative hidden min-h-[260px] md:block md:max-w-xl md:pt-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: easeApple }}
                className="relative"
              >
                <div className="relative">
                  <h3
                    className="text-[24px] md:text-[30px]"
                    style={{ color: "var(--color-warm-cream)", fontWeight: 500, letterSpacing: "-0.01em" }}
                  >
                    {items[active].title}
                  </h3>
                  <div className="mt-4 h-[2px] w-24" style={{ backgroundColor: "var(--color-accent)" }} />
                  <p
                    className="mt-6 max-w-xl text-[17px] leading-[1.6]"
                    style={{ color: "var(--color-warm-cream)" }}
                  >
                    {items[active].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
