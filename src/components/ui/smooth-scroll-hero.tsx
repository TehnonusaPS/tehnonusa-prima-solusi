"use client";

import * as React from "react";
import { useRef } from "react";
import { ReactLenis } from "lenis/react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SmoothScrollHeroProps {
  className?: string;
  sectionHeight?: number;
  centerImageUrl?: string;
  parallaxImages?: Array<{
    src: string;
    alt: string;
    start: number;
    end: number;
    className?: string;
  }>;
  scheduleItems?: Array<{
    title: string;
    date: string;
    location: string;
  }>;
}

const DEFAULT_SECTION_HEIGHT = 1500;

const DEFAULT_PARALLAX_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "High-tech space launch",
    start: -200,
    end: 200,
    className: "w-1/3",
  },
  {
    src: "https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Earth satellite view",
    start: 200,
    end: -250,
    className: "mx-auto w-2/3",
  },
  {
    src: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Orbiting satellite technology",
    start: -200,
    end: 200,
    className: "ml-auto w-1/3",
  },
  {
    src: "https://images.unsplash.com/photo-1494022299300-899b96e49893?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Deep space nebula and stars",
    start: 0,
    end: -500,
    className: "ml-24 w-5/12",
  },
];

const DEFAULT_SCHEDULE_ITEMS = [
  { title: "Enterprise Core ERP", date: "Q1 2027", location: "Jakarta" },
  { title: "Supply Chain Analytics", date: "Q2 2027", location: "Surabaya" },
  { title: "Fintech Payment Gateway", date: "Q3 2027", location: "Bandung" },
  { title: "AI Decision Engine", date: "Q4 2027", location: "Singapore" },
];

export function SmoothScrollHero({
  className,
  sectionHeight = DEFAULT_SECTION_HEIGHT,
  centerImageUrl = "https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  parallaxImages = DEFAULT_PARALLAX_IMAGES,
  scheduleItems = DEFAULT_SCHEDULE_ITEMS,
}: SmoothScrollHeroProps) {
  return (
    <div className={cn("bg-zinc-950 text-zinc-100 overflow-clip", className)}>
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <InternalNav />
        <HeroSection
          sectionHeight={sectionHeight}
          centerImageUrl={centerImageUrl}
          images={parallaxImages}
        />
        <ScheduleSection items={scheduleItems} />
      </ReactLenis>
    </div>
  );
}

function InternalNav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 text-white backdrop-blur-xs bg-zinc-950/20">
      <div className="flex items-center gap-2 font-bold tracking-wider text-sm uppercase">
        <Sparkles className="w-5 h-5 text-primary" />
        <span>TEHNONUSA INNOVATION</span>
      </div>
      <button
        type="button"
        onClick={() => {
          document.getElementById("launch-schedule")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-zinc-400 hover:text-white transition-colors cursor-pointer"
      >
        <span>ROADMAP & SCHEDULE</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </nav>
  );
}

interface HeroSectionProps {
  sectionHeight: number;
  centerImageUrl: string;
  images: Array<{
    src: string;
    alt: string;
    start: number;
    end: number;
    className?: string;
  }>;
}

function HeroSection({
  sectionHeight,
  centerImageUrl,
  images,
}: HeroSectionProps) {
  return (
    <div
      style={{ height: `calc(${sectionHeight}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage
        sectionHeight={sectionHeight}
        imageUrl={centerImageUrl}
      />
      <ParallaxImagesList images={images} />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950 pointer-events-none" />
    </div>
  );
}

interface CenterImageProps {
  sectionHeight: number;
  imageUrl: string;
}

export function CenterImage({ sectionHeight, imageUrl }: CenterImageProps) {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, sectionHeight + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [sectionHeight, sectionHeight + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full bg-cover"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

interface ParallaxImagesListProps {
  images: Array<{
    src: string;
    alt: string;
    start: number;
    end: number;
    className?: string;
  }>;
}

function ParallaxImagesList({ images }: ParallaxImagesListProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px] space-y-24">
      {images.map((item, idx) => (
        <ParallaxImg
          key={idx}
          src={item.src}
          alt={item.alt}
          start={item.start}
          end={item.end}
          className={item.className}
        />
      ))}
    </div>
  );
}

export interface ParallaxImgProps {
  src: string;
  alt: string;
  start: number;
  end: number;
  className?: string;
}

export function ParallaxImg({
  className,
  alt,
  src,
  start,
  end,
}: ParallaxImgProps) {
  const ref = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn("rounded-(--radius-lg) shadow-2xl object-cover", className)}
      ref={ref}
      style={{ transform, opacity }}
      loading="lazy"
    />
  );
}

interface ScheduleSectionProps {
  items: Array<{
    title: string;
    date: string;
    location: string;
  }>;
}

export function ScheduleSection({ items }: ScheduleSectionProps) {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      <motion.h2
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-50"
      >
        Project Roadmap
      </motion.h2>

      <div className="space-y-2">
        {items.map((item, idx) => (
          <ScheduleItem
            key={idx}
            title={item.title}
            date={item.date}
            location={item.location}
          />
        ))}
      </div>
    </section>
  );
}

interface ScheduleItemProps {
  title: string;
  date: string;
  location: string;
}

export function ScheduleItem({ title, date, location }: ScheduleItemProps) {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="flex items-center justify-between border-b border-zinc-800/80 px-3 pb-8 pt-4 transition-colors hover:border-primary/50"
    >
      <div>
        <p className="mb-1 text-lg sm:text-xl font-medium text-zinc-50">{title}</p>
        <p className="text-xs uppercase tracking-wider text-zinc-500">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-xs uppercase tracking-wider text-zinc-400">
        <p>{location}</p>
        <MapPin className="w-3.5 h-3.5 text-primary" />
      </div>
    </motion.div>
  );
}
