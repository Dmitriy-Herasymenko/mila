import { setRequestLocale } from "next-intl/server";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Process } from "@/components/Process";
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
      <About />
      <Stats />
      <Work />
      <Services />
      <Process />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
