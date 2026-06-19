"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Icon components ───────────────────────────────────────────────── */
type SVGProps = { className?: string };

function DatabaseIcon({ className }: SVGProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75}
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function GlobeIcon({ className }: SVGProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75}
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function SmartphoneIcon({ className }: SVGProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75}
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <circle cx="12" cy="18" r=".5" fill="currentColor" />
    </svg>
  );
}

function WorkflowIcon({ className }: SVGProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75}
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="2"  y="7"  width="6" height="5" rx="1" />
      <rect x="16" y="7"  width="6" height="5" rx="1" />
      <rect x="9"  y="14" width="6" height="5" rx="1" />
      <path d="M5 12v1.5A2.5 2.5 0 007.5 16H9" />
      <path d="M19 12v1.5A2.5 2.5 0 0116.5 16H15" />
      <path d="M12 14v-2" />
    </svg>
  );
}

function SparklesIcon({ className }: SVGProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75}
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 3l1.5 5.5h5.5l-4.5 3.3 1.7 5.7L12 14l-4.2 3.5 1.7-5.7L5 8.5h5.5z" />
      <path d="M19 2l.7 2.3L22 5l-2.3.7L19 8l-.7-2.3L16 5l2.3-.7z" />
      <path d="M5 15l.5 1.5L7 17l-1.5.5L5 19l-.5-1.5L3 17l1.5-.5z" />
    </svg>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    Icon: DatabaseIcon,
    title: "Sistemas de Gestión",
    desc: "Controla ventas, inventario, clientes, pedidos y reportes desde una plataforma moderna y eficiente.",
  },
  {
    Icon: GlobeIcon,
    title: "Páginas Web",
    desc: "Diseñamos sitios web profesionales, rápidos y optimizados para transmitir confianza y generar resultados.",
  },
  {
    Icon: WorkflowIcon,
    title: "Automatización de Procesos",
    desc: "Reducimos tareas repetitivas mediante automatizaciones inteligentes que aumentan la productividad.",
  },
  {
    Icon: SparklesIcon,
    title: "Soluciones a Medida",
    desc: "Desarrollamos software personalizado adaptado exactamente a las necesidades de cada empresa.",
  },
] as const;

/* ─── Framer Motion variants ────────────────────────────────────────── */
const stagger = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Service card ──────────────────────────────────────────────────── */
function ServiceCard({ Icon, title, desc }: typeof SERVICES[number]) {
  return (
    <motion.div
      className="group relative h-full rounded-2xl p-7 border border-white/[.07]
        bg-[rgba(11,19,32,.6)] backdrop-blur-sm cursor-default overflow-hidden
        transition-[border-color,box-shadow] duration-300
        hover:border-brand-blue/25
        hover:shadow-[0_0_50px_rgba(0,191,255,.06),inset_0_0_0_1px_rgba(0,191,255,.15)]"
      initial="rest"
      whileHover="hovered"
      variants={{
        rest:    { y: 0 },
        hovered: { y: -6, transition: { duration: 0.26, ease: "easeOut" } },
      }}
    >
      {/* Top accent line sweeps in */}
      <motion.div
        className="absolute inset-x-0 top-0 h-px origin-center"
        style={{ background: "linear-gradient(90deg, transparent, #00BFFF 50%, transparent)" }}
        variants={{
          rest:    { scaleX: 0, opacity: 0 },
          hovered: { scaleX: 1, opacity: 1, transition: { duration: 0.38, ease: "easeOut" } },
        }}
      />

      {/* Icon box */}
      <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(0,191,255,.12), rgba(0,123,255,.07))" }}>
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{ background: "linear-gradient(135deg, rgba(0,191,255,.18), rgba(0,123,255,.12))" }}
          variants={{ rest: { opacity: 0 }, hovered: { opacity: 1 } }}
        />
        <motion.div
          className="relative z-10"
          variants={{
            rest:    { scale: 1, rotate: 0 },
            hovered: { scale: 1.15, rotate: 6, transition: { duration: 0.28, type: "spring", stiffness: 300 } },
          }}
        >
          <Icon className="w-6 h-6 text-brand-blue" />
        </motion.div>
      </div>

      <h3 className="text-[17px] font-bold text-white mb-3 leading-snug">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{desc}</p>

      {/* Bottom-right arrow hint on hover */}
      <motion.div
        className="absolute bottom-5 right-5"
        variants={{
          rest:    { opacity: 0, x: -4, y: 4 },
          hovered: { opacity: 1, x: 0,  y: 0, transition: { duration: 0.22 } },
        }}
      >
        <svg className="w-4 h-4 text-brand-blue/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </motion.div>

      {/* Corner hex watermark */}
      <div className="absolute -top-3 -right-3 w-16 h-16 opacity-[.04] group-hover:opacity-[.09]
        transition-opacity duration-300 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none">
          <polygon points="50,6 88,28 88,72 50,94 12,72 12,28"
            stroke="#00BFFF" strokeWidth="8" fill="none" />
        </svg>
      </div>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────────────────── */
export default function ServicesSection() {
  const headerRef  = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef,  { once: true, margin: "-80px 0px" });
  const cardsInView  = useInView(cardsRef,   { once: true, margin: "-60px 0px" });

  return (
    <section
      id="servicios"
      className="relative py-28 overflow-hidden"
      style={{
        background: [
          "radial-gradient(ellipse 75% 55% at 10% 55%, rgba(0,123,255,.08) 0%, transparent 58%)",
          "radial-gradient(ellipse 55% 55% at 92% 15%, rgba(0,191,255,.065) 0%, transparent 55%)",
          "#050B14",
        ].join(", "),
      }}
    >
      <div className="noise" />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[.025] overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sgrid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#00BFFF" strokeWidth=".5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sgrid)" />
        </svg>
      </div>

      {/* Section separator top */}
      <div className="absolute inset-x-0 top-0 h-px
        bg-gradient-to-r from-transparent via-white/[.07] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={stagger}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6
              border border-brand-blue/25 bg-brand-blue/[.06]
              text-brand-blue text-[11px] font-semibold tracking-[.18em] uppercase"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-brand-blue" />
            Servicios
          </motion.span>

          <motion.h2 variants={fadeUp}
            className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.07] text-white mb-5"
          >
            Servicios que{" "}
            <span className="gradient-text">impulsan</span>
            {" "}tu negocio
          </motion.h2>

          <motion.p variants={fadeUp}
            className="text-white/50 text-[1.05rem] max-w-2xl mx-auto leading-relaxed"
          >
            Soluciones digitales diseñadas para ayudarte a crecer, optimizar procesos y
            destacar frente a tu competencia.
          </motion.p>
        </motion.div>

        {/* 2×2 grid — all 4 cards, equal width and height */}
        <motion.div
          ref={cardsRef}
          variants={stagger}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {SERVICES.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="h-full">
              <ServiceCard {...s} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
