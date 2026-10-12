"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ArrowRight, ShieldCheck, Sparkles, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  badge?: string;
  metricBadge?: string;
  children: React.ReactNode;
  imgPadding?: number;
  className?: string;
}

const DEFAULT_IMG_PADDING = 12;

export function TextParallaxContent({
  imgUrl,
  subheading,
  heading,
  badge,
  metricBadge,
  children,
  imgPadding = DEFAULT_IMG_PADDING,
  className,
}: TextParallaxContentProps) {
  return (
    <div
      style={{
        paddingLeft: imgPadding,
        paddingRight: imgPadding,
      }}
      className={cn("w-full transition-colors duration-300", className)}
    >
      <div className="relative h-[135vh] sm:h-[150vh]">
        <StickyImage imgUrl={imgUrl} imgPadding={imgPadding} />
        <OverlayCopy
          heading={heading}
          subheading={subheading}
          badge={badge}
          metricBadge={metricBadge}
        />
      </div>
      <div className="relative z-10 -mt-12 sm:-mt-16 pb-16 sm:pb-24">
        {children}
      </div>
    </div>
  );
}

interface StickyImageProps {
  imgUrl: string;
  imgPadding: number;
}

function StickyImage({ imgUrl, imgPadding }: StickyImageProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.85, 0.4]);

  return (
    <motion.div
      ref={targetRef}
      style={{
        height: `calc(100vh - ${imgPadding * 2}px)`,
        top: imgPadding,
        scale,
      }}
      className="sticky z-0 overflow-hidden rounded-3xl sm:rounded-[36px] border border-white/15 dark:border-white/10 shadow-2xl shadow-slate-950/30"
    >
      {/* Optimized Next.js Background Image with Cover Fit */}
      <Image
        src={imgUrl}
        alt="Production Case Study Architecture"
        fill
        sizes="(max-width: 1280px) 100vw, 1280px"
        priority={false}
        className="object-cover object-center"
      />

      {/* Cinematic Dark Vignette & Color Grading Overlay (Legible in both Light & Dark modes) */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-slate-950/80 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/50"
      />

      {/* Ambient Tech Grid Overlay for Blueprint Aesthetic */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </motion.div>
  );
}

interface OverlayCopyProps {
  subheading: string;
  heading: string;
  badge?: string;
  metricBadge?: string;
}

function OverlayCopy({ subheading, heading, badge, metricBadge }: OverlayCopyProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Parallax Float and Fade Curves
  const y = useTransform(scrollYProgress, [0, 1], [220, -220]);
  const opacity = useTransform(scrollYProgress, [0.15, 0.45, 0.78], [0, 1, 0]);

  return (
    <motion.div
      ref={targetRef}
      style={{
        y,
        opacity,
      }}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white px-4 sm:px-6 z-10 pointer-events-none"
    >
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-3 sm:space-y-4">
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {badge && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/25 border border-primary/40 text-primary-light text-[11px] font-mono font-semibold uppercase tracking-wider backdrop-blur-md shadow-xs">
              <Terminal className="w-3.5 h-3.5 text-cyan-300" />
              <span>{badge}</span>
            </div>
          )}

          {metricBadge && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-mono font-bold backdrop-blur-md shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{metricBadge}</span>
            </div>
          )}
        </div>

        {/* Subheading Kicker */}
        <p className="font-mono text-xs sm:text-sm md:text-base font-semibold tracking-widest uppercase text-cyan-300/90 text-center">
          {subheading}
        </p>

        {/* Main Dramatic Heading */}
        <h3 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] drop-shadow-lg text-center max-w-3xl">
          {heading}
        </h3>
      </div>
    </motion.div>
  );
}

export default TextParallaxContent;
