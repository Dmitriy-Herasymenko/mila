"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Reveal } from "./Reveal";

export function About() {
  const t = useTranslations("about");
  const paragraphs = (t.raw("paragraphs") as string[] | undefined) ?? [];

  return (
    <section id="about" className="section-gap" style={{ backgroundColor: "var(--color-espresso)" }}>
      <div className="container-page grid grid-cols-1 gap-16 md:grid-cols-[1fr_1fr] md:items-start">
        <Reveal>
          <div
            className="relative aspect-[4/5] w-full max-w-md overflow-hidden"
            style={{ border: "1px solid var(--color-walnut)", borderRadius: "var(--radius-cards)" }}
          >
            <Image
              src={t("image")}
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
              className="font-display text-[28px] md:text-[35px]"
              style={{ color: "var(--color-warm-cream)", letterSpacing: "-0.02em" }}
            >
              {t("title")}
            </h2>
          </Reveal>

          <div className="mt-12 space-y-4">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 + i * 0.05}>
                <p className="text-[17px]" style={{ color: "var(--color-warm-cream)" }}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
