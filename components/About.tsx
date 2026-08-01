"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Reveal, RevealGroup, revealItem } from "./Reveal";

export function About() {
  const t = useTranslations("about");
  const paragraphs = t.raw("paragraphs") as string[];
  const highlights = t.raw("highlights") as { label: string; value: string }[];

  return (
    <section id="about" className="section-gap" style={{ backgroundColor: "var(--color-paper-white)" }}>
      <div className="container-page grid grid-cols-1 gap-16 md:grid-cols-[1fr_1fr] md:items-center">
        <Reveal>
          <div
            className="relative aspect-[4/5] w-full max-w-md overflow-hidden"
            style={{ backgroundColor: "var(--color-fog-gray)", borderRadius: "var(--radius-cards)" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80"
              alt={t("imageAlt")}
              fill
              sizes="(min-width: 768px) 448px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h2
              className="font-display text-[32px] md:text-[42px]"
              style={{ color: "var(--color-ink-black)" }}
            >
              {t("title")}
            </h2>
          </Reveal>

          <div className="mt-6 space-y-4">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 + i * 0.05}>
                <p className="text-[17px]" style={{ color: "var(--color-ink-black)" }}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <RevealGroup className="mt-8 grid grid-cols-2 gap-3">
            {highlights.map((h) => (
              <motion.div
                key={h.label}
                variants={revealItem}
                className="p-[16px]"
                style={{ backgroundColor: "var(--color-fog-gray)", borderRadius: "var(--radius-cards)" }}
              >
                <div className="text-[24px]" style={{ color: "var(--color-ink-black)", fontWeight: 500 }}>
                  {h.value}
                </div>
                <div className="mt-1 text-[14px]" style={{ color: "var(--color-ash-gray)" }}>
                  {h.label}
                </div>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
