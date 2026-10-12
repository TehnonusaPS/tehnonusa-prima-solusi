"use client";

import React, { useState, useEffect } from "react";
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
  Info,
  X,
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

interface DetailedTech {
  name: string;
  category: string;
  role: string;
}

const DETAILED_TECH_STACK: DetailedTech[] = [
  {
    name: "Next.js 16",
    category: "Frontend Web",
    role: "Portal Akademik & SSR Dashboard reaktif berkinerja tinggi",
  },
  {
    name: "Flutter Mobile",
    category: "Mobile Client",
    role: "Aplikasi cross-platform 60 FPS untuk Orang Tua & Guru",
  },
  {
    name: "Go Fiber API",
    category: "Backend Engine",
    role: "Microservices backend throughput tinggi berlatensi sub-milidetik",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    role: "Relational ACID core data store integritas akademik & keuangan",
  },
  {
    name: "Redis Cache",
    category: "Cache & Queue",
    role: "Distributed memory cache & job queue untuk antrean pesan cepat",
  },
  {
    name: "WhatsApp Gateway",
    category: "Messaging",
    role: "Broadcast notifikasi presensi langsung ke ponsel wali murid (<2s)",
  },
  {
    name: "IoT RFID Reader",
    category: "Hardware Telemetry",
    role: "Sensor telemetri presensi gerbang otomatis real-time",
  },
];

interface LaptopMockupProps {
  appUrl?: string;
  className?: string;
}

function LaptopMockup({
  appUrl = "https://school-app.tehnonusa.com/",
  className,
}: LaptopMockupProps) {
  return (
    <div className={cn("relative w-full max-w-2xl mx-auto group select-none", className)}>
      {/* Ambient Screen Glow Behind Laptop */}
      <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 via-cyan-500/15 to-emerald-500/15 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity pointer-events-none" />

      {/* Laptop Screen Top Lid */}
      <div className="relative rounded-t-2xl border-[3px] border-slate-700/90 dark:border-slate-700 bg-slate-900 pt-2 px-2.5 pb-0 shadow-2xl overflow-hidden">
        {/* Center Webcam Dot */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center z-20">
          <div className="w-0.5 h-0.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Screen Display Bezel */}
        <div className="relative rounded-t-lg overflow-hidden bg-slate-950 border border-white/10 shadow-inner">
          {/* Browser Chrome Header Bar */}
          <div className="px-3 py-1.5 sm:py-2 bg-slate-900/95 border-b border-white/10 flex items-center justify-between gap-2">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-xs" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-xs" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-xs" />
            </div>

            {/* Address Bar Pill */}
            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 max-w-xs mx-auto px-3 py-0.5 sm:py-1 rounded-md bg-slate-950/80 hover:bg-slate-950 border border-white/10 text-[10px] sm:text-[11px] font-mono text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors group/url"
            >
              <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
              <span className="truncate">school-app.tehnonusa.com</span>
              <ExternalLink className="w-2.5 h-2.5 text-slate-400 group-hover/url:text-primary transition-colors shrink-0" />
            </a>

            {/* Live Status Pill */}
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-[9px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Web Dashboard</span>
            </div>
          </div>

          {/* Screenshot Display */}
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-full aspect-[1376/768] overflow-hidden group/screen cursor-pointer bg-slate-950"
            title="Klik untuk membuka demo live school-app.tehnonusa.com"
          >
            <Image
              src="/images/gerbang-sekolah.jpg"
              alt="GerbangSekolah - Dashboard Web Sistem Manajemen Sekolah"
              fill
              className="object-contain object-top transition-all duration-300 group-hover/screen:brightness-105"
              sizes="(max-width: 1024px) 100vw, 700px"
              priority
            />
            {/* Subtle Hover Action Badge */}
            <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full bg-slate-950/90 text-white font-sans text-xs font-semibold border border-white/20 shadow-xl flex items-center gap-1.5 backdrop-blur-md">
                <span>Buka Web Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5 text-primary" />
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* Laptop Bottom Aluminum Base & Keyboard Lip */}
      <div className="relative w-[103%] -left-[1.5%] h-3.5 sm:h-4 rounded-b-xl bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800 shadow-2xl border-t border-slate-500/60 flex items-start justify-center">
        {/* Trackpad Thumb Notch */}
        <div className="w-16 sm:w-24 h-1 sm:h-1.5 rounded-b-md bg-slate-800 border-x border-b border-slate-600/60" />
      </div>

      {/* Table Surface Reflection */}
      <div className="w-[96%] mx-auto h-2 bg-slate-950/80 blur-xs rounded-full mt-0.5" />
    </div>
  );
}

export function PortfolioSection() {
  const t = useTranslations("portfolio");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [modalTab, setModalTab] = useState<"architecture" | "modules" | "tech">("architecture");

  // Lock body scroll and handle Escape key for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDetailModalOpen(false);
      }
    };
    if (isDetailModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDetailModalOpen]);

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

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative min-h-screen flex flex-col justify-center py-10 sm:py-14 md:py-16 overflow-hidden bg-white dark:bg-none dark:bg-[#0b1120] border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300"
    >
      {/* 1. Ambient Matrix Grid & Studio Spotlight Background */}
      <TechBackground variant="spotlight" pattern="dots" />

      <Container size="lg" className="relative z-10">
        {/* Section Header with Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <span className="font-mono text-[11px] font-bold text-emerald-500 tracking-widest px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 shadow-2xs">
                04 // PROVEN TRACK RECORD
              </span>
              <span className="h-px w-6 bg-slate-300 dark:bg-slate-700 hidden sm:block" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono font-semibold tracking-wider uppercase shadow-2xs">
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span>{t("kicker")}</span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-surface border border-slate-200/80 dark:border-border/80 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span>Live Production Environment</span>
              </div>
            </div>

            <h2
              id="portfolio-heading"
              className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-foreground tracking-tight leading-snug mb-2"
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

            <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Action Buttons: Detail, Live App, & Consult */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setModalTab("architecture");
                setIsDetailModalOpen(true);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer shadow-md hover:shadow-lg"
            >
              <Info className="w-4 h-4" />
              <span>{t("cta_details")}</span>
            </button>

            <a
              href="https://school-app.tehnonusa.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-foreground text-xs sm:text-sm font-sans font-semibold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <span>Kunjungi Aplikasi</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
            </a>

            <DrawOutlineButton
              onClick={scrollToContact}
              className="w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-sans font-semibold shrink-0"
            >
              <span>{t("cta_discuss")}</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </DrawOutlineButton>
          </div>
        </div>

        {/* Dual Device Showcase Canvas (Single Frame, No Card Inside Card!) */}
        <div className="rounded-3xl border border-slate-800 dark:border-slate-800/80 bg-slate-950 p-5 sm:p-7 lg:p-10 relative overflow-hidden shadow-2xl">
          {/* Stage Ambient Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* The Dual Devices Grid: Laptop & Phone Side-by-Side */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center py-2 sm:py-4">
            {/* Left: Laptop Mockup (Web Dashboard) */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center">
              <div className="w-full max-w-2xl flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                    <Monitor className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-heading font-semibold text-xs sm:text-sm text-white tracking-tight whitespace-nowrap">
                      Web Dashboard
                    </span>
                    <span className="text-slate-400 text-xs hidden sm:inline truncate">
                      &bull; Admin, Guru & Keuangan
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] sm:text-[11px] font-mono text-emerald-400 font-semibold shrink-0 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live Production</span>
                </div>
              </div>
              <LaptopMockup appUrl="https://school-app.tehnonusa.com/" />
            </div>

            {/* Right: Phone Mockup (Mobile App) */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center justify-center">
              <div className="w-[246px] flex items-center justify-between mb-3 px-0.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Smartphone className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-heading font-semibold text-xs sm:text-sm text-white tracking-tight whitespace-nowrap">
                    Mobile App
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] sm:text-[11px] font-mono text-emerald-400 font-semibold shrink-0 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>iOS & Android</span>
                </div>
              </div>
              <FloatingPhone appUrl="https://school-app.tehnonusa.com/" />
            </div>
          </div>

          {/* Stage Bottom Footer Bar */}
          <div className="relative z-10 pt-4 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <button
              type="button"
              onClick={() => {
                setModalTab("tech");
                setIsDetailModalOpen(true);
              }}
              className="flex flex-wrap items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-left"
            >
              <span className="text-slate-500 mr-1">Stack:</span>
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-white/10 text-[10px]"
                >
                  {tech}
                </span>
              ))}
            </button>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setModalTab("architecture");
                  setIsDetailModalOpen(true);
                }}
                className="px-3 py-1 rounded-lg bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary-light text-[11px] font-sans font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Lihat Detail Fitur & Arsitektur</span>
              </button>

              <a
                href="https://school-app.tehnonusa.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-light font-semibold flex items-center gap-1 transition-colors"
              >
                <span>school-app.tehnonusa.com</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Interactive Specifications & Architecture Modal */}
      <AnimatePresence>
        {isDetailModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailModalOpen(false)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
            >
              {/* Modal Top Header Bar */}
              <div className="p-5 sm:p-6 pb-4 border-b border-slate-200/80 dark:border-slate-800 flex items-start justify-between gap-4 shrink-0 bg-slate-50/50 dark:bg-slate-900/40">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                      {t("modal_kicker")}
                    </span>
                    <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{t("project.metric_value")} {t("project.metric_label")}</span>
                    </span>
                  </div>
                  <h3
                    id="portfolio-modal-title"
                    className="font-heading text-lg sm:text-2xl font-bold text-foreground tracking-tight"
                  >
                    {t("project.title")}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm font-semibold text-primary mt-0.5">
                    {t("project.subtitle")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDetailModalOpen(false)}
                  aria-label={t("modal_close")}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Interactive Navigation Tabs */}
              <div className="px-5 sm:px-6 pt-3 pb-2 border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0f172a] shrink-0">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setModalTab("architecture")}
                    className={cn(
                      "flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold font-sans transition-all flex items-center justify-center gap-1.5 cursor-pointer",
                      modalTab === "architecture"
                        ? "bg-white dark:bg-slate-800 text-primary shadow-xs border border-slate-200/60 dark:border-slate-700"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{t("modal_tab_architecture")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab("modules")}
                    className={cn(
                      "flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold font-sans transition-all flex items-center justify-center gap-1.5 cursor-pointer",
                      modalTab === "modules"
                        ? "bg-white dark:bg-slate-800 text-primary shadow-xs border border-slate-200/60 dark:border-slate-700"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{t("modal_tab_modules")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab("tech")}
                    className={cn(
                      "flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold font-sans transition-all flex items-center justify-center gap-1.5 cursor-pointer",
                      modalTab === "tech"
                        ? "bg-white dark:bg-slate-800 text-primary shadow-xs border border-slate-200/60 dark:border-slate-700"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t("modal_tab_tech")}</span>
                  </button>
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-5 sm:p-6 overflow-y-auto no-scrollbar flex-1 space-y-5">
                {/* Narrative Summary */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  <p>{t("project.description")}</p>
                </div>

                {/* TAB 1: Architecture Highlights & Performance Metrics */}
                {modalTab === "architecture" && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                        <span>4 Kelebihan Arsitektur Sistem</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {projectHighlights.map((highlight, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex items-start gap-3 shadow-2xs"
                          >
                            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 text-xs sm:text-[13px] font-medium text-foreground leading-snug">
                              {highlight}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3 Metric cards inside modal */}
                    <div className="pt-2">
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                        Benchmark Performa & SLA Teruji
                      </h4>
                      <div className="grid grid-cols-3 gap-2.5">
                        {projectMetrics.map((metric, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 text-center"
                          >
                            <span className="font-heading text-base sm:text-lg font-bold text-primary block">
                              {metric.val}
                            </span>
                            <span className="font-sans text-[11px] text-muted-foreground block mt-0.5">
                              {metric.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: Core Modules Deep Dive */}
                {modalTab === "modules" && (
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-primary" />
                      <span>Rincian 4 Modul Terintegrasi GerbangSekolah</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {MODULES_CONFIG.map((mod) => {
                        const Icon = mod.icon;
                        const modData = projectModules.find((m) => m.key === mod.key);
                        return (
                          <div
                            key={mod.key}
                            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between gap-3"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                  {mod.badge}
                                </span>
                              </div>
                              <h5 className="font-heading text-sm font-bold text-foreground mb-1.5">
                                {modData?.name}
                              </h5>
                              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                                {modData?.desc}
                              </p>
                            </div>
                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                              <span>Status: Teruji di Produksi</span>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 3: Tech Stack & Architecture Topology */}
                {modalTab === "tech" && (
                  <div className="space-y-3">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span>Teknologi Produksi & Spesifikasi Infrastruktur</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {DETAILED_TECH_STACK.map((tech) => (
                        <div
                          key={tech.name}
                          className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="font-heading text-sm font-bold text-foreground">
                              {tech.name}
                            </span>
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                              {tech.category}
                            </span>
                          </div>
                          <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                            {tech.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Bottom Footer Actions */}
              <div className="p-4 sm:p-5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsDetailModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {t("modal_close")}
                </button>

                <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2">
                  <a
                    href="https://school-app.tehnonusa.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs sm:text-sm font-semibold text-foreground transition-colors cursor-pointer"
                  >
                    <span>{t("modal_visit")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setIsDetailModalOpen(false);
                      scrollToContact();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-md"
                  >
                    <span>{t("cta_discuss")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default PortfolioSection;
