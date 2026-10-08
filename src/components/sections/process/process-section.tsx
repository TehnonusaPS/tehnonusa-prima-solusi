"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  Search,
  Layers,
  LayoutTemplate,
  Code2,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Calendar,
  Wrench,
  ArrowRight,
  Terminal,
  Cpu,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CircleHighlight } from "@/components/ui/draw-circle-text";
import { SlideTabs, type TabItem } from "@/components/ui/slide-tabs";
import { DrawOutlineButton } from "@/components/ui/creative-buttons";
import { TechBackground } from "@/components/ui/tech-background";
import { cn } from "@/lib/utils";

export interface ProcessSectionProps {
  className?: string;
}

type PhaseKey =
  | "discovery"
  | "architecture"
  | "prototyping"
  | "development"
  | "qa_testing"
  | "deployment";

interface PhaseConfig {
  key: PhaseKey;
  stepNum: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  accentColor: string;
}

const PHASES_CONFIG: PhaseConfig[] = [
  {
    key: "discovery",
    stepNum: "01",
    icon: Search,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    accentColor: "#0085EB",
  },
  {
    key: "architecture",
    stepNum: "02",
    icon: Layers,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
    accentColor: "#6366F1",
  },
  {
    key: "prototyping",
    stepNum: "03",
    icon: LayoutTemplate,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    accentColor: "#A855F7",
  },
  {
    key: "development",
    stepNum: "04",
    icon: Code2,
    iconColor: "text-cyan-500",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    accentColor: "#06B6D4",
  },
  {
    key: "qa_testing",
    stepNum: "05",
    icon: ShieldCheck,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    accentColor: "#F59E0B",
  },
  {
    key: "deployment",
    stepNum: "06",
    icon: Rocket,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    accentColor: "#10B981",
  },
];

const processCardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

export function ProcessSection({ className }: ProcessSectionProps) {
  const t = useTranslations("process");
  const [activePhaseKey, setActivePhaseKey] = React.useState<PhaseKey>("discovery");

  const activePhase = React.useMemo(
    () => PHASES_CONFIG.find((p) => p.key === activePhaseKey) ?? PHASES_CONFIG[0],
    [activePhaseKey]
  );

  const tabs: TabItem[] = React.useMemo(
    () =>
      PHASES_CONFIG.map((p) => ({
        id: p.key,
        label: t(`phases.${p.key}.tab_label`),
      })),
    [t]
  );

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const deliverables = [0, 1, 2, 3].map((idx) =>
    t(`phases.${activePhase.key}.deliverables.${idx}`)
  );

  const ActiveIcon = activePhase.icon;

  return (
    <section
      id="process"
      className={cn(
        "relative py-24 sm:py-32 overflow-hidden bg-background border-t border-border/60",
        className
      )}
    >
      {/* 1. Architectural Engineering Tech Background */}
      <TechBackground variant="section" pattern="grid" />

      <Container size="lg">
        {/* 2. Section Header with Hand-Drawn Highlight */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold tracking-wider uppercase mb-4 shadow-2xs">
            <Cpu className="w-3.5 h-3.5 shrink-0" />
            <span>{t("kicker")}</span>
          </div>

          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight leading-[1.15] mb-5">
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

        {/* 3. Interactive SlideTabs Navigation */}
        <div className="mb-10 sm:mb-14 overflow-x-auto pb-2 scrollbar-none flex justify-start sm:justify-center">
          <SlideTabs
            tabs={tabs}
            activeId={activePhaseKey}
            onChange={(id) => setActivePhaseKey(id as PhaseKey)}
            className="bg-surface/90 border-border/80 shadow-sm"
          />
        </div>

        {/* 4. Active Workflow Phase Detailed Showcase Card */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase.key}
              variants={processCardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-surface/95 shadow-xl overflow-hidden backdrop-blur-md"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
                {/* Left Column: Phase Content & Specifications (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    {/* Phase Header Tag Row */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs",
                            activePhase.iconBg
                          )}
                        >
                          <ActiveIcon className={cn("w-6 h-6", activePhase.iconColor)} />
                        </div>
                        <div>
                          <span className="font-mono text-xs font-bold text-primary tracking-widest uppercase block">
                            {t(`phases.${activePhase.key}.step`)}
                          </span>
                          <span className="font-sans text-xs text-muted-foreground font-medium">
                            {t(`phases.${activePhase.key}.tagline`)}
                          </span>
                        </div>
                      </div>

                      {/* Cadence Badge */}
                      <Badge
                        variant="surface"
                        size="sm"
                        className="font-mono text-[11px] font-semibold flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{t(`phases.${activePhase.key}.cadence`)}</span>
                      </Badge>
                    </div>

                    {/* Phase Title */}
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
                      {t(`phases.${activePhase.key}.title`)}
                    </h3>

                    {/* Phase Description */}
                    <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
                      {t(`phases.${activePhase.key}.description`)}
                    </p>

                    {/* Key Deliverables Matrix */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-3">
                        <Terminal className="w-3.5 h-3.5 text-primary" />
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Key Deliverables:
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {deliverables.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 text-xs sm:text-sm font-medium text-foreground/90"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action & Tooling Stack */}
                  <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <Wrench className="w-3.5 h-3.5 text-primary" />
                      <span className="font-semibold uppercase tracking-wider">Engineered with:</span>
                      <span className="text-foreground font-medium">
                        Standardized Enterprise Specs
                      </span>
                    </div>

                    <DrawOutlineButton
                      onClick={scrollToContact}
                      className="self-start sm:self-auto px-5 py-2.5 text-xs font-sans font-semibold"
                    >
                      <span>{t("cta_button")}</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </DrawOutlineButton>
                  </div>
                </div>

                {/* Right Column: Architectural Visual Graphic with Telemetry (5 cols) */}
                <div className="lg:col-span-5 relative bg-slate-950 min-h-[300px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-200/90 dark:border-slate-800 flex flex-col justify-between p-6 sm:p-8">
                  {/* Background Image: data-core.jpg */}
                  <div className="absolute inset-0">
                    <Image
                      src="/images/data-core.jpg"
                      alt="Tehnonusa Engineering Process Architecture"
                      fill
                      className="object-cover object-center opacity-40 mix-blend-luminosity transform scale-105"
                      sizes="(max-width: 1024px) 100vw, 450px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
                  </div>

                  {/* Top Overlay: Telemetry HUD Header */}
                  <div className="relative z-10 flex items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono text-xs text-white/80 font-semibold tracking-wider uppercase">
                        SLA QUALITY GATE
                      </span>
                    </div>
                    <span className="font-mono text-xs text-primary font-bold">
                      PHASE {activePhase.stepNum} / 06
                    </span>
                  </div>

                  {/* Center Overlay: Architectural Milestone Indicators */}
                  <div className="relative z-10 py-6 my-auto space-y-3">
                    <div className="p-3.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-lg">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1.5">
                        <span className="font-bold text-white">Verification Gate</span>
                        <span className="text-emerald-400 font-semibold">100% Passed</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-emerald-400 w-full" />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-lg">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1.5">
                        <span className="font-bold text-white">Client Governance</span>
                        <span className="text-cyan-400 font-semibold">Weekly Demo</span>
                      </div>
                      <p className="text-[11px] font-sans text-slate-400 leading-tight">
                        Akses repositori Git langsung, staging live review, dan pelaporan terstruktur.
                      </p>
                    </div>
                  </div>

                  {/* Bottom HUD: Security & SLA Guarantee */}
                  <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-white/70 font-mono text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Zero-Downtime Guarantee</span>
                    </div>
                    <span>99.9% SLA</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 5. Phase Step Overview Cards (Quick 6-Step Horizontal Navigator on Desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-10">
          {PHASES_CONFIG.map((phase) => {
            const Icon = phase.icon;
            const isSelected = activePhaseKey === phase.key;

            return (
              <button
                key={phase.key}
                type="button"
                onClick={() => setActivePhaseKey(phase.key)}
                className={cn(
                  "p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer select-none flex flex-col justify-between group",
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-primary shadow-md shadow-primary/10 ring-1 ring-primary/40 -translate-y-1"
                    : "bg-surface/80 hover:bg-surface border-border/80 hover:border-border text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center border transition-transform duration-300 group-hover:scale-105",
                      phase.iconBg
                    )}
                  >
                    <Icon className={cn("w-4 h-4", phase.iconColor)} />
                  </div>
                  <span
                    className={cn(
                      "font-mono text-xs font-bold",
                      isSelected ? "text-primary" : "text-muted-foreground/60"
                    )}
                  >
                    {phase.stepNum}
                  </span>
                </div>

                <div>
                  <h4
                    className={cn(
                      "font-heading text-xs sm:text-sm font-bold tracking-tight mb-1",
                      isSelected ? "text-foreground" : "text-foreground/80 group-hover:text-primary"
                    )}
                  >
                    {t(`phases.${phase.key}.tab_label`).split(". ")[1]}
                  </h4>
                  <span className="font-mono text-[10px] text-muted-foreground block">
                    {t(`phases.${phase.key}.cadence`)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default ProcessSection;
