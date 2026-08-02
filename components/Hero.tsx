"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const easeApple = [0.16, 1, 0.3, 1] as const;

function ArrowIconCircle() {
  return (
    <span
      aria-hidden
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: "var(--color-accent)" }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M4 12L12 4M12 4H5M12 4V11"
          stroke="var(--color-espresso)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative" style={{ backgroundColor: "var(--color-espresso)" }}>
      <div className="container-page grid grid-cols-1 items-center gap-12 pb-16 pt-32 md:pb-24 md:pt-40 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeApple }}
            className="font-display text-[40px] leading-[1.02] sm:text-[55px] md:text-[73px]"
            style={{ color: "var(--color-warm-cream)", letterSpacing: "-0.03em", maxWidth: 680 }}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: easeApple }}
            className="mt-6 max-w-[440px] text-[16px]"
            style={{ color: "var(--color-driftwood)" }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: easeApple }}
            className="hairline-card mt-6 inline-flex items-center gap-3 px-4 py-3"
          >
            <span className="text-[14px]" style={{ fontWeight: 500, color: "var(--color-warm-cream)" }}>
              {t("bannerLabel")}
            </span>
            <span className="text-[14px]" style={{ color: "var(--color-driftwood)" }}>
              {t("bannerValue")}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: easeApple }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a href="#contact" className="btn-primary">
              {t("ctaPrimary")}
            </a>
            <ArrowIconCircle />
            <a href="#work" className="btn-ghost">
              {t("ctaSecondary")}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeApple }}
          className="relative aspect-[4/5] w-full overflow-hidden"
          style={{ border: "1px solid var(--color-walnut)", borderRadius: "var(--radius-cards)" }}
        >
          <Image
            src="/mila-patramanska.jpg"
            alt="Mila Patramanska"
            fill
            priority
            sizes="(min-width: 1024px) 480px, 100vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
