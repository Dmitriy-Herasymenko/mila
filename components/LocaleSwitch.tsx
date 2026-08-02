"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const otherLocale = routing.locales.find((loc) => loc !== locale) ?? locale;

  return (
    <button
      onClick={() => router.replace(pathname, { locale: otherLocale })}
      className={`inline-flex items-center gap-1 rounded-[var(--radius-buttons)] px-3 py-2 text-sm ${className ?? ""}`}
      style={{
        border: "1px solid var(--color-warm-cream)",
        color: "var(--color-warm-cream)",
        backgroundColor: "var(--color-espresso)",
      }}
      aria-label={`Switch language to ${otherLocale.toUpperCase()}`}
    >
      {locale.toUpperCase()} <span aria-hidden>▾</span>
    </button>
  );
}
