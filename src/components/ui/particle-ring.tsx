"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Re-export particle utilities for external consumers
export * from "./particle-utils";

// Client-only canvas wrapper to avoid SSR issues
const ParticleRingCanvas = dynamic(() => import("./particle-ring-canvas"), {
  ssr: false,
  loading: () => null,
});

export interface ParticleRingProps {
  className?: string;
  headline?: React.ReactNode;
  subtitle?: React.ReactNode;
  interactive?: boolean;
}

/**
 * Standalone interactive 3D particle ring showcase.
 */
export const ParticleRing: React.FC<ParticleRingProps> = ({
  className,
  headline = "Drag & Zoom",
  subtitle = "Interactive 3D Technology Mesh",
  interactive = true,
}) => {
  return (
    <div
      className={cn(
        "relative w-full h-screen min-h-[500px] overflow-hidden bg-slate-950 select-none",
        className
      )}
    >
      <ParticleRingCanvas interactive={interactive} enableZoom={true} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10 px-4">
        <h2 className="text-slate-100 font-bold text-2xl sm:text-4xl md:text-5xl tracking-tight drop-shadow-lg">
          {headline}
        </h2>
        {subtitle && (
          <p className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-widest text-primary-light/80 drop-shadow-md">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export interface ParticleRingBackgroundProps {
  className?: string;
  interactive?: boolean;
}

/**
 * Permanent 3D Particle Ring Section Background.
 * - Persistent mount: Never unmounts on scroll, eliminating WebGL context re-creations,
 *   flickering, or glitching when scrolling up and down rapidly.
 * - Non-blocking: Page scroll is never trapped (enableZoom is false).
 * - Upward bleed: Floats seamlessly into the transition zone above without harsh borders.
 */
export const ParticleRingBackground: React.FC<ParticleRingBackgroundProps> = ({
  className,
  interactive = true,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={cn(
        "absolute inset-x-0 -top-28 sm:-top-44 h-[calc(100%+7rem)] sm:h-[calc(100%+11rem)] pointer-events-auto select-none",
        className
      )}
    >
      <ParticleRingCanvas
        interactive={interactive}
        enableZoom={false}
        autoRotate={true}
      />
    </div>
  );
};

export default ParticleRing;
