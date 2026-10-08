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
  const [isPending, startTransition] = React.useTransition();

  const handleLocaleChange = (nextLocale: "id" | "en") => {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  if (variant === "button") {
    const nextLocale = locale === "id" ? "en" : "id";
    return (
      <button
        type="button"
        disabled={isPending}
        onClick={() => handleLocaleChange(nextLocale)}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-(--radius-md) border border-border bg-background hover:bg-muted text-foreground transition-colors disabled:opacity-50",
          className
        )}
        aria-label={`Change language to ${nextLocale.toUpperCase()}`}
        title={`Switch to ${nextLocale === "id" ? "Bahasa Indonesia" : "English"}`}
      >
        <Globe className="h-3.5 w-3.5 text-primary" />
        <span>{locale.toUpperCase()}</span>
      </button>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center p-0.5 rounded-full bg-muted/70 border border-border text-xs font-semibold select-none",
        isPending && "opacity-60 pointer-events-none",
        className
      )}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => handleLocaleChange("id")}
        className={cn(
          "px-2.5 py-1 rounded-full transition-all duration-200 text-xs font-medium",
          locale === "id"
            ? "bg-background text-primary font-semibold shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-pressed={locale === "id"}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => handleLocaleChange("en")}
        className={cn(
          "px-2.5 py-1 rounded-full transition-all duration-200 text-xs font-medium",
          locale === "en"
            ? "bg-background text-primary font-semibold shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
