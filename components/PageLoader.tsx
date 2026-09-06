"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    const t1 = setTimeout(() => setAssembled(true), 1200);
    const t2 = setTimeout(() => setVisible(false),  1750);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#050B14" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Logo + wordmark group ── */}
          <div className="relative flex flex-col items-center z-10">

            {/* ── SVG logo ── */}
            <motion.svg
              width="180"
              height="180"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <defs>
                <linearGradient id="lg-load" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#2F7DF6" />
                  <stop offset="100%" stopColor="#1955D8" />
                </linearGradient>
              </defs>

              {/* Outer hex */}
              <motion.polygon
                points={OUTER_HEX}
                stroke="url(#lg-load)" strokeWidth="2.2" fill="none" strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.1, ease: "easeInOut" }}
              />

              {/* Inner hex */}
              <motion.polygon
                points={INNER_HEX}
                stroke="#1955D8" strokeWidth="1.2"
                fill="rgba(47,125,246,.05)" strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.5, ease: "easeInOut" }}
              />

              {/* S letterform */}
              <motion.path
                d={S_PATH}
                stroke="url(#lg-load)" strokeWidth="5.2" strokeLinecap="round" fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.65, ease: "easeInOut" }}
              />

              {/* Corner dots pop in */}
              {DOTS.map(([cx, cy], i) => (
                <motion.circle
                  key={i}
                  cx={cx} cy={cy} r="2.4"
                  fill={i % 2 === 0 ? "#2F7DF6" : "#1955D8"}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.95 + i * 0.04,
                    duration: 0.25,
                    type: "spring",
                    stiffness: 340,
                  }}
                />
              ))}
            </motion.svg>

            {/* ── Wordmark ── */}
            <motion.div
              className="text-center mt-2"
              initial={{ opacity: 0, y: 8 }}
              animate={assembled ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[22px] font-black tracking-[.3em] text-white block">
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
              width: 140,
              height: 2,
              background: "rgba(255,255,255,.06)",
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg,#2F7DF6 0%,#1955D8 100%)",
                originX: 0,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
