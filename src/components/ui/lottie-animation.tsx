"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Dynamically import DotLottieReact with SSR disabled to prevent hydration/canvas mismatch in Next.js
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  {
    ssr: false,
    loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-xl" />,
  }
);

export interface LottieAnimationProps {
  src?: string;
  data?: Record<string, unknown> | string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function LottieAnimation({
  src,
  data,
  loop = true,
  autoplay = true,
  className,
  style,
}: LottieAnimationProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || (!src && !data)) {
    return <div className={cn("inline-block", className)} style={style} />;
  }

  return (
    <div className={cn("inline-flex items-center justify-center overflow-hidden", className)} style={style}>
      <DotLottieReact
        src={src}
        data={data as any}
        loop={loop}
        autoplay={autoplay}
        className="w-full h-full"
      />
    </div>
  );
}

export default LottieAnimation;
