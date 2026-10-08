"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LanguageSwitcherProps {
  className?: string;
  variant?: "pill" | "button";
}

export function LanguageSwitcher({
  className,
  variant = "pill",
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = React.useTransition();
  const [selectedLocale, setSelectedLocale] = React.useState<string | null>(null);

  if (selectedLocale !== null && selectedLocale === locale) {
    setSelectedLocale(null);
  }

  const currentLocale = selectedLocale ?? locale;

  const handleLocaleChange = (nextLocale: "id" | "en") => {
    if (nextLocale === currentLocale) return;
    setSelectedLocale(nextLocale);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  if (variant === "button") {
    const nextLocale = currentLocale === "id" ? "en" : "id";
    return (
      <button
        type="button"
        onClick={() => handleLocaleChange(nextLocale)}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-(--radius-md) border border-border bg-background hover:bg-muted text-foreground transition-colors cursor-pointer",
          className
        )}
        aria-label={`Change language to ${nextLocale.toUpperCase()}`}
        title={`Switch to ${nextLocale === "id" ? "Bahasa Indonesia" : "English"}`}
      >
        <Globe className="h-3.5 w-3.5 text-primary" />
        <span>{currentLocale.toUpperCase()}</span>
      </button>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center p-0.5 rounded-full bg-muted/70 border border-border text-xs font-semibold select-none",
        className
      )}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => handleLocaleChange("id")}
        className={cn(
          "px-2.5 py-1 rounded-full transition-all duration-150 text-xs font-medium cursor-pointer",
          currentLocale === "id"
            ? "bg-background text-primary font-semibold shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-pressed={currentLocale === "id"}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => handleLocaleChange("en")}
        className={cn(
          "px-2.5 py-1 rounded-full transition-all duration-150 text-xs font-medium cursor-pointer",
          currentLocale === "en"
            ? "bg-background text-primary font-semibold shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-pressed={currentLocale === "en"}
      >
        EN
      </button>
    </div>
  );
}
