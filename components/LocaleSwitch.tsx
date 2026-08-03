"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const FLAGS: Record<string, string> = {
  uk: "🇺🇦",
  en: "🇬🇧",
};

export function LocaleSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function selectLocale(loc: string) {
    setOpen(false);
    router.replace(pathname, { locale: loc });
  }

  return (
    <div ref={rootRef} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-2.5 rounded-[var(--radius-buttons)] px-5 py-3 text-lg cursor-pointer"
        style={{
          border: "none",
          color: "var(--color-warm-cream)",
          backgroundColor: "transparent",
        }}
      >
        <span aria-hidden>{FLAGS[locale]}</span>
        <motion.svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-[calc(100%+10px)] z-50 min-w-full overflow-hidden"
            style={{
              backgroundColor: "var(--color-espresso)",
              border: "1px solid var(--color-walnut)",
              borderRadius: "var(--radius-cards)",
            }}
          >
            {routing.locales.map((loc) => (
              <li key={loc} role="option" aria-selected={loc === locale}>
                <button
                  type="button"
                  onClick={() => selectLocale(loc)}
                  aria-label={loc.toUpperCase()}
                  className="flex w-full cursor-pointer items-center justify-center whitespace-nowrap px-7 py-4 text-xl transition-colors"
                  style={{
                    backgroundColor: loc === locale ? "var(--color-accent)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (loc !== locale) e.currentTarget.style.backgroundColor = "var(--color-midnight-cocoa)";
                  }}
                  onMouseLeave={(e) => {
                    if (loc !== locale) e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <span aria-hidden>{FLAGS[loc]}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
