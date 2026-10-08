import * as React from "react";
import { cn } from "@/lib/utils";

export type ContainerElement =
  | "div"
  | "section"
  | "main"
  | "article"
  | "header"
  | "footer"
  | "aside";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: ContainerElement;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-(--breakpoint-2xl)",
  full: "max-w-full",
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Tag = "div", size = "lg", className, children, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn(
          "w-full mx-auto px-4 sm:px-6 lg:px-8",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Container.displayName = "Container";
