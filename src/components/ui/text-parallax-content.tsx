"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const IMG_PADDING = 12;

export interface TextParallaxContentProps {
  imgUrl: string;
  subheading: React.ReactNode;
  heading: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  overlayOpacity?: number;
}

export const TextParallaxContent: React.FC<TextParallaxContentProps> = ({
  imgUrl,
  subheading,
  heading,
  children,
  className,
  overlayOpacity = 0.65,
}) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
      className={cn("w-full", className)}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} overlayOpacity={overlayOpacity} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

interface StickyImageProps {
  imgUrl: string;
  overlayOpacity?: number;
}

export const StickyImage: React.FC<StickyImageProps> = ({
  imgUrl,
  overlayOpacity = 0.65,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-(--radius-xl) shadow-xl"
    >
      <motion.div
        className="absolute inset-0 bg-slate-950"
        style={{
          opacity: useTransform(
            opacity,
            (val) => val * overlayOpacity
          ),
        }}
      />
    </motion.div>
  );
};

interface OverlayCopyProps {
  subheading: React.ReactNode;
  heading: React.ReactNode;
}

export const OverlayCopy: React.FC<OverlayCopyProps> = ({
  subheading,
  heading,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white px-4 text-center pointer-events-none"
    >
      <p className="mb-2 text-base sm:text-xl md:text-2xl font-medium tracking-wide uppercase text-primary-light drop-shadow-sm">
        {subheading}
      </p>
      <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-md max-w-4xl">
        {heading}
      </h2>
    </motion.div>
  );
};

export interface ParallaxContentSectionProps {
  title: React.ReactNode;
  description: React.ReactNode;
  additionalText?: React.ReactNode;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

export const ParallaxContentSection: React.FC<ParallaxContentSectionProps> = ({
  title,
  description,
  additionalText,
  ctaText = "Pelajari Selengkapnya",
  onCtaClick,
  className,
}) => (
  <div
    className={cn(
      "mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12",
      className
    )}
  >
    <div className="col-span-1 md:col-span-4">
      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug">
        {title}
      </h3>
    </div>
    <div className="col-span-1 md:col-span-8 flex flex-col items-start space-y-4">
      <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
        {description}
      </p>
      {additionalText && (
        <p className="text-base text-muted-foreground leading-relaxed">
          {additionalText}
        </p>
      )}
      {ctaText && (
        <div className="pt-2">
          <Button
            variant="default"
            size="lg"
            rightIcon={<ArrowUpRight className="h-4 w-4" />}
            onClick={onCtaClick}
          >
            {ctaText}
          </Button>
        </div>
      )}
    </div>
  </div>
);

export const TextParallaxContentExample: React.FC = () => {
  return (
    <div className="bg-background text-foreground">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Kolaborasi & Eksplorasi"
        heading="Membangun Solusi Bersama Anda."
      >
        <ParallaxContentSection
          title="Rekayasa Perangkat Lunak Berfokus pada Hasil Bisnis"
          description="Kami memadukan pemahaman mendalam tentang lanskap teknologi modern dengan strategi operasional yang matang untuk menghadirkan sistem yang tangguh dan skalabel."
          additionalText="Setiap baris kode dirancang untuk memberikan efisiensi nyata bagi perusahaan Anda."
          ctaText="Diskusikan Kebutuhan"
        />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Kualitas Tanpa Kompromi"
        heading="Arsitektur Andal & Aman."
      >
        <ParallaxContentSection
          title="Keamanan dan Skalabilitas Sejak Hari Pertama"
          description="Dari proteksi data sensitif hingga arsitektur cloud terdistribusi, sistem kami siap menampung lonjakan traffic tanpa penurunan performa."
          ctaText="Lihat Standar Teknis"
        />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Transformasi Modern"
        heading="Teknologi untuk Masa Depan."
      >
        <ParallaxContentSection
          title="Otomatisasi & Integrasi Ekosistem Digital"
          description="Hubungkan seluruh aplikasi pihak ketiga, payment gateway, dan analitik bisnis ke dalam satu dasbor pusat yang mudah dioperasikan."
          ctaText="Mulai Transformasi"
        />
      </TextParallaxContent>
    </div>
  );
};
