"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TechBackgroundProps {
  className?: string;
  variant?: "hero" | "section" | "subtle";
  pattern?: "dots" | "grid" | "mesh";
  showAura?: boolean;
}

/**
 * TechBackground Component
 * Provides a high-end architectural engineering grid and organic breathing ambient
 * aura specifically calibrated so light mode feels dynamic, multi-layered, and alive
 * without being overpowering, while dark mode stays sleek and deep.
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
      {/* 1. Architectural Precision Grid Pattern (Specially tuned for light mode) */}
      {pattern === "dots" && (
        <div
          className={cn(
            "absolute inset-0",
            // Light mode: subtle slate dots with radial fade
            "bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.38]",
            // Dark mode: ultra-subtle starry blueprint dots
            "dark:bg-[radial-gradient(#38bdf8_1px,transparent_1px)] dark:opacity-[0.08]",
            // Smooth edge masking so it doesn't look cut off
            "[mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_30%,transparent_100%)]"
          )}
        />
      )}

      {pattern === "grid" && (
        <div
          className={cn(
            "absolute inset-0",
            // Engineering blueprint grid
            "bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.28]",
            "dark:bg-[linear-gradient(to_right,#1e3a5f_1px,transparent_1px),linear-gradient(to_bottom,#1e3a5f_1px,transparent_1px)] dark:opacity-[0.12]",
            "[mask-image:radial-gradient(ellipse_80%_60%_at_50%_45%,#000_25%,transparent_95%)]"
          )}
        />
      )}

      {pattern === "mesh" && (
        <div
          className={cn(
            "absolute inset-0",
            "bg-[radial-gradient(#64748b_1px,transparent_1px),linear-gradient(to_right,#e2e8f0_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.22]",
            "dark:bg-[radial-gradient(#0284c7_1px,transparent_1px)] dark:opacity-[0.06]",
            "[mask-image:radial-gradient(ellipse_85%_70%_at_50%_50%,#000_35%,transparent_100%)]"
          )}
        />
      )}

      {/* 2. Organic Breathing Light Orbs (Continuous, silky Framer Motion ambient aura) */}
      {showAura && (
        <>
          {/* Primary Floating Aura (Cyan / Sky Blue) */}
          <motion.div
            animate={{
              x: [0, 35, -25, 0],
              y: [0, -25, 20, 0],
              scale: [1, 1.08, 0.94, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn(
              "absolute -top-20 -right-20 w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] rounded-full blur-3xl",
              variant === "hero"
                ? "bg-gradient-to-br from-sky-400/18 via-primary/12 to-transparent opacity-85 dark:opacity-30"
                : "bg-gradient-to-br from-sky-300/14 via-primary/8 to-transparent opacity-75 dark:opacity-20"
            )}
          />

          {/* Secondary Floating Aura (Indigo / Accent Blue) */}
          <motion.div
            animate={{
              x: [0, -30, 25, 0],
              y: [0, 30, -20, 0],
              scale: [1, 0.92, 1.1, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn(
              "absolute -bottom-24 -left-24 w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] rounded-full blur-3xl",
              variant === "hero"
                ? "bg-gradient-to-tr from-primary/14 via-indigo-400/10 to-transparent opacity-80 dark:opacity-25"
                : "bg-gradient-to-tr from-accent/12 via-primary/6 to-transparent opacity-70 dark:opacity-15"
            )}
          />

          {/* Hero-specific Central Radiant Beacon */}
          {variant === "hero" && (
            <motion.div
              animate={{
                opacity: [0.65, 0.9, 0.65],
                scale: [0.98, 1.03, 0.98],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1100px] h-[420px] sm:h-[520px] bg-gradient-to-b from-sky-400/18 via-primary/8 to-transparent blur-3xl rounded-full dark:opacity-35"
            />
          )}
        </>
      )}

      {/* 3. Subtle Vignette Depth Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60 pointer-events-none" />
    </div>
  );
};
