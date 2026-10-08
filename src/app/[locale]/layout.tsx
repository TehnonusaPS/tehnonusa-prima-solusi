import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LocaleHtmlSync } from "@/components/layout/locale-html-sync";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });

  const baseUrl = "https://tehnonusa.com";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t("title"),
      template: "%s | PT Tehnonusa Prima Solusi",
    },
    description: t("description"),
    keywords: [
      "PT Tehnonusa Prima Solusi",
      "Software Engineering Indonesia",
      "Enterprise Web Systems",
      "Mobile App Development",
      "Custom Software Development",
      "Digital Transformation",
      "Cloud Architecture",
      "Jasa Pembuatan Aplikasi",
      "Konsultan IT Tangerang Selatan",
    ],
    authors: [{ name: "PT Tehnonusa Prima Solusi" }],
    creator: "PT Tehnonusa Prima Solusi",
    icons: {
      icon: "/images/logo/logo-icon.png",
      apple: "/images/logo/logo-icon.png",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        id: `${baseUrl}/id`,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}/${locale}`,
      siteName: "PT Tehnonusa Prima Solusi",
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      images: [
        {
          url: "/images/hero-tech.jpg",
          width: 1200,
          height: 630,
          alt: "PT Tehnonusa Prima Solusi — Enterprise Software Engineering",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/hero-tech.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const instant = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: "PT. Tehnonusa Prima Solusi",
    alternateName: "Tehnonusa",
    url: "https://tehnonusa.com",
    logo: "https://tehnonusa.com/images/logo/logo.png",
    image: "https://tehnonusa.com/images/hero-tech.jpg",
    description:
      "Penyedia solusi rekayasa perangkat lunak enterprise, aplikasi mobile performa tinggi, dan transformasi digital.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Bima II Blok CF 5 No. 5 Villa Pamulang",
      addressLocality: "Tangerang Selatan",
      addressRegion: "Banten",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-813-1902-7707",
      contactType: "customer service",
      email: "contact@tehnonusa.com",
      areaServed: "ID",
      availableLanguage: ["Indonesian", "English"],
    },
    sameAs: [
      "https://linkedin.com/company/tehnonusa-prima-solusi",
      "https://github.com/tehnonusa",
      "https://instagram.com/tehnonusa",
    ],
  };

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocaleHtmlSync locale={locale} />
      <Navbar />
      <div className="flex-1 flex flex-col">{children}</div>
    </NextIntlClientProvider>
  );
}
