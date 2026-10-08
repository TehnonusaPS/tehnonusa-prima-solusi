"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

export interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "dropdown" | "pills";
}

export function ThemeToggle({ className, variant = "icon" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon-sm"
        className={cn("w-9 h-9 rounded-full border border-border/80 bg-surface/80", className)}
        aria-label="Theme toggle placeholder"
        disabled
      >
        <span className="h-4 w-4 rounded-full bg-muted animate-pulse" />
      </Button>
    );
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  if (variant === "pills") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1 p-1 rounded-full bg-muted/60 border border-border text-xs",
          className
        )}
        role="group"
        aria-label="Theme options"
      >
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={cn(
            "p-1.5 rounded-full transition-colors",
            theme === "light"
              ? "bg-background text-primary shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label="Light mode"
          title="Light"
        >
          <Sun className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={cn(
            "p-1.5 rounded-full transition-colors",
            theme === "dark"
              ? "bg-background text-primary shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label="Dark mode"
          title="Dark"
        >
          <Moon className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setTheme("system")}
          className={cn(
            "p-1.5 rounded-full transition-colors",
            theme === "system"
              ? "bg-background text-primary shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label="System mode"
          title="System"
        >
          <Monitor className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={cycleTheme}
      className={cn(
        "w-9 h-9 rounded-full border border-border/80 bg-surface/80 hover:bg-muted text-muted-foreground hover:text-foreground relative transition-colors shadow-2xs flex items-center justify-center cursor-pointer",
        className
      )}
      aria-label={`Current theme: ${theme}. Click to change theme.`}
      title={`Theme: ${theme}`}
    >
      <Sun
        className={cn(
          "h-4 w-4 transition-all duration-300 absolute",
          theme === "light"
            ? "rotate-0 scale-100 opacity-100 text-amber-500"
            : "-rotate-90 scale-0 opacity-0"
        )}
      />
      <Moon
        className={cn(
          "h-4 w-4 transition-all duration-300 absolute",
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100 text-primary-light"
            : "rotate-90 scale-0 opacity-0"
        )}
      />
      <Monitor
        className={cn(
          "h-4 w-4 transition-all duration-300 absolute",
          theme === "system"
            ? "rotate-0 scale-100 opacity-100 text-foreground"
            : "rotate-90 scale-0 opacity-0"
        )}
      />
    </Button>
  );
}
