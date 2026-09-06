"use client";

interface Props {
  size?: number;
  className?: string;
  glow?: boolean;
}

/*
 * Flat-top regular hexagon — computed at r=44, center (50,50):
 *   vertices (30° steps starting at 330°):
 *   top:         (50, 6)
 *   top-right:   (88, 28)
 *   bot-right:   (88, 72)
 *   bottom:      (50, 94)
 *   bot-left:    (12, 72)
 *   top-left:    (12, 28)
 *
 * Inner hexagon r=30:
 *   (76, 35)  (76, 65)  (50, 80)  (24, 65)  (24, 35)  (50, 20)
 *
 * S path: cubic bezier, spans y 26→74, x 37→63
 */
export default function SomappLogo({ size = 40, className = "", glow = false }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={
        glow
          ? { filter: "drop-shadow(0 2px 10px rgba(25,85,216,.4))" }
          : undefined
      }
    >
      <defs>
        <linearGradient id="lg-nav" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#2F7DF6" />
          <stop offset="100%" stopColor="#1955D8" />
        </linearGradient>
      </defs>

      {/* Outer hexagon */}
      <polygon
        points="50,6 88,28 88,72 50,94 12,72 12,28"
        stroke="url(#lg-nav)"
        strokeWidth="2.2"
        fill="none"
        strokeLinejoin="round"
      />

      {/* Inner hexagon */}
      <polygon
        points="50,20 76,35 76,65 50,80 24,65 24,35"
        stroke="#1955D8"
        strokeWidth="1.2"
        fill="rgba(47,125,246,.05)"
        strokeLinejoin="round"
      />

      {/* Corner accent nodes */}
      {([
        [50,6],[88,28],[88,72],[50,94],[12,72],[12,28],
      ] as [number,number][]).map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="2.4"
          fill={i % 2 === 0 ? "#2F7DF6" : "#1955D8"} />
      ))}

      {/* S letterform
          M 63,30  → top-right start
          top arch:    C 63,21 37,21 37,30
          S crossing:  C 37,41 63,59 63,70
          bot arch:    C 63,79 37,79 37,70   */}
      <path
        d="M 63,30 C 63,21 37,21 37,30 C 37,41 63,59 63,70 C 63,79 37,79 37,70"
        stroke="url(#lg-nav)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
