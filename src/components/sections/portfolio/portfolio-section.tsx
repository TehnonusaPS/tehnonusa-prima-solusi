"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import {
  Briefcase,
  Layers,
  TrendingUp,
  Cpu,
  Server,
  Zap,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ShieldAlert,
  BarChart3,
  Smartphone,
  Database,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { TechBackground } from "@/components/ui/tech-background";
import { CircleHighlight } from "@/components/ui/draw-circle-text";
import { DrawOutlineButton } from "@/components/ui/creative-buttons";
import { cn } from "@/lib/utils";

type CaseKey = "erp" | "logistics" | "fintech";

interface CaseConfig {
  key: CaseKey;
  image: string;
  categoryIcon: LucideIcon;
  techStack: string[];
  gradientAccent: string;
  badgeColor: string;
}

const CASES_CONFIG: CaseConfig[] = [
  {
    key: "erp",
    image: "/images/portfolio-erp.jpg",
    categoryIcon: Database,
    techStack: ["Next.js 16", "Go Fiber", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
    gradientAccent: "from-blue-600/20 via-cyan-500/10 to-transparent",
    badgeColor: "border-blue-500/30 text-blue-400 bg-blue-500/10",
  },
  {
    key: "logistics",
    image: "/images/portfolio-logistics.jpg",
    categoryIcon: Smartphone,
    techStack: ["Flutter", "WebSockets", "Kafka", "TimescaleDB", "GCP Cloud"],
    gradientAccent: "from-cyan-600/20 via-emerald-500/10 to-transparent",
    badgeColor: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
  },
  {
    key: "fintech",
    image: "/images/portfolio-fintech.jpg",
    categoryIcon: Zap,
    techStack: ["Java / Quarkus", "PostgreSQL", "Redis Cluster", "AWS EKS", "HashiCorp Vault"],
    gradientAccent: "from-emerald-600/20 via-teal-500/10 to-transparent",
    badgeColor: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  },
];

export function PortfolioSection() {
  const t = useTranslations("portfolio");
  const [activeCaseKey, setActiveCaseKey] = useState<CaseKey>("erp");

  const activeConfig =
    CASES_CONFIG.find((c) => c.key === activeCaseKey) || CASES_CONFIG[0];

  const getCaseShortTitle = (key: CaseKey) => {
    switch (key) {
      case "erp":
        return t("cases.erp.title").split(" — ")[0];
      case "logistics":
        return t("cases.logistics.title").split(" — ")[0];
      case "fintech":
        return t("cases.fintech.title").split(" — ")[0];
    }
  };

  const activeData = React.useMemo(() => {
    switch (activeCaseKey) {
      case "erp":
        return {
          tag: t("cases.erp.tag"),
          title: t("cases.erp.title"),
          description: t("cases.erp.description"),
          metricValue: t("cases.erp.metric_value"),
          metricLabel: t("cases.erp.metric_label"),
          metrics:
            (t.raw("cases.erp.metrics") as Array<{
              val: string;
              label: string;
            }>) || [],
          highlights: (t.raw("cases.erp.highlights") as string[]) || [],
        };
      case "logistics":
        return {
          tag: t("cases.logistics.tag"),
          title: t("cases.logistics.title"),
          description: t("cases.logistics.description"),
          metricValue: t("cases.logistics.metric_value"),
          metricLabel: t("cases.logistics.metric_label"),
          metrics:
            (t.raw("cases.logistics.metrics") as Array<{
              val: string;
              label: string;
            }>) || [],
          highlights: (t.raw("cases.logistics.highlights") as string[]) || [],
        };
      case "fintech":
        return {
          tag: t("cases.fintech.tag"),
          title: t("cases.fintech.title"),
          description: t("cases.fintech.description"),
          metricValue: t("cases.fintech.metric_value"),
          metricLabel: t("cases.fintech.metric_label"),
          metrics:
            (t.raw("cases.fintech.metrics") as Array<{
              val: string;
              label: string;
            }>) || [],
          highlights: (t.raw("cases.fintech.highlights") as string[]) || [],
        };
    }
  }, [activeCaseKey, t]);

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
            <Briefcase className="w-3.5 h-3.5 shrink-0" />
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

        {/* 3. Case Selector Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {CASES_CONFIG.map((item) => {
            const Icon = item.categoryIcon;
            const isSelected = activeCaseKey === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveCaseKey(item.key)}
                className={cn(
                  "px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0 border",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                    : "bg-surface/80 hover:bg-surface text-muted-foreground hover:text-foreground border-border/80"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{getCaseShortTitle(item.key)}</span>
              </button>
            );
          })}
        </div>

        {/* 4. Active Case Study Feature Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeConfig.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-surface/95 shadow-xl overflow-hidden backdrop-blur-md"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Column: Case Story, Metrics & Highlights (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  {/* Category Tag & Impact Metric Row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <span
                      className={cn(
                        "font-mono text-xs font-bold tracking-wider px-3 py-1 rounded-md border",
                        activeConfig.badgeColor
                      )}
                    >
                      {activeData.tag}
                    </span>

                    <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>
                        {activeData.metricValue}{" "}
                        <span className="text-[11px] font-normal text-muted-foreground">
                          {activeData.metricLabel}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Case Title */}
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
                    {activeData.title}
                  </h3>

                  {/* Case Story Description */}
                  <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                    {activeData.description}
                  </p>

                  {/* 3 Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 mb-6">
                    {activeData.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <span className="font-heading text-lg sm:text-2xl font-bold text-primary block">
                          {metric.val}
                        </span>
                        <span className="font-sans text-[11px] sm:text-xs text-muted-foreground block line-clamp-1">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Key Architecture Highlights */}
                  <div className="space-y-2 mb-6">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                      Architectural Highlights:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeData.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs sm:text-sm font-medium text-foreground/90"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tech Stack Chips & Action Button */}
                <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {activeConfig.techStack.map((tech) => (
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
              <div className="lg:col-span-5 relative bg-slate-950 min-h-[320px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-200/90 dark:border-slate-800 flex items-center justify-center p-6 group">
                <div className="relative w-full h-[320px] lg:h-full min-h-[300px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src={activeConfig.image}
                    alt={t(`cases.${activeConfig.key}.title`)}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 480px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Live Status Overlay Tag */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white font-mono text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>PRODUCTION SYSTEM</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}

export default PortfolioSection;
