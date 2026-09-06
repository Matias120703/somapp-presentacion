"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroLogoShowcase from "./HeroLogoShowcase";

export default function HeroSection() {
  /* introComplete: logo is fully assembled */
  const [introComplete, setIntroComplete] = useState(false);
  /* contentVisible: left column fades in */
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Logo draws ≈ 2.2 s (last path delay 1.1 + duration 1.1 = 2.2 s)
    const t1 = setTimeout(() => setIntroComplete(true), 2300);
    const t2 = setTimeout(() => setContentVisible(true), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: [
          "radial-gradient(ellipse 80% 60% at 65% 45%, rgba(25,85,216,.07) 0%, transparent 60%)",
          "radial-gradient(ellipse 60% 80% at 10% 80%, rgba(25,85,216,.04) 0%, transparent 55%)",
          "#050B14",
        ].join(", "),
      }}
    >
      {/* Noise grain */}
      <div className="noise" />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#2F7DF6" strokeWidth=".5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
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
                <span className="w-[6px] h-[6px] rounded-full bg-brand-blue" />
                Desarrollo de Software
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-[2.6rem] sm:text-5xl xl:text-[3.6rem] font-black leading-[1.07] tracking-[-0.02em] text-white"
              initial={{ opacity: 0, y: 22 }}
              animate={contentVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: .15, duration: .8 }}
            >
              Sistemas y sitios web{" "}
              <span className="gradient-text">
                hechos a medida
              </span>{" "}
              para tu empresa
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-[1.05rem] text-white/55 leading-relaxed max-w-[480px]"
              initial={{ opacity: 0, y: 18 }}
              animate={contentVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: .28, duration: .75 }}
            >
              Diseñamos y desarrollamos páginas web, tiendas online y sistemas
              de gestión, con entrega, hosting y soporte incluidos desde el
              primer día.
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
              className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2"
              initial={{ opacity: 0 }}
              animate={contentVisible ? { opacity: 1 } : {}}
              transition={{ delay: .55, duration: .6 }}
            >
              <span className="text-white/40 text-xs font-medium">+50 proyectos entregados</span>
              <span className="text-white/15">·</span>
              <span className="text-white/40 text-xs font-medium">Atención directa por WhatsApp</span>
              <span className="text-white/15">·</span>
              <span className="text-white/40 text-xs font-medium">Precios en Guaraníes o USD</span>
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
