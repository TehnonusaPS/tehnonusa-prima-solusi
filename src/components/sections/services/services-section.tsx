"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  Globe,
  Smartphone,
  CloudCog,
  Workflow,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Info,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CircleHighlight } from "@/components/ui/draw-circle-text";
import { SpotlightButton } from "@/components/ui/creative-buttons";
import { TechBackground } from "@/components/ui/tech-background";
import { cn } from "@/lib/utils";

export interface ServicesSectionProps {
  className?: string;
}

const servicesGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const serviceCardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface ServiceData {
  id: string;
  key: "web_systems" | "mobile_apps" | "custom_cloud" | "digital_transformation";
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  glowBg: string;
  image: string;
  metricBadge: string;
  isFeatured?: boolean;
  techStack: string[];
  gridSpan: string;
}

const serviceItems: ServiceData[] = [
  {
    id: "web-systems",
    key: "web_systems",
    icon: Globe,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/20 border-blue-400/30",
    glowBg: "from-blue-600/20 to-transparent",
    image: "/images/portfolio-erp.jpg",
    metricBadge: "99.9% SLA Ready",
    isFeatured: true,
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    gridSpan: "lg:col-span-7",
  },
  {
    id: "mobile-apps",
    key: "mobile_apps",
    icon: Smartphone,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/20 border-emerald-400/30",
    glowBg: "from-emerald-600/20 to-transparent",
    image: "/images/gerbang-sekolah.jpg",
    metricBadge: "iOS & Android 60FPS",
    techStack: ["Flutter", "React Native", "Swift", "Kotlin"],
    gridSpan: "lg:col-span-5",
  },
  {
    id: "custom-cloud",
    key: "custom_cloud",
    icon: CloudCog,
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/20 border-indigo-400/30",
    glowBg: "from-indigo-600/20 to-transparent",
    image: "/images/systems-mesh.jpg",
    metricBadge: "Zero-Downtime Deploy",
    isFeatured: true,
    techStack: ["Go (Golang)", "Kubernetes", "AWS / GCP", "Kafka"],
    gridSpan: "lg:col-span-5",
  },
  {
    id: "digital-transformation",
    key: "digital_transformation",
    icon: Workflow,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/20 border-cyan-400/30",
    glowBg: "from-cyan-600/20 to-transparent",
    image: "/images/portfolio-fintech.jpg",
    metricBadge: "High-Throughput Sync",
    techStack: ["GraphQL", "REST Gateway", "Webhooks", "RabbitMQ"],
    gridSpan: "lg:col-span-7",
  },
];

export function ServicesSection({ className }: ServicesSectionProps) {
  const tServices = useTranslations("services");
  const [activeDetailService, setActiveDetailService] = React.useState<ServiceData | null>(null);

  // Lock body scroll when detail dialog is active
  React.useEffect(() => {
    if (activeDetailService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeDetailService]);

  // Handle escape key to close dialog
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDetailService(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToContact = (prefillService?: string) => {
    setActiveDetailService(null);
    const el = document.querySelector("#contact");
    el?.scrollIntoView({ behavior: "smooth" });

    if (prefillService) {
      const selectEl = document.querySelector<HTMLSelectElement>("#contact select");
      if (selectEl) {
        selectEl.value = prefillService;
      }
    }
  };

  return (
    <section
      id="services"
      className={cn(
        "relative min-h-screen flex flex-col justify-center py-8 sm:py-12 lg:py-14 overflow-hidden bg-gradient-to-b from-slate-50 via-sky-50/40 to-slate-100/90 dark:bg-none dark:bg-[#070b14] border-b border-slate-200/80 dark:border-slate-800/80",
        className
      )}
    >
      {/* Ambient background glow accents & Light-Mode Architectural Blueprint */}
      <TechBackground variant="section" pattern="grid" />

      <Container size="lg">
        {/* Section Header with Clean Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200/90 dark:border-border/80 bg-white/90 dark:bg-surface/80 backdrop-blur-md shadow-2xs mb-2.5">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-muted-foreground">
              {tServices("kicker")}
            </span>
          </div>

          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-slate-900 dark:text-foreground leading-tight max-w-3xl mb-2.5">
            <span>{tServices("title_prefix")} </span>
            <CircleHighlight
              strokeColor="#0085EB"
              strokeWidth={3}
              className="text-primary font-black"
            >
              {tServices("title_highlight")}
            </CircleHighlight>
          </h2>

          <p className="font-sans text-xs sm:text-sm lg:text-base text-slate-600 dark:text-muted-foreground max-w-2xl leading-relaxed">
            {tServices("description")}
          </p>
        </motion.div>

        {/* Dynamic Bento Grid Layout (7+5 & 5+7) dengan Image Assets & Hover Depth */}
        <motion.div
          variants={servicesGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5 sm:gap-4 lg:gap-4.5 mb-5 items-stretch"
        >
          {serviceItems.map((service) => {
            const IconComponent = service.icon;

            const cardContent = (
              <div
                onClick={() => setActiveDetailService(service)}
                className="relative flex flex-col justify-between h-full min-h-[210px] sm:min-h-[225px] rounded-2xl overflow-hidden border border-slate-300/80 dark:border-white/10 hover:border-primary/60 transition-all duration-300 shadow-lg hover:shadow-2xl group cursor-pointer"
              >
                  {/* 1. Real Image Background with Zoom on Hover */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={service.image}
                      alt={tServices(`${service.key}.title`)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* High-contrast multi-stop dark gradient overlay (Legible in both dark and light modes) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/50 group-hover:via-slate-950/75 transition-colors duration-500" />

                    {/* Subtle ambient theme color overlay */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-25 group-hover:opacity-45 transition-opacity duration-500 pointer-events-none",
                        service.glowBg
                      )}
                    />
                  </div>

                  {/* 2. Interactive Foreground Content */}
                  <div className="relative z-10 flex flex-col justify-between h-full p-4.5 sm:p-5 lg:p-5.5 text-white">
                    {/* Top Row: Icon + Badge + Live Telemetry Chip */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center border shadow-xs backdrop-blur-md group-hover:scale-110 transition-transform",
                            service.iconBg
                          )}
                        >
                          <IconComponent className={cn("w-4.5 h-4.5", service.iconColor)} />
                        </div>

                        <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-white/90 px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-md border border-white/15">
                          {tServices(`${service.key}.badge`)}
                        </span>
                      </div>

                      {/* Live Telemetry Pulse Chip */}
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 text-[10.5px] font-mono text-emerald-400 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{service.metricBadge}</span>
                      </div>
                    </div>

                    {/* Middle: Title, Tagline & Business Value Description */}
                    <div className="my-auto py-1">
                      <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white group-hover:text-primary-light transition-colors line-clamp-1 mb-0.5">
                        {tServices(`${service.key}.title`)}
                      </h3>
                      <p className="font-sans text-xs font-semibold text-cyan-300 line-clamp-1 mb-1.5">
                        {tServices(`${service.key}.tagline`)}
                      </p>
                      <p className="font-sans text-xs text-slate-300 leading-relaxed line-clamp-2">
                        {tServices(`${service.key}.description`)}
                      </p>
                    </div>

                    {/* Bottom Row: Tech Stack Mini Pills & Quick Detail Trigger */}
                    <div className="pt-2.5 border-t border-white/15 flex items-center justify-between gap-2 mt-2">
                      <div className="flex flex-wrap gap-1">
                        {service.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-slate-200 border border-white/10 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary-light group-hover:text-white transition-colors shrink-0">
                        <span>{tServices("cta_details")}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );

            return (
              <motion.div
                key={service.id}
                variants={serviceCardVariants}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 350, damping: 25 } }}
                className={cn("h-full", service.gridSpan)}
              >
                {cardContent}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Minimalist Subline (Fits perfectly within 100vh) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center text-xs sm:text-sm text-muted-foreground pt-1"
        >
          <span>{tServices("cta_banner_title")}</span>
          <button
            type="button"
            onClick={() => scrollToContact()}
            className="font-semibold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{tServices("cta_banner_button")}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </Container>

      {/* Interactive Detail Specification Modal Dialog (Pristine Light & Dark Mode) */}
      <AnimatePresence>
        {activeDetailService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDetailService(null)}
              className="fixed inset-0 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-2xl shadow-slate-950/15 dark:shadow-black/60 text-slate-900 dark:text-slate-100 z-10"
            >
              {/* Close Button - Clean Circular Pill */}
              <button
                type="button"
                onClick={() => setActiveDetailService(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer z-20 shadow-2xs"
                aria-label="Tutup dialog"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              {/* Header Info */}
              <div className="flex items-start gap-4 mb-5 pr-10">
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 shadow-xs",
                    activeDetailService.iconBg
                  )}
                >
                  <activeDetailService.icon className={cn("w-6 h-6", activeDetailService.iconColor)} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 uppercase tracking-wider">
                      {tServices(`${activeDetailService.key}.badge`)}
                    </span>
                    <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {activeDetailService.metricBadge}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {tServices(`${activeDetailService.key}.title`)}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm font-semibold text-primary mt-0.5">
                    {tServices(`${activeDetailService.key}.tagline`)}
                  </p>
                </div>
              </div>

              {/* Framed 16:9 Image Preview Banner */}
              <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 mb-5 group shadow-xs">
                <Image
                  src={activeDetailService.image}
                  alt={tServices(`${activeDetailService.key}.title`)}
                  fill
                  className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-slate-200 font-medium">
                    <Terminal className="w-3.5 h-3.5 text-primary-light" />
                    <span>Blueprint Arsitektur Produksi</span>
                  </span>
                  <span className="text-emerald-400 font-bold bg-slate-950/70 px-2 py-0.5 rounded border border-emerald-500/30">
                    Enterprise SLA
                  </span>
                </div>
              </div>

              {/* Deep Architecture Description */}
              <div className="mb-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                <p className="font-sans text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {tServices(`${activeDetailService.key}.detail_desc`)}
                </p>
              </div>

              {/* Full Technical Deliverables */}
              <div className="mb-5">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  {tServices("modal_deliverables")}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[0, 1, 2, 3].map((idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 font-medium p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs"
                    >
                      <div className="w-4.5 h-4.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-snug">{tServices(`${activeDetailService.key}.features.${idx}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Tech Stack */}
              <div className="mb-6">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                  {tServices("modal_tech")}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeDetailService.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium border border-slate-200/80 dark:border-slate-700/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveDetailService(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {tServices("modal_close")}
                </button>
                <SpotlightButton
                  onClick={() => scrollToContact(tServices(`${activeDetailService.key}.title`))}
                  className="w-full sm:w-auto text-xs sm:text-sm font-semibold shadow-md"
                >
                  <span>{tServices("modal_cta")}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </SpotlightButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
