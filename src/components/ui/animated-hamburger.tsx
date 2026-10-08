"use client";

import React, { useState } from "react";
import { MotionConfig, motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface AnimatedHamburgerButtonProps {
  active?: boolean;
  onToggle?: (active: boolean) => void;
  className?: string;
  barColor?: string;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
}

const sizeMap = {
  sm: { button: "h-10 w-10", barHeight: "h-0.5", barWidth: "w-6", halfBarWidth: "w-3", offset: "6px" },
  md: { button: "h-14 w-14", barHeight: "h-1", barWidth: "w-8", halfBarWidth: "w-4", offset: "8px" },
  lg: { button: "h-20 w-20", barHeight: "h-1", barWidth: "w-10", halfBarWidth: "w-5", offset: "10px" },
};

export const AnimatedHamburgerButton: React.FC<AnimatedHamburgerButtonProps> = ({
  active: controlledActive,
  onToggle,
  className,
  barColor = "bg-foreground",
  size = "md",
  ariaLabel = "Toggle menu",
}) => {
  const [internalActive, setInternalActive] = useState(false);
  const isControlled = controlledActive !== undefined;
  const active = isControlled ? controlledActive : internalActive;

  const handleClick = () => {
    const next = !active;
    if (!isControlled) {
      setInternalActive(next);
    }
    onToggle?.(next);
  };

  const currentSize = sizeMap[size];

  const customVariants: { top: Variants; middle: Variants; bottom: Variants } = {
    top: {
      open: {
        rotate: ["0deg", "0deg", "45deg"],
        top: ["35%", "50%", "50%"],
      },
      closed: {
        rotate: ["45deg", "0deg", "0deg"],
        top: ["50%", "50%", "35%"],
      },
    },
    middle: {
      open: {
        rotate: ["0deg", "0deg", "-45deg"],
      },
      closed: {
        rotate: ["-45deg", "0deg", "0deg"],
      },
    },
    bottom: {
      open: {
        rotate: ["0deg", "0deg", "45deg"],
        bottom: ["35%", "50%", "50%"],
        left: "50%",
      },
      closed: {
        rotate: ["45deg", "0deg", "0deg"],
        bottom: ["50%", "50%", "35%"],
        left: `calc(50% + ${currentSize.offset})`,
      },
    },
  };

  return (
    <MotionConfig
      transition={{
        duration: 0.45,
        ease: "easeInOut",
      }}
    >
      <motion.button
        type="button"
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={handleClick}
        aria-expanded={active}
        aria-label={ariaLabel}
        className={cn(
          "relative rounded-full transition-colors hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring outline-none cursor-pointer flex items-center justify-center",
          currentSize.button,
          className
        )}
      >
        <motion.span
          variants={customVariants.top}
          className={cn("absolute rounded-full", currentSize.barHeight, currentSize.barWidth, barColor)}
          style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
        />
        <motion.span
          variants={customVariants.middle}
          className={cn("absolute rounded-full", currentSize.barHeight, currentSize.barWidth, barColor)}
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={customVariants.bottom}
          className={cn("absolute rounded-full", currentSize.barHeight, currentSize.halfBarWidth, barColor)}
          style={{
            x: "-50%",
            y: "50%",
            bottom: "35%",
            left: `calc(50% + ${currentSize.offset})`,
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

export default AnimatedHamburgerButton;
