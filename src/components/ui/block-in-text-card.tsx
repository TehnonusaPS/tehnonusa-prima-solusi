"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;
const FADE_DELAY = 5;
const MAIN_FADE_DURATION = 0.25;
const SWAP_DELAY_IN_MS = 5500;

export interface BlockInTextCardProps {
  tag?: string;
  text?: React.ReactNode;
  examples?: string[];
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

const DEFAULT_EXAMPLES = [
  "Berapa lama estimasi pembuatan sistem web custom?",
  "Apakah sistem dapat diintegrasikan dengan database lama kami?",
  "Bagaimana skema support dan SLA setelah go-live?",
  "Apakah arsitektur cloud disiapkan untuk high traffic?",
];

export const BlockInTextCard: React.FC<BlockInTextCardProps> = ({
  tag = "/ Konsultasi Solusi",
  text = (
    <>
      <strong className="font-semibold text-foreground">Ada pertanyaan?</strong> Tim arsitek teknologi kami siap membantu memetakan kebutuhan sistem digital perusahaan Anda.
    </>
  ),
  examples = DEFAULT_EXAMPLES,
  ctaText = "Hubungi Tim Solusi",
  onCtaClick,
  className,
}) => {
  return (
    <div className={cn("w-full max-w-xl space-y-6 text-foreground", className)}>
      <div>
        <p className="mb-2 text-xs sm:text-sm font-medium uppercase tracking-wider text-primary">
          {tag}
        </p>
        <hr className="border-border" />
      </div>

      <div className="max-w-lg text-lg sm:text-xl leading-relaxed text-muted-foreground">
        {text}
      </div>

      <div>
        <Typewrite examples={examples} />
        <hr className="border-border/60" />
      </div>

      <button
        type="button"
        onClick={onCtaClick}
        className="w-full rounded-full border border-foreground/30 bg-background py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-foreground hover:text-background active:scale-[0.99] cursor-pointer shadow-xs"
      >
        {ctaText}
      </button>
    </div>
  );
};

interface TypewriteProps {
  examples: string[];
}

export const Typewrite: React.FC<TypewriteProps> = ({ examples }) => {
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    if (!examples || examples.length === 0) return;

    const intervalId = setInterval(() => {
      setExampleIndex((pv) => (pv + 1) % examples.length);
    }, SWAP_DELAY_IN_MS);

    return () => clearInterval(intervalId);
  }, [examples]);

  if (!examples || examples.length === 0) return null;

  const currentExample = examples[exampleIndex] ?? "";

  return (
    <p className="mb-3 text-xs sm:text-sm font-mono uppercase tracking-wide text-foreground">
      <span className="inline-block size-2 bg-primary rounded-xs align-middle" />
      <span className="ml-2.5">
        <span className="text-muted-foreground">CONTOH: </span>
        {currentExample.split("").map((letter, i) => (
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              delay: FADE_DELAY,
              duration: MAIN_FADE_DURATION,
              ease: "easeInOut",
            }}
            key={`${exampleIndex}-${i}`}
            className="relative"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: i * LETTER_DELAY,
                duration: 0,
              }}
            >
              {letter}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                delay: i * LETTER_DELAY,
                times: [0, 0.1, 1],
                duration: BOX_FADE_DURATION,
                ease: "easeInOut",
              }}
              className="absolute bottom-[2px] left-[1px] right-0 top-[2px] bg-primary"
            />
          </motion.span>
        ))}
      </span>
    </p>
  );
};

export default BlockInTextCard;
