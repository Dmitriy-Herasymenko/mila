import { setRequestLocale } from "next-intl/server";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Fit } from "@/components/Fit";
import { Footer } from "@/components/Footer";
import { Formats } from "@/components/Formats";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Process } from "@/components/Process";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { Work } from "@/components/Work";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="top">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Stats />
      <Work />
      <Services />
      <Fit />
      <Formats />
      <Process />
      <Faq />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
