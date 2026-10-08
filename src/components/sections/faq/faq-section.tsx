"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TechBackground } from "@/components/ui/tech-background";
import { CircleHighlight } from "@/components/ui/draw-circle-text";
import { DrawOutlineButton } from "@/components/ui/creative-buttons";
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
      className="relative py-24 sm:py-32 overflow-hidden bg-background transition-colors duration-300"
    >
      <TechBackground variant="section" pattern="grid" />

      <Container size="lg">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold tracking-wider uppercase mb-4 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{t("kicker")}</span>
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
                      ? "bg-white dark:bg-surface border-primary/50 shadow-md shadow-primary/5 ring-1 ring-primary/20"
                      : "bg-surface/70 hover:bg-surface border-border/80"
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
                          : "bg-surface text-muted-foreground border-border/80"
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
                          <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed pt-3">
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

          {/* Consultation Assurance Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight mb-3">
                  Punya Pertanyaan Spesifik tentang Sistem Anda?
                </h3>

                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Konsultasikan spesifikasi teknis, integrasi modul, atau estimasi anggaran langsung bersama software architect kami tanpa biaya komitmen.
                </p>

                <div className="space-y-3 mb-8 pt-4 border-t border-white/10 text-xs font-sans text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Non-Disclosure Agreement (NDA) tersedia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Respons cepat dalam 1x24 jam kerja</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Rancangan arsitektur awal gratis</span>
                  </div>
                </div>

                <DrawOutlineButton
                  onClick={scrollToContact}
                  className="w-full justify-center py-3 text-xs sm:text-sm font-sans font-semibold text-white"
                >
                  <span>Mulai Diskusi Teknis</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </DrawOutlineButton>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FaqSection;
