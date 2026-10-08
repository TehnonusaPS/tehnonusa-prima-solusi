"use client";

import React, { useRef, useState, useEffect } from "react";
import { Lock, Send } from "lucide-react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

/* ============================================================
   1. ENCRYPT BUTTON — Cyber Cipher Text Scramble Effect
   ============================================================ */

const DEFAULT_TARGET_TEXT = "Encrypt data";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 40;
const CHARS = "!@#$%^&*():{};|,.<>/?_~";

export interface EncryptButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  text?: string;
  icon?: React.ReactNode;
}

export const EncryptButton: React.FC<EncryptButtonProps> = ({
  text: targetText = DEFAULT_TARGET_TEXT,
  icon,
  className,
  ...props
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [prevText, setPrevText] = useState(targetText);
  const [displayText, setDisplayText] = useState(targetText);

  if (prevText !== targetText) {
    setPrevText(targetText);
    setDisplayText(targetText);
  }

  const scramble = () => {
    let pos = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambled = targetText
        .split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }
          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          return CHARS[randomCharIndex];
        })
        .join("");

      setDisplayText(scrambled);
      pos++;

      if (pos >= targetText.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setDisplayText(targetText);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className={cn(
        "group relative overflow-hidden rounded-(--radius-md) border border-border bg-slate-900 px-5 py-2.5 font-mono text-sm font-medium uppercase text-slate-200 transition-colors hover:text-primary-light hover:border-primary/50 cursor-pointer select-none",
        className
      )}
      {...props}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        {icon ? (
          <span className="inline-flex shrink-0 items-center">{icon}</span>
        ) : null}
        <span>{displayText}</span>
      </div>
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1.2,
          ease: "linear",
        }}
        className="pointer-events-none absolute inset-0 z-0 scale-125 bg-gradient-to-t from-primary/0 via-primary/40 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.button>
  );
};

/* ============================================================
   2. SPOTLIGHT BUTTON — Mouse-tracking Radial Spotlight
   ============================================================ */

export interface SpotlightButtonProps extends HTMLMotionProps<"button"> {
  children?: React.ReactNode;
}

export const SpotlightButton: React.FC<SpotlightButtonProps> = ({
  children = "Hover me",
  className,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const span = spanRef.current;
    if (!btn || !span) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const offset = e.clientX - rect.left;
      const left = `${(offset / rect.width) * 100}%`;
      span.animate(
        { left, opacity: 0.9 },
        { duration: 250, fill: "forwards" }
      );
    };

    const handleMouseEnter = () => {
      span.animate(
        { opacity: 0.9 },
        { duration: 150, fill: "forwards" }
      );
    };

    const handleMouseLeave = () => {
      span.animate(
        { left: "50%", opacity: 0 },
        { duration: 200, fill: "forwards" }
      );
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseenter", handleMouseEnter);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseenter", handleMouseEnter);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      ref={btnRef}
      className={cn(
        // Light mode: Inverted from dark mode (clean white background, bold slate-950 text, soft elevation)
        "group relative overflow-hidden rounded-(--radius-md) bg-white px-7 py-3.5 font-sans text-sm font-semibold text-slate-950 shadow-sm shadow-slate-200/80 border border-slate-300/80 hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-pointer select-none",
        // Dark mode: Sleek dark CTA with dark border and primary glow
        "dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:shadow-none dark:hover:bg-slate-900",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Light mode: primary blue spotlight; Dark mode: primary blue spotlight (calibrated size) */}
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 dark:bg-primary/80 blur-xs opacity-0"
      />
    </motion.button>
  );
};

/* ============================================================
   3. DRAW OUTLINE BUTTON — Rounded Animated Border Tracing
   ============================================================ */

export interface DrawOutlineButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  strokeColor?: string;
  lineColor?: string;
  borderRadius?: number;
  strokeWidth?: number;
}

export const DrawOutlineButton: React.FC<DrawOutlineButtonProps> = ({
  children = "Hover me",
  className,
  strokeColor = "var(--primary, #0085EB)",
  lineColor,
  borderRadius = 12,
  strokeWidth = 2,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Fallback if legacy lineColor prop is passed
  const activeStrokeColor = strokeColor || "var(--primary, #0085EB)";

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      onMouseEnter={(e) => {
        setIsHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        onMouseLeave?.(e);
      }}
      onFocus={(e) => {
        setIsHovered(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsHovered(false);
        onBlur?.(e);
      }}
      className={cn(
        // Light mode: Inverted from dark mode, muted slate-100 background to avoid 50:50 visual weight clash with primary button
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-(--radius-md) border border-slate-200/90 bg-slate-100/70 px-7 py-3.5 font-sans text-sm font-semibold text-slate-700 backdrop-blur-xs transition-colors duration-300 hover:text-slate-950 hover:bg-slate-100 active:scale-[0.985] shadow-2xs cursor-pointer select-none",
        // Dark mode: Dark slate background, light text, dark border
        "dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-white",
        className
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>

      {/* SVG Rounded Animated Outline Trace (Universal Safari & Chromium support) */}
      <div className="pointer-events-none absolute inset-[1px] rounded-[inherit] overflow-hidden">
        <svg
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx={borderRadius}
            ry={borderRadius}
            pathLength="100"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-[stroke-dashoffset,opacity] duration-500 ease-in-out"
            style={{
              stroke: activeStrokeColor,
              strokeWidth,
              strokeDasharray: "100",
              strokeDashoffset: isHovered ? "0" : "100",
              opacity: isHovered ? 1 : 0,
            }}
          />
        </svg>
      </div>
    </motion.button>
  );
};

/* ============================================================
   4. DOTTED BUTTON — Brutalist Dashed Border & Offset Shadow
   ============================================================ */

export interface DottedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const DottedButton: React.FC<DottedButtonProps> = ({
  children = "Hover me",
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "rounded-2xl border-2 border-dashed border-foreground/80 bg-background px-6 py-3 font-semibold uppercase text-foreground transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:rounded-md hover:shadow-[4px_4px_0px_var(--color-foreground)] active:translate-x-0 active:translate-y-0 active:rounded-2xl active:shadow-none cursor-pointer select-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

/* ============================================================
   5. NEUMORPHISM BUTTON — Soft Inset Shadow Morphing
   ============================================================ */

export interface NeumorphismButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export const NeumorphismButton: React.FC<NeumorphismButtonProps> = ({
  children = "Hover Me",
  icon,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "px-5 py-2.5 rounded-full inline-flex items-center gap-2 text-slate-500 font-medium transition-all duration-200 shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),5px_5px_10px_rgba(0,0,0,0.2)] hover:shadow-[-1px_-1px_5px_rgba(255,255,255,0.6),1px_1px_5px_rgba(0,0,0,0.3),inset_-2px_-2px_5px_rgba(255,255,255,1),inset_2px_2px_4px_rgba(0,0,0,0.25)] hover:text-primary cursor-pointer select-none bg-slate-100",
        className
      )}
      {...props}
    >
      {icon ?? <Send className="h-4 w-4" />}
      <span>{children}</span>
    </button>
  );
};

/* ============================================================
   6. NEU BUTTON — Neo-Brutalist Solid Pop Offset Button
   ============================================================ */

export interface NeuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const NeuButton: React.FC<NeuButtonProps> = ({
  children = "Hover me",
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "px-6 py-2.5 font-medium bg-primary text-primary-foreground w-fit transition-all shadow-[3px_3px_0px_var(--color-foreground)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] cursor-pointer select-none active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
