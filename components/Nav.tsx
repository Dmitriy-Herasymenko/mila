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

        <div className="hidden items-center gap-4 md:ml-auto md:flex">
          <nav className="flex items-center gap-1">
            {links.map((link) => (
              <a key={link.key} href={link.href} className="nav-pill">
                {t(link.key)}
              </a>
            ))}
          </nav>

          <span aria-hidden style={{ color: "var(--color-walnut)" }}>
            |
          </span>

          <LocaleSwitch />
        </div>

        <button
          aria-label={open ? t("close") : t("menu")}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full md:hidden"
          style={{ color: "var(--color-warm-cream)" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <motion.line
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              initial={false}
              animate={open ? { x1: 3, y1: 3, x2: 15, y2: 15 } : { x1: 2, y1: 5, x2: 16, y2: 5 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.line
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              initial={false}
              animate={open ? { x1: 3, y1: 15, x2: 15, y2: 3 } : { x1: 2, y1: 13, x2: 16, y2: 13 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
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
            <div className="container-page flex flex-col items-center gap-1 py-4 text-center">
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
              <div
                className="mt-3 w-full"
                style={{ borderTop: "1px solid var(--color-walnut)" }}
              />
              <div className="flex items-center justify-center pt-3">
                <LocaleSwitch />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
