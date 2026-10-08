"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface Position {
  left: number;
  width: number;
  opacity: number;
}

export interface SlideTabsProps {
  tabs?: TabItem[];
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
  cursorClassName?: string;
}

const DEFAULT_SLIDE_TABS: TabItem[] = [
  { id: "services", label: "Layanan", href: "#services" },
  { id: "solutions", label: "Solusi", href: "#solutions" },
  { id: "process", label: "Proses", href: "#process" },
  { id: "portfolio", label: "Portfolio", href: "#portfolio" },
  { id: "contact", label: "Kontak", href: "#contact" },
];

export const SlideTabs: React.FC<SlideTabsProps> = ({
  tabs = DEFAULT_SLIDE_TABS,
  activeId,
  onChange,
  className,
  cursorClassName,
}) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const tabRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Exactly one active pill target:
  // If user is hovering an item, glide to that item.
  // When unhovered, snap smoothly to the activeId item.
  const currentTargetId = hoveredId ?? activeId;

  useEffect(() => {
    if (!currentTargetId) {
      setPosition((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const targetEl = tabRefs.current.get(currentTargetId);
    if (targetEl) {
      setPosition({
        left: targetEl.offsetLeft,
        width: targetEl.offsetWidth,
        opacity: 1,
      });
    }
  }, [currentTargetId, tabs]);

  return (
    <ul
      ref={containerRef}
      onMouseLeave={() => {
        setHoveredId(null);
      }}
      className={cn(
        "relative mx-auto flex h-11 w-fit items-center rounded-full border border-border bg-surface/90 backdrop-blur-md p-1 shadow-xs select-none",
        className
      )}
    >
      {tabs.map((tab) => {
        const isCurrentPill = currentTargetId === tab.id;

        return (
          <SlideTabItem
            key={tab.id}
            tab={tab}
            isPillTarget={isCurrentPill}
            setTabRef={(el) => {
              if (el) tabRefs.current.set(tab.id, el);
              else tabRefs.current.delete(tab.id);
            }}
            onHover={() => setHoveredId(tab.id)}
            onClick={() => {
              tab.onClick?.();
              onChange?.(tab.id);
            }}
          >
            {tab.label}
          </SlideTabItem>
        );
      })}

      <Cursor position={position} className={cursorClassName} />
    </ul>
  );
};

interface SlideTabItemProps {
  children: React.ReactNode;
  tab: TabItem;
  isPillTarget: boolean;
  setTabRef: (el: HTMLLIElement | null) => void;
  onHover: () => void;
  onClick?: () => void;
}

const SlideTabItem: React.FC<SlideTabItemProps> = ({
  children,
  tab,
  isPillTarget,
  setTabRef,
  onHover,
  onClick,
}) => {
  const ContentWrapper = tab.href ? (
    <a
      href={tab.href}
      className="block"
      onClick={onClick}
    >
      {children}
    </a>
  ) : (
    <button
      type="button"
      className="block cursor-pointer outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <li
      ref={setTabRef}
      onMouseEnter={onHover}
      className={cn(
        "relative z-10 flex h-full items-center px-3.5 text-xs sm:text-sm font-medium tracking-wide uppercase transition-colors duration-200 cursor-pointer",
        isPillTarget
          ? "text-white font-semibold"
          : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
      )}
    >
      {ContentWrapper}
    </li>
  );
};

interface CursorProps {
  position: Position;
  className?: string;
}

const Cursor: React.FC<CursorProps> = ({ position, className }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 30,
      }}
      className={cn(
        "absolute z-0 inset-y-1 rounded-full bg-primary shadow-sm shadow-primary/25 pointer-events-none",
        className
      )}
    />
  );
};

export const SlideTabsExample: React.FC = () => {
  return (
    <div className="py-12 bg-background flex items-center justify-center">
      <SlideTabs />
    </div>
  );
};

export default SlideTabs;
