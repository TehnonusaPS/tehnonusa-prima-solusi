"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Send,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { TechBackground } from "@/components/ui/tech-background";
import { CircleHighlight } from "@/components/ui/draw-circle-text";
import { SpotlightButton, DrawOutlineButton } from "@/components/ui/creative-buttons";
import { cn } from "@/lib/utils";

export function CtaSection() {
  const t = useTranslations("cta");
  const tContact = useTranslations("contact");

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "Enterprise Web Systems",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission and construct WhatsApp redirect
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      const waText = encodeURIComponent(
        `Halo PT. Tehnonusa Prima Solusi, saya ingin berkonsultasi mengenai proyek software.\n\n` +
          `• Nama: ${formData.name}\n` +
          `• Perusahaan: ${formData.company || "-"}\n` +
          `• Email: ${formData.email}\n` +
          `• WhatsApp: ${formData.phone}\n` +
          `• Layanan: ${formData.service}\n` +
          `• Kebutuhan: ${formData.message || "Konsultasi umum"}`
      );

      // Open WhatsApp in new tab
      window.open(`https://wa.me/6281319027707?text=${waText}`, "_blank");
    }, 800);
  };

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="relative py-24 sm:py-32 overflow-hidden bg-background transition-colors duration-300"
    >
      <TechBackground variant="section" pattern="grid" />

      <Container size="lg">
        {/* Main CTA Card with Ambient Glowing Border */}
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 shadow-2xl overflow-hidden">
          {/* Glowing Ambient Radial Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Heading, Value Proposition & Official Contacts (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs font-mono font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t("kicker")}</span>
              </div>

              <h2
                id="cta-heading"
                className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.15]"
              >
                <span>{t("title_prefix")} </span>
                <span className="text-primary-light underline decoration-primary decoration-4 underline-offset-4">
                  {t("title_highlight")}
                </span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                {t("description")}
              </p>

              {/* Official Contact Badges */}
              <div className="pt-4 border-t border-white/10 space-y-3.5 text-xs sm:text-sm font-sans text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{tContact("address")}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a
                    href="https://wa.me/6281319027707"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors underline decoration-white/20"
                  >
                    {tContact("phone")} (WhatsApp Fast Response)
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <a
                    href="mailto:contact@tehnonusa.com"
                    className="hover:text-white transition-colors underline decoration-white/20"
                  >
                    {tContact("email")}
                  </a>
                </div>
              </div>

              {/* Trust Safeguards */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>1x24 Jam Respons</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Kerahasiaan NDA Terjamin</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Consultation Form (6 cols) */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-xl">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-8 space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>

                      <h3 className="font-heading text-xl font-bold text-white">
                        {t("form_success_title")}
                      </h3>

                      <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
                        {t("form_success_desc")}
                      </p>

                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setIsSubmitted(false);
                            setFormData({
                              name: "",
                              company: "",
                              email: "",
                              phone: "",
                              service: "Enterprise Web Systems",
                              message: "",
                            });
                          }}
                          className="px-5 py-2.5 rounded-full bg-surface border border-border text-xs font-sans font-semibold text-foreground hover:bg-surface/80 transition-colors"
                        >
                          Kirim Pertanyaan Lain
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <h3 className="font-heading text-lg font-bold text-white mb-2">
                        {t("modal_title")}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-sans font-semibold text-slate-300 mb-1.5">
                            {t("form_name")} *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Budi Santoso"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-sans font-semibold text-slate-300 mb-1.5">
                            {t("form_company")}
                          </label>
                          <input
                            type="text"
                            placeholder="Contoh: PT Maju Bersama"
                            value={formData.company}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                company: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-sans font-semibold text-slate-300 mb-1.5">
                            {t("form_email")} *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="nama@perusahaan.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-sans font-semibold text-slate-300 mb-1.5">
                            {t("form_phone")} *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="0812xxxxxxxx"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-sans font-semibold text-slate-300 mb-1.5">
                          {t("form_service")}
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) =>
                            setFormData({ ...formData, service: e.target.value })
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        >
                          <option value="Enterprise Web Systems">
                            Enterprise Web Systems
                          </option>
                          <option value="Mobile Applications">
                            Mobile Applications (iOS/Android)
                          </option>
                          <option value="Custom Software & Cloud">
                            Custom Software & Cloud
                          </option>
                          <option value="Digital Transformation & API">
                            Digital Transformation & API
                          </option>
                          <option value="Konsultasi Arsitektur Sistem">
                            Konsultasi Arsitektur Sistem
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-sans font-semibold text-slate-300 mb-1.5">
                          {t("form_message")}
                        </label>
                        <textarea
                          rows={3}
                          placeholder={t("form_message")}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                        />
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white font-sans text-xs sm:text-sm font-semibold transition-all duration-300 shadow-lg shadow-primary/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          <Send className="w-4 h-4" />
                          <span>
                            {isSubmitting
                              ? t("form_submitting")
                              : t("form_submit")}
                          </span>
                        </button>

                        <a
                          href="https://wa.me/6281319027707"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CtaSection;
