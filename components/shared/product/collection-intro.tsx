"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CollectionIntro({ children }: { children: React.ReactNode }) {
  const intro = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const motion = gsap.matchMedia(intro);
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-intro]", {
        y: 8,
        opacity: 0.85,
        duration: 0.45,
        stagger: 0.06,
        ease: "power3.out",
        clearProps: "opacity,transform",
      });
    });

    return () => motion.revert();
  }, []);

  return (
    <section ref={intro} className="grid gap-1 rounded-xl border bg-card p-2 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      {children}
    </section>
  );
}
