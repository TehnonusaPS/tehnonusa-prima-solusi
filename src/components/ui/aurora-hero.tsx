"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "motion/react";
import { cn } from "@/lib/utils";

// Dynamically import Three.js Stars canvas to ensure safe client-side WebGL rendering
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

const Stars = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Stars),
  { ssr: false }
);

export interface AuroraHeroProps {
  badge?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  ctaText?: string;
  onCtaClick?: () => void;
  colors?: string[];
  className?: string;
}

const DEFAULT_COLORS = ["#4C86D8", "#1E67C6", "#6EA8FE", "#13FFAA"];

export const AuroraHero: React.FC<AuroraHeroProps> = ({
  badge = "Digital Innovation Partner",
  title = "Transformasi Bisnis Anda dengan Solusi Digital Andal",
  description = "PT Tehnonusa Prima Solusi menghadirkan rekayasa perangkat lunak modern, sistem enterprise, dan arsitektur digital berkinerja tinggi.",
  ctaText = "Mulai Diskusi Proyek",
  onCtaClick,
  colors = DEFAULT_COLORS,
  className,
}) => {
  const color = useMotionValue(colors[0]);

  useEffect(() => {
    const controls = animate(color, colors, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });

    return () => controls.stop();
  }, [color, colors]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className={cn(
        "relative grid min-h-screen place-content-center overflow-hidden bg-slate-950 px-4 py-24 text-slate-200",
        className
      )}
    >
      <div className="relative z-10 flex flex-col items-center text-center">
        {badge && (
          <span className="mb-4 inline-flex items-center rounded-full border border-slate-700/60 bg-slate-800/50 px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md">
            {badge}
          </span>
        )}

        <h1 className="max-w-3xl bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-3xl font-bold leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight">
          {title}
        </h1>

        <p className="my-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg md:leading-relaxed">
          {description}
        </p>

        <motion.button
          type="button"
          onClick={onCtaClick}
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="group relative flex w-fit items-center gap-2 rounded-full bg-slate-950/40 px-6 py-3 text-sm font-semibold text-slate-50 backdrop-blur-md transition-colors hover:bg-slate-900/60 cursor-pointer"
        >
          <span>{ctaText}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-45" />
        </motion.button>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};
