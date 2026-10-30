// Deterministic values so server and client markup match.
const PETALS = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 37 + 8) % 100,
  delay: (i * 1.7) % 12,
  duration: 12 + ((i * 5) % 9),
  size: 10 + ((i * 7) % 10),
  drift: ((i * 13) % 120) - 60,
}));

export default function Petals() {
  return (
    <div className="petals" aria-hidden>
      {PETALS.map((p, i) => (
        <span
          key={i}
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDelay: `-${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--drift": `${p.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
