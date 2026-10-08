"use client";

import React, { useRef, useState } from "react";
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
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className={cn(
        "relative mx-auto flex h-10 w-fit items-center rounded-full border border-border bg-surface/90 backdrop-blur-md p-1 shadow-xs select-none",
        className
      )}
    >
      {tabs.map((tab) => (
        <SlideTabItem
          key={tab.id}
          tab={tab}
          isActive={activeId === tab.id}
          setPosition={setPosition}
          onClick={() => {
            tab.onClick?.();
            onChange?.(tab.id);
          }}
        >
          {tab.label}
        </SlideTabItem>
      ))}

      <Cursor position={position} className={cursorClassName} />
    </ul>
  );
};

interface SlideTabItemProps {
  children: React.ReactNode;
  tab: TabItem;
  isActive: boolean;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  onClick?: () => void;
}

const SlideTabItem: React.FC<SlideTabItemProps> = ({
  children,
  tab,
  isActive,
  setPosition,
  onClick,
}) => {
  const ref = useRef<HTMLLIElement>(null);

  const handleMouseEnter = () => {
    if (!ref.current) return;
    const { width } = ref.current.getBoundingClientRect();
    setPosition({
      left: ref.current.offsetLeft,
      width,
      opacity: 1,
    });
  };

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
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "relative z-10 flex h-full items-center px-3.5 text-xs sm:text-sm font-medium tracking-wide uppercase transition-colors duration-150 cursor-pointer",
        isActive
          ? "text-primary-foreground font-semibold"
          : "text-foreground/80 hover:text-foreground"
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
        "absolute z-0 inset-y-1 rounded-full bg-primary/90 shadow-sm pointer-events-none",
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
