"use client";

import { useTranslations } from "next-intl";
import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "var(--color-wine)" }}>
      <div
        className="container-page flex flex-col items-center justify-between gap-4 py-10 text-center md:flex-row md:text-left"
        style={{ borderTop: "1px solid rgba(245,239,198,0.15)" }}
      >
        <Logo className="text-[16px]" color="var(--color-warm-cream)" />
        <div className="text-[12px]" style={{ color: "var(--color-driftwood)" }}>
          © {year} Mila Patramanska. {t("rights")}
        </div>
        <a href="#top" className="text-[14px]" style={{ color: "var(--color-warm-cream)" }}>
          {t("backToTop")}
        </a>
      </div>
      <div className="container-page pb-8">
        <p className="text-[12px]" style={{ color: "var(--color-driftwood)" }}>
          {t("disclaimer")}
        </p>
      </div>
    </footer>
  );
}
