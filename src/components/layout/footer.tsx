"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ArrowUp,
  MessageCircle,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      aria-labelledby="footer-heading"
      className="bg-slate-950 text-slate-300 border-t border-slate-800/80 relative overflow-hidden"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer PT Tehnonusa Prima Solusi
      </h2>

      {/* Subtle Top Glow Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <Container size="lg" className="pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Identity & Official Info (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center">
              <Logo size="md" className="[&_span]:!text-white" />
            </div>

            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {t("about")}
            </p>

            <div className="pt-2 space-y-2 text-xs font-sans text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{tContact("address")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/6281319027707"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {tContact("phone")}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href="mailto:contact@tehnonusa.com"
                  className="hover:text-white transition-colors"
                >
                  {tContact("email")}
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com/company/tehnonusa-prima-solusi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn PT Tehnonusa Prima Solusi"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/50 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/tehnonusa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub PT Tehnonusa Prima Solusi"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/50 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/tehnonusa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram PT Tehnonusa Prima Solusi"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/50 transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6281319027707"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp PT Tehnonusa Prima Solusi"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/50 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
              {t("quick_links")}
            </h3>
            <ul className="space-y-2.5 text-xs font-sans text-slate-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {tNav("services")}
                </a>
              </li>
              <li>
                <a href="#tech" className="hover:text-white transition-colors">
                  Teknologi & SLA
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  {tNav("process")}
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">
                  {tNav("portfolio")}
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  Testimoni
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {tNav("contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Core Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
              {t("services_title")}
            </h3>
            <ul className="space-y-2.5 text-xs font-sans text-slate-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Enterprise Web Systems
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  High-Performance Mobile Apps
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Custom Software & Cloud
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Digital Transformation & API
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Konsultasi Arsitektur Software
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & SLA Guarantee (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
              Jaminan Kualitas
            </h3>
            <div className="space-y-3 text-xs font-mono text-slate-400">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-0.5">99.9% Uptime</span>
                <span className="text-[11px] text-slate-500">SLA Garansi Produksi</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-0.5">SOC-2 / ISO</span>
                <span className="text-[11px] text-slate-500">Standar Keamanan Data</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} PT Tehnonusa Prima Solusi. {t("rights")}
          </p>

          <div className="flex items-center gap-6">
            <span>{t("made_with")}</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
