"use client";

import { useState } from "react";

const COLORS = ["#e8b4bc", "#d98e98", "#c9a96a", "#111"];

export default function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 70 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 2.6 + Math.random() * 2,
      x: (Math.random() - 0.5) * 240,
      rot: 360 + Math.random() * 720,
      w: 6 + Math.random() * 6,
      color: COLORS[i % COLORS.length],
    })),
  );

  return (
    <div className="confetti" aria-hidden>
      {pieces.map((p) => (
        <i
          key={p.id}
          style={
            {
              left: `${p.left}%`,
              width: p.w,
              height: p.w * 1.6,
              background: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--x": `${p.x}px`,
              "--rot": `${p.rot}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
