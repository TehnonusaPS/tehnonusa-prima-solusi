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
        "h-9 inline-flex items-center p-0.5 rounded-full bg-surface/80 border border-border/80 text-xs font-medium select-none shadow-2xs",
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
          "h-full px-2.5 rounded-full transition-all duration-200 text-xs font-semibold flex items-center justify-center cursor-pointer",
          locale === "id"
            ? "bg-primary text-primary-foreground shadow-2xs"
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
          "h-full px-2.5 rounded-full transition-all duration-200 text-xs font-semibold flex items-center justify-center cursor-pointer",
          locale === "en"
            ? "bg-primary text-primary-foreground shadow-2xs"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
