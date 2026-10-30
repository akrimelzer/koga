"use client";

import { useEffect, useState } from "react";

const WEDDING = new Date("2027-06-19T00:00:00+02:00");

export default function Countdown() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(Math.max(0, Math.ceil((WEDDING.getTime() - Date.now()) / 86_400_000)));
  }, []);

  if (days === null) return <p className="countdown">&nbsp;</p>;
  return (
    <p className="countdown">
      <span>{days}</span> dager igjen
    </p>
  );
}
