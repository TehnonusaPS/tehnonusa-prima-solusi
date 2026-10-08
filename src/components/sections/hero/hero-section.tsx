"use client";

import * as React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  Cpu,
  Zap,
  ArrowUpRight,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CircleHighlight } from "@/components/ui/draw-circle-text";
import { EncryptButton } from "@/components/ui/creative-buttons";
import { FuzzyOverlay } from "@/components/ui/fuzzy-overlay";
import { cn } from "@/lib/utils";

// Dynamically load client-side Three.js organic twinkling stars shader (SSR safe)
const TwinklingStarsCanvas = dynamic(
  () => import("@/components/ui/twinkling-stars"),
  { ssr: false }
);

const AmbientStars = React.memo(function AmbientStars() {
  return (
    <div className="hidden dark:block absolute inset-0 opacity-85 pointer-events-none">
      <React.Suspense fallback={null}>
        <TwinklingStarsCanvas />
      </React.Suspense>
    </div>
  );
});

const emptySubscribe = () => () => {};

export interface HeroSectionProps {
  className?: string;
}

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
      {/* 1. Subtle Ambient Background Glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Soft Radial Ambient Aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-3xl opacity-75 dark:opacity-40" />

        {/* Ambient Dark-Mode 3D Stars Canvas */}
        {mounted && <AmbientStars />}

        {/* Subtle Film Grain Noise Texture (low opacity, non-intrusive) */}
        <FuzzyOverlay opacity={0.03} />
      </div>

      <Container size="lg">
        <div className="flex flex-col items-center text-center">
          {/* 2. Engineering Eyebrow Tag / Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/80 bg-surface/80 backdrop-blur-md shadow-2xs mb-5 sm:mb-6">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {tHero("kicker")}
            </span>
          </div>

          {/* 3. Main Persuasive Headline with Hand-drawn Loop Highlight */}
          <h1 className="font-heading font-bold text-4xl sm:text-6xl lg:text-7xl xl:text-7xl tracking-tight text-foreground leading-[1.08] max-w-5xl mb-5 sm:mb-6">
            <span>{tHero("headline_prefix")} </span>
            <CircleHighlight
              strokeColor="#0085EB"
              strokeWidth={3.5}
              className="text-primary font-black"
            >
              {tHero("headline_highlight")}
            </CircleHighlight>{" "}
            <span>{tHero("headline_suffix")}</span>
          </h1>

          {/* 4. Subtitle / Product Philosophy Copy */}
          <p className="font-sans text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8 sm:mb-10">
            {tHero("description")}
          </p>

          {/* 5. Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-12 sm:mb-16">
            {/* Primary Action Button with Cyber Scramble Effect */}
            <EncryptButton
              text={tHero("cta_primary")}
              icon={<Sparkles className="w-4 h-4 text-primary" />}
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary-dark border-transparent shadow-lg shadow-primary/25 font-sans font-semibold normal-case px-7 py-3.5 rounded-(--radius-md)"
              onClick={() => scrollToSection("#contact")}
            />

            {/* Secondary Outline Action Button */}
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-border hover:bg-muted font-sans font-semibold px-6 py-3.5 rounded-(--radius-md)"
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
              onClick={() => scrollToSection("#services")}
            >
              {tHero("cta_secondary")}
            </Button>
          </div>

          {/* 6. High-Tech Visual Showcase Card with Authentic Enterprise Badges */}
          <div className="relative w-full max-w-5xl group">
            {/* Ambient Backlight Glow for Visual Card */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none" />

            {/* Main Showcase Container */}
            <div className="relative rounded-2xl sm:rounded-3xl border border-border/80 bg-surface/90 shadow-2xl overflow-hidden backdrop-blur-xl">
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
                  className="object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  sizes="(max-width: 1280px) 100vw, 1200px"
                />

                {/* Subtle Image Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Real-Time Metric Pills */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex flex-wrap gap-2 sm:gap-3 pointer-events-none">
                  {/* Metric Pill 1 */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-xs font-semibold shadow-lg">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{tHero("badge_uptime")}</span>
                  </div>

                  {/* Metric Pill 2 */}
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-xs font-semibold shadow-lg">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>{tHero("badge_security")}</span>
                  </div>

                  {/* Metric Pill 3 */}
                  <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-xs font-semibold shadow-lg">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{tHero("badge_architecture")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
