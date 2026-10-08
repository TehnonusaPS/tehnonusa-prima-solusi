"use client";

import * as React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "motion/react";
import {
  ShieldCheck,
  Cpu,
  Zap,
  ArrowUpRight,
  Terminal,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { CircleHighlight } from "@/components/ui/draw-circle-text";
import { SpotlightButton, DrawOutlineButton } from "@/components/ui/creative-buttons";
import { TechBackground } from "@/components/ui/tech-background";
import { cn } from "@/lib/utils";

import { useTheme } from "next-themes";

// Dynamically load client-side Three.js organic twinkling stars shader (SSR safe)
const TwinklingStarsCanvas = dynamic(
  () => import("@/components/ui/twinkling-stars"),
  { ssr: false }
);

const AmbientStars = React.memo(function AmbientStars() {
  const { resolvedTheme } = useTheme();
  const [isVisible, setIsVisible] = React.useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (resolvedTheme !== "dark") return null;

  return (
    <div ref={containerRef} className="absolute inset-0 opacity-85 pointer-events-none">
      {isVisible && (
        <React.Suspense fallback={null}>
          <TwinklingStarsCanvas />
        </React.Suspense>
      )}
    </div>
  );
});

const emptySubscribe = () => () => {};

export interface HeroSectionProps {
  className?: string;
}

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function HeroSection({ className }: HeroSectionProps) {
  const tHero = useTranslations("hero");
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-32 border-b border-border/40",
        className
      )}
    >
      {/* 1. Architectural Tech Background (Static GPU-cached light auras) */}
      <TechBackground variant="hero" pattern="dots" />

      {/* Ambient Dark-Mode 3D Stars Canvas */}
      {mounted && <AmbientStars />}

      <Container size="lg">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* 2. Engineering Eyebrow Tag / Kicker */}
          <motion.div
            variants={heroItemVariants}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-border/80 bg-surface/80 backdrop-blur-md shadow-2xs mb-5 sm:mb-6 max-w-[94vw] sm:max-w-none"
          >
            <span className="flex h-2 w-2 shrink-0 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary shrink-0" />
            <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-tight sm:tracking-wider text-muted-foreground text-center">
              {tHero("kicker")}
            </span>
          </motion.div>

          {/* 3. Main Persuasive Headline with Hand-drawn Loop Highlight (Exact 3 lines on mobile & desktop) */}
          <motion.h1
            variants={heroItemVariants}
            className="font-heading font-bold text-[clamp(1.65rem,7.2vw,2.4rem)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-foreground leading-[1.12] sm:leading-[1.08] max-w-6xl mb-5 sm:mb-6"
          >
            <span className="block">{tHero("headline_prefix")}</span>
            <span className="block my-1.5 sm:my-2 whitespace-nowrap">
              <CircleHighlight
                strokeColor="#0085EB"
                strokeWidth={3}
                className="text-primary font-black inline-block mr-2 sm:mr-4"
              >
                {tHero("headline_highlight")}
              </CircleHighlight>{" "}
              {Boolean(tHero("headline_mid")) && (
                <span className="inline-block">{tHero("headline_mid")}</span>
              )}
            </span>
            <span className="block whitespace-nowrap">{tHero("headline_suffix")}</span>
          </motion.h1>

          {/* 4. Subtitle / Product Philosophy Copy */}
          <motion.p
            variants={heroItemVariants}
            className="font-sans text-sm sm:text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8 sm:mb-10 px-1 sm:px-0"
          >
            {tHero("description")}
          </motion.p>

          {/* 5. Dual Action Buttons (Diskusi Proyek hidden on mobile) */}
          <motion.div
            variants={heroItemVariants}
            className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-12 sm:mb-16"
          >
            {/* Primary Action Button with Hover.dev Spotlight Effect - Hidden on mobile */}
            <SpotlightButton
              onClick={() => scrollToSection("#contact")}
              className="hidden sm:inline-flex items-center justify-center w-full sm:w-auto"
            >
              <span>{tHero("cta_primary")}</span>
            </SpotlightButton>

            {/* Secondary Action Button with Hover.dev Rounded Draw Outline Effect */}
            <DrawOutlineButton
              onClick={() => scrollToSection("#services")}
              className="w-full sm:w-auto"
            >
              <span>{tHero("cta_secondary")}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-primary transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </DrawOutlineButton>
          </motion.div>

          {/* 6. High-Tech Visual Showcase Card with Authentic Enterprise Badges & Smooth Float */}
          <motion.div
            variants={heroItemVariants}
            className="relative w-full max-w-5xl group"
          >
            {/* Ambient Backlight Glow for Visual Card */}
            <motion.div
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [0.98, 1.025, 0.98],
              }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-primary/25 via-accent/20 to-primary/25 blur-xl pointer-events-none"
            />

            {/* Main Showcase Container with Clearly Visible Levitation Float */}
            <motion.div
              animate={{
                y: [0, -22, 0],
              }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.015,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="relative rounded-2xl sm:rounded-3xl border border-border/80 bg-surface/90 shadow-2xl overflow-hidden backdrop-blur-xl"
            >
              {/* Window Frame Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border/70 bg-muted/40">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/80 inline-block" />
                  <span className="ml-2 font-mono text-[11px] text-muted-foreground/80 hidden sm:inline-block">
                    core.tehnonusa.internal/systems
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-semibold text-primary flex items-center gap-1.5 bg-primary/10 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    LIVE PRODUCTION
                  </span>
                </div>
              </div>

              {/* High-Tech Holographic Visual Image */}
              <div className="relative w-full aspect-16/9 sm:aspect-21/9 overflow-hidden bg-slate-950">
                <Image
                  src="/images/hero-tech.jpg"
                  alt="PT Tehnonusa Prima Solusi Systems Core"
                  fill
                  priority
                  className="object-cover object-center transform group-hover:scale-[1.025] transition-transform duration-700 ease-out"
                  sizes="(max-width: 1280px) 100vw, 1200px"
                />

                {/* Subtle Image Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Real-Time Metric Pills with Micro-Hover Motion */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex flex-wrap gap-2 sm:gap-3 pointer-events-auto">
                  {/* Metric Pill 1 */}
                  <motion.div
                    whileHover={{ scale: 1.06, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/15 text-white text-xs font-semibold shadow-lg cursor-default"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{tHero("badge_uptime")}</span>
                  </motion.div>

                  {/* Metric Pill 2 */}
                  <motion.div
                    whileHover={{ scale: 1.06, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/15 text-white text-xs font-semibold shadow-lg cursor-default"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>{tHero("badge_security")}</span>
                  </motion.div>

                  {/* Metric Pill 3 */}
                  <motion.div
                    whileHover={{ scale: 1.06, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/15 text-white text-xs font-semibold shadow-lg cursor-default"
                  >
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{tHero("badge_architecture")}</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
