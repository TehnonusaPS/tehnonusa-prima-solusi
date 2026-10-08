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

export const AIGradientBorder: React.FC<AIGradientBorderProps> = ({
  children,
  className,
  duration = 3.5,
}) => {
  const turn = useMotionValue(0);

  useEffect(() => {
    const controls = animate(turn, 1, {
      ease: "linear",
      duration,
      repeat: Infinity,
    });

    return () => controls.stop();
  }, [duration, turn]);

  const gradient = useMotionTemplate`conic-gradient(from ${turn}turn, transparent 0%, #f472b600 5%, #f472b6 10%, #c084fc 18%, #818cf8 26%, #38bdf8 34%, #2dd4bf 42%, #fbbf24 46%, #fbbf2400 52%, transparent 56%)`;

  return (
    <div className={cn("relative p-px rounded-2xl group/gradient h-full flex flex-col", className)}>
      <motion.div
        style={{ backgroundImage: gradient }}
        className="absolute inset-0 rounded-[inherit] opacity-80 group-hover/gradient:opacity-100 transition-opacity duration-300"
      />

      <div className="relative rounded-[calc(1rem-1px)] overflow-hidden h-full flex flex-col z-10 bg-surface/95">
        <div className="relative z-10 h-full flex flex-col">{children}</div>

        <motion.div
          style={{ backgroundImage: gradient }}
          className="ai-glow-spill-mask opacity-30 group-hover/gradient:opacity-65 blur-2xl pointer-events-none absolute inset-[-40%] z-0 overflow-hidden transition-opacity duration-300"
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
  question = "Bagaimana Tehnonusa mengoptimasi arsitektur sistem?",
  answer = "Kami memadukan pendekatan serverless, caching terdistribusi, dan arsitektur modular untuk memastikan sistem Anda mampu menampung lonjakan traffic tanpa latensi.",
  statusText = "Memproses analisis sistem...",
}) => {
  return (
    <AIGradientBorder className={cn("mx-auto w-full max-w-sm border border-neutral-700/80 shadow-2xl", className)}>
      <div className="grid gap-5 bg-neutral-900 p-5 pb-6 rounded-[calc(1.5rem-1px)]">
        {/* Brand Logo Placeholder */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
            T
          </div>
          <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
            Tehnonusa AI Core
          </span>
        </div>

        {/* User Question */}
        <div className="p-3.5 flex items-center gap-2.5 rounded-2xl border border-neutral-700/80 bg-neutral-950/80 hover:bg-neutral-900 transition-colors cursor-pointer">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0">
            U
          </div>
          <p className="text-xs text-neutral-400 flex-1 line-clamp-1 font-medium">
            {question}
          </p>
          <ChevronDown className="h-4 w-4 text-neutral-500 shrink-0" />
        </div>

        {/* AI Answer Text */}
        <p className="text-xs sm:text-sm leading-relaxed text-neutral-300 font-normal">
          {answer}
        </p>

        {/* Status / Loading indicator */}
        <div className="flex gap-2 items-center pt-1 border-t border-neutral-800/80">
          <Loader2 className="h-3.5 w-3.5 text-primary animate-spin" />
          <p className="text-xs text-neutral-400 font-medium">{statusText}</p>
        </div>
      </div>
    </AIGradientBorder>
  );
};

export default AIGradientAnimationCard;
