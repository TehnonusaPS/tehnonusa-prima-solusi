"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  Activity,
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Lock,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
  X,
  ArrowUpRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CircleHighlight } from "@/components/ui/draw-circle-text";
import { LogoItem, LogoRolodex } from "@/components/ui/div-origami";
import { SpotlightButton } from "@/components/ui/creative-buttons";
import { TechBackground } from "@/components/ui/tech-background";
import { cn } from "@/lib/utils";

interface TechSectionProps {
  className?: string;
}

interface ModalDetailData {
  title: string;
  subtitle: string;
  badge: string;
  desc: string;
  points: string[];
  techStack?: string[];
  image?: string;
}

const tabContentVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

export function TechSection({ className }: TechSectionProps) {
  const t = useTranslations("trust_tech");
  const [activeTab, setActiveTab] = useState<"reliability" | "ecosystem">("reliability");
  const [activeDetail, setActiveDetail] = useState<ModalDetailData | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeDetail) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeDetail]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDetail(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToContact = () => {
    setActiveDetail(null);
    const el = document.querySelector("#contact");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  // 6 Custom Architecture Pillars for 3D Origami Rolodex matching Tehnonusa Brand
  const origamiTechItems = [
    <LogoItem
      key="next"
      className="bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 border border-white/90 shadow-[0_10px_25px_rgba(255,255,255,0.18)]"
      title={t("origami.tag_1")}
      subtitle={t("origami.sub_1")}
    >
      <Globe className="w-8 h-8 text-[#0085eb]" />
    </LogoItem>,
    <LogoItem
      key="ts"
      className="bg-gradient-to-br from-[#0091ff] via-[#0085eb] to-[#006ec4] text-white border border-sky-300/50 shadow-[0_10px_25px_rgba(0,133,235,0.45)]"
      title={t("origami.tag_2")}
      subtitle={t("origami.sub_2")}
    >
      <Code2 className="w-8 h-8 text-white drop-shadow-md" />
    </LogoItem>,
    <LogoItem
      key="cloud"
      className="bg-gradient-to-br from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] text-slate-950 border border-cyan-200/60 shadow-[0_10px_25px_rgba(56,189,248,0.45)]"
      title={t("origami.tag_3")}
      subtitle={t("origami.sub_3")}
    >
      <Cpu className="w-8 h-8 text-slate-950" />
    </LogoItem>,
    <LogoItem
      key="db"
      className="bg-gradient-to-br from-[#34d399] via-[#10b981] to-[#059669] text-white border border-emerald-300/50 shadow-[0_10px_25px_rgba(16,185,129,0.4)]"
      title={t("origami.tag_4")}
      subtitle={t("origami.sub_4")}
    >
      <Database className="w-8 h-8 text-white drop-shadow-md" />
    </LogoItem>,
    <LogoItem
      key="sec"
      className="bg-gradient-to-br from-[#818cf8] via-[#6366f1] to-[#4f46e5] text-white border border-indigo-200/50 shadow-[0_10px_25px_rgba(99,102,241,0.45)]"
      title={t("origami.tag_5")}
      subtitle={t("origami.sub_5")}
    >
      <ShieldCheck className="w-8 h-8 text-white drop-shadow-md" />
    </LogoItem>,
    <LogoItem
      key="mesh"
      className="bg-gradient-to-br from-[#1e40af] via-[#1d4ed8] to-[#0f2747] text-white border border-sky-400/50 shadow-[0_10px_25px_rgba(37,99,235,0.4)]"
      title={t("origami.tag_6")}
      subtitle={t("origami.sub_6")}
    >
      <Layers className="w-8 h-8 text-sky-300 drop-shadow-md" />
    </LogoItem>,
  ];

  const metrics = [
    {
      id: "sla",
      value: t("metrics.sla_val"),
      title: t("metrics.sla_title"),
      desc: t("metrics.sla_desc"),
      icon: Activity,
      color: "text-emerald-400",
      badge: "SLA GUARANTEED",
      telemetry: "Live 99.99%",
      image: "/images/portfolio-erp.jpg",
      points: [
        "Infrastruktur multi-zone cloud dengan failover otomatis",
        "Disaster recovery teruji dengan RPO & RTO < 5 menit",
        "Kompensasi kredit SLA transparan jika ketersediaan <99.9%",
        "Pemantauan telemetri real-time 24/7 dan peringatan otomatis",
      ],
      techStack: ["Kubernetes", "AWS Cloud", "GCP", "Prometheus", "Grafana"],
    },
    {
      id: "latency",
      value: t("metrics.latency_val"),
      title: t("metrics.latency_title"),
      desc: t("metrics.latency_desc"),
      icon: Zap,
      color: "text-amber-400",
      badge: "ULTRA-FAST LATENCY",
      telemetry: "Sub-100ms",
      image: "/images/tech-grid.jpg",
      points: [
        "Distributed in-memory caching via Redis Cluster",
        "Optimasi query database terindeks & koneksi pooling ketat",
        "Edge CDN caching untuk konten statis dan dynamic prefetch",
        "Benchmarking beban puncak (stress testing) teratur via K6",
      ],
      techStack: ["Redis Cache", "PostgreSQL", "Cloudflare CDN", "Go Fiber"],
    },
    {
      id: "quality",
      value: t("metrics.quality_val"),
      title: t("metrics.quality_title"),
      desc: t("metrics.quality_desc"),
      icon: Code2,
      color: "text-primary",
      badge: "TYPE-SAFE CODE",
      telemetry: "Strict Mode",
      image: "/images/data-core.jpg",
      points: [
        "TypeScript ketat (strict mode) tanpa penggunaan 'any'",
        "Automated unit testing dan continuous integration (CI) di Git",
        "Arsitektur modular domain-driven tanpa circular dependency",
        "Audit kode otomatis dan static analysis via SonarQube",
      ],
      techStack: ["TypeScript", "Next.js", "Jest", "Playwright", "Docker"],
    },
    {
      id: "security",
      value: t("metrics.security_val"),
      title: t("metrics.security_title"),
      desc: t("metrics.security_desc"),
      icon: ShieldCheck,
      color: "text-sky-400",
      badge: "DATA GOVERNANCE",
      telemetry: "ISO & OWASP",
      image: "/images/systems-mesh.jpg",
      points: [
        "Role-Based Access Control (RBAC) presisi tingkat modul",
        "Enkripsi data at-rest (AES-256) dan in-transit (TLS 1.3)",
        "Audit trail dan pencatatan riwayat transaksi anti-tamper",
        "Pemindaian kerentanan berkala standar OWASP Top 10",
      ],
      techStack: ["Argon2", "Vault", "OWASP Security", "JWT & OAuth2"],
    },
  ];

  const techEcosystem = [
    {
      id: "frontend",
      category: t("ecosystem.cat_frontend"),
      desc: t("ecosystem.cat_frontend_desc"),
      icon: Globe,
      color: "text-sky-400 bg-sky-500/20 border-sky-400/30",
      badge: "WEB & MOBILE",
      metricBadge: "SSR & 60 FPS Native",
      image: "/images/gerbang-sekolah.jpg",
      gridSpan: "lg:col-span-7",
      glowBg: "from-sky-600/20 to-transparent",
      items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Flutter", "React Native"],
      points: [
        "Komponen antarmuka performa tinggi dengan server-side rendering (SSR)",
        "Dukungan aplikasi mobile native untuk iOS dan Android",
        "Design system terstandar dengan aksesibilitas WCAG teruji",
        "Optimalisasi Core Web Vitals untuk pengalaman kilat pengguna",
      ],
    },
    {
      id: "backend",
      category: t("ecosystem.cat_backend"),
      desc: t("ecosystem.cat_backend_desc"),
      icon: Server,
      color: "text-primary bg-primary/20 border-primary/30",
      badge: "CORE LOGIC",
      metricBadge: "High-Throughput Gateway",
      image: "/images/systems-mesh.jpg",
      gridSpan: "lg:col-span-5",
      glowBg: "from-primary/20 to-transparent",
      items: ["Node.js", "Go (Golang)", "Python", "NestJS", "GraphQL", "REST Gateway"],
      points: [
        "Throughput transaksi tinggi dengan goroutines dan event-driven engines",
        "API kontrak terstandar menggunakan OpenAPI / Swagger dan GraphQL",
        "Pemisahan modular service yang mudah dikembangkan berkelanjutan",
        "Penanganan error terpusat dan logging telemetri komprehensif",
      ],
    },
    {
      id: "cloud",
      category: t("ecosystem.cat_cloud"),
      desc: t("ecosystem.cat_cloud_desc"),
      icon: Cloud,
      color: "text-emerald-400 bg-emerald-500/20 border-emerald-400/30",
      badge: "INFRASTRUCTURE",
      metricBadge: "Zero-Downtime Deploy",
      image: "/images/data-core.jpg",
      gridSpan: "lg:col-span-5",
      glowBg: "from-emerald-600/20 to-transparent",
      items: ["Docker", "Kubernetes", "AWS Cloud", "GCP", "CI/CD Pipeline", "Kafka"],
      points: [
        "Kontainerisasi Docker dengan orkestrasi Kubernetes elastis",
        "Otomasi pipeline CI/CD rilis zero-downtime terpercaya",
        "Pemantauan APM dan alert insiden otomatis real-time",
        "Arsitektur serverless dan auto-scaling hemat biaya server",
      ],
    },
    {
      id: "data",
      category: t("ecosystem.cat_data"),
      desc: t("ecosystem.cat_data_desc"),
      icon: Database,
      color: "text-amber-400 bg-amber-500/20 border-amber-400/30",
      badge: "DATABASE & CACHE",
      metricBadge: "<100ms Query P95",
      image: "/images/tech-grid.jpg",
      gridSpan: "lg:col-span-7",
      glowBg: "from-amber-600/20 to-transparent",
      items: ["PostgreSQL", "Redis Cache", "Supabase", "MongoDB", "Elasticsearch", "Prisma ORM"],
      points: [
        "Penyimpanan database relasional konsisten dan terjamin ACID",
        "Caching in-memory latensi ultra-rendah untuk jutaan hit harian",
        "Pencarian full-text kilat dan analitik data terdistribusi",
        "Backup otomatis berkala dengan enkripsi tingkat tinggi",
      ],
    },
  ];

  return (
    <section
      id="solutions"
      className={cn(
        "relative min-h-screen flex flex-col justify-center overflow-hidden py-8 sm:py-12 lg:py-14 bg-gradient-to-b from-white via-sky-50/25 to-slate-50/80 dark:bg-none dark:bg-[#0b1120] border-b border-slate-200/80 dark:border-slate-800/80",
        className
      )}
    >
      {/* Background Circuit Mesh & Ambient Glow */}
      <TechBackground variant="section" pattern="mesh" />

      <Container size="lg">
        {/* 1. Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-5 sm:mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200/90 dark:border-border/80 bg-slate-50/90 dark:bg-surface/80 backdrop-blur-md shadow-2xs mb-2.5">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-muted-foreground">
              {t("kicker")}
            </span>
          </div>

          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-slate-900 dark:text-foreground leading-tight mb-2">
            <span>{t("title_prefix")} </span>
            <CircleHighlight
              strokeColor="#0085EB"
              strokeWidth={3}
              className="text-primary font-black"
            >
              {t("title_highlight")}
            </CircleHighlight>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-muted-foreground leading-relaxed max-w-2xl mb-3.5">
            {t("description")}
          </p>

          {/* Interactive Modern Tab Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-muted/80 border border-slate-200/80 dark:border-border/80 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab("reliability")}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                activeTab === "reliability"
                  ? "bg-white dark:bg-surface text-primary shadow-xs font-bold"
                  : "text-slate-600 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground"
              )}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{t("tab_reliability")}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ecosystem")}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                activeTab === "ecosystem"
                  ? "bg-white dark:bg-surface text-primary shadow-xs font-bold"
                  : "text-slate-600 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground"
              )}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{t("tab_ecosystem")}</span>
            </button>
          </div>
        </motion.div>

        {/* 2. Interactive Tab Panels */}
        <AnimatePresence mode="wait">
          {activeTab === "reliability" ? (
            <motion.div
              key="reliability"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch"
            >
              {/* Left Column: 4 Compact Metrics (7 Cols) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {metrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={metric.id}
                      onClick={() =>
                        setActiveDetail({
                          title: metric.title,
                          subtitle: metric.value,
                          badge: metric.badge,
                          desc: metric.desc,
                          points: metric.points,
                          techStack: metric.techStack,
                          image: metric.image,
                        })
                      }
                      className="group relative flex flex-col justify-between p-4 sm:p-4.5 rounded-2xl border border-slate-200/90 dark:border-border/80 bg-slate-50/80 dark:bg-surface/90 hover:border-primary/60 hover:bg-white dark:hover:bg-surface-elevated transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="font-mono text-[10px] font-semibold tracking-wider uppercase text-slate-600 dark:text-muted-foreground px-2 py-0.5 rounded-md bg-white dark:bg-muted/80 border border-slate-200/80 dark:border-border/40">
                            {metric.badge}
                          </span>
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>{metric.telemetry}</span>
                          </div>
                        </div>

                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-foreground tracking-tight group-hover:text-primary transition-colors">
                            {metric.value}
                          </span>
                          <div className="p-1 rounded-md bg-white dark:bg-surface border border-slate-200/70 dark:border-border/60 text-foreground group-hover:scale-110 transition-transform">
                            <Icon className={cn("w-3.5 h-3.5", metric.color)} />
                          </div>
                        </div>

                        <h3 className="font-heading font-semibold text-xs sm:text-sm text-slate-800 dark:text-foreground mb-1">
                          {metric.title}
                        </h3>

                        <p className="font-sans text-[11px] sm:text-xs text-slate-600 dark:text-muted-foreground leading-relaxed line-clamp-2">
                          {metric.desc}
                        </p>
                      </div>

                      <div className="pt-2 mt-2 border-t border-slate-200/60 dark:border-border/50 flex items-center justify-between text-[11px] font-semibold text-primary group-hover:underline">
                        <span>{t("cta_details")}</span>
                        <ArrowUpRight className="w-3 h-3 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: 3D Origami Showcase Card with Real Data-Core Image Backdrop (5 Cols) */}
              <div className="lg:col-span-5 relative rounded-2xl border border-border/80 bg-slate-950 p-5 sm:p-5.5 shadow-sm flex flex-col justify-between overflow-hidden group">
                {/* Visual Image Background */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/data-core.jpg"
                    alt="Data Core Infrastructure"
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover object-center opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/60" />
                </div>

                {/* Foreground Content */}
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-primary/30 bg-primary/10 mb-2.5">
                    <Sparkles className="w-3 h-3 text-primary-light" />
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-primary-light">
                      {t("origami.kicker")}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base sm:text-lg text-white tracking-tight mb-1.5">
                    {t("origami.headline")}
                  </h3>

                  <p className="font-sans text-xs text-slate-300 leading-relaxed mb-3">
                    {t("origami.subtitle")}
                  </p>
                </div>

                {/* Rolodex Interactive 3D */}
                <div className="relative z-10 flex justify-center items-center py-1">
                  <LogoRolodex items={origamiTechItems} delay={2800} />
                </div>

                <div className="relative z-10 pt-2.5 border-t border-white/15 flex items-center justify-between text-white">
                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-light hover:text-white hover:underline cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{t("origami.cta")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[10px] text-slate-300">
                    6 Production Pillars
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ecosystem"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch"
            >
              {/* Dynamic Bento Grid Layout (7+5 & 5+7) dengan Image Assets & Hover Depth */}
              {techEcosystem.map((cat) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={cat.id}
                    whileHover={{ y: -4, transition: { type: "spring", stiffness: 350, damping: 25 } }}
                    className={cn("h-full", cat.gridSpan)}
                  >
                    <div
                      onClick={() =>
                        setActiveDetail({
                          title: cat.category,
                          subtitle: cat.badge,
                          badge: "STACK ECOSYSTEM",
                          desc: cat.desc,
                          points: cat.points,
                          techStack: cat.items,
                          image: cat.image,
                        })
                      }
                      className="relative flex flex-col justify-between h-full min-h-[210px] sm:min-h-[220px] rounded-2xl overflow-hidden border border-slate-700/60 dark:border-white/10 hover:border-primary/60 transition-all duration-300 shadow-lg hover:shadow-2xl group cursor-pointer"
                    >
                      {/* 1. Real Image Background with Zoom on Hover */}
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={cat.image}
                          alt={cat.category}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />

                        {/* High-contrast multi-stop dark gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/50 group-hover:via-slate-950/75 transition-colors duration-500" />

                        {/* Theme Glow Overlay */}
                        <div
                          className={cn(
                            "absolute inset-0 bg-gradient-to-br opacity-25 group-hover:opacity-45 transition-opacity duration-500 pointer-events-none",
                            cat.glowBg
                          )}
                        />
                      </div>

                      {/* 2. Interactive Foreground Content */}
                      <div className="relative z-10 flex flex-col justify-between h-full p-4.5 sm:p-5 text-white">
                        {/* Top: Icon + Badge + Live Telemetry Status */}
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={cn(
                                "w-9 h-9 rounded-xl flex items-center justify-center border shadow-xs backdrop-blur-md group-hover:scale-110 transition-transform",
                                cat.color
                              )}
                            >
                              <Icon className="w-4.5 h-4.5" />
                            </div>

                            <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-white/90 px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-md border border-white/15">
                              {cat.badge}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 text-[10.5px] font-mono text-emerald-400 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{cat.metricBadge}</span>
                          </div>
                        </div>

                        {/* Middle: Category Title & Description */}
                        <div className="my-auto py-1">
                          <h4 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-primary-light transition-colors line-clamp-1 mb-1">
                            {cat.category}
                          </h4>

                          <p className="font-sans text-xs text-slate-300 leading-relaxed line-clamp-2">
                            {cat.desc}
                          </p>
                        </div>

                        {/* Bottom: Tech Stack Pills & Detail Trigger */}
                        <div className="pt-2.5 border-t border-white/15 flex items-center justify-between gap-2 mt-2">
                          <div className="flex flex-wrap gap-1">
                            {cat.items.slice(0, 4).map((tech, techIdx) => (
                              <span
                                key={techIdx}
                                className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-slate-200 border border-white/10 font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary-light group-hover:text-white transition-colors shrink-0">
                            <span>{t("cta_details")}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      {/* Interactive Detail Modal Dialog with Pristine Light & Dark Mode */}
      <AnimatePresence>
        {activeDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDetail(null)}
              className="fixed inset-0 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-2xl shadow-slate-950/15 dark:shadow-black/60 text-slate-900 dark:text-slate-100 z-10"
            >
              {/* Close Button - Clean Circular Pill */}
              <button
                type="button"
                onClick={() => setActiveDetail(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer z-20 shadow-2xs"
                aria-label="Tutup dialog"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              {/* Header Info */}
              <div className="mb-5 pr-10">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="surface" size="sm" className="font-mono text-[10px]">
                    {activeDetail.badge}
                  </Badge>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {activeDetail.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm font-semibold text-primary mt-0.5">
                  {activeDetail.subtitle}
                </p>
              </div>

              {/* Framed Image Preview Banner (if available) */}
              {activeDetail.image && (
                <div className="relative w-full h-32 sm:h-40 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 mb-5 group shadow-xs">
                  <Image
                    src={activeDetail.image}
                    alt={activeDetail.title}
                    fill
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-slate-200 font-medium">
                      <Terminal className="w-3.5 h-3.5 text-primary-light" />
                      <span>Standar Rekayasa & Arsitektur</span>
                    </span>
                    <span className="text-emerald-400 font-bold bg-slate-950/70 px-2 py-0.5 rounded border border-emerald-500/30">
                      Production Tested
                    </span>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                <p className="font-sans text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeDetail.desc}
                </p>
              </div>

              {/* Technical Specifications Points */}
              <div className="mb-5">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Spesifikasi & Standar Rekayasa:
                </h4>
                <ul className="space-y-2.5">
                  {activeDetail.points.map((pt, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 font-medium p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs"
                    >
                      <div className="w-4.5 h-4.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-snug">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack if available */}
              {activeDetail.techStack && (
                <div className="mb-6">
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Teknologi & Tool Teruji:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDetail.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium border border-slate-200/80 dark:border-slate-700/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveDetail(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {t("modal_close")}
                </button>
                <SpotlightButton
                  onClick={scrollToContact}
                  className="w-full sm:w-auto text-xs sm:text-sm font-semibold shadow-md"
                >
                  <span>{t("modal_cta")}</span>
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
