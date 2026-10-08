"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface FuzzyOverlayProps {
  className?: string;
  opacity?: number;
  noiseUrl?: string;
}

// Embedded SVG fractal noise as clean default so no external PNG asset is required
const DEFAULT_SVG_NOISE =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E";

export const FuzzyOverlay: React.FC<FuzzyOverlayProps> = ({
  className,
  opacity = 0.12,
  noiseUrl = DEFAULT_SVG_NOISE,
}) => {
  return (
    <motion.div
      initial={{ transform: "translateX(-10%) translateY(-10%)" }}
      animate={{
        transform: "translateX(10%) translateY(10%)",
      }}
      transition={{
        repeat: Infinity,
        duration: 0.2,
        ease: "linear",
        repeatType: "mirror",
      }}
      style={{
        backgroundImage: `url("${noiseUrl}")`,
        opacity,
      }}
      className={cn(
        "pointer-events-none absolute -inset-[100%] z-20 select-none",
        className
      )}
    />
  );
};

export const FuzzyOverlayWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
  opacity?: number;
}> = ({ children, className, opacity = 0.12 }) => {
  return (
    <div className={cn("relative overflow-hidden w-full", className)}>
      {children}
      <FuzzyOverlay opacity={opacity} />
    </div>
  );
};

export default FuzzyOverlay;
