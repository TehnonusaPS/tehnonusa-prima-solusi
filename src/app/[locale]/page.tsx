import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/hero/hero-section";

type Props = {
  params: Promise<{ locale: string }>;
};

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
    </main>
  );
}
