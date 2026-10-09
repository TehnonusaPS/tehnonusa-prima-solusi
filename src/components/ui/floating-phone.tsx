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
import { LottieAnimation } from "@/components/ui/lottie-animation";

export interface FloatingPhoneProps {
  className?: string;
  appUrl?: string;
}

export const FloatingPhone: React.FC<FloatingPhoneProps> = ({
  className,
  appUrl = "https://school-app.tehnonusa.com/",
}) => {
  return (
    <div className={cn("perspective-[1200px] flex items-center justify-center py-2 select-none", className)}>
      {/* 3D Angled Phone Chassis */}
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(-18deg) rotateX(10deg)",
        }}
        className="rounded-[40px] bg-primary/70 shadow-2xl shadow-primary/30 p-1"
      >
        <motion.div
          initial={{
            transform: "translateZ(8px) translateY(-3px)",
          }}
          animate={{
            transform: "translateZ(24px) translateY(-10px)",
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 2.6,
            ease: "easeInOut",
          }}
          className="relative h-[460px] w-[224px] rounded-[38px] border-[3px] border-b-[5px] border-r-[4px] border-slate-700/90 dark:border-slate-700/90 border-l-slate-800 border-t-slate-800 bg-slate-950 p-[3px] shadow-2xl overflow-hidden"
        >
          {/* Outer Bezel Frame */}
          <div className="relative z-10 h-full w-full rounded-[34px] bg-slate-950 p-3 pt-2 text-white flex flex-col justify-between overflow-hidden border border-white/5">
            {/* Ambient Screen Glows */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-primary/25 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />

            {/* Top iOS Status Bar with Dynamic Island */}
            <div className="relative z-20 flex items-center justify-between pt-1 pb-2">
              <span className="font-sans font-semibold text-[10px] text-white/90 tracking-tight pl-1.5">
                09:41
              </span>

              {/* Dynamic Island Pill */}
              <div className="h-4 w-18 rounded-full bg-black border border-white/10 flex items-center justify-center gap-1.5 px-2 shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-white/30" />
                <span className="w-1 h-1 rounded-full bg-emerald-500/80 animate-pulse" />
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-1 text-white/80 pr-1.5">
                <Wifi className="w-2.5 h-2.5" />
                <BatteryCharging className="w-3 h-3 text-emerald-400" />
              </div>
            </div>

            {/* Main Screen Body Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-between py-1 space-y-2">
              {/* App Brand Header */}
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-light">
                    <GraduationCap className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <span className="font-heading font-black text-xs block leading-tight tracking-tight text-white">
                      GerbangSekolah
                    </span>
                    <span className="font-sans text-[8px] text-primary-light block leading-none">
                      Wali Murid Mobile
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[8px] font-mono text-emerald-400">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online</span>
                </div>
              </div>

              {/* Student Identity Card */}
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-cyan-400 text-white flex items-center justify-center font-heading font-bold text-[10px] shadow-sm">
                    AP
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-heading font-bold text-xs leading-tight text-white truncate">
                      Ahmad Pratama
                    </h4>
                    <p className="font-sans text-[9px] text-slate-400 truncate">
                      NIS: 20240912 &bull; Kelas X-IPA 1
                    </p>
                  </div>
                </div>

                {/* Gate Attendance Live Telemetry */}
                <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-semibold">
                    <div className="w-4 h-4 shrink-0 flex items-center justify-center overflow-hidden">
                      <LottieAnimation
                        src="/lottie/check-success.json"
                        className="w-5 h-5 scale-125"
                        loop={true}
                      />
                    </div>
                    <span>Presensi Gerbang Masuk</span>
                  </div>
                  <span className="font-mono text-[9px] text-emerald-300 font-bold">
                    06:45 WIB
                  </span>
                </div>
              </div>

              {/* Instant WhatsApp Delivery Notice */}
              <div className="p-2.5 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Bell className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="leading-tight min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-white block truncate">
                    Notifikasi Masuk ke WhatsApp
                  </span>
                  <span className="text-[8px] text-slate-400 block truncate font-mono">
                    +62 812-xxxx-7701 &bull; 06:45:02
                  </span>
                </div>
              </div>

              {/* Tuition Billing Snapshot */}
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-[10px]">
                <div className="leading-tight">
                  <span className="text-slate-300 font-medium block text-[9px]">Status SPP Oktober:</span>
                  <span className="text-slate-400 text-[8px]">Virtual Account BNI</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 text-[9px]">
                  Lunas
                </span>
              </div>
            </div>

            {/* Bottom Screen CTA & Home Indicator */}
            <div className="relative z-10 pt-1">
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-primary to-blue-500 hover:from-primary-dark hover:to-primary text-white font-sans text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-primary/30 cursor-pointer"
              >
                <span>Buka school-app</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-[8px] font-mono text-center text-slate-400 block mt-1">
                PT Tehnonusa Prima Solusi
              </span>

              {/* iOS Home Indicator Bar */}
              <div className="w-20 h-1 bg-white/30 rounded-full mx-auto mt-2" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FloatingPhone;
