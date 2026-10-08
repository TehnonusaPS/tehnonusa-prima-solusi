"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface CircleHighlightProps {
  children: React.ReactNode;
  strokeColor?: string;
  strokeWidth?: number;
  duration?: number;
  className?: string;
  svgClassName?: string;
}

/**
 * Reusable hand-drawn loop/circle highlighter for any emphasized keyword in headings.
 */
export const CircleHighlight: React.FC<CircleHighlightProps> = ({
  children,
  strokeColor = "var(--color-primary)",
  strokeWidth = 3,
  duration = 1.25,
  className,
  svgClassName,
}) => {
  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      <span className="relative z-10">{children}</span>
      <svg
        viewBox="0 0 286 73"
        fill="none"
        preserveAspectRatio="none"
        className={cn(
          "pointer-events-none absolute -left-3 -right-3 -top-2.5 -bottom-2.5 h-[calc(100%+18px)] w-[calc(100%+24px)] z-0",
          svgClassName
        )}
      >
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{
            duration,
            ease: "easeInOut",
          }}
          d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};

export interface DrawCircleTextProps {
  prefix?: React.ReactNode;
  highlightedText?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  strokeColor?: string;
}

export const DrawCircleText: React.FC<DrawCircleTextProps> = ({
  prefix = "Akselerasi Pertumbuhan Bisnis dengan",
  highlightedText = "Solusi Digital",
  suffix = "Modern & Andal",
  className,
  strokeColor = "var(--color-primary)",
}) => {
  return (
    <div
      className={cn(
        "grid place-content-center bg-background px-4 py-16 text-foreground text-center",
        className
      )}
    >
      <h2 className="max-w-3xl text-center text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
        {prefix}{" "}
        <CircleHighlight strokeColor={strokeColor}>
          {highlightedText}
        </CircleHighlight>{" "}
        {suffix}
      </h2>
    </div>
  );
};

export default DrawCircleText;
