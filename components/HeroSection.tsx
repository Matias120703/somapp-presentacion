"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroLogoShowcase from "./HeroLogoShowcase";

/* ─────────────────────────────────────────────────────────────────────
   Background particles — deterministic, no Math.random (SSR-safe)
   60 items with positions derived from a pseudo-distribution
───────────────────────────────────────────────────────────────────── */
const BG_DOTS = Array.from({ length: 55 }, (_, i) => {
  // Spread deterministically using golden-angle increments
  const phi   = 137.508;
  const angle = (i * phi * Math.PI) / 180;
  const r     = Math.sqrt(i / 55) * 100;
  const x     = 50 + r * Math.cos(angle) * .5;
  const y     = 50 + r * Math.sin(angle) * .5;
  return {
    id:      i,
    x:       Math.max(1, Math.min(99, x)),
    y:       Math.max(1, Math.min(99, y)),
    size:    1 + (i % 3) * .6,           // 1.0 | 1.6 | 2.2
    opacity: .08 + (i % 4) * .04,        // .08 | .12 | .16 | .20
    dur:     4.5 + (i % 5) * 1.2,        // 4.5 – 10.3 s
    delay:   (i % 11) * .45,             // 0 – 4.95 s
  };
});

export default function HeroSection() {
  /* introComplete: logo is fully assembled + glow burst done */
  const [mounted,       setMounted]       = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  /* contentVisible: left column fades in */
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Logo draws ≈ 2.5 s (last path delay 1.4 + duration 1.1 = 2.5 s)
    // Glow burst runs ≈ 0.3 s after that
    const t1 = setTimeout(() => setIntroComplete(true), 2600);
    const t2 = setTimeout(() => setContentVisible(true), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: [
          "radial-gradient(ellipse 80% 60% at 65% 45%, rgba(0,123,255,.09) 0%, transparent 60%)",
          "radial-gradient(ellipse 50% 50% at 82% 65%, rgba(0,191,255,.07) 0%, transparent 55%)",
          "radial-gradient(ellipse 60% 80% at 10% 80%, rgba(0,123,255,.05) 0%, transparent 55%)",
          "#050B14",
        ].join(", "),
      }}
    >
      {/* Noise grain */}
      <div className="noise" />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[.035]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#00BFFF" strokeWidth=".5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Ambient background particles — client-only to avoid SSR/style precision mismatches */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {BG_DOTS.map((p) => (
            <motion.div key={p.id}
              className="absolute rounded-full bg-brand-blue"
              style={{
                left: `${p.x}%`, top: `${p.y}%`,
                width: p.size, height: p.size,
                opacity: p.opacity,
              }}
              animate={{ y: [0, -28, 0], opacity: [p.opacity, p.opacity * 2.8, p.opacity] }}
              transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}

      {/* Atmospheric light blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,191,255,.055) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.18, 1], opacity: [.7, 1, .7] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div className="absolute -bottom-20 left-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,123,255,.05) 0%, transparent 70%)" }}
          animate={{ scale: [1.15, 1, 1.15], opacity: [1, .6, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Two-column layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-[68px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-center min-h-[calc(100vh-68px)] pt-16 pb-10">

          {/* ── LEFT — copy ── */}
          <motion.div
            className="flex flex-col gap-7 order-2 lg:order-1"
            initial={{ opacity: 0, x: -32 }}
            animate={contentVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .85, ease: [.22, 1, .36, 1] }}
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={contentVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: .05, duration: .55 }}
            >
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full
                border border-brand-blue/25 bg-brand-blue/[.06]
                text-brand-blue text-[11px] font-semibold tracking-[.18em] uppercase"
              >
                <motion.span
                  className="w-[6px] h-[6px] rounded-full bg-brand-blue"
                  animate={{ opacity: [1, .25, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                Soluciones Digitales
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-[2.6rem] sm:text-5xl xl:text-[3.6rem] font-black leading-[1.07] tracking-[-0.02em] text-white"
              initial={{ opacity: 0, y: 22 }}
              animate={contentVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: .15, duration: .8 }}
            >
              Soluciones digitales{" "}
              <span className="gradient-text">
                para hacer crecer
              </span>{" "}
              tu negocio
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-[1.05rem] text-white/55 leading-relaxed max-w-[480px]"
              initial={{ opacity: 0, y: 18 }}
              animate={contentVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: .28, duration: .75 }}
            >
              Desarrollamos sistemas, páginas web y aplicaciones a medida para
              empresas y emprendedores.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-3.5 pt-1"
              initial={{ opacity: 0, y: 18 }}
              animate={contentVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: .4, duration: .75 }}
            >
              <motion.a
                href="#planes"
                className="btn-primary inline-flex items-center gap-2.5 text-white font-semibold
                  text-[15px] px-7 py-[13px] rounded-xl"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: .97 }}
              >
                <BoltIcon />
                Ver planes
              </motion.a>

              <motion.a
                href="#portafolio"
                className="btn-ghost inline-flex items-center gap-2.5 text-white font-semibold
                  text-[15px] px-7 py-[13px] rounded-xl"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: .97 }}
              >
                <PlayIcon />
                Ver proyectos
              </motion.a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              className="flex items-center gap-5 pt-2"
              initial={{ opacity: 0 }}
              animate={contentVisible ? { opacity: 1 } : {}}
              transition={{ delay: .62, duration: .6 }}
            >
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(n => (
                  <svg key={n} className="w-3.5 h-3.5 text-brand-blue fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/35 text-xs font-medium">Más de 50 proyectos entregados</span>
              <span className="text-white/15">·</span>
              <span className="text-white/35 text-xs font-medium">100% satisfacción</span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — logo showcase ── */}
          <motion.div
            className="flex items-center justify-center order-1 lg:order-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .4 }}
          >
            <HeroLogoShowcase introComplete={introComplete} />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none
        bg-gradient-to-t from-brand-dark to-transparent" />
    </section>
  );
}

/* ── Icons ── */
function BoltIcon() {
  return (
    <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
        d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
