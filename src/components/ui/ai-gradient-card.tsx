"use client";

import React, { useEffect } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";
import { ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AIGradientBorderProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

/**
 * AIGradientBorder (Official Hover.dev Implementation)
 * Features dynamic conic-gradient motion template and radial inner glow spill mask.
 */
export const AIGradientBorder: React.FC<AIGradientBorderProps> = ({
  children,
  className,
  duration = 3,
}) => {
  const turn = useMotionValue(0);

  useEffect(() => {
    animate(turn, 1, {
      ease: "linear",
      duration,
      repeat: Infinity,
    });
  }, [duration, turn]);

  const gradient = useMotionTemplate`conic-gradient(from ${turn}turn, transparent 0%, #f472b600 5%, #f472b6 10%, #c084fc 18%, #818cf8 26%, #38bdf8 34%, #2dd4bf 42%, #fbbf24 46%, #fbbf2400 52%, transparent 56%)`;

  return (
    <div className={cn("relative p-px", className)}>
      <motion.div
        style={{ backgroundImage: gradient }}
        className="absolute inset-0 rounded-[inherit]"
      />

      <div className="relative rounded-[inherit] overflow-hidden h-full flex flex-col">
        <div className="relative h-full flex flex-col">{children}</div>

        <motion.div
          style={{ backgroundImage: gradient }}
          className="ai-glow-spill-mask opacity-70 blur-2xl pointer-events-none absolute inset-[-40%] z-10 overflow-hidden"
        />
      </div>
    </div>
  );
};

export interface AIGradientAnimationCardProps {
  className?: string;
  question?: string;
  answer?: string;
  statusText?: string;
}

export const AIGradientAnimationCard: React.FC<AIGradientAnimationCardProps> = ({
  className,
  question = "Bagaimana Tehnonusa mengoptimasi arsitektur sistem enterprise?",
  answer = "Kami memadukan pendekatan modular microservices, caching terdistribusi, dan automasi cloud untuk memastikan sistem Anda andal dengan latensi di bawah 100ms.",
  statusText = "Menganalisis arsitektur sistem...",
}) => {
  return (
    <AIGradientBorder
      className={cn(
        "mx-auto w-full max-w-sm rounded-3xl border border-neutral-700 bg-neutral-900/90",
        className
      )}
    >
      <div className="grid gap-6 bg-neutral-900 p-4 pb-6 rounded-[inherit]">
        {/* Brand Logo Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
            T
          </div>
          <span className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
            Tehnonusa AI Core
          </span>
        </div>

        {/* User Question Pill */}
        <div className="p-4 flex items-center gap-2 rounded-2xl border border-neutral-700 bg-neutral-950 hover:bg-neutral-900 transition-colors cursor-pointer">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0">
            U
          </div>
          <p className="text-xs text-neutral-400 flex-1 line-clamp-1 font-medium">
            {question}
          </p>
          <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
        </div>

        {/* AI Answer Text */}
        <p className="text-sm leading-relaxed text-neutral-300">
          {answer}
        </p>

        {/* Loading Spinner */}
        <div className="flex gap-2 items-center">
          <Loader2 className="w-4 h-4 text-neutral-500 animate-spin" />
          <p className="text-xs text-neutral-500">{statusText}</p>
        </div>
      </div>
    </AIGradientBorder>
  );
};

export default AIGradientAnimationCard;
