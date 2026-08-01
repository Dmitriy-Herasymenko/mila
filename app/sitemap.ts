import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const siteUrl = "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
  }));
}
