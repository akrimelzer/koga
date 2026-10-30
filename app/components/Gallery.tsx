"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";

type Photo = {
  src: string;
  alt: string;
  caption: string;
  w: number;
  h: number;
  position: string;
};

// Add new photos here after dropping them in public/photos.
const PHOTOS: Photo[] = [
  { src: "/photos/IMG_7524.jpg", alt: "Karoline i bunad og Andreas i dress", caption: "2017", w: 1500, h: 2000, position: "50% 40%" },
  { src: "/photos/IMG_8173.jpg", alt: "Karoline og Andreas på stranden", caption: "2017", w: 960, h: 1280, position: "30% 55%" },
  { src: "/photos/IMG_1212.jpg", alt: "Karoline og Andreas på en fjelltopp", caption: "2021", w: 2000, h: 1500, position: "40% 50%" },
  { src: "/photos/IMG_1754.jpg", alt: "Karoline og Andreas på skitur", caption: "2023", w: 1500, h: 2000, position: "50% 40%" },
  { src: "/photos/IMG_1741.jpg", alt: "Karoline og Andreas på ski i høyfjellet", caption: "2023", w: 1500, h: 2000, position: "50% 55%" },
];

const TILT = [-6, 3, -2, 5, -4, 2];

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const step = (dir: number) =>
    setOpen((i) => (i === null ? i : (i + dir + PHOTOS.length) % PHOTOS.length));

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const photo = open === null ? null : PHOTOS[open];

  return (
    <>
      <div className="polaroids">
        {PHOTOS.map((p, i) => (
          <Reveal key={p.src} delay={i * 150}>
            <button
              type="button"
              className="polaroid"
              style={{ "--tilt": `${TILT[i % TILT.length]}deg` } as React.CSSProperties}
              onClick={() => setOpen(i)}
              aria-label={`Åpne bilde: ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={208}
                height={260}
                sizes="110px"
                style={{ objectPosition: p.position }}
              />
              <span>{p.caption}</span>
            </button>
          </Reveal>
        ))}
      </div>

      {photo && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photo.alt}
          onClick={() => setOpen(null)}
        >
          <button type="button" className="lb-btn lb-close" onClick={() => setOpen(null)} aria-label="Lukk">
            ×
          </button>
          <button
            type="button"
            className="lb-btn lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Forrige"
          >
            ‹
          </button>
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={photo.w}
            height={photo.h}
            sizes="90vw"
            className="lb-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="lb-btn lb-next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Neste"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
