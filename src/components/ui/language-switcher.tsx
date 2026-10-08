"use client";

import * as React from "react";
import { motion } from "motion/react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface LanguageSwitcherProps {
  className?: string;
}

const TOGGLE_CLASSES =
  "text-[11px] sm:text-xs font-semibold flex items-center justify-center px-2.5 py-1 transition-colors relative z-10 cursor-pointer select-none outline-none";

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const activeLocale = useLocale() === "en" ? "en" : "id";
  const router = useRouter();
  const rawPathname = usePathname();
  const [, startTransition] = React.useTransition();

  // React 19 official primitive for instant zero-latency UI updates during async transitions
  const [currentLocale, setOptimisticLocale] = React.useOptimistic(
    activeLocale,
    (_current, next: "id" | "en") => next
  );

  const handleSelect = (nextLocale: "id" | "en") => {
    if (nextLocale === currentLocale) return;

    // 1. Set next-intl cookie immediately on client
    try {
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore if SSR or restricted
    }

    // 2. Compute clean target path without redundant 307 redirect
    let cleanPath = rawPathname || "/";
    if (cleanPath.startsWith("/en")) {
      cleanPath = cleanPath.slice(3) || "/";
    } else if (cleanPath.startsWith("/id")) {
      cleanPath = cleanPath.slice(3) || "/";
    }

    const targetPath =
      nextLocale === "en"
        ? cleanPath === "/"
          ? "/en"
          : `/en${cleanPath}`
        : cleanPath;

    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const fullTarget = `${targetPath}${hash}`;

    // 3. React 19 transition: optimistic pill slide happens instantly, router navigates seamlessly
    startTransition(() => {
      setOptimisticLocale(nextLocale);
      router.replace(fullTarget, { scroll: false });
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
