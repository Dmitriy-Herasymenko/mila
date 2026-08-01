"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Reveal } from "./Reveal";

type Step = { number: string; title: string; description: string };

const easeApple = [0.16, 1, 0.3, 1] as const;

function StepCard({ step, align }: { step: Step; align: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: easeApple }}
      className={`relative flex flex-col gap-4 ${
        align === "left" ? "md:items-end md:text-right" : "md:items-start md:text-left"
      }`}
    >
      <div
        className="glass-orb flex h-11 w-11 shrink-0 items-center justify-center text-[16px]"
        style={{ color: "var(--color-ink-black)", fontWeight: 500 }}
      >
        {step.number}
      </div>

      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25, ease: easeApple }}
        className="glass-card w-full p-[24px]"
      >
        <h3 className="text-[20px]" style={{ color: "var(--color-ink-black)", fontWeight: 500 }}>
          {step.title}
        </h3>
        <p className="mt-3 text-[16px] leading-[1.4]" style={{ color: "var(--color-ink-black)" }}>
          {step.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

function GlassFiller({ align }: { align: "left" | "right" }) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: easeApple }}
      className={`relative hidden h-[220px] select-none md:flex md:items-center ${
        align === "left" ? "md:justify-end" : "md:justify-start"
      }`}
    >
      <div className="glass-orb h-[190px] w-[190px]" />
      <div
        className="glass-orb absolute h-[90px] w-[90px]"
        style={{
          top: align === "left" ? "auto" : 8,
          bottom: align === "left" ? 8 : "auto",
          left: align === "left" ? "10%" : "auto",
          right: align === "left" ? "auto" : "10%",
        }}
      />
    </motion.div>
  );
}

function StepRow({ step, index }: { step: Step; index: number }) {
  const isLeft = index % 2 === 0;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center md:gap-16">
      {isLeft ? (
        <>
          <StepCard step={step} align="left" />
          <GlassFiller align="right" />
        </>
      ) : (
        <>
          <GlassFiller align="left" />
          <StepCard step={step} align="right" />
        </>
      )}
    </div>
  );
}

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      className="relative overflow-hidden pb-[48px] pt-[24px] md:pb-[96px] md:pt-[32px]"
      style={{ backgroundColor: "var(--color-fog-gray)" }}
    >
      <div className="container-page relative">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="font-display text-[32px] md:text-[42px]" style={{ color: "var(--color-ink-black)" }}>
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 text-[17px]" style={{ color: "var(--color-ink-black)" }}>
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <div ref={sectionRef} className="relative mt-12">
          <div
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-[3px] -translate-x-1/2 rounded-full md:block"
            style={{ backgroundColor: "var(--color-ash-gray)", opacity: 0.35 }}
          >
            <motion.div
              className="w-full rounded-full"
              style={{
                height: lineHeight,
                background:
                  "linear-gradient(180deg, var(--color-ink-black) 0%, var(--color-accent) 50%, var(--color-ink-black) 100%)",
              }}
            />
          </div>

          <div className="flex flex-col gap-10 md:gap-16">
            {steps.map((step, i) => (
              <StepRow key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
