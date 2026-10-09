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
  ArrowUpRight,
  ExternalLink,
  Lock,
  Globe,
  QrCode,
  BookOpen,
  CreditCard,
  Smartphone,
  Sparkles,
  Monitor,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { TechBackground } from "@/components/ui/tech-background";
import { CircleHighlight } from "@/components/ui/draw-circle-text";
import { DrawOutlineButton } from "@/components/ui/creative-buttons";
import { FloatingPhone } from "@/components/ui/floating-phone";
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
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

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
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-background transition-colors duration-300"
    >
      {/* 1. Ambient Matrix Grid Background */}
      <TechBackground variant="section" pattern="dots" />

      <Container size="lg">
        {/* 2. Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono font-semibold tracking-wider uppercase mb-2.5 shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
            <span>{t("kicker")}</span>
          </div>

          <h2
            id="portfolio-heading"
            className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-foreground tracking-tight leading-snug mb-2.5"
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

          <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
            {t("description")}
          </p>
        </div>

        {/* 3. Featured Flagship Project Showcase Card */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-surface/95 shadow-xl overflow-hidden backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Column: Product Story, Metrics & Interactive Modules (7 cols) */}
            <div className="lg:col-span-7 p-5 sm:p-7 lg:p-8 flex flex-col justify-between">
              <div>
                {/* Badge Tag & Primary Accuracy SLA */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <span className="font-mono text-[11px] font-bold tracking-wider px-2.5 py-0.5 rounded-md border border-primary/30 text-primary bg-primary/10">
                    {t("project.tag")}
                  </span>

                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold">
                    <TrendingUp className="w-3 h-3" />
                    <span>
                      {t("project.metric_value")}{" "}
                      <span className="text-[10px] font-normal text-muted-foreground">
                        {t("project.metric_label")}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Main Project Title & Subtitle */}
                <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-1">
                  {t("project.title")}
                </h3>

                <p className="font-sans text-xs font-semibold text-primary mb-2">
                  {t("project.subtitle")}
                </p>

                {/* Project Description */}
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3.5 line-clamp-2 sm:line-clamp-none">
                  {t("project.description")}
                </p>

                {/* 3 Key Metrics Cards Grid */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 mb-3.5">
                  {projectMetrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <span className="font-heading text-sm sm:text-base font-bold text-primary block leading-tight">
                        {metric.val}
                      </span>
                      <span className="font-sans text-[10px] sm:text-[11px] text-muted-foreground block line-clamp-1 mt-0.5">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Interactive Core Modules Selector */}
                <div className="mb-3.5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Layers className="w-3.5 h-3.5 text-primary" />
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Modul Unggulan Sistem:
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-2.5">
                    {MODULES_CONFIG.map((mod) => {
                      const Icon = mod.icon;
                      const isSelected = activeModuleKey === mod.key;
                      const modData = projectModules.find((m) => m.key === mod.key);

                      return (
                        <button
                          key={mod.key}
                          type="button"
                          onClick={() => {
                            setActiveModuleKey(mod.key);
                            if (mod.key === "mobile") {
                              setViewMode("mobile");
                            } else {
                              setViewMode("desktop");
                            }
                          }}
                          className={cn(
                            "p-2 rounded-lg border text-left transition-all duration-200 flex flex-col justify-between gap-1 cursor-pointer select-none",
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary shadow-xs ring-1 ring-primary/40"
                              : "bg-surface/80 hover:bg-surface text-muted-foreground hover:text-foreground border-border/80"
                          )}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="font-heading text-[11px] font-bold leading-tight line-clamp-1">
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
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="p-2.5 sm:p-3 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20 text-xs text-foreground/90"
                    >
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Sparkles className="w-3 h-3 text-primary shrink-0" />
                        <span className="font-heading font-bold text-[11px] text-primary">
                          {activeModuleData?.name} ({activeModuleConfig.badge})
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-muted-foreground leading-relaxed">
                        {activeModuleData?.desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Key System Highlights */}
                <div className="space-y-1 mb-3.5">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
                    Kelebihan Arsitektur Sistem:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {projectHighlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-1.5 text-[11px] font-medium text-foreground/90 leading-tight"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tech Stack Chips & Action Button */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1">
                  {TECH_STACK.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-[10px] font-mono text-foreground/80 border border-slate-200/60 dark:border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="https://school-app.tehnonusa.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-xs font-sans font-semibold transition-colors shadow-2xs"
                  >
                    <span>Kunjungi Aplikasi</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <DrawOutlineButton
                    onClick={scrollToContact}
                    className="self-start sm:self-auto px-3 py-1.5 text-xs font-sans font-semibold shrink-0"
                  >
                    <span>{t("cta_discuss")}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </DrawOutlineButton>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Browser Window / 3D Floating Mobile Phone Showcase (5 cols) */}
            <div className="lg:col-span-5 relative bg-slate-950 min-h-[480px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-200/90 dark:border-slate-800 flex flex-col justify-between p-4 sm:p-5">
              {/* Top View Toggle Switcher Bar */}
              <div className="flex items-center justify-between gap-2 pb-2.5 mb-1.5 border-b border-white/10 z-10">
                <div className="inline-flex p-0.5 rounded-lg bg-slate-900 border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => setViewMode("desktop")}
                    className={cn(
                      "px-2.5 py-1 rounded-md font-medium text-[11px] transition-all flex items-center gap-1.5 cursor-pointer",
                      viewMode === "desktop"
                        ? "bg-primary text-white shadow-2xs"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    <Monitor className="w-3 h-3" />
                    <span>Web Dashboard</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("mobile")}
                    className={cn(
                      "px-2.5 py-1 rounded-md font-medium text-[11px] transition-all flex items-center gap-1.5 cursor-pointer",
                      viewMode === "mobile"
                        ? "bg-primary text-white shadow-2xs"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>Mobile App (3D)</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="hidden sm:inline">Online Demo</span>
                </div>
              </div>

              {/* Main Preview Container with AnimatePresence */}
              <div className="my-auto py-2 flex items-center justify-center min-h-[480px]">
                <AnimatePresence mode="wait">
                  {viewMode === "desktop" ? (
                    <motion.div
                      key="desktop-view"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      {/* Browser Window Chrome Frame */}
                      <div className="rounded-xl border border-white/10 bg-slate-900/90 shadow-2xl overflow-hidden flex flex-col">
                        {/* Browser Title Bar / Address Bar */}
                        <div className="px-3 py-2 bg-slate-900 border-b border-white/10 flex items-center justify-between gap-2">
                          {/* Traffic Light Dots */}
                          <div className="flex items-center gap-1 shrink-0">
                            <span className="w-2 h-2 rounded-full bg-rose-500/80 inline-block" />
                            <span className="w-2 h-2 rounded-full bg-amber-500/80 inline-block" />
                            <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block" />
                          </div>

                          {/* URL Address Bar Pill */}
                          <a
                            href="https://school-app.tehnonusa.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 max-w-xs mx-auto px-2.5 py-0.5 rounded-md bg-slate-950/80 border border-white/10 text-[10px] font-mono text-slate-300 hover:text-white flex items-center justify-center gap-1 group transition-colors"
                          >
                            <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                            <span className="truncate">school-app.tehnonusa.com</span>
                            <ExternalLink className="w-2.5 h-2.5 text-slate-400 group-hover:text-primary transition-colors shrink-0" />
                          </a>

                          {/* Production Live Status Tag */}
                          <div className="hidden sm:flex items-center gap-1 shrink-0 font-mono text-[9px] text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Live</span>
                          </div>
                        </div>

                        {/* Browser Screen Body: Clean 16:9 UI Screenshot */}
                        <a
                          href="https://school-app.tehnonusa.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative block w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden group/screen cursor-pointer"
                          title="Klik untuk membuka demo live school-app.tehnonusa.com"
                        >
                          <Image
                            src="/images/gerbang-sekolah.jpg"
                            alt="GerbangSekolah - Dashboard Sistem Manajemen Sekolah"
                            fill
                            className="object-cover object-top group-hover/screen:scale-102 transition-transform duration-500 ease-out"
                            sizes="(max-width: 1024px) 100vw, 520px"
                            priority
                          />
                          {/* Subtle hover overlay */}
                          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                            <span className="px-3 py-1 rounded-full bg-slate-950/90 text-white font-sans text-[11px] font-semibold border border-white/20 shadow-lg flex items-center gap-1">
                              <span>Buka Aplikasi</span>
                              <ExternalLink className="w-3 h-3 text-primary" />
                            </span>
                          </div>
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="mobile-view"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.2 }}
                      className="w-full flex items-center justify-center"
                    >
                      <FloatingPhone appUrl="https://school-app.tehnonusa.com/" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Quick Direct Access Footer */}
              <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 z-10">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-primary" />
                  <span>school-app.tehnonusa.com</span>
                </span>
                <a
                  href="https://school-app.tehnonusa.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-light font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Buka Live</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PortfolioSection;
