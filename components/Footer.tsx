"use client";

import { useTranslations } from "next-intl";
import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "var(--color-paper-white)" }}>
      <div
        className="container-page flex flex-col items-center justify-between gap-4 py-10 text-center md:flex-row md:text-left"
        style={{ borderTop: "1px solid var(--color-fog-gray)" }}
      >
        <Logo className="text-[16px]" />
        <div className="text-[14px]" style={{ color: "var(--color-ash-gray)" }}>
          © {year} Mila Patramanska. {t("rights")}
        </div>
        <a href="#top" className="text-[14px]" style={{ color: "var(--color-ink-black)" }}>
          {t("backToTop")}
        </a>
      </div>
      <div className="container-page pb-8">
        <p className="text-[14px]" style={{ color: "var(--color-ash-gray)" }}>
          {t("disclaimer")}
        </p>
      </div>
    </footer>
  );
}
