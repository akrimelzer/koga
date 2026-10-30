"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Heart = { id: number; dx: number };

export default function PhotoHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const nextId = useRef(0);

  function burst() {
    const batch = Array.from({ length: 7 }, () => ({
      id: nextId.current++,
      dx: Math.round((Math.random() - 0.5) * 180),
    }));
    setHearts((h) => [...h, ...batch]);
    setTimeout(() => {
      const ids = new Set(batch.map((b) => b.id));
      setHearts((h) => h.filter((x) => !ids.has(x.id)));
    }, 1800);
  }

  return (
    <div className="photo-wrap rise" style={{ "--d": "200ms" } as React.CSSProperties}>
      <svg className="ring" viewBox="0 0 100 100" aria-hidden>
        <circle cx="50" cy="50" r="49.5" pathLength="1" />
      </svg>
      <button type="button" className="photo-btn" onClick={burst} aria-label="Send hjerter">
        {/* Put the photo at public/couple.jpg */}
        <Image
          src="/couple.jpg"
          alt="Karoline og Andreas"
          width={560}
          height={560}
          priority
          className="photo"
        />
      </button>
      {hearts.map((h) => (
        <span key={h.id} className="heart" style={{ "--dx": `${h.dx}px` } as React.CSSProperties}>
          ♥
        </span>
      ))}
    </div>
  );
}
