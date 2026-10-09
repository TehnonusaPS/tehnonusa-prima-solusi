"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap,
  Layers,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  QrCode,
  BookOpen,
  CreditCard,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { TechBackground } from "@/components/ui/tech-background";
import { CircleHighlight } from "@/components/ui/draw-circle-text";
import { DrawOutlineButton } from "@/components/ui/creative-buttons";
import { cn } from "@/lib/utils";

interface ModuleConfig {
  key: string;
  icon: LucideIcon;
  badge: string;
}

const MODULES_CONFIG: ModuleConfig[] = [
  {
    key: "attendance",
    icon: QrCode,
    badge: "IoT & WhatsApp Broadcast",
  },
  {
    key: "academic",
    icon: BookOpen,
    badge: "Kurikulum & e-Rapor",
  },
  {
    key: "finance",
    icon: CreditCard,
    badge: "Virtual Account & QRIS",
  },
  {
    key: "mobile",
    icon: Smartphone,
    badge: "iOS & Android App",
  },
];

const TECH_STACK = [
  "Next.js 16",
  "Flutter Mobile",
  "Go Fiber API",
  "PostgreSQL",
  "Redis Cache",
  "WhatsApp Gateway",
  "IoT RFID Reader",
];

export function PortfolioSection() {
  const t = useTranslations("portfolio");
  const [activeModuleKey, setActiveModuleKey] = useState<string>("attendance");

  const projectMetrics = (t.raw("project.metrics") as Array<{
    val: string;
    label: string;
  }>) || [];

  const projectHighlights =
    (t.raw("project.highlights") as string[]) || [];

  const projectModules = (t.raw("project.modules") as Array<{
    key: string;
    name: string;
    desc: string;
  }>) || [];

  const activeModuleData =
    projectModules.find((m) => m.key === activeModuleKey) || projectModules[0];

  const activeModuleConfig =
    MODULES_CONFIG.find((m) => m.key === activeModuleKey) || MODULES_CONFIG[0];

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative py-24 sm:py-32 overflow-hidden bg-background transition-colors duration-300"
    >
      {/* 1. Ambient Matrix Grid Background */}
      <TechBackground variant="section" pattern="dots" />

      <Container size="lg">
        {/* 2. Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold tracking-wider uppercase mb-4 shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
            <span>{t("kicker")}</span>
          </div>

          <h2
            id="portfolio-heading"
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight leading-[1.15] mb-5"
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

          <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* 3. Featured Flagship Project Showcase Card */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-surface/95 shadow-xl overflow-hidden backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Column: Product Story, Metrics & Interactive Modules (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-9 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Badge Tag & Primary Accuracy SLA */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="font-mono text-xs font-bold tracking-wider px-3 py-1 rounded-md border border-primary/30 text-primary bg-primary/10">
                    {t("project.tag")}
                  </span>

                  <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>
                      {t("project.metric_value")}{" "}
                      <span className="text-[11px] font-normal text-muted-foreground">
                        {t("project.metric_label")}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Main Project Title */}
                <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
                  {t("project.title")}
                </h3>

                <p className="font-sans text-xs sm:text-sm font-semibold text-primary mb-4">
                  {t("project.subtitle")}
                </p>

                {/* Project Description */}
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                  {t("project.description")}
                </p>

                {/* 3 Key Metrics Cards Grid */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 mb-6">
                  {projectMetrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <span className="font-heading text-base sm:text-xl font-bold text-primary block">
                        {metric.val}
                      </span>
                      <span className="font-sans text-[11px] sm:text-xs text-muted-foreground block line-clamp-1">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Interactive Core Modules Selector */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-3.5 h-3.5 text-primary" />
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Modul Unggulan Sistem:
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {MODULES_CONFIG.map((mod) => {
                      const Icon = mod.icon;
                      const isSelected = activeModuleKey === mod.key;
                      const modData = projectModules.find((m) => m.key === mod.key);

                      return (
                        <button
                          key={mod.key}
                          type="button"
                          onClick={() => setActiveModuleKey(mod.key)}
                          className={cn(
                            "p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-1.5 cursor-pointer select-none",
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary shadow-sm ring-1 ring-primary/40"
                              : "bg-surface/80 hover:bg-surface text-muted-foreground hover:text-foreground border-border/80"
                          )}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="font-heading text-xs font-bold leading-tight line-clamp-1">
                            {modData ? modData.name : mod.key}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Module Detailed Description Card */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeModuleKey}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="p-3.5 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20 text-xs sm:text-sm text-foreground/90"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="font-heading font-bold text-xs text-primary">
                          {activeModuleData?.name} ({activeModuleConfig.badge})
                        </span>
                      </div>
                      <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                        {activeModuleData?.desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Key System Highlights */}
                <div className="space-y-2 mb-6">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                    Kelebihan Arsitektur Sistem:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {projectHighlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs font-medium text-foreground/90"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tech Stack Chips & Action Button */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  {TECH_STACK.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-[11px] font-mono text-foreground/80 border border-slate-200/60 dark:border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <DrawOutlineButton
                  onClick={scrollToContact}
                  className="self-start sm:self-auto px-5 py-2.5 text-xs font-sans font-semibold shrink-0"
                >
                  <span>{t("cta_discuss")}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </DrawOutlineButton>
              </div>
            </div>

            {/* Right Column: Visual Mockup Showcase (5 cols) */}
            <div className="lg:col-span-5 relative bg-slate-950 min-h-[350px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-200/90 dark:border-slate-800 flex items-center justify-center p-6 sm:p-8 group">
              <div className="relative w-full h-[340px] lg:h-full min-h-[320px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/images/gerbang-sekolah.jpg"
                  alt="GerbangSekolah - Dashboard & Telemetri Aplikasi Sekolah"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Live Status Overlay Tag */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white font-mono text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>FLAGSHIP EDUTECH SOLUTION</span>
                </div>

                {/* Bottom Overlay Info Tag */}
                <div className="absolute bottom-4 left-4 right-4 z-10 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-white flex items-center justify-between text-xs">
                  <div>
                    <span className="font-heading font-bold block">GerbangSekolah Platform</span>
                    <span className="font-mono text-[10px] text-slate-400">By PT Tehnonusa Prima Solusi</span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                    Live System
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PortfolioSection;
