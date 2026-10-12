"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Code2, Cpu, Database, Globe, Layers, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const DELAY_IN_MS = 2500;
const TRANSITION_DURATION_IN_SECS = 1.2;

export interface LogoRolodexProps {
  items?: React.ReactNode[];
  delay?: number;
  duration?: number;
  className?: string;
}

export const LogoRolodex: React.FC<LogoRolodexProps> = ({
  items,
  delay = DELAY_IN_MS,
  duration = TRANSITION_DURATION_IN_SECS,
  className,
}) => {
  const displayItems = items ?? DEFAULT_TECH_ITEMS;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (displayItems.length === 0) return;

    intervalRef.current = setInterval(() => {
      setIndex((pv) => pv + 1);
    }, delay);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [delay, displayItems.length]);

  if (displayItems.length === 0) return null;

  return (
    <div
      style={{
        transform: "rotateY(-20deg)",
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative z-0 h-44 w-60 shrink-0 rounded-xl border border-slate-700/80 bg-slate-900/90 shadow-2xl overflow-visible",
        className
      )}
    >
      <AnimatePresence mode="sync">
        {/* Top Fold Half */}
        <motion.div
          style={{
            y: "-50%",
            x: "-50%",
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
            zIndex: -index,
            backfaceVisibility: "hidden",
          }}
          key={index}
          transition={{
            duration,
            ease: "easeInOut",
          }}
          initial={{ rotateX: "0deg" }}
          animate={{ rotateX: "0deg" }}
          exit={{ rotateX: "-180deg" }}
          className="absolute left-1/2 top-1/2"
        >
          {displayItems[index % displayItems.length]}
        </motion.div>

        {/* Bottom Fold Half */}
        <motion.div
          style={{
            y: "-50%",
            x: "-50%",
            clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
            zIndex: index,
            backfaceVisibility: "hidden",
          }}
          key={(index + 1) * 2}
          initial={{ rotateX: "180deg" }}
          animate={{ rotateX: "0deg" }}
          exit={{ rotateX: "0deg" }}
          transition={{
            duration,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2"
        >
          {displayItems[index % displayItems.length]}
        </motion.div>
      </AnimatePresence>

      <hr
        style={{
          transform: "translateZ(1px)",
        }}
        className="absolute left-0 right-0 top-1/2 z-[999999999] -translate-y-1/2 border-t-2 border-slate-950/80 pointer-events-none"
      />
    </div>
  );
};

export interface LogoItemProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export const LogoItem: React.FC<LogoItemProps> = ({
  children,
  title,
  subtitle,
  badge,
  className,
}) => {
  return (
    <div
      className={cn(
        "grid h-36 w-52 place-content-center rounded-xl shadow-xl select-none p-3.5 text-center transition-all",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center gap-1.5">
        {badge && (
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/15 text-current backdrop-blur-xs">
            {badge}
          </span>
        )}
        <div className="text-3xl drop-shadow-md flex items-center justify-center">
          {children}
        </div>
        {title && (
          <span className="text-xs font-bold uppercase tracking-wider drop-shadow-xs leading-tight">
            {title}
          </span>
        )}
        {subtitle && (
          <span className="text-[10px] font-medium opacity-85 leading-tight">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

const DEFAULT_TECH_ITEMS = [
  <LogoItem
    key={1}
    className="bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 border border-white/90 shadow-[0_10px_25px_rgba(255,255,255,0.18)]"
    title="Next.js App Core"
    subtitle="React 19 & Hybrid Edge"
  >
    <Globe className="w-8 h-8 text-[#0085eb]" />
  </LogoItem>,
  <LogoItem
    key={2}
    className="bg-gradient-to-br from-[#0091ff] via-[#0085eb] to-[#006ec4] text-white border border-sky-300/50 shadow-[0_10px_25px_rgba(0,133,235,0.45)]"
    title="TypeScript Engine"
    subtitle="100% Strict Type Safety"
  >
    <Code2 className="w-8 h-8 text-white drop-shadow-md" />
  </LogoItem>,
  <LogoItem
    key={3}
    className="bg-gradient-to-br from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] text-slate-950 border border-cyan-200/60 shadow-[0_10px_25px_rgba(56,189,248,0.45)]"
    title="Cloud Architecture"
    subtitle="Kubernetes Multi-Zone"
  >
    <Cpu className="w-8 h-8 text-slate-950" />
  </LogoItem>,
  <LogoItem
    key={4}
    className="bg-gradient-to-br from-[#34d399] via-[#10b981] to-[#059669] text-white border border-emerald-300/50 shadow-[0_10px_25px_rgba(16,185,129,0.4)]"
    title="Scalable Database"
    subtitle="PostgreSQL & Redis Cache"
  >
    <Database className="w-8 h-8 text-white drop-shadow-md" />
  </LogoItem>,
  <LogoItem
    key={5}
    className="bg-gradient-to-br from-[#818cf8] via-[#6366f1] to-[#4f46e5] text-white border border-indigo-200/50 shadow-[0_10px_25px_rgba(99,102,241,0.45)]"
    title="Enterprise Security"
    subtitle="Zero-Trust & AES-256"
  >
    <ShieldCheck className="w-8 h-8 text-white drop-shadow-md" />
  </LogoItem>,
  <LogoItem
    key={6}
    className="bg-gradient-to-br from-[#1e40af] via-[#1d4ed8] to-[#0f2747] text-white border border-sky-400/50 shadow-[0_10px_25px_rgba(37,99,235,0.4)]"
    title="API Integration Mesh"
    subtitle="Event-Driven Realtime APIs"
  >
    <Layers className="w-8 h-8 text-sky-300 drop-shadow-md" />
  </LogoItem>,
];

export interface DivOrigamiProps {
  className?: string;
  items?: React.ReactNode[];
  headline?: React.ReactNode;
  subtitle?: React.ReactNode;
}

export const DivOrigami: React.FC<DivOrigamiProps> = ({
  className,
  items,
  headline = "Teknologi yang Menggerakkan Bisnis Anda",
  subtitle = "Arsitektur modern, tangguh, dan teruji di level industri.",
}) => {
  return (
    <section
      className={cn(
        "flex min-h-[300px] flex-col md:flex-row items-center justify-center gap-8 sm:gap-14 bg-background px-4 py-16 text-foreground",
        className
      )}
    >
      <div className="max-w-md text-center md:text-left">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug">
          {headline}
        </h3>
        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <LogoRolodex items={items} />
    </section>
  );
};

export default DivOrigami;
