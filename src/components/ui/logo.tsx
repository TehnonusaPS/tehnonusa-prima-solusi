import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface LogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: "sm" | "md" | "lg";
  layout?: "horizontal" | "vertical";
  showText?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: {
    iconSize: 28,
    iconWrapper: "w-7 h-7",
    primaryText: "text-sm sm:text-base font-extrabold tracking-tight",
    subText: "text-[8px] sm:text-[9px] font-semibold tracking-[0.18em]",
  },
  md: {
    iconSize: 36,
    iconWrapper: "w-9 h-9 sm:w-10 sm:h-10",
    primaryText: "text-base sm:text-lg font-extrabold tracking-tight",
    subText: "text-[9px] sm:text-[10px] font-semibold tracking-[0.2em]",
  },
  lg: {
    iconSize: 48,
    iconWrapper: "w-12 h-12 sm:w-14 sm:h-14",
    primaryText: "text-xl sm:text-2xl font-extrabold tracking-tight",
    subText: "text-[11px] sm:text-xs font-semibold tracking-[0.22em]",
  },
};

export function Logo({
  size = "md",
  layout = "horizontal",
  showText = true,
  className,
  href = "#",
  ...props
}: LogoProps) {
  const config = sizeConfig[size];

  return (
    <a
      href={href}
      className={cn(
        "inline-flex transition-opacity hover:opacity-90 outline-none group select-none",
        layout === "horizontal"
          ? "items-center gap-2.5 sm:gap-3"
          : "flex-col items-center gap-2 text-center",
        className
      )}
      aria-label="PT Tehnonusa Prima Solusi Home"
      {...props}
    >
      {/* Official Transparent Emblem Icon */}
      <div className={cn("relative shrink-0 flex items-center justify-center", config.iconWrapper)}>
        <Image
          src="/images/logo/logo-icon.png"
          alt="Tehnonusa Emblem"
          width={config.iconSize * 2}
          height={config.iconSize * 2}
          className="w-full h-full object-contain drop-shadow-xs"
          priority
        />
      </div>

      {/* Adaptive HTML Typography (Light & Dark Mode Safe) */}
      {showText && (
        <span
          className={cn(
            "flex flex-col",
            layout === "vertical" ? "items-center" : "items-start text-left"
          )}
        >
          <span
            className={cn(
              "leading-none text-foreground uppercase tracking-tight",
              config.primaryText
            )}
          >
            Tehnonusa
          </span>
          <span
            className={cn(
              "leading-tight text-muted-foreground uppercase pt-0.5",
              config.subText
            )}
          >
            Prima Solusi
          </span>
        </span>
      )}
    </a>
  );
}
