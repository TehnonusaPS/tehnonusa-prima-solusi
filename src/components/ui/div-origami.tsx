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
        transform: "rotateY(-18deg)",
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative z-0 h-44 w-64 shrink-0 rounded-(--radius-xl) border border-border bg-surface shadow-2xl overflow-visible",
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
          key={`top-${index}`}
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
          key={`bottom-${(index + 1) * 2}`}
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

      {/* Horizontal Seam */}
      <hr
        style={{
          transform: "translateZ(1px)",
        }}
        className="absolute left-0 right-0 top-1/2 z-50 -translate-y-1/2 border-t-2 border-border/80 pointer-events-none"
      />
    </div>
  );
};

export interface LogoItemProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

export const LogoItem: React.FC<LogoItemProps> = ({
  children,
  title,
  className,
}) => {
  return (
    <div
      className={cn(
        "grid h-36 w-56 place-content-center rounded-(--radius-lg) bg-surface-elevated text-foreground border border-border/60 shadow-md p-4 text-center select-none",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-4xl text-primary">{children}</div>
        {title && (
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </span>
        )}
      </div>
    </div>
  );
};

const DEFAULT_TECH_ITEMS = [
  <LogoItem key={1} title="Next.js App Core">
    <Globe className="w-10 h-10 text-primary" />
  </LogoItem>,
  <LogoItem key={2} title="TypeScript Engine">
    <Code2 className="w-10 h-10 text-primary-light" />
  </LogoItem>,
  <LogoItem key={3} title="Cloud Architecture">
    <Cpu className="w-10 h-10 text-emerald-400" />
  </LogoItem>,
  <LogoItem key={4} title="Scalable Database">
    <Database className="w-10 h-10 text-amber-400" />
  </LogoItem>,
  <LogoItem key={5} title="Enterprise Security">
    <ShieldCheck className="w-10 h-10 text-sky-400" />
  </LogoItem>,
  <LogoItem key={6} title="Modular Ecosystem">
    <Layers className="w-10 h-10 text-purple-400" />
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
