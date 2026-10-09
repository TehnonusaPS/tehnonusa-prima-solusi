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
import { LottieAnimation } from "@/components/ui/lottie-animation";
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
  lottieSrc: string;
}

const PHASES_CONFIG: PhaseConfig[] = [
  {
    key: "discovery",
    stepNum: "01",
    icon: Search,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    accentColor: "#0085EB",
    lottieSrc: "/lottie/phase-01-discovery.json",
  },
  {
    key: "architecture",
    stepNum: "02",
    icon: Layers,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
    accentColor: "#6366F1",
    lottieSrc: "/lottie/phase-02-architecture.json",
  },
  {
    key: "prototyping",
    stepNum: "03",
    icon: LayoutTemplate,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    accentColor: "#A855F7",
    lottieSrc: "/lottie/phase-03-prototyping.json",
  },
  {
    key: "development",
    stepNum: "04",
    icon: Code2,
    iconColor: "text-cyan-500",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    accentColor: "#06B6D4",
    lottieSrc: "/lottie/phase-04-development.json",
  },
  {
    key: "qa_testing",
    stepNum: "05",
    icon: ShieldCheck,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    accentColor: "#F59E0B",
    lottieSrc: "/lottie/phase-05-qa-testing.json",
  },
  {
    key: "deployment",
    stepNum: "06",
    icon: Rocket,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    accentColor: "#10B981",
    lottieSrc: "/lottie/phase-06-deployment.json",
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
  const [isPaused, setIsPaused] = React.useState(false);
  const pauseTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Auto-advance every 5 seconds seamlessly as requested
  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActivePhaseKey((prev) => {
        const currentIndex = PHASES_CONFIG.findIndex((p) => p.key === prev);
        const nextIndex = (currentIndex + 1) % PHASES_CONFIG.length;
        return PHASES_CONFIG[nextIndex].key;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // When user explicitly clicks or selects a phase, pause auto-advance briefly (8s) then resume
  const handleSelectPhase = (key: PhaseKey) => {
    setActivePhaseKey(key);
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 8000);
  };

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

  const toolingList = React.useMemo(() => {
    try {
      return (t.raw(`phases.${activePhase.key}.tooling`) as string[]) || [];
    } catch {
      return [];
    }
  }, [t, activePhase.key]);

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
        <div className="mb-4 sm:mb-6 overflow-x-auto pb-1 scrollbar-none flex justify-start sm:justify-center">
          <SlideTabs
            tabs={tabs}
            activeId={activePhaseKey}
            onChange={(id) => handleSelectPhase(id as PhaseKey)}
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
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
                {/* Left Column: Phase Content & Specifications (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
                  <div>
                    {/* Phase Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center border shadow-xs shrink-0",
                            activePhase.iconBg
                          )}
                        >
                          <ActiveIcon className={cn("w-5 h-5", activePhase.iconColor)} />
                        </div>
                        <div>
                          <span className="font-mono text-xs font-bold text-primary tracking-widest uppercase block leading-tight">
                            {t(`phases.${activePhase.key}.step`)}
                          </span>
                          <span className="font-sans text-xs text-muted-foreground font-medium block mt-0.5">
                            {t(`phases.${activePhase.key}.tagline`)}
                          </span>
                        </div>
                      </div>

                      {/* Cadence Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-mono font-semibold text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{t(`phases.${activePhase.key}.cadence`)}</span>
                      </div>
                    </div>

                    {/* Phase Title */}
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight mb-3">
                      {t(`phases.${activePhase.key}.title`)}
                    </h3>

                    {/* Phase Description */}
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 max-w-xl">
                      {t(`phases.${activePhase.key}.description`)}
                    </p>

                    {/* Key Deliverables Matrix */}
                    <div className="mb-6">
                      <div className="flex items-center gap-1.5 mb-3">
                        <Terminal className="w-3.5 h-3.5 text-primary" />
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Key Deliverables:
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {deliverables.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 hover:border-primary/40 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-2xs group"
                          >
                            <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs sm:text-[13px] font-medium text-foreground/90 leading-snug">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action & Tooling Stack */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5 max-w-md">
                      <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground mr-1">
                        <Wrench className="w-3.5 h-3.5 text-primary" />
                        <span className="font-semibold uppercase tracking-wider">Stack:</span>
                      </div>
                      {toolingList.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 font-mono text-[11px] font-medium text-foreground/85"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToContact();
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-sans font-semibold transition-colors shadow-2xs group cursor-pointer"
                    >
                      <span>{t("cta_button")}</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Right Column: Architectural Visual Graphic with Phase-Specific Harmonized Lottie (5 cols) */}
                <div className="lg:col-span-5 relative bg-[#030519] min-h-[420px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-200/90 dark:border-slate-800 flex flex-col justify-between p-5 sm:p-6">
                  {/* High-Tech Ambient Grid & Radial Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

                  {/* Top Overlay: Telemetry HUD Header */}
                  <div className="relative z-10 flex items-center justify-between gap-2 border border-white/10 p-2.5 bg-slate-950/60 backdrop-blur-md rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="font-mono text-xs text-white/90 font-semibold tracking-wider uppercase">
                        SLA QUALITY GATE
                      </span>
                    </div>
                    <span className="font-mono text-xs text-cyan-300 font-bold px-2 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/30">
                      PHASE {activePhase.stepNum} / 06
                    </span>
                  </div>

                  {/* Center Showcase: Dynamic Lottie Animation specific to Current Phase */}
                  <div className="relative z-10 my-auto py-4 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activePhase.key}
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-[280px] sm:max-w-[320px] aspect-[4/3] flex items-center justify-center"
                      >
                        <LottieAnimation
                          src={activePhase.lottieSrc}
                          layout={{ fit: "contain", align: [0.5, 0.5] }}
                          className="w-full h-full drop-shadow-[0_12px_30px_rgba(0,133,235,0.25)]"
                          loop={true}
                          autoplay={true}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Bottom Compact Telemetry HUD Card */}
                  <div className="relative z-10 mt-auto pt-2">
                    <div className="p-3.5 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-white/15 shadow-2xl space-y-2.5">
                      {/* Metric 1 */}
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-200 font-semibold flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-primary" />
                          Verification Gate
                        </span>
                        <span className="text-emerald-400 font-bold">100% Passed</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 w-full animate-pulse" />
                      </div>

                      {/* Metric 2 & SLA */}
                      <div className="flex items-center justify-between text-[11px] font-mono pt-1.5 border-t border-white/10">
                        <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span>{t(`phases.${activePhase.key}.cadence`)} Demo</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>99.9% SLA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

export default ProcessSection;
