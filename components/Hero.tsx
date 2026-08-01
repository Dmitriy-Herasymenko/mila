"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const easeApple = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative" style={{ backgroundColor: "var(--color-paper-white)" }}>
      <div className="container-page grid grid-cols-1 items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeApple }}
            className="font-display text-[42px]"
            style={{ color: "var(--color-ink-black)", maxWidth: 620 }}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: easeApple }}
            className="mt-6 max-w-[480px] text-[17px]"
            style={{ color: "var(--color-ink-black)", letterSpacing: "-0.004em" }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: easeApple }}
            className="mt-6 inline-flex items-center gap-3 rounded-[var(--radius-cards)] px-4 py-3"
            style={{ backgroundColor: "var(--color-fog-gray)" }}
          >
            <span className="text-[16px]" style={{ fontWeight: 500, color: "var(--color-ink-black)" }}>
              {t("bannerLabel")}
            </span>
            <span className="text-[16px]" style={{ color: "var(--color-ink-black)" }}>
              {t("bannerValue")}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: easeApple }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#contact" className="btn-primary">
              {t("ctaPrimary")}
            </a>
            <a href="#work" className="btn-ghost" style={{ border: "none" }}>
              {t("ctaSecondary")}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeApple }}
          className="relative aspect-[4/5] w-full overflow-hidden"
          style={{ backgroundColor: "var(--color-fog-gray)", borderRadius: "var(--radius-cards)" }}
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
