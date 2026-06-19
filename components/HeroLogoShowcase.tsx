"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   Static data — fully deterministic (no Math.random) → SSR-safe
───────────────────────────────────────────────────────────────────── */

// 36 particles evenly spaced around a circle at 3 radii
const BURST = Array.from({ length: 36 }, (_, i) => {
  const angle  = (i / 36) * Math.PI * 2;
  const radius = 85 + (i % 3) * 38;         // 85 | 123 | 161 px
  return {
    id:    i,
    x:     Math.cos(angle) * radius,
    y:     Math.sin(angle) * radius,
    size:  2 + (i % 3),                      // 2 | 3 | 4 px
    delay: (i % 9) * 0.07,                   // 0 – 0.56 s
  };
});

// Ambient particles: deterministic positions
const AMBIENT = [
  { x:14, y:18, d:0.0, dur:5.2, s:3 }, { x:79, y:13, d:0.7, dur:6.1, s:2 },
  { x:89, y:57, d:1.4, dur:4.8, s:3 }, { x:67, y:83, d:0.3, dur:5.6, s:2 },
  { x:11, y:74, d:1.1, dur:4.2, s:3 }, { x:33, y:89, d:1.9, dur:6.4, s:2 },
  { x:53, y:7,  d:0.5, dur:5.1, s:4 }, { x:6,  y:45, d:1.7, dur:4.3, s:2 },
  { x:94, y:34, d:0.2, dur:6.2, s:3 }, { x:43, y:94, d:0.9, dur:5.4, s:2 },
  { x:22, y:53, d:2.1, dur:4.7, s:3 }, { x:75, y:43, d:0.8, dur:5.3, s:2 },
  { x:62, y:77, d:1.6, dur:4.9, s:3 }, { x:36, y:30, d:0.4, dur:5.8, s:2 },
  { x:83, y:87, d:2.3, dur:6.6, s:2 },
];

// Large dim depth orbs (behind everything)
const DEPTH_ORBS = [
  { x: 18, y: 25, dur: 9.2, size: 8,  delay: 0.0 },
  { x: 78, y: 20, dur: 11.5, size: 6, delay: 1.2 },
  { x: 85, y: 72, dur: 8.8, size: 9,  delay: 2.4 },
  { x: 12, y: 68, dur: 10.3, size: 7, delay: 0.7 },
  { x: 55, y: 90, dur: 7.9, size: 8,  delay: 3.1 },
];

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

  /* Mouse parallax — more responsive spring */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 58, damping: 18 });
  const sy = useSpring(my, { stiffness: 58, damping: 18 });
  const rotateX = useTransform(sy, [-180, 180], [ 12, -12]);
  const rotateY = useTransform(sx, [-180, 180], [-12,  12]);

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
      {/* ── Large depth orbs (furthest back) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {DEPTH_ORBS.map((o, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left:       `${o.x}%`,
              top:        `${o.y}%`,
              width:      o.size,
              height:     o.size,
              background: i % 2 === 0 ? "#00BFFF" : "#007BFF",
              boxShadow:  `0 0 ${o.size * 5}px ${i % 2 === 0 ? "rgba(0,191,255,.35)" : "rgba(0,123,255,.3)"}`,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{ y: [0, -24, 0], opacity: [0.12, 0.32, 0.12] }}
            transition={{ duration: o.dur, delay: o.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── Primary radial glow ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={introComplete
          ? { opacity: [0.55, 1, 0.55] }
          : { opacity: 0.3 }
        }
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-[440px] h-[440px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,191,255,.12) 0%, rgba(0,123,255,.07) 38%, transparent 72%)",
          }}
        />
      </motion.div>

      {/* ── Secondary outer glow ── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <div
          className="w-[680px] h-[680px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,123,255,.045) 0%, transparent 65%)",
          }}
        />
      </motion.div>

      {/* ── Ambient floating particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {AMBIENT.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left:      `${p.x}%`,
              top:       `${p.y}%`,
              width:     p.s,
              height:    p.s,
              background: i % 3 === 0 ? "#00BFFF" : "#007BFF",
              boxShadow: `0 0 ${p.s * 3}px ${i % 3 === 0 ? "#00BFFF" : "#007BFF"}`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.28, 0.75, 0.28] }}
            transition={{ duration: p.dur, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── Orbital rings — own perspective context ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ perspective: "700px" }}
      >
        <AnimatePresence>
          {introComplete && (
            <>
              {/* Ring A – inner, fastest */}
              <OrbitalRing
                size={265} color="rgba(0,191,255,.34)" shadow="rgba(0,191,255,.1)"
                anim="orbitA 9s linear infinite" delay={0.2}
              />
              {/* Ring B – mid, reverse */}
              <OrbitalRing
                size={330} color="rgba(0,123,255,.24)" shadow="rgba(0,123,255,.08)"
                anim="orbitB 14s linear infinite" delay={0.45}
              />
              {/* Ring C – outer */}
              <OrbitalRing
                size={405} color="rgba(0,191,255,.14)" shadow=""
                anim="orbitC 20s linear infinite" delay={0.7}
              />
              {/* Ring D – outermost, very faint */}
              <OrbitalRing
                size={490} color="rgba(0,191,255,.06)" shadow=""
                anim="orbitD 30s linear infinite" delay={0.95}
              />
            </>
          )}
        </AnimatePresence>
      </div>

      {/* ── Logo (mouse-tilt perspective wrapper) ── */}
      <div style={{ perspective: "1100px" }} className="relative z-10">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          {/* Float + subtle breathe after intro */}
          <motion.div
            animate={introComplete ? {
              y:     [0, -28, 0],
              scale: [1, 1.016, 1],
            } : {}}
            transition={{
              duration: 5.8,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
          >
            {/* Burst particles (intro only) — client-only to avoid SSR transform precision mismatches */}
            <AnimatePresence>
              {mounted && !introComplete && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {BURST.map((p) => (
                    <motion.div
                      key={p.id}
                      className="absolute rounded-full bg-brand-blue"
                      style={{
                        width:     p.size,
                        height:    p.size,
                        boxShadow: `0 0 ${p.size * 4}px #00BFFF`,
                      }}
                      initial={{ x: p.x, y: p.y, opacity: 0, scale: 1.4 }}
                      animate={{ x: 0,   y: 0,   opacity: [0, 0.9, 0], scale: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, delay: p.delay, ease: [0.4, 0, 0.2, 1] }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* ── Animated SVG logo ── */}
            <LogoSVG introComplete={introComplete} />
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle scanline texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,191,255,.01) 3px, rgba(0,191,255,.01) 4px)",
          backgroundSize: "100% 4px",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Orbital ring
───────────────────────────────────────────────────────────────────── */
function OrbitalRing({
  size, color, shadow, anim, delay,
}: {
  size: number; color: string; shadow: string; anim: string; delay: number;
}) {
  const half = size / 2;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position:     "absolute",
        width:        size,
        height:       size,
        marginTop:    -half,
        marginLeft:   -half,
        borderRadius: "50%",
        border:       `1.5px solid ${color}`,
        boxShadow:    shadow ? `0 0 28px ${shadow}, inset 0 0 20px ${shadow}` : undefined,
        animation:    anim,
      }}
    />
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
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
      className="relative"
    >
      {/* Glow burst when assembled */}
      {introComplete && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div
            className="w-80 h-80 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(0,191,255,.5) 0%, rgba(0,123,255,.25) 40%, transparent 70%)",
            }}
          />
        </motion.div>
      )}

      {/* Pulsing idle glow */}
      {introComplete && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: -20,
            background: "radial-gradient(circle, rgba(0,191,255,.08) 0%, transparent 68%)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <svg
        width="280"
        height="280"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={introComplete ? {
          filter: "drop-shadow(0 0 16px #00BFFF) drop-shadow(0 0 40px rgba(0,123,255,.7))",
          transition: "filter 0.4s ease",
        } : {
          filter: "drop-shadow(0 0 4px rgba(0,191,255,.2))",
        }}
      >
        <defs>
          <linearGradient id="lg-hero" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#00BFFF" />
            <stop offset="100%" stopColor="#007BFF" />
          </linearGradient>
          <filter id="glow-s">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer hexagon — draws first */}
        <motion.polygon
          points={OUTER_HEX}
          stroke="url(#lg-hero)" strokeWidth="2.2" fill="none" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: "easeInOut" }}
        />

        {/* Inner hexagon — draws second */}
        <motion.polygon
          points={INNER_HEX}
          stroke="#007BFF" strokeWidth="1.2"
          fill="rgba(0,191,255,.045)" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.0, ease: "easeInOut" }}
        />

        {/* S letterform — draws last */}
        <motion.path
          d={S_PATH}
          stroke="url(#lg-hero)" strokeWidth="5.2" strokeLinecap="round" fill="none"
          filter="url(#glow-s)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 1.4, ease: "easeInOut" }}
        />

        {/* Corner dots — pop in after assembly */}
        {CORNER_DOTS.map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r="2.6"
            fill={i % 2 === 0 ? "#00BFFF" : "#007BFF"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 2.2 + i * 0.07,
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
        transition={{ delay: 2.5, duration: 0.6 }}
      >
        <span
          className="text-[28px] font-black tracking-[.28em] gradient-text block"
          style={{ textShadow: "0 0 32px rgba(0,191,255,.28)" }}
        >
          SOMAPP
        </span>
        <span className="text-brand-blue/50 text-[10px] tracking-[.3em] uppercase font-medium mt-1 block">
          Soluciones Digitales
        </span>
      </motion.div>
    </motion.div>
  );
}
