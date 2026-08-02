"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { LocaleSwitch } from "./LocaleSwitch";
import { Logo } from "./Logo";

const links = [
  { href: "#about", key: "about" },
  { href: "#work", key: "work" },
  { href: "#services", key: "services" },
  { href: "#process", key: "process" },
  { href: "#faq", key: "faq" },
] as const;

export function Nav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? "var(--color-espresso)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--color-walnut)" : "1px solid transparent",
      }}
    >
      <div className="container-page flex items-center justify-between py-5">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a key={link.key} href={link.href} className="nav-pill">
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitch />
          <a href="#contact" className="btn-ghost">
            {t("cta")}
          </a>
        </div>

        <button
          aria-label={open ? t("close") : t("menu")}
          onClick={() => setOpen((v) => !v)}
          className="rounded-[var(--radius-buttons)] px-4 py-2 text-sm md:hidden"
          style={{ border: "1px solid var(--color-warm-cream)", color: "var(--color-warm-cream)" }}
        >
          {open ? t("close") : `${t("menu")} ≡`}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden md:hidden"
            style={{ backgroundColor: "var(--color-espresso)", borderTop: "1px solid var(--color-walnut)" }}
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {links.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="nav-pill"
                >
                  {t(link.key)}
                </a>
              ))}
              <div className="mt-3 flex items-center justify-between">
                <LocaleSwitch />
                <a href="#contact" onClick={() => setOpen(false)} className="btn-ghost">
                  {t("cta")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
