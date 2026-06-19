"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   Deterministic particles — converge toward centre logo
   Golden-angle distribution across 3 radii (SSR-safe, no Math.random)
═══════════════════════════════════════════════════════════════════ */
const PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const phi   = 137.508;
  const angle = (i * phi * Math.PI) / 180;
  const r     = 85 + (i % 4) * 38;          // 85 | 123 | 161 | 199 px
  return {
    id:    i,
    sx:    Math.cos(angle) * r,
    sy:    Math.sin(angle) * r,
    size:  1.4 + (i % 3) * 0.9,             // 1.4 | 2.3 | 3.2
    delay: (i % 10) * 0.055,                // 0 – 0.495 s
    color: i % 2 === 0 ? "#00BFFF" : "#007BFF",
  };
});

/* Logo geometry (same as SomappLogo / HeroLogoShowcase) */
const OUTER_HEX = "50,6 88,28 88,72 50,94 12,72 12,28";
const INNER_HEX = "50,20 76,35 76,65 50,80 24,65 24,35";
const S_PATH    = "M 63,30 C 63,21 37,21 37,30 C 37,41 63,59 63,70 C 63,79 37,79 37,70";
const DOTS: [number, number][] = [[50,6],[88,28],[88,72],[50,94],[12,72],[12,28]];

/* ═══════════════════════════════════════════════════════════════════
   Component
═══════════════════════════════════════════════════════════════════ */
export default function PageLoader() {
  const [assembled, setAssembled] = useState(false);
  const [visible,   setVisible]   = useState(true);

  useEffect(() => {
    /* Timeline
       0.15 s  outer hex starts drawing   (0.75 s draw)  → done 0.90 s
       0.72 s  inner hex starts drawing   (0.60 s draw)  → done 1.32 s
       0.88 s  S-path starts drawing      (0.55 s draw)  → done 1.43 s
       1.45 s  assembled = true  (glow burst + wordmark)
       1.90 s  progress bar completes
       2.10 s  exit animation starts
    */
    const t1 = setTimeout(() => setAssembled(true), 1450);
    const t2 = setTimeout(() => setVisible(false),  2120);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#050B14" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Noise grain ── */}
          <div className="noise absolute inset-0" />

          {/* ── Large ambient radial glow ── */}
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 520, height: 520,
              background: "radial-gradient(circle, rgba(0,191,255,.11) 0%, rgba(0,123,255,.06) 40%, transparent 70%)",
            }}
            animate={assembled
              ? { opacity: [0.4, 1, 0.5], scale: [1, 1.18, 1] }
              : { opacity: 0.28, scale: 1 }
            }
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ── Secondary outer glow ── */}
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 820, height: 820,
              background: "radial-gradient(circle, rgba(0,123,255,.05) 0%, transparent 65%)",
            }}
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />

          {/* ── Converging particles ── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width:     p.size,
                  height:    p.size,
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
                }}
                initial={{ x: p.sx, y: p.sy, opacity: 0, scale: 2 }}
                animate={{ x: 0, y: 0, opacity: [0, 1, 0], scale: [2, 1, 0] }}
                transition={{
                  duration: 1.05,
                  delay:    p.delay,
                  ease:     [0.4, 0, 0.2, 1],
                }}
              />
            ))}
          </div>

          {/* ── Logo + wordmark group ── */}
          <div className="relative flex flex-col items-center z-10">

            {/* Assembly glow burst */}
            {assembled && (
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: -60,
                  background: "radial-gradient(circle, rgba(0,191,255,.45) 0%, rgba(0,123,255,.22) 40%, transparent 70%)",
                }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: [0, 0.85, 0], scale: [0.7, 1.4, 1.4] }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
            )}

            {/* Idle breathing glow after assembly */}
            {assembled && (
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: -30,
                  background: "radial-gradient(circle, rgba(0,191,255,.09) 0%, transparent 68%)",
                }}
                animate={{ scale: [1, 1.12, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {/* ── SVG logo ── */}
            <motion.svg
              width="210"
              height="210"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0, scale: 0.55 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              style={assembled ? {
                filter: "drop-shadow(0 0 14px #00BFFF) drop-shadow(0 0 32px rgba(0,123,255,.7))",
              } : {
                filter: "drop-shadow(0 0 5px rgba(0,191,255,.35))",
                transition: "filter 0.4s ease",
              }}
            >
              <defs>
                <linearGradient id="lg-load" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#00BFFF" />
                  <stop offset="100%" stopColor="#007BFF" />
                </linearGradient>
                <filter id="glow-load">
                  <feGaussianBlur stdDeviation="1.6" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Outer hex */}
              <motion.polygon
                points={OUTER_HEX}
                stroke="url(#lg-load)" strokeWidth="2.2" fill="none" strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.15, ease: "easeInOut" }}
              />

              {/* Inner hex */}
              <motion.polygon
                points={INNER_HEX}
                stroke="#007BFF" strokeWidth="1.2"
                fill="rgba(0,191,255,.045)" strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.72, ease: "easeInOut" }}
              />

              {/* S letterform */}
              <motion.path
                d={S_PATH}
                stroke="url(#lg-load)" strokeWidth="5.2" strokeLinecap="round" fill="none"
                filter="url(#glow-load)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.88, ease: "easeInOut" }}
              />

              {/* Corner dots pop in */}
              {DOTS.map(([cx, cy], i) => (
                <motion.circle
                  key={i}
                  cx={cx} cy={cy} r="2.4"
                  fill={i % 2 === 0 ? "#00BFFF" : "#007BFF"}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 1.32 + i * 0.05,
                    duration: 0.28,
                    type: "spring",
                    stiffness: 340,
                  }}
                />
              ))}
            </motion.svg>

            {/* ── Wordmark ── */}
            <motion.div
              className="text-center mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={assembled ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="text-[26px] font-black tracking-[.3em] block"
                style={{
                  background: "linear-gradient(130deg,#00BFFF 0%,#007BFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                SOMAPP
              </span>
              <span className="text-[10px] tracking-[.28em] uppercase font-medium text-white/32 mt-1 block">
                Soluciones Digitales
              </span>
            </motion.div>
          </div>

          {/* ── Progress bar ── */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full overflow-hidden"
            style={{
              width: 180,
              height: 2,
              background: "rgba(255,255,255,.06)",
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg,#00BFFF 0%,#007BFF 100%)",
                boxShadow: "0 0 8px rgba(0,191,255,.65)",
                originX: 0,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.85, ease: "linear" }}
            />
          </div>

          {/* ── Corner accent lines ── */}
          {[
            "top-8 left-8 border-t border-l",
            "top-8 right-8 border-t border-r",
            "bottom-8 left-8 border-b border-l",
            "bottom-8 right-8 border-b border-r",
          ].map((cls, i) => (
            <motion.div
              key={i}
              className={`absolute w-6 h-6 ${cls}`}
              style={{ borderColor: "rgba(0,191,255,.25)" }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
