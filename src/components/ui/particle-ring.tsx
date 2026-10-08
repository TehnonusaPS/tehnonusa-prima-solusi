"use client";

import React from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

export interface ParticlePoint {
  idx: number;
  position: [number, number, number];
  color: string;
}

const MIN_RADIUS = 7.5;
const MAX_RADIUS = 15;
const DEPTH = 2;
const LEFT_COLOR = "4c86d8"; // Tehnonusa Primary
const RIGHT_COLOR = "6ea8fe"; // Tehnonusa Accent

const calculateColor = (x: number): string => {
  const maxDiff = MAX_RADIUS * 2;
  const currentDiff = x + MAX_RADIUS;
  const percentage = Math.max(0, Math.min(1, currentDiff / maxDiff));

  const hexLeft = parseInt(LEFT_COLOR, 16);
  const hexRight = parseInt(RIGHT_COLOR, 16);

  const rLeft = (hexLeft >> 16) & 255;
  const gLeft = (hexLeft >> 8) & 255;
  const bLeft = hexLeft & 255;

  const rRight = (hexRight >> 16) & 255;
  const gRight = (hexRight >> 8) & 255;
  const bRight = hexRight & 255;

  const r = Math.round(rLeft + (rRight - rLeft) * percentage);
  const g = Math.round(gLeft + (gRight - gLeft) * percentage);
  const b = Math.round(bLeft + (bRight - bLeft) * percentage);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const randomFromInterval = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const generatePoints = (
  count: number,
  minRadius: number,
  maxRadius: number
): ParticlePoint[] => {
  return Array.from({ length: count }, (_, k) => {
    const randomRadius = randomFromInterval(minRadius, maxRadius);
    const randomAngle = Math.random() * Math.PI * 2;
    const x = Math.cos(randomAngle) * randomRadius;
    const y = Math.sin(randomAngle) * randomRadius;
    const z = randomFromInterval(-DEPTH, DEPTH);
    const color = calculateColor(x);
    return {
      idx: k,
      position: [x, y, z],
      color,
    };
  });
};

export const pointsInner: ParticlePoint[] = generatePoints(250, MIN_RADIUS, 10);
export const pointsOuter: ParticlePoint[] = generatePoints(250, 10, MAX_RADIUS);

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
