"use client";

import * as React from "react";
import { ReactLenis } from "lenis/react";

export interface SmoothScrollProviderProps {
  children: React.ReactNode;
  lerp?: number;
  duration?: number;
  smoothWheel?: boolean;
}

export function SmoothScrollProvider({
  children,
  lerp = 0.08,
  smoothWheel = true,
}: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp,
        smoothWheel,
      }}
    >
      {children}
    </ReactLenis>
  );
}
