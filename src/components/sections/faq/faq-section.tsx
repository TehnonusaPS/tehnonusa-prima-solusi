"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, MessageSquare, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TechBackground } from "@/components/ui/tech-background";
import { CircleHighlight } from "@/components/ui/draw-circle-text";
import { SpotlightButton } from "@/components/ui/creative-buttons";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative min-h-screen flex flex-col justify-center py-14 sm:py-18 lg:py-20 overflow-x-clip bg-white dark:bg-none dark:bg-[#0b1120] transition-colors duration-300"
    >
      <TechBackground variant="section" pattern="mesh" />

      <Container size="lg" className="relative z-10">
        {/* Section Header with FAQ Marker Badge */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-4">
            <span className="font-mono text-[11px] font-bold text-indigo-500 tracking-widest px-2.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 shadow-2xs">
              06 // FAQ & DUE DILIGENCE
            </span>
            <span className="h-px w-6 bg-slate-300 dark:bg-slate-700 hidden sm:block" />
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold tracking-wider uppercase shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{t("kicker")}</span>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-surface border border-slate-200/80 dark:border-border/80 text-[11px] font-mono text-slate-600 dark:text-slate-300">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span>Transparent Project Governance</span>
            </div>
          </div>

          <h2
            id="faq-heading"
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

        {/* 2-Column Layout on Desktop: FAQ Accordion (7 cols) + Quick Consultation Card (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* FAQ Accordion List (7 cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            {[0, 1, 2, 3, 4].map((idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className={cn(
                    "rounded-2xl border transition-all duration-300 overflow-hidden",
                    isOpen
                      ? "bg-white dark:bg-slate-900 border-primary/50 shadow-md shadow-primary/5 ring-1 ring-primary/20"
                      : "bg-slate-50/80 dark:bg-slate-900/50 hover:bg-slate-100/80 dark:hover:bg-slate-900/80 border-slate-200/80 dark:border-slate-800"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleIndex(idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading text-sm sm:text-base font-bold text-foreground">
                      {t(`items.${idx}.question`)}
                    </span>
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 border",
                        isOpen
                          ? "bg-primary text-primary-foreground border-primary rotate-180"
                          : "bg-white dark:bg-slate-800 text-muted-foreground border-slate-200 dark:border-slate-700"
                      )}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-6 pt-0 border-t border-slate-100 dark:border-slate-800/60 mt-1">
                          <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-3">
                            {t(`items.${idx}.answer`)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Unified Consultation Assurance Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-white via-slate-50/80 to-sky-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-foreground border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-2xl relative overflow-hidden transition-all">
              {/* Ambient brand glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Header Icon & Status Pill */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary/20 border border-primary/25 text-primary flex items-center justify-center shadow-xs">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono font-semibold tracking-wider uppercase border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    NDA Protected
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-3 leading-snug">
                  Punya Pertanyaan Spesifik tentang Sistem Anda?
                </h3>

                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                  Konsultasikan spesifikasi teknis, integrasi modul, estimasi timeline, atau kalkulasi anggaran langsung bersama software architect kami tanpa biaya komitmen.
                </p>

                {/* Assurance Points */}
                <div className="space-y-3 mb-8 pt-5 border-t border-slate-200/80 dark:border-slate-800 text-xs sm:text-[13px] font-sans text-foreground/90">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">Non-Disclosure Agreement (NDA) legal tersedia</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">Respons cepat dalam 1x24 jam kerja</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">Review arsitektur & estimasi awal 100% gratis</span>
                  </div>
                </div>

                {/* High-Converting CTA Button */}
                <SpotlightButton
                  onClick={scrollToContact}
                  className="w-full justify-center py-3.5 text-xs sm:text-sm font-sans font-semibold shadow-md shadow-primary/25 cursor-pointer"
                >
                  <span>Konsultasikan Spesifikasi Sistem</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </SpotlightButton>

                <p className="text-center text-[11px] font-mono text-muted-foreground mt-3">
                  Konsultasi 1-on-1 langsung dengan Senior Solution Architect
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FaqSection;
