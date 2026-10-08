import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { ServicesSection } from "@/components/sections/services/services-section";
import { TechSection } from "@/components/sections/tech/tech-section";
import { ProcessSection } from "@/components/sections/process/process-section";
import { PortfolioSection } from "@/components/sections/portfolio/portfolio-section";
import { TestimonialsSection } from "@/components/sections/testimonials/testimonials-section";
import { FaqSection } from "@/components/sections/faq/faq-section";
import { CtaSection } from "@/components/sections/cta/cta-section";
import { Footer } from "@/components/layout/footer";

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
      <Suspense fallback={null}>
        {/* 1. Production Hero Section */}
        <HeroSection />

        {/* 2. Production Services Section */}
        <ServicesSection />

        {/* 3. Production Trust & Technology Expertise Section */}
        <TechSection />

        {/* 4. Production Process / Workflow Section */}
        <ProcessSection />

        {/* 5. Production Portfolio / Case Studies Section */}
        <PortfolioSection />

        {/* 6. Production Testimonials Section */}
        <TestimonialsSection />

        {/* 7. Production FAQ Section */}
        <FaqSection />

        {/* 8. Production Conversion CTA & Contact Section */}
        <CtaSection />

        {/* 9. Production Footer */}
        <Footer />
      </Suspense>
    </main>
  );
}
