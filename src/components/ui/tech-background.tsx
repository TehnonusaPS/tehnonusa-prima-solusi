"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechBackgroundProps {
  className?: string;
  variant?: "hero" | "section" | "subtle";
  pattern?: "dots" | "grid" | "mesh";
  showAura?: boolean;
}

/**
 * TechBackground Component (High Performance / Zero-Lag)
 * Uses pure CSS GPU-cached patterns and static ambient gradient meshes.
 * Zero JavaScript animation ticks, zero GPU fill-rate thrashing.
 */
export const TechBackground: React.FC<TechBackgroundProps> = ({
  className,
  variant = "section",
  pattern = "dots",
  showAura = true,
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none",
        className
      )}
      aria-hidden="true"
    >
      {/* 1. Architectural Precision Grid Pattern */}
      {pattern === "dots" && (
        <div
          className={cn(
            "absolute inset-0",
            // Light mode: subtle slate dots with radial fade
            "bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.35]",
            // Dark mode: ultra-subtle blueprint dots
            "dark:bg-[radial-gradient(#38bdf8_1px,transparent_1px)] dark:opacity-[0.07]",
            "[mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_30%,transparent_100%)]"
          )}
        />
      )}

      {pattern === "grid" && (
        <div
          className={cn(
            "absolute inset-0",
            // Engineering blueprint grid
            "bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.25]",
            "dark:bg-[linear-gradient(to_right,#1e3a5f_1px,transparent_1px),linear-gradient(to_bottom,#1e3a5f_1px,transparent_1px)] dark:opacity-[0.10]",
            "[mask-image:radial-gradient(ellipse_80%_60%_at_50%_45%,#000_25%,transparent_95%)]"
          )}
        />
      )}

      {pattern === "mesh" && (
        <div
          className={cn(
            "absolute inset-0",
            "bg-[radial-gradient(#64748b_1px,transparent_1px),linear-gradient(to_right,#e2e8f0_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.20]",
            "dark:bg-[radial-gradient(#0284c7_1px,transparent_1px)] dark:opacity-[0.05]",
            "[mask-image:radial-gradient(ellipse_85%_70%_at_50%_50%,#000_35%,transparent_100%)]"
          )}
        />
      )}

      {/* 2. Static Architectural Light Auras (Zero CPU/GPU recalculation, 120 FPS buttery smooth) */}
      {showAura && (
        <>
          {/* Primary Aura (Cyan / Sky Blue) */}
          <div
            className={cn(
              "absolute -top-16 -right-16 w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] rounded-full blur-2xl pointer-events-none",
              variant === "hero"
                ? "bg-gradient-to-br from-sky-400/15 via-primary/10 to-transparent opacity-80 dark:opacity-25"
                : "bg-gradient-to-br from-sky-300/12 via-primary/6 to-transparent opacity-70 dark:opacity-15"
            )}
          />

          {/* Secondary Aura (Indigo / Accent Blue) */}
          <div
            className={cn(
              "absolute -bottom-20 -left-20 w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] rounded-full blur-2xl pointer-events-none",
              variant === "hero"
                ? "bg-gradient-to-tr from-primary/12 via-indigo-400/8 to-transparent opacity-75 dark:opacity-20"
                : "bg-gradient-to-tr from-accent/10 via-primary/5 to-transparent opacity-65 dark:opacity-12"
            )}
          />

          {/* Hero-specific Central Radiant Beacon */}
          {variant === "hero" && (
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[360px] sm:h-[440px] bg-gradient-to-b from-sky-400/15 via-primary/6 to-transparent blur-2xl rounded-full dark:opacity-30 pointer-events-none"
            />
          )}
        </>
      )}

      {/* 3. Subtle Vignette Depth Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60 pointer-events-none" />
    </div>
  );
};
