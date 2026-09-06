"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   Logo geometry
───────────────────────────────────────────────────────────────────── */
const OUTER_HEX  = "50,6 88,28 88,72 50,94 12,72 12,28";
const INNER_HEX  = "50,20 76,35 76,65 50,80 24,65 24,35";
const S_PATH     = "M 63,30 C 63,21 37,21 37,30 C 37,41 63,59 63,70 C 63,79 37,79 37,70";
const CORNER_DOTS: [number, number][] = [
  [50,6],[88,28],[88,72],[50,94],[12,72],[12,28],
];

/* ═══════════════════════════════════════════════════════════════════ */

export default function HeroLogoShowcase({ introComplete }: { introComplete: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /* Mouse parallax — subtle tilt only */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(sy, [-180, 180], [ 6, -6]);
  const rotateY = useTransform(sx, [-180, 180], [-6,  6]);

  const onMouseMove = (e: React.MouseEvent) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left - r.width  / 2);
    my.set(e.clientY - r.top  - r.height / 2);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[580px] flex items-center justify-center select-none"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* ── Single soft ambient glow behind the mark ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[420px] h-[420px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(47,125,246,.10) 0%, rgba(25,85,216,.05) 42%, transparent 72%)",
          }}
        />
      </div>

      {/* ── Logo (mouse-tilt perspective wrapper) ── */}
      <div style={{ perspective: "1100px" }} className="relative z-10">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          {mounted && <LogoSVG introComplete={introComplete} />}
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Animated SVG logo
───────────────────────────────────────────────────────────────────── */
function LogoSVG({ introComplete }: { introComplete: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.55 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="relative"
    >
      <svg
        width="280"
        height="280"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: introComplete
            ? "drop-shadow(0 6px 24px rgba(25,85,216,.35))"
            : "drop-shadow(0 2px 10px rgba(25,85,216,.15))",
          transition: "filter 0.4s ease",
        }}
      >
        <defs>
          <linearGradient id="lg-hero" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#2F7DF6" />
            <stop offset="100%" stopColor="#1955D8" />
          </linearGradient>
        </defs>

        {/* Outer hexagon — draws first */}
        <motion.polygon
          points={OUTER_HEX}
          stroke="url(#lg-hero)" strokeWidth="2.2" fill="none" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: "easeInOut" }}
        />

        {/* Inner hexagon — draws second */}
        <motion.polygon
          points={INNER_HEX}
          stroke="#1955D8" strokeWidth="1.2"
          fill="rgba(47,125,246,.05)" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7, ease: "easeInOut" }}
        />

        {/* S letterform — draws last */}
        <motion.path
          d={S_PATH}
          stroke="url(#lg-hero)" strokeWidth="5.2" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 1.1, ease: "easeInOut" }}
        />

        {/* Corner dots — pop in after assembly */}
        {CORNER_DOTS.map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r="2.6"
            fill={i % 2 === 0 ? "#2F7DF6" : "#1955D8"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 1.9 + i * 0.07,
              duration: 0.35,
              type: "spring",
              stiffness: 300,
            }}
          />
        ))}
      </svg>

      {/* Wordmark */}
      <motion.div
        className="text-center mt-5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <span className="text-[28px] font-black tracking-[.28em] text-white block">
          SOMAPP
        </span>
        <span className="text-brand-blue/70 text-[10px] tracking-[.3em] uppercase font-medium mt-1 block">
          Soluciones Digitales
        </span>
      </motion.div>
    </motion.div>
  );
}
