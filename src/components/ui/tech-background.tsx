"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TechBackgroundProps {
  className?: string;
  variant?: "hero" | "section" | "subtle" | "spotlight";
  pattern?: "dots" | "grid" | "mesh" | "circuit" | "none";
  showAura?: boolean;
  showCrosshairs?: boolean;
}

/**
 * TechBackground Component (High Performance / Zero-Lag)
 * Uses pure CSS GPU-cached patterns and static ambient gradient meshes.
 * Guaranteed 100% crisp & rich in Light Mode, and pitch-perfect deep dark in Dark Mode.
 */
export const TechBackground: React.FC<TechBackgroundProps> = ({
  className,
  variant = "section",
  pattern = "dots",
  showAura = true,
  showCrosshairs = true,
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none",
        className
      )}
      aria-hidden="true"
    >
      {/* 1. Architectural Blueprint & Technical Patterns */}
      {pattern === "dots" && (
        <div
          className={cn(
            "absolute inset-0",
            // Light mode: visible brand blue micro-dots (24px spacing)
            "bg-[radial-gradient(#0085eb_1.1px,transparent_1.1px)] [background-size:24px_24px] opacity-25",
            // Dark mode: subtle neon cyan blueprint dots on deep dark
            "dark:bg-[radial-gradient(#38bdf8_1.1px,transparent_1.1px)] dark:opacity-10",
            "[mask-image:radial-gradient(ellipse_85%_75%_at_50%_40%,#000_30%,transparent_100%)]"
          )}
        />
      )}

      {pattern === "grid" && (
        <div
          className={cn(
            "absolute inset-0",
            // Light mode: crisp blueprint grid in brand blue (32px spacing)
            "bg-[linear-gradient(to_right,#0085eb1a_1px,transparent_1px),linear-gradient(to_bottom,#0085eb1a_1px,transparent_1px)] [background-size:32px_32px] opacity-75",
            // Dark mode: subtle deep blueprint grid in cyan
            "dark:bg-[linear-gradient(to_right,#38bdf814_1px,transparent_1px),linear-gradient(to_bottom,#38bdf814_1px,transparent_1px)] dark:opacity-35",
            "[mask-image:radial-gradient(ellipse_90%_80%_at_50%_45%,#000_30%,transparent_98%)]"
          )}
        />
      )}

      {pattern === "mesh" && (
        <div
          className={cn(
            "absolute inset-0",
            // Light mode: technical crosshatch mesh
            "bg-[linear-gradient(to_right,#0085eb15_1px,transparent_1px),linear-gradient(to_bottom,#0085eb15_1px,transparent_1px),radial-gradient(#64748b25_1px,transparent_1px)] [background-size:28px_28px,28px_28px,14px_14px] opacity-70",
            // Dark mode: subtle circuit mesh
            "dark:bg-[linear-gradient(to_right,#38bdf812_1px,transparent_1px),linear-gradient(to_bottom,#38bdf812_1px,transparent_1px),radial-gradient(#38bdf818_1px,transparent_1px)] [background-size:28px_28px,28px_28px,14px_14px] dark:opacity-30",
            "[mask-image:radial-gradient(ellipse_88%_78%_at_50%_50%,#000_30%,transparent_100%)]"
          )}
        />
      )}

      {/* 2. Static Architectural Light Auras (Zero CPU/GPU cost, vibrant depth) */}
      {showAura && (
        <>
          {/* Primary Top-Right Radiant Aura */}
          <div
            className={cn(
              "absolute -top-20 -right-20 w-[440px] h-[440px] sm:w-[580px] sm:h-[580px] rounded-full blur-3xl pointer-events-none",
              variant === "hero"
                ? "bg-gradient-to-br from-sky-400/22 via-primary/12 to-transparent opacity-85 dark:opacity-20"
                : "bg-gradient-to-br from-sky-300/18 via-primary/8 to-transparent opacity-75 dark:opacity-15"
            )}
          />

          {/* Secondary Bottom-Left Ambient Glow */}
          <div
            className={cn(
              "absolute -bottom-24 -left-24 w-[400px] h-[400px] sm:w-[520px] sm:h-[520px] rounded-full blur-3xl pointer-events-none",
              variant === "hero"
                ? "bg-gradient-to-tr from-primary/15 via-indigo-400/10 to-transparent opacity-80 dark:opacity-20"
                : "bg-gradient-to-tr from-accent/14 via-primary/6 to-transparent opacity-70 dark:opacity-12"
            )}
          />

          {/* Central Radiant Spotlight Cone (for Hero & Portfolio) */}
          {(variant === "hero" || variant === "spotlight") && (
            <div
              className={cn(
                "absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[850px] lg:w-[950px] h-[320px] sm:h-[400px] rounded-full blur-3xl pointer-events-none",
                variant === "hero"
                  ? "bg-gradient-to-b from-sky-400/22 via-primary/8 to-transparent opacity-85 dark:opacity-25"
                  : "bg-gradient-to-b from-primary/12 via-cyan-400/8 to-transparent opacity-75 dark:opacity-20"
              )}
            />
          )}
        </>
      )}

      {/* 3. Technical Watermark Crosshairs */}
      {showCrosshairs && (
        <div className="hidden lg:block absolute inset-0 pointer-events-none text-primary/20 dark:text-cyan-400/15 font-mono text-[10px] select-none p-6">
          <span className="absolute top-6 left-8">+ 06°18&apos;S // 106°42&apos;E</span>
          <span className="absolute top-6 right-8">+ SYS.ARCH.PROD</span>
          <span className="absolute bottom-6 left-8">+ PT.TPS // 2026</span>
          <span className="absolute bottom-6 right-8">+ LATENCY &lt;100MS</span>
        </div>
      )}
    </div>
  );
};
