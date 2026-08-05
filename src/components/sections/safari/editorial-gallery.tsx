"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const FRAMES = [
  {
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=2000&q=80&auto=format&fit=crop",
    caption: "Guides born on this river",
    body: "Every guide on our roster grew up between Hwange and the Falls — they read the bush the way you read a street sign.",
  },
  {
    image: "https://images.unsplash.com/photo-1577971132997-c10be9372519?w=2000&q=80&auto=format&fit=crop",
    caption: "Six guests, never more",
    body: "Small groups and private departures, so the herd you're watching never has another vehicle in the frame.",
  },
  {
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=2000&q=80&auto=format&fit=crop",
    caption: "Access most operators can't get",
    body: "Fourteen years of relationships with Parks and private concessions open camps that never appear on a public site.",
  },
];

function GalleryFrame({
  frame,
  index,
  total,
  scrollYProgress,
}: {
  frame: (typeof FRAMES)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    index === 0 ? [1, 1, 1, 0] : index === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );
  const textY = useTransform(scrollYProgress, [start, mid], [24, 0]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <Image src={frame.image} alt={frame.caption} fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/30" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-end px-6 pb-24 sm:px-10">
        <motion.div style={{ y: textY }} className="max-w-xl text-paper">
          <div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-gold">
            0{index + 1} / 0{total}
          </div>
          <h3 className="m-0 mb-4 font-subheading text-4xl font-medium sm:text-5xl">{frame.caption}</h3>
          <p className="m-0 max-w-md text-[15px] leading-relaxed text-paper/75">{frame.body}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function EditorialGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} className="relative" style={{ height: `${FRAMES.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {FRAMES.map((frame, i) => (
          <GalleryFrame key={frame.caption} frame={frame} index={i} total={FRAMES.length} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
