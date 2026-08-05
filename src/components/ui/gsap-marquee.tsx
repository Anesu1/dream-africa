"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GsapMarquee({ items, speed = 40 }: { items: string[]; speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const width = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: -width,
      duration: width / speed,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [speed]);

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-white/10 bg-ink py-5">
      <div ref={trackRef} className="flex w-max gap-14 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-14 text-[11px] uppercase tracking-[0.24em] text-white/55">
            {item}
            <span className="text-gold">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
