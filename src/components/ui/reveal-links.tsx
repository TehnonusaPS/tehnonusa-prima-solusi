"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

const DEFAULT_DURATION = 0.25;
const DEFAULT_STAGGER = 0.025;

export interface FlipLinkProps
  extends Omit<HTMLMotionProps<"a">, "children"> {
  children: string;
  href?: string;
  duration?: number;
  stagger?: number;
}

export const FlipLink: React.FC<FlipLinkProps> = ({
  children,
  href = "#",
  duration = DEFAULT_DURATION,
  stagger = DEFAULT_STAGGER,
  className,
  style,
  ...props
}) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className={cn(
        "relative block overflow-hidden whitespace-nowrap text-3xl font-black uppercase tracking-tight text-foreground sm:text-5xl md:text-7xl lg:text-8xl transition-colors hover:text-primary select-none",
        className
      )}
      style={{
        lineHeight: 0.85,
        ...style,
      }}
      {...props}
    >
      <div>
        {children.split("").map((letter, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration,
              ease: "easeInOut",
              delay: stagger * i,
            }}
            className="inline-block"
            key={i}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((letter, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration,
              ease: "easeInOut",
              delay: stagger * i,
            }}
            className="inline-block"
            key={i}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

export interface RevealLinksProps {
  className?: string;
  links?: Array<{ title: string; href: string }>;
}

const DEFAULT_LINKS = [
  { title: "LinkedIn", href: "#" },
  { title: "Instagram", href: "#" },
  { title: "GitHub", href: "#" },
  { title: "WhatsApp", href: "#" },
];

export const RevealLinks: React.FC<RevealLinksProps> = ({
  className,
  links = DEFAULT_LINKS,
}) => {
  return (
    <div
      className={cn(
        "grid place-content-center gap-4 py-16 px-4 bg-background text-foreground",
        className
      )}
    >
      {links.map((link, idx) => (
        <FlipLink key={idx} href={link.href}>
          {link.title}
        </FlipLink>
      ))}
    </div>
  );
};

export default RevealLinks;
