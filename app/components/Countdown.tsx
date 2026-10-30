"use client";

import { useEffect, useState } from "react";

const WEDDING = new Date("2027-06-19T00:00:00+02:00").getTime();

const UNITS = [
  ["d", "dager"],
  ["h", "timer"],
  ["m", "min"],
  ["s", "sek"],
] as const;

export default function Countdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(WEDDING - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (left !== null && left <= 0) return <p className="countdown-done">Vi er gift!</p>;

  const values =
    left === null
      ? null
      : {
          d: Math.floor(left / 86_400_000),
          h: Math.floor(left / 3_600_000) % 24,
          m: Math.floor(left / 60_000) % 60,
          s: Math.floor(left / 1000) % 60,
        };

  return (
    <div className="countdown rise" style={{ "--d": "1300ms" } as React.CSSProperties}>
      {UNITS.map(([key, label]) => (
        <div key={key}>
          <b>{values ? String(values[key]).padStart(2, "0") : "––"}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
