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
            transform: "translateZ(28px) translateY(-10px)",
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 2.4,
            ease: "easeInOut",
          }}
          className="relative h-[430px] w-64 rounded-[30px] border-2 border-b-4 border-r-4 border-white/80 dark:border-slate-700/80 border-l-slate-300 dark:border-l-slate-800 border-t-slate-300 dark:border-t-slate-800 bg-slate-950 p-1.5 shadow-2xl overflow-hidden"
        >
          {/* Top Speaker Notch & System Status Icons */}
          <div className="absolute left-1/2 top-2 z-20 h-3.5 w-24 -translate-x-1/2 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-white/20 inline-block mr-2" />
            <span className="w-8 h-1 rounded-full bg-slate-800 inline-block" />
          </div>

          <div className="absolute right-4 top-2.5 z-20 flex items-center gap-1.5 text-white/70">
            <Wifi className="w-3 h-3" />
            <BatteryCharging className="w-3 h-3 text-emerald-400" />
          </div>

          {/* Screen Content */}
          <div className="relative z-10 h-full w-full rounded-[24px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-4 pt-8 text-white flex flex-col justify-between overflow-hidden border border-white/5">
            {/* Ambient Screen Light */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-primary/30 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-3">
              {/* App Brand Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-white">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-heading font-black text-xs block leading-tight tracking-tight">
                      GerbangSekolah
                    </span>
                    <span className="font-sans text-[9px] text-primary-light block leading-none">
                      Wali Murid App
                    </span>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Student Identity Card */}
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center font-heading font-bold text-xs text-primary-light">
                    AP
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs leading-tight">
                      Ahmad Pratama
                    </h4>
                    <p className="font-sans text-[10px] text-slate-400">
                      NIS: 20240912 &bull; X-IPA 1
                    </p>
                  </div>
                </div>

                {/* Gate Attendance Live Telemetry Status */}
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-semibold">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span>Hadir di Gerbang 1</span>
                  </div>
                  <span className="font-mono text-[9px] text-emerald-300 font-bold">
                    06:45 WIB
                  </span>
                </div>
              </div>

              {/* Instant WhatsApp Delivery Notice */}
              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-600/30 flex items-center justify-center shrink-0">
                  <Bell className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="leading-tight">
                  <span className="text-[10px] font-semibold text-white block">
                    Notifikasi Terkirim ke WA
                  </span>
                  <span className="text-[9px] text-slate-400 block">
                    +62 812-xxxx-7701 &bull; 06:45:02
                  </span>
                </div>
              </div>

              {/* Tuition Billing Snapshot */}
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-medium">Status SPP Oktober:</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  Lunas
                </span>
              </div>
            </div>

            {/* Bottom Screen CTA */}
            <div className="relative z-10 pt-2">
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-sans text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-primary/30"
              >
                <span>Buka school-app</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-[9px] font-mono text-center text-slate-400 block mt-1.5">
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
