import * as React from "react";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  badge?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}

export const SectionHeading = React.forwardRef<
  HTMLDivElement,
  SectionHeadingProps
>(
  (
    {
      badge,
      title,
      description,
      align = "center",
      as: HeadingTag = "h2",
      className,
      ...props
    },
    ref
  ) => {
    const isCenter = align === "center";

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col mb-12 sm:mb-16",
          isCenter ? "items-center text-center" : "items-start text-left",
          className
        )}
        {...props}
      >
        {badge && (
          <Badge variant="default" size="sm" className="mb-3">
            {badge}
          </Badge>
        )}

        <HeadingTag
          className={cn(
            "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight",
            isCenter ? "max-w-3xl" : "max-w-2xl"
          )}
        >
          {title}
        </HeadingTag>

        {description && (
          <p
            className={cn(
              "mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed",
              isCenter ? "max-w-2xl" : "max-w-xl"
            )}
          >
            {description}
          </p>
        )}
      </div>
    );
  }
);

SectionHeading.displayName = "SectionHeading";
