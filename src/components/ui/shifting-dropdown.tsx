"use client";

import React, { useEffect, useState, useId } from "react";
import {
  ArrowRight,
  BarChart2,
  ChevronDown,
  Code2,
  Cpu,
  Layers,
  PieChart,
  Shield,
  Smartphone,
  Globe,
} from "lucide-react";
import { AnimatePresence, motion, useMotionValue, animate } from "motion/react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: number;
  title: string;
  Component: React.ComponentType;
}

export interface ShiftingDropDownProps {
  className?: string;
  tabs?: TabItem[];
}

export const ShiftingDropDown: React.FC<ShiftingDropDownProps> = ({
  className,
  tabs,
}) => {
  return (
    <div className={cn("flex w-full justify-center select-none", className)}>
      <Tabs tabs={tabs ?? DEFAULT_TABS} />
    </div>
  );
};

interface TabsProps {
  tabs: TabItem[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [dir, setDir] = useState<"l" | "r" | null>(null);
  const containerId = useId();

  const handleSetSelected = (val: number | null) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }
    setSelected(val);
  };

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex h-fit gap-1 sm:gap-2 items-center"
    >
      {tabs.map((t) => (
        <Tab
          key={t.id}
          containerId={containerId}
          selected={selected}
          handleSetSelected={handleSetSelected}
          tab={t.id}
        >
          {t.title}
        </Tab>
      ))}

      <AnimatePresence>
        {selected !== null && (
          <Content
            containerId={containerId}
            dir={dir}
            selected={selected}
            tabs={tabs}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

interface TabProps {
  children: React.ReactNode;
  tab: number;
  containerId: string;
  handleSetSelected: (val: number | null) => void;
  selected: number | null;
}

const Tab: React.FC<TabProps> = ({
  children,
  tab,
  containerId,
  handleSetSelected,
  selected,
}) => {
  const isSelected = selected === tab;
  return (
    <button
      type="button"
      id={`shift-tab-${containerId}-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={cn(
        "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isSelected
          ? "bg-muted text-foreground shadow-xs font-semibold"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      )}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          "h-3.5 w-3.5 transition-transform duration-200",
          isSelected && "rotate-180 text-primary"
        )}
      />
    </button>
  );
};

interface ContentProps {
  selected: number;
  dir: "l" | "r" | null;
  tabs: TabItem[];
  containerId: string;
}

const Content: React.FC<ContentProps> = ({
  selected,
  dir,
  tabs,
  containerId,
}) => {
  return (
    <motion.div
      id={`overlay-content-${containerId}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute left-0 top-[calc(100%_+_12px)] w-[360px] sm:w-[420px] rounded-(--radius-lg) border border-border bg-surface/95 backdrop-blur-xl shadow-xl p-4 text-foreground z-50"
    >
      <Bridge />
      <Nub selected={selected} containerId={containerId} />

      {tabs.map((t) => (
        <div className="overflow-hidden" key={t.id}>
          {selected === t.id && (
            <motion.div
              initial={{
                opacity: 0,
                x: dir === "l" ? 40 : dir === "r" ? -40 : 0,
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              <t.Component />
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[12px] left-0 right-0 h-[12px]" />
);

interface NubProps {
  selected: number;
  containerId: string;
}

const Nub: React.FC<NubProps> = ({ selected, containerId }) => {
  const left = useMotionValue(0);

  useEffect(() => {
    if (selected !== null) {
      const hoveredTab = document.getElementById(
        `shift-tab-${containerId}-${selected}`
      );
      const overlayContent = document.getElementById(
        `overlay-content-${containerId}`
      );

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const contentRect = overlayContent.getBoundingClientRect();
      const tabCenter = tabRect.left + tabRect.width / 2 - contentRect.left;

      animate(left, tabCenter, { duration: 0.22, ease: "easeInOut" });
    }
  }, [selected, containerId, left]);

  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
        left,
      }}
      className="absolute top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-border bg-surface shadow-2xs"
    />
  );
};

/* ============================================================
   DEFAULT PANELS — Tailored for PT Tehnonusa Prima Solusi
   ============================================================ */

export const ServicesPanel: React.FC = () => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2.5">
        <a
          href="#services"
          className="group flex flex-col p-2.5 rounded-(--radius-md) hover:bg-muted/70 transition-colors"
        >
          <div className="flex items-center gap-2 mb-1">
            <Code2 className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-foreground">Web System</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-tight">
            Portal & sistem kustom enterprise
          </p>
        </a>

        <a
          href="#services"
          className="group flex flex-col p-2.5 rounded-(--radius-md) hover:bg-muted/70 transition-colors"
        >
          <div className="flex items-center gap-2 mb-1">
            <Smartphone className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-foreground">Mobile Apps</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-tight">
            Aplikasi iOS & Android performa tinggi
          </p>
        </a>

        <a
          href="#services"
          className="group flex flex-col p-2.5 rounded-(--radius-md) hover:bg-muted/70 transition-colors"
        >
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-foreground">Digital Transform</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-tight">
            Otomatisasi alur kerja operasional
          </p>
        </a>

        <a
          href="#services"
          className="group flex flex-col p-2.5 rounded-(--radius-md) hover:bg-muted/70 transition-colors"
        >
          <div className="flex items-center gap-2 mb-1">
            <Globe className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-foreground">API Integration</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-tight">
            Koneksi payment & third-party
          </p>
        </a>
      </div>

      <div className="pt-2 border-t border-border flex justify-between items-center text-xs">
        <span className="text-muted-foreground">Butuh konsultasi arsitektur?</span>
        <a
          href="#contact"
          className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
        >
          <span>Diskusi Solusi</span>
          <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

export const SolutionsPanel: React.FC = () => {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2">
        <a
          href="#solutions"
          className="flex flex-col items-center justify-center p-3 rounded-(--radius-md) hover:bg-muted/70 text-center transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Layers className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold text-foreground">Internal ERP</span>
          <span className="text-[10px] text-muted-foreground">Operasional</span>
        </a>

        <a
          href="#solutions"
          className="flex flex-col items-center justify-center p-3 rounded-(--radius-md) hover:bg-muted/70 text-center transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <BarChart2 className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold text-foreground">Analytics</span>
          <span className="text-[10px] text-muted-foreground">Business BI</span>
        </a>

        <a
          href="#solutions"
          className="flex flex-col items-center justify-center p-3 rounded-(--radius-md) hover:bg-muted/70 text-center transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Shield className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold text-foreground">Security</span>
          <span className="text-[10px] text-muted-foreground">Compliance</span>
        </a>
      </div>

      <div className="pt-2 border-t border-border flex justify-end">
        <a
          href="#solutions"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          <span>Eksplorasi Studi Kasus</span>
          <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

export const CompanyPanel: React.FC = () => {
  return (
    <div className="space-y-3">
      <div className="p-3 rounded-(--radius-md) bg-muted/50 border border-border/60">
        <p className="text-xs font-semibold text-foreground mb-1">
          PT Tehnonusa Prima Solusi
        </p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Mitra rekayasa teknologi dan transformasi digital tepercaya untuk bisnis dan startup berkembang di Indonesia.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <a
          href="#process"
          className="p-2 rounded-(--radius-sm) hover:bg-muted text-foreground transition-colors font-medium flex items-center gap-1.5"
        >
          <PieChart className="h-3.5 w-3.5 text-primary" />
          <span>Alur Kerja & SLA</span>
        </a>
        <a
          href="#contact"
          className="p-2 rounded-(--radius-sm) hover:bg-muted text-foreground transition-colors font-medium flex items-center gap-1.5"
        >
          <Globe className="h-3.5 w-3.5 text-primary" />
          <span>Hubungi Kami</span>
        </a>
      </div>
    </div>
  );
};

export const DEFAULT_TABS: TabItem[] = [
  { id: 1, title: "Layanan", Component: ServicesPanel },
  { id: 2, title: "Solusi", Component: SolutionsPanel },
  { id: 3, title: "Tentang Kami", Component: CompanyPanel },
];

export default ShiftingDropDown;
