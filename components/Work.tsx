"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useState } from "react";
import { Reveal } from "./Reveal";

type CaseItem = {
  tag: string;
  title: string;
  description: string;
  metric: string;
  image: string;
};

export function Work() {
  const t = useTranslations("work");
  const items = t.raw("items") as CaseItem[];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function scrollToIndex(next: number) {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(items.length - 1, next));
    const card = el.children[clamped] as HTMLElement | undefined;
    if (card) {
      el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    }
    setIndex(clamped);
  }

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    let closest = 0;
    let minDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const dist = Math.abs((child as HTMLElement).offsetLeft - el.scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setIndex(closest);
  }

  return (
    <section id="work" className="section-gap" style={{ backgroundColor: "var(--color-espresso)" }}>
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
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

          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <button
                aria-label="Previous"
                onClick={() => scrollToIndex(index - 1)}
                disabled={index === 0}
                className="flex h-11 w-11 items-center justify-center rounded-full text-lg disabled:opacity-30"
                style={{ border: "1px solid var(--color-warm-cream)", color: "var(--color-warm-cream)" }}
              >
                ←
              </button>
              <button
                aria-label="Next"
                onClick={() => scrollToIndex(index + 1)}
                disabled={index === items.length - 1}
                className="flex h-11 w-11 items-center justify-center rounded-full text-lg disabled:opacity-30"
                style={{ border: "1px solid var(--color-warm-cream)", color: "var(--color-warm-cream)" }}
              >
                →
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div
            ref={scrollerRef}
            onScroll={handleScroll}
            className="scrollbar-hide flex gap-[24px] overflow-x-auto pb-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {items.map((item) => (
              <motion.article
                key={item.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-[80%] shrink-0 overflow-hidden sm:w-[360px]"
                style={{
                  border: "1px solid var(--color-walnut)",
                  borderRadius: "var(--radius-cards)",
                  scrollSnapAlign: "start",
                }}
              >
                <div className="relative aspect-[4/3] w-full" style={{ backgroundColor: "var(--color-driftwood)" }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 640px) 360px, 80vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-[16px]">
                  <span className="text-[14px]" style={{ color: "var(--color-warm-cream)", fontWeight: 500 }}>
                    {item.tag}
                  </span>
                  <h3
                    className="mt-3 text-[20px] leading-tight"
                    style={{ color: "var(--color-warm-cream)", fontWeight: 500 }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[16px]" style={{ color: "var(--color-warm-cream)" }}>
                    {item.description}
                  </p>
                  <div
                    className="font-display mt-5 text-[24px]"
                    style={{ color: "var(--color-warm-cream)" }}
                  >
                    {item.metric}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 flex justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.title}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? 24 : 8,
                backgroundColor: "var(--color-warm-cream)",
                opacity: i === index ? 1 : 0.25,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
