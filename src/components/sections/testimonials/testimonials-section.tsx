"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { MessageSquareQuote, Star, Building2, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TechBackground } from "@/components/ui/tech-background";
import { CircleHighlight } from "@/components/ui/draw-circle-text";

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative py-24 sm:py-32 overflow-hidden bg-surface/40 dark:bg-slate-950/40 border-y border-border/80 transition-colors duration-300"
    >
      <TechBackground variant="section" pattern="dots" />

      <Container size="lg">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold tracking-wider uppercase mb-4 shadow-2xs">
            <MessageSquareQuote className="w-3.5 h-3.5 shrink-0" />
            <span>{t("kicker")}</span>
          </div>

          <h2
            id="testimonials-heading"
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

        {/* 3 Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {[0, 1, 2].map((idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.15 }}
              className="group relative rounded-3xl p-7 sm:p-8 bg-white/90 dark:bg-surface/90 border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-primary/40 dark:hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Stars Rating & Impact Badge */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="font-mono text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {t(`items.${idx}.metric`)}
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="font-sans text-sm sm:text-base text-foreground/90 leading-relaxed mb-6 italic">
                  &ldquo;{t(`items.${idx}.quote`)}&rdquo;
                </p>
              </div>

              {/* Author & Enterprise Profile */}
              <div className="pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3.5 mt-auto">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-primary to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
                  {t(`items.${idx}.name`).charAt(0)}
                </div>

                <div>
                  <h3 className="font-heading text-sm font-bold text-foreground">
                    {t(`items.${idx}.name`)}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground font-medium">
                    {t(`items.${idx}.role`)}
                  </p>
                  <p className="font-sans text-xs text-primary/80 font-semibold flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3 h-3" />
                    <span>{t(`items.${idx}.company`)}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TestimonialsSection;
