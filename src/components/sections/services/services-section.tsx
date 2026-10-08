"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  Globe,
  Smartphone,
  CloudCog,
  Workflow,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Terminal,
  MessageSquare,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleHighlight } from "@/components/ui/draw-circle-text";
import { cn } from "@/lib/utils";

export interface ServicesSectionProps {
  className?: string;
}

interface ServiceData {
  id: string;
  key: "web_systems" | "mobile_apps" | "custom_cloud" | "digital_transformation";
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  isFeatured?: boolean;
  techStack: string[];
}

const serviceItems: ServiceData[] = [
  {
    id: "web-systems",
    key: "web_systems",
    icon: Globe,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    isFeatured: true,
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    id: "mobile-apps",
    key: "mobile_apps",
    icon: Smartphone,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    techStack: ["React Native", "Flutter", "iOS Swift", "Android Kotlin", "SQLite"],
  },
  {
    id: "custom-cloud",
    key: "custom_cloud",
    icon: CloudCog,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
    isFeatured: true,
    techStack: ["Go", "Docker", "Kubernetes", "AWS / GCP", "Kafka"],
  },
  {
    id: "digital-transformation",
    key: "digital_transformation",
    icon: Workflow,
    iconColor: "text-cyan-500",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    techStack: ["GraphQL", "REST Gateway", "Payment Engine", "Webhook System", "RabbitMQ"],
  },
];

export function ServicesSection({ className }: ServicesSectionProps) {
  const tServices = useTranslations("services");

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="services"
      className={cn(
        "relative py-20 sm:py-28 lg:py-32 overflow-hidden border-b border-border/40 bg-background",
        className
      )}
    >
      {/* Ambient background glow accents */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Container size="lg">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/80 bg-surface/80 backdrop-blur-md shadow-2xs mb-4">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {tServices("kicker")}
            </span>
          </div>

          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-tight max-w-3xl mb-4">
            <span>{tServices("title_prefix")} </span>
            <CircleHighlight
              strokeColor="#0085EB"
              strokeWidth={3}
              className="text-primary font-black"
            >
              {tServices("title_highlight")}
            </CircleHighlight>
          </h2>

          <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {tServices("description")}
          </p>
        </div>

        {/* Services Grid (2x2 on desktop with strictly uniform cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16 items-stretch">
          {serviceItems.map((service) => {
            const IconComponent = service.icon;
            const features = [0, 1, 2, 3].map((idx) =>
              tServices(`${service.key}.features.${idx}`)
            );

            return (
              <div
                key={service.id}
                className="relative flex flex-col h-full p-6 sm:p-8 rounded-2xl bg-surface/90 border border-border/80 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl group backdrop-blur-sm"
              >
                {/* Top Row: Icon + Eyebrow Badge */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105",
                      service.iconBg
                    )}
                  >
                    <IconComponent className={cn("w-6 h-6", service.iconColor)} />
                  </div>

                  <Badge
                    variant={service.isFeatured ? "default" : "surface"}
                    size="sm"
                    className="font-mono text-[11px] font-semibold uppercase tracking-wider"
                  >
                    {tServices(`${service.key}.badge`)}
                  </Badge>
                </div>

                {/* Service Title & Tagline with aligned vertical height */}
                <div className="min-h-[4.5rem] mb-3">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-1 group-hover:text-primary transition-colors">
                    {tServices(`${service.key}.title`)}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm font-semibold text-primary/90">
                    {tServices(`${service.key}.tagline`)}
                  </p>
                </div>

                {/* Service Detailed Description with aligned height */}
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6 min-h-[4rem]">
                  {tServices(`${service.key}.description`)}
                </p>

                {/* Key Capabilities Checklist with flex-1 to push footer down evenly */}
                <div className="pt-5 border-t border-border/60 mb-6 flex-1 flex flex-col justify-between">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 block mb-3">
                    Key Deliverables:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-foreground/80 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Tags & Interactive Action pinned to bottom baseline */}
                <div className="mt-auto pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Consult Button / Action Link */}
                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm font-semibold text-primary hover:text-primary-dark transition-colors self-start sm:self-auto group/btn cursor-pointer shrink-0"
                  >
                    <span>{tServices("cta_card")}</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner: Custom Consultation Inquiry */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-border/80 bg-surface/90 p-6 sm:p-10 shadow-lg overflow-hidden backdrop-blur-xl">
          {/* Subtle gradient aura */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tailored Engineering</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-2">
                {tServices("cta_banner_title")}
              </h3>
              <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                {tServices("cta_banner_desc")}
              </p>
            </div>

            <Button
              size="lg"
              variant="default"
              onClick={scrollToContact}
              className="w-full sm:w-auto shrink-0 font-sans font-semibold shadow-md shadow-primary/20"
              leftIcon={<MessageSquare className="w-4 h-4" />}
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
            >
              {tServices("cta_banner_button")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
