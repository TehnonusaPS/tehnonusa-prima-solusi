"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CutoutTextLoaderProps {
  height?: string;
  background?: string;
  imgUrl?: string;
  text?: string;
  className?: string;
  pulseSpeedClass?: string;
}

const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const CutoutTextLoader: React.FC<CutoutTextLoaderProps> = ({
  height = "420px",
  background,
  imgUrl = DEFAULT_IMG,
  text = "TEHNONUSA",
  className,
  pulseSpeedClass = "animate-pulse",
}) => {
  return (
    <div
      className={cn("relative w-full overflow-hidden select-none", className)}
      style={{ height }}
    >
      {/* Background Media Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      />

      {/* Pulse Mask Layer (adaptable to dark/light theme) */}
      <div
        style={background ? { background } : undefined}
        className={cn(
          "absolute inset-0 z-10",
          !background && "bg-background",
          pulseSpeedClass
        )}
      />

      {/* Cutout Text Knockout Layer */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-4">
        <span
          className="font-black text-center uppercase tracking-tight bg-clip-text text-transparent bg-cover bg-center leading-none"
          style={{
            backgroundImage: `url(${imgUrl})`,
            fontSize: "clamp(2.5rem, 11vw, 9rem)",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default CutoutTextLoader;
