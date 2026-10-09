"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Wifi,
  BatteryCharging,
  CheckCircle2,
  Bell,
  ArrowUpRight,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FloatingPhoneProps {
  className?: string;
  appUrl?: string;
}

export const FloatingPhone: React.FC<FloatingPhoneProps> = ({
  className,
  appUrl = "https://school-app.tehnonusa.com/",
}) => {
  return (
    <div className={cn("perspective-[1000px] flex items-center justify-center py-4", className)}>
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(-20deg) rotateX(12deg)",
        }}
        className="rounded-[32px] bg-primary/80 shadow-2xl shadow-primary/30 p-1"
      >
        <motion.div
          initial={{
            transform: "translateZ(8px) translateY(-2px)",
          }}
          animate={{
            transform: "translateZ(24px) translateY(-8px)",
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 2.4,
            ease: "easeInOut",
          }}
          className="relative h-[370px] w-60 rounded-[28px] border-2 border-b-4 border-r-4 border-white/80 dark:border-slate-700/80 border-l-slate-300 dark:border-l-slate-800 border-t-slate-300 dark:border-t-slate-800 bg-slate-950 p-1 shadow-2xl overflow-hidden"
        >
          {/* Top Speaker Notch & System Status Icons */}
          <div className="absolute left-1/2 top-1.5 z-20 h-3 w-20 -translate-x-1/2 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-slate-900 border border-white/20 inline-block mr-1.5" />
            <span className="w-6 h-0.5 rounded-full bg-slate-800 inline-block" />
          </div>

          <div className="absolute right-3.5 top-2 z-20 flex items-center gap-1.5 text-white/70">
            <Wifi className="w-3 h-3" />
            <BatteryCharging className="w-3 h-3 text-emerald-400" />
          </div>

          {/* Screen Content */}
          <div className="relative z-10 h-full w-full rounded-[22px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-3 pt-6 text-white flex flex-col justify-between overflow-hidden border border-white/5">
            {/* Ambient Screen Light */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/30 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-2">
              {/* App Brand Header */}
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center text-white">
                    <GraduationCap className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="font-heading font-black text-[11px] block leading-tight tracking-tight">
                      GerbangSekolah
                    </span>
                    <span className="font-sans text-[8px] text-primary-light block leading-none">
                      Wali Murid App
                    </span>
                  </div>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Student Identity Card */}
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center font-heading font-bold text-[10px] text-primary-light">
                    AP
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-[11px] leading-tight">
                      Ahmad Pratama
                    </h4>
                    <p className="font-sans text-[9px] text-slate-400">
                      NIS: 20240912 &bull; X-IPA 1
                    </p>
                  </div>
                </div>

                {/* Gate Attendance Live Telemetry Status */}
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-emerald-400 text-[9px] font-semibold">
                    <CheckCircle2 className="w-2.5 h-2.5 shrink-0" />
                    <span>Hadir di Gerbang 1</span>
                  </div>
                  <span className="font-mono text-[9px] text-emerald-300 font-bold">
                    06:45 WIB
                  </span>
                </div>
              </div>

              {/* Instant WhatsApp Delivery Notice */}
              <div className="p-2 rounded-lg bg-slate-900 border border-white/10 flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-emerald-600/30 flex items-center justify-center shrink-0">
                  <Bell className="w-2.5 h-2.5 text-emerald-400" />
                </div>
                <div className="leading-tight">
                  <span className="text-[9px] font-semibold text-white block">
                    Notifikasi Terkirim ke WA
                  </span>
                  <span className="text-[8px] text-slate-400 block">
                    +62 812-xxxx-7701 &bull; 06:45:02
                  </span>
                </div>
              </div>

              {/* Tuition Billing Snapshot */}
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-[9px]">
                <span className="text-slate-300 font-medium">Status SPP:</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 text-[8px]">
                  Lunas
                </span>
              </div>
            </div>

            {/* Bottom Screen CTA */}
            <div className="relative z-10 pt-1">
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-sans text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors shadow-md shadow-primary/30"
              >
                <span>Buka school-app</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <span className="text-[8px] font-mono text-center text-slate-400 block mt-1">
                PT Tehnonusa Prima Solusi
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FloatingPhone;
