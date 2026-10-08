"use client";

import React from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Re-export particle utilities for external consumers
export * from "./particle-utils";

// Client-only canvas wrapper to avoid SSR issues
const ParticleRingCanvas = dynamic(() => import("./particle-ring-canvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-950 text-slate-500 text-sm">
      Loading 3D Visual...
    </div>
  ),
});

export interface ParticleRingProps {
  className?: string;
  headline?: React.ReactNode;
  subtitle?: React.ReactNode;
}

export const ParticleRing: React.FC<ParticleRingProps> = ({
  className,
  headline = "Drag & Zoom",
  subtitle = "Interactive 3D Technology Mesh",
}) => {
  return (
    <div
      className={cn(
        "relative w-full h-screen min-h-[500px] overflow-hidden bg-slate-950 select-none",
        className
      )}
    >
      <ParticleRingCanvas />

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

export default ParticleRing;
