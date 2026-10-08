import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { ServicesSection } from "@/components/sections/services/services-section";
import { TechSection } from "@/components/sections/tech/tech-section";
import { ProcessSection } from "@/components/sections/process/process-section";

type Props = {
  params: Promise<{ locale: string }>;
};

export const instant = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      {/* Production Hero Section (Task 03) */}
      <HeroSection />

      {/* Production Services Section (Task 04) */}
      <ServicesSection />

      {/* Production Trust & Technology Expertise Section (Task 05) */}
      <TechSection />

      {/* Production Process / Workflow Section (Task 06) */}
      <ProcessSection />
    </main>
  );
}
