"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
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
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { CircleHighlight } from "@/components/ui/draw-circle-text";
import { LogoItem, LogoRolodex } from "@/components/ui/div-origami";
import { DrawOutlineButton } from "@/components/ui/creative-buttons";
import { cn } from "@/lib/utils";

interface TechSectionProps {
  className?: string;
}

export function TechSection({ className }: TechSectionProps) {
  const t = useTranslations("trust_tech");

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  // 6 Custom Architecture Pillars for Hover.dev 3D Origami Rolodex
  const origamiTechItems = [
    <LogoItem key="next" title={t("origami.tag_1")}>
      <Globe className="w-10 h-10 text-primary" />
    </LogoItem>,
    <LogoItem key="ts" title={t("origami.tag_2")}>
      <Code2 className="w-10 h-10 text-sky-400" />
    </LogoItem>,
    <LogoItem key="cloud" title={t("origami.tag_3")}>
      <Cpu className="w-10 h-10 text-emerald-400" />
    </LogoItem>,
    <LogoItem key="db" title={t("origami.tag_4")}>
      <Database className="w-10 h-10 text-amber-400" />
    </LogoItem>,
    <LogoItem key="sec" title={t("origami.tag_5")}>
      <ShieldCheck className="w-10 h-10 text-blue-400" />
    </LogoItem>,
    <LogoItem key="mesh" title={t("origami.tag_6")}>
      <Layers className="w-10 h-10 text-purple-400" />
    </LogoItem>,
  ];

  const metrics = [
    {
      value: t("metrics.sla_val"),
      title: t("metrics.sla_title"),
      desc: t("metrics.sla_desc"),
      icon: Activity,
      color: "text-emerald-500",
      badge: "SLA GUARANTEED",
    },
    {
      value: t("metrics.latency_val"),
      title: t("metrics.latency_title"),
      desc: t("metrics.latency_desc"),
      icon: Zap,
      color: "text-amber-500",
      badge: "PERFORMANCE",
    },
    {
      value: t("metrics.quality_val"),
      title: t("metrics.quality_title"),
      desc: t("metrics.quality_desc"),
      icon: CheckCircle2,
      color: "text-primary",
      badge: "CODE HEALTH",
    },
    {
      value: t("metrics.security_val"),
      title: t("metrics.security_title"),
      desc: t("metrics.security_desc"),
      icon: ShieldCheck,
      color: "text-sky-500",
      badge: "DATA GOVERNANCE",
    },
  ];

  const techEcosystem = [
    {
      category: t("ecosystem.cat_frontend"),
      desc: t("ecosystem.cat_frontend_desc"),
      icon: Globe,
      color: "border-sky-500/20 text-sky-500",
      items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Flutter", "React Native"],
    },
    {
      category: t("ecosystem.cat_backend"),
      desc: t("ecosystem.cat_backend_desc"),
      icon: Server,
      color: "border-primary/20 text-primary",
      items: ["Node.js", "Go (Golang)", "Python", "NestJS", "GraphQL", "REST Gateways"],
    },
    {
      category: t("ecosystem.cat_cloud"),
      desc: t("ecosystem.cat_cloud_desc"),
      icon: Cloud,
      color: "border-emerald-500/20 text-emerald-500",
      items: ["Docker", "Kubernetes", "AWS Cloud", "Google Cloud", "CI/CD Actions", "Terraform"],
    },
    {
      category: t("ecosystem.cat_data"),
      desc: t("ecosystem.cat_data_desc"),
      icon: Database,
      color: "border-amber-500/20 text-amber-500",
      items: ["PostgreSQL", "Redis Cache", "Supabase", "MongoDB", "Elasticsearch", "Prisma ORM"],
    },
  ];

  return (
    <section
      id="solutions"
      className={cn(
        "relative overflow-hidden py-20 sm:py-28 lg:py-32 border-b border-border/40 bg-surface/30",
        className
      )}
    >
      {/* Background Architectural Mesh Texture */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-[0.04] dark:opacity-[0.08]" aria-hidden="true">
        <Image
          src="/images/systems-mesh.jpg"
          alt="Architectural mesh background"
          fill
          className="object-cover object-center"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <Container size="lg">
        {/* 1. Header: Eyebrow + Title with Hand-drawn Loop Highlight */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/80 bg-surface/80 backdrop-blur-md shadow-2xs mb-5">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("kicker")}
            </span>
          </div>

          <h2 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-[1.18] sm:leading-[1.12] mb-5">
            <span>{t("title_prefix")} </span>
            <CircleHighlight
              strokeColor="#0085EB"
              strokeWidth={3}
              className="text-primary font-black"
            >
              {t("title_highlight")}
            </CircleHighlight>
          </h2>

          <p className="font-sans text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {t("description")}
          </p>
        </div>

        {/* 2. Key Trust & Credibility Metrics Grid (Equal Heights) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch mb-16 sm:mb-24">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-(--radius-xl) border border-border/70 bg-surface/90 hover:border-primary/40 hover:bg-surface-elevated transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-muted-foreground/80 px-2.5 py-1 rounded-md bg-muted/70 border border-border/40">
                      {metric.badge}
                    </span>
                    <div className="p-2 rounded-lg bg-surface border border-border/50 text-foreground group-hover:scale-110 transition-transform duration-300">
                      <Icon className={cn("w-4 h-4", metric.color)} />
                    </div>
                  </div>

                  <div className="font-heading font-bold text-3xl sm:text-4xl text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {metric.value}
                  </div>

                  <h3 className="font-heading font-semibold text-base text-foreground mb-2">
                    {metric.title}
                  </h3>
                </div>

                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2 pt-3 border-t border-border/40">
                  {metric.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* 3. Hover.dev DivOrigami Interactive 3D Showcase */}
        <div className="relative rounded-(--radius-2xl) border border-border/80 bg-gradient-to-br from-surface to-surface/60 p-6 sm:p-12 lg:p-16 mb-16 sm:mb-24 shadow-sm overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Left Narrative */}
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                  {t("origami.kicker")}
                </span>
              </div>

              <h3 className="font-heading font-bold text-2xl sm:text-4xl text-foreground tracking-tight leading-tight mb-4">
                {t("origami.headline")}
              </h3>

              <p className="font-sans text-base text-muted-foreground leading-relaxed mb-8">
                {t("origami.subtitle")}
              </p>

              {/* Hover.dev Animated Outline Button */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <DrawOutlineButton
                  onClick={scrollToContact}
                  className="w-full sm:w-auto font-sans font-semibold text-foreground px-6 py-3 rounded-(--radius-md) border-border/80 hover:bg-primary/5"
                  lineColor="bg-primary"
                >
                  <span className="inline-flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    <span>{t("origami.cta")}</span>
                  </span>
                </DrawOutlineButton>
              </div>
            </div>

            {/* Right: Hover.dev 3D Origami Rolodex */}
            <div className="flex justify-center items-center py-6">
              <LogoRolodex items={origamiTechItems} delay={2800} />
            </div>
          </div>
        </div>

        {/* 4. Categorized Tech Stack Ecosystem Grid */}
        <div className="mt-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">
              {t("ecosystem.kicker")}
            </span>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground tracking-tight mb-3">
              {t("ecosystem.title")}
            </h3>
            <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t("ecosystem.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {techEcosystem.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col justify-between p-6 rounded-(--radius-xl) border border-border/60 bg-surface/70 backdrop-blur-xs hover:border-border transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={cn("p-2 rounded-lg bg-surface border", cat.color)}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-heading font-semibold text-base text-foreground">
                        {cat.category}
                      </h4>
                    </div>

                    <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-5">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40 mt-auto">
                    {cat.items.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-muted/60 text-foreground/90 border border-border/40 hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
