"use client";

import * as React from "react";
import { motion } from "motion/react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LanguageSwitcherProps {
  className?: string;
}

const TOGGLE_CLASSES =
  "text-[11px] sm:text-xs font-semibold flex items-center gap-1 px-2.5 py-1 transition-colors relative z-10 cursor-pointer select-none outline-none";

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = React.useTransition();
  const [selectedLocale, setSelectedLocale] = React.useState<"id" | "en" | null>(null);

  if (selectedLocale !== null && selectedLocale === locale) {
    setSelectedLocale(null);
  }

  const currentLocale = selectedLocale ?? (locale === "en" ? "en" : "id");

  const handleSelect = (nextLocale: "id" | "en") => {
    if (nextLocale === currentLocale) return;

    // 1. Instant spring slide
    setSelectedLocale(nextLocale);

    // 2. Sync cookie immediately on client so subsequent loads are consistent
    try {
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore if SSR or restricted
    }

    // 3. Smooth router transition with scroll: false to prevent jumping
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    });
  };

  return (
    <div
      className={cn(
        "relative flex w-fit items-center rounded-full p-0.5 bg-muted/80 border border-border/80 shadow-2xs select-none",
        className
      )}
      role="group"
      aria-label="Language selection"
    >
      {/* Option ID */}
      <button
        type="button"
        aria-pressed={currentLocale === "id"}
        className={cn(
          TOGGLE_CLASSES,
          currentLocale === "id"
            ? "text-primary-foreground font-bold"
            : "text-muted-foreground hover:text-foreground"
        )}
        onClick={() => handleSelect("id")}
      >
        <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 relative z-10" />
        <span className="relative z-10">ID</span>
      </button>

      {/* Option EN */}
      <button
        type="button"
        aria-pressed={currentLocale === "en"}
        className={cn(
          TOGGLE_CLASSES,
          currentLocale === "en"
            ? "text-primary-foreground font-bold"
            : "text-muted-foreground hover:text-foreground"
        )}
        onClick={() => handleSelect("en")}
      >
        <span className="relative z-10">EN</span>
      </button>

      {/* Spring Animated Sliding Pill */}
      <div
        className={cn(
          "absolute inset-0.5 z-0 flex",
          currentLocale === "en" ? "justify-end" : "justify-start"
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 18, stiffness: 280 }}
          className="h-full w-1/2 rounded-full bg-primary shadow-xs"
        />
      </div>
    </div>
  );
}

export default LanguageSwitcher;
