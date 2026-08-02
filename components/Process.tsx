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
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[16px]"
        style={{ border: "1px solid var(--color-walnut)", color: "var(--color-warm-cream)", fontWeight: 500 }}
      >
        {step.number}
      </div>

      <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.25, ease: easeApple }} className="hairline-card w-full p-[24px]">
        <h3 className="text-[20px]" style={{ color: "var(--color-warm-cream)", fontWeight: 500 }}>
          {step.title}
        </h3>
        <p className="mt-3 text-[16px] leading-[1.4]" style={{ color: "var(--color-driftwood)" }}>
          {step.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

function RingFiller({ align }: { align: "left" | "right" }) {
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
      <div className="h-[170px] w-[170px] rounded-full" style={{ border: "1px solid var(--color-walnut)" }} />
      <div
        className="absolute h-[80px] w-[80px] rounded-full"
        style={{
          border: "1px solid var(--color-accent)",
          top: align === "left" ? "auto" : 8,
          bottom: align === "left" ? 8 : "auto",
          left: align === "left" ? "12%" : "auto",
          right: align === "left" ? "auto" : "12%",
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
          <RingFiller align="right" />
        </>
      ) : (
        <>
          <RingFiller align="left" />
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
      className="relative overflow-hidden pb-[40px] pt-[24px] md:pb-[52px] md:pt-[32px]"
      style={{ backgroundColor: "var(--color-midnight-cocoa)" }}
    >
      <div className="container-page relative">
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
