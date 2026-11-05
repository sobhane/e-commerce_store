"use client";

import { useStoreText } from "@/components/shared/store-language-provider";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ProductImages({ images, name }: { images: string[]; name?: string }) {
  const t = useStoreText();
  const jerseyName = name ?? t("Maillot", "Jersey");
  const [selection, setSelection] = useState<number | null>(null);
  const photo = useRef<HTMLDivElement>(null);
  const current = selection ?? 0;

  useLayoutEffect(() => {
    if (selection === null || !photo.current) return;

    const image = photo.current;
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(image, {
        opacity: 0.5,
        duration: 0.24,
        ease: "power3.out",
        clearProps: "opacity",
      });
    });

    return () => motion.revert();
  }, [selection]);

  if (!images.length) return null;

  return (
    <div className="flex min-w-0 flex-col gap-4 self-start rounded-xl border bg-card p-2 sm:p-3 lg:flex-row-reverse lg:items-start">
      <figure className="w-full min-w-0 overflow-hidden rounded-lg border bg-background lg:flex-1">
        <div className="relative aspect-[4/5] bg-muted">
          <div className="absolute inset-0" ref={photo}>
            <Image src={images[current]} alt={`${jerseyName} — ${t("vue", "view")} ${current + 1}`} fill priority={selection === null} sizes="(max-width: 767px) 100vw, 55vw" className="object-contain" />
          </div>
        </div>
        <figcaption className="flex justify-between gap-2 border-t px-3 py-3 text-xs text-muted-foreground sm:px-4">
          <span>{t("Galerie du maillot", "Jersey gallery")}</span>
          <span className="archive-number" aria-live="polite">{t("Vue", "View")} {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
        </figcaption>
      </figure>
      {images.length > 1 && (
        <div className="flex shrink-0 flex-wrap gap-2 px-1 pb-1 sm:gap-3 lg:flex-col lg:px-0 lg:pb-0" role="group" aria-label={t("Vues du maillot", "Jersey photos")}>
          {images.map((src, index) => (
            <button key={`${src}-${index}`} type="button" onClick={() => { if (index !== current) setSelection(index); }} aria-label={`${t("Voir", "See")} ${jerseyName}, ${t("vue", "view")} ${index + 1}`} aria-pressed={current === index} className={cn("relative h-16 w-14 overflow-hidden rounded-md border-2 bg-muted transition-colors sm:h-20 sm:w-16", current === index ? "border-brand" : "border-transparent hover:border-foreground/30")}>
              <Image src={src} alt="" fill sizes="(max-width: 639px) 56px, 64px" className="object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
