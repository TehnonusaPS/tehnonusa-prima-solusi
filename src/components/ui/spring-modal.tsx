"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpringModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  primaryActionText?: string;
  secondaryActionText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  className?: string;
}

export const SpringModal: React.FC<SpringModalProps> = ({
  isOpen,
  setIsOpen,
  title = "Satu Langkah Lagi!",
  description = "Tim konsultan PT Tehnonusa Prima Solusi siap membantu memetakan arsitektur dan estimasi waktu proyek digital Anda.",
  icon,
  primaryActionText = "Konfirmasi & Lanjutkan",
  secondaryActionText = "Kembali",
  onPrimaryAction,
  onSecondaryAction,
  className,
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handlePrimary = () => {
    onPrimaryAction?.();
    setIsOpen(false);
  };

  const handleSecondary = () => {
    onSecondaryAction?.();
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/60 backdrop-blur-md p-4 sm:p-8 cursor-pointer select-none"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative w-full max-w-lg overflow-hidden rounded-(--radius-xl) bg-gradient-to-br from-primary-dark via-primary to-secondary p-6 sm:p-8 text-white shadow-2xl cursor-default border border-white/20",
              className
            )}
          >
            {/* Background Watermark Icon */}
            <div className="absolute -left-20 -top-20 z-0 text-white/10 rotate-12 pointer-events-none select-none">
              <AlertCircle className="w-80 h-80" strokeWidth={1} />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Icon Bubble */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-lg">
                {icon ?? <AlertCircle className="h-8 w-8 text-primary" />}
              </div>

              {/* Title & Description */}
              <h3 className="mb-2 text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                {title}
              </h3>
              <p className="mb-6 text-sm sm:text-base text-white/90 leading-relaxed max-w-md">
                {description}
              </p>

              {/* Action Buttons */}
              <div className="flex w-full flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handleSecondary}
                  className="w-full rounded-(--radius-md) bg-white/10 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20 active:scale-[0.99] cursor-pointer"
                >
                  {secondaryActionText}
                </button>
                <button
                  type="button"
                  onClick={handlePrimary}
                  className="w-full rounded-(--radius-md) bg-white py-2.5 text-sm font-semibold text-primary transition-opacity hover:opacity-95 active:scale-[0.99] cursor-pointer shadow-md"
                >
                  {primaryActionText}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;
