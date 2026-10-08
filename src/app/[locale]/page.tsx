import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("hero");

  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-dvh">
      <div className="text-center px-4">
        <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
          PT Tehnonusa Prima Solusi
        </p>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {t("title")}
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">{t("description")}</p>
        <p className="mt-8 text-xs text-muted-foreground">
          🚧 Landing page sedang dalam pembangunan — Task 01 selesai
        </p>
      </div>
    </main>
  );
}
