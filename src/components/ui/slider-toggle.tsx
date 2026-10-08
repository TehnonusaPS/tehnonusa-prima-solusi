"use client";

import React, { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

export interface SliderToggleProps {
  selected?: "light" | "dark";
  setSelected?: (val: "light" | "dark") => void;
  className?: string;
  useNextThemes?: boolean;
}

const TOGGLE_CLASSES =
  "text-xs sm:text-sm font-semibold flex items-center justify-center h-full gap-1.5 px-3 transition-colors relative z-10 cursor-pointer select-none outline-none";

export const SliderToggle: React.FC<SliderToggleProps> = ({
  selected: controlledSelected,
  setSelected: controlledSetSelected,
  className,
  useNextThemes = false,
}) => {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const [internalSelected, setInternalSelected] = React.useState<"light" | "dark">("dark");

  const isControlled = controlledSelected !== undefined;
  const currentMode: "light" | "dark" = useNextThemes && mounted
    ? (resolvedTheme === "dark" ? "dark" : "light")
    : (isControlled ? controlledSelected : internalSelected);

  const handleSelect = (mode: "light" | "dark") => {
    if (useNextThemes) {
      setTheme(mode);
    }
    if (isControlled) {
      controlledSetSelected?.(mode);
    } else {
      setInternalSelected(mode);
    }
  };

  return (
    <div
      className={cn(
        "relative flex h-10 w-fit items-center rounded-full p-1 bg-muted/80 border border-border/80 shadow-2xs select-none",
        className
      )}
      role="group"
      aria-label="Theme selection"
    >
      <button
        type="button"
        aria-pressed={currentMode === "light"}
        className={cn(
          TOGGLE_CLASSES,
          currentMode === "light"
            ? "text-primary-foreground font-bold"
            : "text-muted-foreground hover:text-foreground"
        )}
        onClick={() => handleSelect("light")}
      >
        <Sun className="h-4 w-4 relative z-10" />
        <span className="relative z-10">Light</span>
      </button>

      <button
        type="button"
        aria-pressed={currentMode === "dark"}
        className={cn(
          TOGGLE_CLASSES,
          currentMode === "dark"
            ? "text-primary-foreground font-bold"
            : "text-muted-foreground hover:text-foreground"
        )}
        onClick={() => handleSelect("dark")}
      >
        <Moon className="h-4 w-4 relative z-10" />
        <span className="relative z-10">Dark</span>
      </button>

      {/* Spring Animated Sliding Pill */}
      <div
        className={cn(
          "absolute inset-1 z-0 flex",
          currentMode === "dark" ? "justify-end" : "justify-start"
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 18, stiffness: 280 }}
          className="h-full w-1/2 rounded-full bg-primary shadow-xs"
        />
      </div>
    </div>
  );
};

export default SliderToggle;
