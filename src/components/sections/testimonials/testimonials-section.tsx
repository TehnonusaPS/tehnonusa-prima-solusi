"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  MessageSquareQuote,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Clock,
  Lock,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { TechBackground } from "@/components/ui/tech-background";
import { CircleHighlight } from "@/components/ui/draw-circle-text";
import { cn } from "@/lib/utils";

interface ClientVisualConfig {
  image: string;
  tag: string;
  accentGradient: string;
  avatarBg: string;
}

const CLIENT_CONFIGS: ClientVisualConfig[] = [
  {
    image: "/images/portfolio-logistics.jpg",
    tag: "Logistics ERP System",
    accentGradient: "from-blue-600 to-cyan-500",
    avatarBg: "from-blue-500 to-cyan-500",
  },
  {
    image: "/images/portfolio-fintech.jpg",
    tag: "Core Banking API Engine",
    accentGradient: "from-emerald-600 to-teal-500",
    avatarBg: "from-emerald-500 to-teal-500",
  },
  {
    image: "/images/portfolio-erp.jpg",
    tag: "Mobile Field Operations",
    accentGradient: "from-violet-600 to-indigo-500",
    avatarBg: "from-violet-500 to-indigo-500",
  },
];

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextClient = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % 3);
  }, []);

  const prevClient = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + 3) % 3);
  }, []);

  // Subtle auto-advance every 7 seconds, pauses when user hovers or interacts
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextClient, 7000);
    return () => clearInterval(timer);
  }, [isPaused, nextClient]);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const activeClient = CLIENT_CONFIGS[activeIndex];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative min-h-screen flex flex-col justify-center py-10 sm:py-14 lg:py-16 overflow-hidden bg-slate-100 dark:bg-none dark:bg-[#070b14] border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <TechBackground variant="section" pattern="grid" />

      <Container size="lg" className="relative z-10">
        {/* Section Header with Testimonials Marker Badge */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-3">
            <span className="font-mono text-[11px] font-bold text-amber-500 tracking-widest px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 shadow-2xs">
              05 // CLIENT TRUST & REVIEWS
            </span>
            <span className="h-px w-6 bg-slate-300 dark:bg-slate-700 hidden sm:block" />
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold tracking-wider uppercase shadow-2xs">
              <MessageSquareQuote className="w-3.5 h-3.5 shrink-0" />
              <span>{t("kicker")}</span>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-surface border border-slate-200/80 dark:border-border/80 text-[11px] font-mono text-slate-600 dark:text-slate-300">
              <ShieldCheck className="w-3 h-3 text-amber-500" />
              <span>Strategic Partnership & Support</span>
            </div>
          </div>

          <h2
            id="testimonials-heading"
            className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-foreground tracking-tight leading-[1.15] mb-2.5"
          >
            <span>{t("title_prefix")} </span>
            <CircleHighlight
              strokeColor="#0085EB"
              strokeWidth={3}
              className="text-primary font-black inline-block mx-1"
            >
              {t("title_highlight")}
            </CircleHighlight>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
            {t("description")}
          </p>
        </div>

        {/* 1. Main Interactive Bento Spotlight */}
        <div className="relative rounded-3xl p-5 sm:p-7 lg:p-8 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden mb-5 sm:mb-6">
          {/* Ambient Corner Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
            >
              {/* Left Column: Real Production Screenshot & Verified Proof (5 cols) */}
              <div className="lg:col-span-5 relative group">
                <div className="relative h-60 sm:h-72 lg:h-80 w-full rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-lg">
                  <Image
                    src={activeClient.image}
                    alt={t(`items.${activeIndex}.company`)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />

                  {/* Gradient overlays to guarantee razor-sharp badge contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-slate-950/60" />

                  {/* Top-Left Floating Badge: Verified Client Status */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-white/20 text-emerald-400 text-[11px] font-mono backdrop-blur-md shadow-md z-10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{t("verified_badge")}</span>
                  </div>

                  {/* Bottom Badges Container: Responsive flex-wrap to prevent any collision or overlap */}
                  <div className="absolute inset-x-3.5 bottom-3.5 z-10 flex flex-wrap items-end justify-between gap-2 pointer-events-none">
                    {/* Enterprise Project Category Pill */}
                    <div className="pointer-events-auto">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-primary/90 text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm">
                        {t(`items.${activeIndex}.project_type`)}
                      </span>
                    </div>

                    {/* Floating Metric Badge */}
                    <div className="pointer-events-auto ml-auto px-3 py-1.5 rounded-xl bg-slate-900/95 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs shadow-xl backdrop-blur-md flex items-center gap-1.5 shrink-0">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{t(`items.${activeIndex}.metric`)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Executive Endorsement, Quote & Deliverables (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5">
                {/* Header Row: Stars Rating + Carousel Controls */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      5.0 / 5.0
                    </span>
                    <span className="hidden sm:inline-block text-[11px] text-muted-foreground font-mono">
                      (Enterprise Review)
                    </span>
                  </div>

                  {/* Carousel Step Controls */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground font-medium">
                      0{activeIndex + 1} / 03
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={prevClient}
                        aria-label="Previous Testimonial"
                        className="w-7 h-7 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-foreground hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextClient}
                        aria-label="Next Testimonial"
                        className="w-7 h-7 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-foreground hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Big Formatted Quote */}
                <div className="relative pl-3 sm:pl-4 border-l-2 border-primary/60">
                  <p className="font-heading text-base sm:text-lg lg:text-xl font-medium text-foreground leading-relaxed italic">
                    &ldquo;{t(`items.${activeIndex}.quote`)}&rdquo;
                  </p>
                </div>

                {/* Concrete Deliverable Box */}
                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="font-sans text-xs text-slate-700 dark:text-slate-300 leading-normal">
                    <strong className="text-foreground font-semibold">Hasil Teruji: </strong>
                    {t(`items.${activeIndex}.deliverables`)}
                  </p>
                </div>

                {/* Bottom Row: Executive Profile & CTA */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-11 h-11 rounded-full bg-gradient-to-tr text-white font-bold text-sm shadow-sm flex items-center justify-center shrink-0 ring-2 ring-primary/20",
                        activeClient.avatarBg
                      )}
                    >
                      {t(`items.${activeIndex}.name`).charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-bold text-foreground">
                        {t(`items.${activeIndex}.name`)}
                      </h3>
                      <p className="font-sans text-xs text-muted-foreground font-medium">
                        {t(`items.${activeIndex}.role`)}
                      </p>
                      <p className="font-sans text-xs text-primary font-semibold flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{t(`items.${activeIndex}.company`)}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={scrollToContact}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-primary hover:text-white dark:bg-slate-800 dark:hover:bg-primary dark:text-slate-200 text-xs font-semibold font-sans transition-all duration-300 shadow-2xs group cursor-pointer"
                  >
                    <span>{t("cta_consult")}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 2. Interactive Quick-Select Client Cards (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-5 sm:mb-6">
          {[0, 1, 2].map((idx) => {
            const isSelected = activeIndex === idx;
            const config = CLIENT_CONFIGS[idx];

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "relative text-left p-4 sm:p-4.5 rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between",
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-primary shadow-md ring-2 ring-primary/20"
                    : "bg-white/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                )}
              >
                {/* Active Animated Progress Bar */}
                {isSelected && !isPaused && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-cyan-400"
                    initial={{ scaleX: 0, transformOrigin: "0%" }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 7, ease: "linear" }}
                    key={activeIndex}
                  />
                )}

                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-lg bg-gradient-to-tr text-white text-xs font-bold flex items-center justify-center shrink-0",
                        config.avatarBg
                      )}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-heading text-xs sm:text-sm font-bold text-foreground line-clamp-1">
                        {t(`items.${idx}.company`)}
                      </h4>
                      <p className="font-sans text-[11px] text-muted-foreground line-clamp-1">
                        {t(`items.${idx}.name`)} • {t(`items.${idx}.role`)}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {t(`items.${idx}.metric`)}
                  </span>
                </div>

                <p className="font-sans text-xs text-muted-foreground line-clamp-2 italic">
                  &ldquo;{t(`items.${idx}.quote`)}&rdquo;
                </p>
              </button>
            );
          })}
        </div>

        {/* 3. Sleek Enterprise Trust Metrics Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 py-3 px-5 sm:px-6 rounded-2xl bg-white/60 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/70 backdrop-blur-sm text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
            <span className="text-foreground font-semibold">
              {t("trust_points.sla")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-foreground font-semibold">
              {t("trust_points.on_time")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-500 shrink-0" />
            <span className="text-foreground font-semibold">
              {t("trust_points.handover")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-foreground font-semibold">
              {t("trust_points.retention")}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TestimonialsSection;
