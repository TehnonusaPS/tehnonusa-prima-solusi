import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary border border-primary/20 dark:bg-primary/20 dark:border-primary/30",
        secondary:
          "bg-secondary/10 text-secondary border border-secondary/20 dark:bg-secondary/30 dark:text-secondary-foreground dark:border-secondary/40",
        outline:
          "border border-border text-foreground/80 bg-background/50",
        surface:
          "bg-surface-elevated text-foreground border border-border shadow-2xs",
        success:
          "bg-success/10 text-success border border-success/20 dark:bg-success/20",
        warning:
          "bg-warning/10 text-warning border border-warning/20 dark:bg-warning/20",
        danger:
          "bg-danger/10 text-danger border border-danger/20 dark:bg-danger/20",
      },
      size: {
        sm: "text-xs px-2.5 py-0.5 rounded-full",
        md: "text-sm px-3 py-1 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  withDot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, withDot = false, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {withDot && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
          </span>
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
