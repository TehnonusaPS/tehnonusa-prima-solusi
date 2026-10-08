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
    iconWidth: 30,
    iconHeight: 27,
    wrapper: "w-[30px] h-[27px]",
    primaryText: "font-heading text-[15px] font-black tracking-tight",
    subText: "font-sans text-[8.5px] font-bold tracking-[0.26em]",
    gap: "gap-2.5",
    spacing: "mt-0.5",
  },
  md: {
    iconWidth: 36,
    iconHeight: 33,
    wrapper: "w-[34px] h-[31px] sm:w-[36px] sm:h-[33px]",
    primaryText: "font-heading text-[16px] sm:text-[17px] font-black tracking-tight leading-none",
    subText: "font-sans text-[9.5px] sm:text-[10px] font-bold tracking-[0.28em] leading-none",
    gap: "gap-2.5 sm:gap-3",
    spacing: "mt-1",
  },
  lg: {
    iconWidth: 46,
    iconHeight: 42,
    wrapper: "w-[44px] h-[40px] sm:w-[48px] sm:h-[44px]",
    primaryText: "font-heading text-[20px] sm:text-[22px] font-black tracking-tight leading-none",
    subText: "font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.28em] leading-none",
    gap: "gap-3 sm:gap-3.5",
    spacing: "mt-1.5",
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
        "inline-flex items-center transition-opacity hover:opacity-90 outline-none group select-none",
        layout === "horizontal"
          ? cn("items-center", config.gap)
          : "flex-col items-center gap-2.5 text-center",
        className
      )}
      aria-label="PT Tehnonusa Prima Solusi Home"
      {...props}
    >
      {/* Official Transparent Emblem Icon */}
      <div
        className={cn(
          "relative shrink-0 flex items-center justify-center",
          config.wrapper
        )}
      >
        <Image
          src="/images/logo/logo-icon.png"
          alt="Tehnonusa Emblem"
          width={config.iconWidth * 2}
          height={config.iconHeight * 2}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {/* Adaptive HTML Typography (Light & Dark Mode Safe with Perfect Alignment) */}
      {showText && (
        <span
          className={cn(
            "flex flex-col justify-center",
            layout === "vertical" ? "items-center" : "items-start"
          )}
        >
          <span
            className={cn(
              "text-foreground uppercase text-nowrap font-black",
              config.primaryText
            )}
          >
            Tehnonusa
          </span>
          <span
            className={cn(
              "text-foreground/80 dark:text-foreground/80 uppercase text-nowrap",
              config.subText,
              config.spacing
            )}
          >
            Prima Solusi
          </span>
        </span>
      )}
    </a>
  );
}
