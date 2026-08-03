"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, type ReactElement } from "react";
import { Reveal } from "./Reveal";

type Step = { number: string; title: string; description: string };

const easeApple = [0.16, 1, 0.3, 1] as const;

const STEP_ICONS: ((props: { color: string }) => ReactElement)[] = [
  // 01 — intro call / brief: speech bubbles
  ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 44 44" fill="none">
      <path
        d="M9 12h20a3 3 0 013 3v8a3 3 0 01-3 3H20l-6 5v-5h-5a3 3 0 01-3-3v-8a3 3 0 013-3z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="15" cy="19" r="1.6" fill={color} />
      <circle cx="21" cy="19" r="1.6" fill={color} />
      <circle cx="27" cy="19" r="1.6" fill={color} />
    </svg>
  ),
  // 02 — audit & strategy: magnifier over a chart
  ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 44 44" fill="none">
      <path d="M10 28V17M17 28v-8M24 28v-4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="26" cy="16" r="7" stroke={color} strokeWidth="2" />
      <path d="M31 21l4 4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  // 03 — launch & testing: rocket
  ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 44 44" fill="none">
      <path
        d="M22 8c5 3 7 8 7 14l-7 7-7-7c0-6 2-11 7-14z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="18" r="2.4" stroke={color} strokeWidth="2" />
      <path d="M17 26l-4 4M27 26l4 4M18 31l-1 4M26 31l1 4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  // 04 — optimization: upward trend
  ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 44 44" fill="none">
      <path d="M9 27l8-8 6 6 11-13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 12h7v7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // 05 — reporting & scale: bar chart
  ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 44 44" fill="none">
      <rect x="9" y="21" width="5" height="10" stroke={color} strokeWidth="2" />
      <rect x="19.5" y="15" width="5" height="16" stroke={color} strokeWidth="2" />
      <rect x="30" y="9" width="5" height="22" stroke={color} strokeWidth="2" />
    </svg>
  ),
];

function StepTitle({ step, index, align }: { step: Step; index: number; align: "left" | "right" }) {
  const Icon = STEP_ICONS[index % STEP_ICONS.length];
  const isLeft = align === "left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: easeApple }}
      className={`flex items-center gap-3 ${isLeft ? "md:order-1 md:flex-row-reverse" : "md:order-2"}`}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full md:h-11 md:w-11"
        style={{ border: "1px solid var(--color-walnut)" }}
      >
        <Icon color="var(--color-cerulean)" />
      </span>
      <h3
        className="font-display text-[19px] leading-[1.2] tracking-normal md:text-[26px] md:tracking-[-0.01em]"
        style={{ color: "var(--color-warm-cream)" }}
      >
        {step.title}
      </h3>
    </motion.div>
  );
}

function StepContent({ step, align }: { step: Step; align: "left" | "right" }) {
  const isLeft = align === "left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.1, ease: easeApple }}
      className={`flex ${isLeft ? "md:order-1 md:justify-end" : "md:order-2 md:justify-start"}`}
    >
      <div
        className="flex w-full max-w-sm items-center overflow-hidden border-0 border-[var(--color-walnut)] p-0 md:min-h-[140px] md:max-h-[180px] md:border md:p-[24px]"
        style={{ borderRadius: "var(--radius-cards)" }}
      >
        <p
          className="pl-[48px] text-[15px] leading-[1.6] md:line-clamp-5 md:pl-0 md:text-[16px]"
          style={{ color: "var(--color-driftwood)" }}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

function StepRow({ step, index }: { step: Step; index: number }) {
  const isLeft = index % 2 === 0;

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:items-center md:gap-16">
      <StepTitle step={step} index={index} align={isLeft ? "left" : "right"} />
      <StepContent step={step} align={isLeft ? "right" : "left"} />
    </div>
  );
}

export function Process() {
  const t = useTranslations("process");
  const steps = (t.raw("steps") as Step[] | undefined) ?? [];
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      className="relative overflow-hidden pb-[40px] pt-[24px] md:pb-[52px] md:pt-[32px]"
      style={{ backgroundColor: "var(--color-midnight-cocoa)" }}
    >
      <div className="container-page relative">
        <div className="max-w-2xl">
          <Reveal>
            <h2
              className="font-display text-[24px] leading-[1.15] tracking-normal sm:text-[28px] md:text-[35px] md:tracking-[-0.02em]"
              style={{ color: "var(--color-warm-cream)" }}
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

        <div ref={sectionRef} className="relative mt-12">
          <div
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-[1px] -translate-x-1/2 md:block"
            style={{ backgroundColor: "var(--color-walnut)" }}
          >
            <motion.div
              className="w-full"
              style={{ height: lineHeight, backgroundColor: "var(--color-accent)" }}
            />
          </div>

          <div className="flex flex-col gap-8 md:gap-16">
            {steps.map((step, i) => (
              <StepRow key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
