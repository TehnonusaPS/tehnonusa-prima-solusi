"use client";

import React, { useRef } from "react";
import { useAnimate } from "motion/react";
import { MousePointer } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MouseImageTrailProps {
  children?: React.ReactNode;
  images?: string[];
  renderImageBuffer?: number;
  rotationRange?: number;
  className?: string;
}

const DEFAULT_TRAIL_IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
];

export const MouseImageTrail: React.FC<MouseImageTrailProps> = ({
  children,
  images = DEFAULT_TRAIL_IMAGES,
  renderImageBuffer = 45,
  rotationRange = 24,
  className,
}) => {
  const [scope, animate] = useAnimate();
  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  const renderNextImage = (x: number, y: number) => {
    if (!images || images.length === 0 || !scope.current) return;

    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;
    const el = scope.current.querySelector(selector) as HTMLElement | null;

    if (!el) return;

    el.style.top = `${y}px`;
    el.style.left = `${x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;
    const rotateTransform =
      imageIndex % 2 ? `rotate(${rotation}deg)` : `rotate(-${rotation}deg)`;
    const oppositeRotate =
      imageIndex % 2 ? `rotate(-${rotation}deg)` : `rotate(${rotation}deg)`;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${rotateTransform}`,
          `translate(-50%, -50%) scale(1) ${oppositeRotate}`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.4, delay: 3 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scope.current) return;

    const rect = scope.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    const distance = calculateDistance(
      relativeX,
      relativeY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = relativeX;
      lastRenderPosition.current.y = relativeY;
      renderNextImage(relativeX, relativeY);
    }
  };

  return (
    <div
      ref={scope}
      className={cn("relative overflow-hidden w-full", className)}
      onMouseMove={handleMouseMove}
    >
      {children}

      {images.map((img, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="pointer-events-none absolute left-0 top-0 h-36 sm:h-44 w-auto rounded-(--radius-lg) border border-white/20 bg-slate-900 object-cover opacity-0 shadow-2xl"
          src={img}
          alt={`Mouse trail frame ${index}`}
          key={index}
          data-mouse-move-index={index}
          loading="lazy"
        />
      ))}
    </div>
  );
};

export const MouseImageTrailDemo: React.FC = () => {
  return (
    <MouseImageTrail>
      <section className="grid h-96 w-full place-content-center bg-slate-950 text-slate-100 px-4 select-none">
        <p className="flex items-center gap-2.5 text-xl sm:text-3xl font-bold uppercase tracking-tight text-slate-100">
          <MousePointer className="h-6 w-6 text-primary animate-bounce" />
          <span>Gerakkan Kursor untuk Menjelajah Portofolio</span>
        </p>
      </section>
    </MouseImageTrail>
  );
};

export default MouseImageTrail;
