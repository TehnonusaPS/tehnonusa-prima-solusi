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
    <div className={cn("relative p-px rounded-2xl shadow-sm dark:shadow-none", className)}>
      {/* 1. Underlying Base Border Track (Guarantees crisp, defined edge in light mode while preserving dark mode) */}
      <div className="absolute inset-0 rounded-[inherit] bg-slate-200/90 dark:bg-slate-800/80" />

      {/* 2. Active Conic AI Gradient Traveling Beam */}
      <motion.div
        style={{ backgroundImage: gradient }}
        className="absolute inset-0 rounded-[inherit]"
      />

      {/* 3. Inner Content Container with Glow Spill Mask */}
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

export interface QAItem {
  question: string;
  answer: string;
  statusText: string;
}

const DEFAULT_QA: QAItem[] = [
  {
    question: "Bagaimana Tehnonusa mengoptimasi arsitektur sistem enterprise?",
    answer: "Kami memadukan pendekatan modular microservices, caching terdistribusi via Redis, dan automasi cloud Kubernetes untuk memastikan latensi sub-100ms dan uptime SLA 99.99%.",
    statusText: "Menganalisis throughput & microservices...",
  },
  {
    question: "Berapa lama estimasi delivery MVP aplikasi bisnis?",
    answer: "MVP fungsional siap dalam 4–6 minggu dengan arsitektur modular teruji, integrasi database cloud, dan standar clean code siap rilis produksi.",
    statusText: "Menghitung estimasi sprint & modul...",
  },
  {
    question: "Bagaimana jaminan keamanan data dan hak cipta source code?",
    answer: "Kami menandatangani NDA legal sebelum sesi kickoff teknis. Seluruh hak cipta source code, skema database, dan aset 100% menjadi milik klien tanpa vendor lock-in.",
    statusText: "Memverifikasi enkripsi AES-256 & legal NDA...",
  },
];

export interface AIGradientAnimationCardProps {
  className?: string;
  items?: QAItem[];
}

export const AIGradientAnimationCard: React.FC<AIGradientAnimationCardProps> = ({
  className,
  items = DEFAULT_QA,
}) => {
  const [qaIndex, setQaIndex] = React.useState(0);
  const currentItem = items[qaIndex % items.length];

  const handleNextQuestion = () => {
    setQaIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <AIGradientBorder
      className={cn(
        "mx-auto w-full max-w-sm rounded-3xl border border-neutral-700 bg-neutral-900/90 shadow-2xl",
        className
      )}
    >
      <div className="grid gap-5 bg-neutral-900 p-5 pb-6 rounded-[inherit]">
        {/* Brand Logo Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary-light flex items-center justify-center font-bold text-sm border border-primary/30">
              T
            </div>
            <div>
              <span className="text-xs font-semibold text-neutral-100 uppercase tracking-wider block">
                Tehnonusa AI Core
              </span>
              <span className="text-[10px] font-mono text-emerald-400 block">
                ● Interactive AI Assistant
              </span>
            </div>
          </div>

          <span className="font-mono text-[10px] text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded-full">
            {qaIndex + 1}/{items.length}
          </span>
        </div>

        {/* User Question Pill (Interactive Click to Cycle) */}
        <button
          type="button"
          onClick={handleNextQuestion}
          className="p-3.5 flex items-center gap-2.5 rounded-2xl border border-neutral-700 bg-neutral-950 hover:bg-neutral-800 transition-colors cursor-pointer text-left w-full group/q"
          title="Klik untuk beralih pertanyaan"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0">
            U
          </div>
          <p className="text-xs text-neutral-300 group-hover/q:text-white flex-1 line-clamp-1 font-medium transition-colors">
            {currentItem.question}
          </p>
          <ChevronDown className="w-4 h-4 text-neutral-500 group-hover/q:text-neutral-300 shrink-0 transition-transform group-hover/q:translate-y-0.5" />
        </button>

        {/* AI Answer Text */}
        <p className="text-xs sm:text-sm leading-relaxed text-neutral-300 font-normal min-h-[4.5rem]">
          {currentItem.answer}
        </p>

        {/* Loading Spinner / Status */}
        <div className="flex gap-2 items-center pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 font-mono">
          <Loader2 className="w-3.5 h-3.5 text-primary-light animate-spin shrink-0" />
          <span className="truncate">{currentItem.statusText}</span>
        </div>
      </div>
    </AIGradientBorder>
  );
};

export default AIGradientAnimationCard;
