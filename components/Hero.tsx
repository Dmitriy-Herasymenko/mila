"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const easeApple = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const t = useTranslations("hero");
  const image = t("image");

  return (
    <section
      className="relative flex min-h-[90vh] items-center overflow-hidden md:min-h-screen"
      style={{ backgroundColor: "var(--color-espresso)" }}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(35,24,21,0.55) 0%, rgba(35,24,21,0.75) 55%, rgba(35,24,21,0.92) 100%)",
          }}
        />
      </div>

      <div className="container-page relative flex flex-col items-center py-32 text-center md:py-40">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeApple }}
          className="font-display text-[40px] leading-[1.02] sm:text-[55px] md:text-[73px]"
          style={{ color: "var(--color-warm-cream)", letterSpacing: "-0.03em", maxWidth: 780 }}
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeApple }}
          className="mt-6 max-w-[480px] text-[16px]"
          style={{ color: "var(--color-driftwood)" }}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: easeApple }}
          className="mt-20 flex flex-wrap items-center justify-center gap-8"
        >
          <a href="#contact" className="btn-primary">
            {t("ctaPrimary")}
          </a>
          <a href="#work" className="btn-ghost">
            {t("ctaSecondary")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
