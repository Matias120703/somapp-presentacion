"use client";

import { useRef } from "react";
import type { ComponentType } from "react";
import { motion, useInView } from "framer-motion";

const WA_SYSTEMS_URL =
  "https://wa.me/595981698777?text=Hola%2C%20me%20interesa%20obtener%20informaci%C3%B3n%20sobre%20los%20sistemas%20desarrollados%20por%20Somapp.";

/* ═══════════════════════════════════════════════════════════════════
   Icons
═══════════════════════════════════════════════════════════════════ */
type IconProps = { className?: string; color: string };

function UtensilsIcon({ className, color }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  );
}

function ChartBarsIcon({ className, color }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3"  y="12" width="4" height="9" rx="1.2" />
      <rect x="10" y="7"  width="4" height="14" rx="1.2" />
      <rect x="17" y="3"  width="4" height="18" rx="1.2" />
    </svg>
  );
}

function RocketIcon({ className, color }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function TerminalIcon({ className, color }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor"
      viewBox="0 0 24 24" strokeWidth={2.3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function WAIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Data
═══════════════════════════════════════════════════════════════════ */
type SystemItem = {
  title:      string;
  desc:       string;
  Icon:       ComponentType<IconProps>;
  accent:     string;
  accentRgb:  string;
  index:      string;
  features:   readonly string[];
};

const SYSTEMS: SystemItem[] = [
  {
    title:     "Sistema Restaurante",
    desc:      "Control completo de la operación gastronómica.",
    Icon:      UtensilsIcon,
    accent:    "#00BFFF",
    accentRgb: "0,191,255",
    index:     "01",
    features:  [
      "Gestión de Mesas",
      "Pedidos",
      "Cocina",
      "Caja",
      "Reportes",
      "Usuarios y Roles",
    ],
  },
  {
    title:     "Sistema Comercial",
    desc:      "Administrá ventas, inventario y clientes desde un solo lugar.",
    Icon:      ChartBarsIcon,
    accent:    "#60A5FA",
    accentRgb: "96,165,250",
    index:     "02",
    features:  [
      "Ventas",
      "Compras",
      "Inventario",
      "Clientes",
      "Proveedores",
      "Reportes",
    ],
  },
  {
    title:     "Sistema para Emprendedores",
    desc:      "Herramientas para controlar costos, ganancias y crecimiento del negocio.",
    Icon:      RocketIcon,
    accent:    "#34D399",
    accentRgb: "52,211,153",
    index:     "03",
    features:  [
      "Gestión de Productos",
      "Costos",
      "Ganancias",
      "Reportes Financieros",
      "Dashboard",
      "Estadísticas",
    ],
  },
  {
    title:     "Sistema Personalizado",
    desc:      "Creamos software adaptado a las necesidades específicas de cada empresa.",
    Icon:      TerminalIcon,
    accent:    "#A78BFA",
    accentRgb: "167,139,250",
    index:     "04",
    features:  [
      "Desarrollo a Medida",
      "Escalable",
      "Seguro",
      "Integraciones",
      "Automatizaciones",
      "Soporte",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════
   Scroll variants
═══════════════════════════════════════════════════════════════════ */
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ═══════════════════════════════════════════════════════════════════
   System card
═══════════════════════════════════════════════════════════════════ */
function SystemCard({ title, desc, Icon, accent, accentRgb, index, features }: SystemItem) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        background:           "rgba(11,19,32,.62)",
        backdropFilter:       "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        borderWidth:          "1px",
        borderStyle:          "solid",
      }}
      initial="rest"
      whileHover="hovered"
      variants={{
        rest: {
          y:           0,
          borderColor: "rgba(255,255,255,.07)",
          boxShadow:   "0 4px 24px rgba(0,0,0,.18)",
        },
        hovered: {
          y:           -7,
          borderColor: `rgba(${accentRgb},.35)`,
          boxShadow:   `0 28px 70px rgba(${accentRgb},.12), 0 0 0 1px rgba(${accentRgb},.22)`,
          transition:  { duration: 0.27, ease: "easeOut" },
        },
      }}
    >
      {/* Accent line sweeps in on hover */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] z-10 origin-left"
        style={{
          background: `linear-gradient(90deg, ${accent} 0%, rgba(${accentRgb},.25) 70%, transparent 100%)`,
        }}
        variants={{
          rest:    { scaleX: 0 },
          hovered: { scaleX: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
        }}
      />

      {/* Index — faint top-right label */}
      <span
        className="absolute top-[18px] right-[18px] text-[11px] font-black tracking-[.2em] select-none"
        style={{ color: `rgba(${accentRgb},.18)` }}
      >
        {index}
      </span>

      {/* Body */}
      <div className="p-7 flex flex-col flex-1">

        {/* Icon badge */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
          style={{
            background: `rgba(${accentRgb},.1)`,
            border:     `1px solid rgba(${accentRgb},.2)`,
          }}
        >
          <Icon className="w-5 h-5" color={accent} />
        </div>

        {/* Title */}
        <h3 className="text-[17px] font-bold text-white leading-snug mb-2">{title}</h3>

        {/* Description */}
        <p className="text-white/45 text-[13px] leading-relaxed mb-5">{desc}</p>

        {/* Accent divider */}
        <div
          className="h-px mb-5"
          style={{ background: `linear-gradient(90deg, rgba(${accentRgb},.2) 0%, transparent 70%)` }}
        />

        {/* Features — 2-column grid */}
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-8 flex-1">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <div
                className="w-[5px] h-[5px] rounded-full mt-[5px] flex-shrink-0"
                style={{ background: `rgba(${accentRgb},.7)` }}
              />
              <span className="text-[12.5px] text-white/52 leading-snug">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <motion.a
          href={WA_SYSTEMS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost flex items-center justify-center gap-2.5
            text-white/70 font-semibold text-[13.5px] px-5 py-[11px] rounded-xl"
          whileTap={{ scale: 0.97 }}
        >
          Solicitar Información
          {/* Arrow shifts right via variant propagation */}
          <motion.div
            className="flex items-center"
            variants={{
              rest:    { x: 0 },
              hovered: { x: 5, transition: { duration: 0.22 } },
            }}
          >
            <ArrowRightIcon />
          </motion.div>
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Bottom CTA banner
═══════════════════════════════════════════════════════════════════ */
function CTABanner() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16"
    >
      <div
        className="relative rounded-2xl overflow-hidden border border-white/[.08]
          shadow-[0_0_80px_rgba(0,191,255,.06)]"
        style={{
          background:     "linear-gradient(135deg, rgba(11,19,32,.85) 0%, rgba(5,11,20,.92) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Top/bottom shimmer lines */}
        <div className="absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px
          bg-gradient-to-r from-transparent via-brand-blue/15 to-transparent" />

        {/* Corner hex decorations */}
        {(["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"] as const).map((pos) => (
          <div key={pos} className={`absolute ${pos} w-7 h-7 opacity-[.12]`}>
            <svg viewBox="0 0 100 100" fill="none">
              <polygon points="50,6 88,28 88,72 50,94 12,72 12,28"
                stroke="#00BFFF" strokeWidth="12" />
            </svg>
          </div>
        ))}

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[700px] h-56 rounded-full opacity-30" style={{
            background:
              "radial-gradient(ellipse, rgba(0,191,255,.09) 0%, rgba(0,123,255,.05) 45%, transparent 70%)",
          }} />
        </div>

        {/* Layout: centered on mobile → horizontal on lg+ */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center
          justify-between gap-8 px-10 py-12 lg:py-11">

          {/* Left — text */}
          <div className="text-center lg:text-left max-w-lg">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-4
                border border-brand-blue/22 bg-brand-blue/[.05]
                text-brand-blue text-[10.5px] font-semibold tracking-[.18em] uppercase"
            >
              <motion.span
                className="w-[4px] h-[4px] rounded-full bg-brand-blue"
                animate={{ opacity: [1, .25, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              Desarrollo a medida
            </motion.span>

            <motion.h3
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.22, duration: 0.65 }}
              className="text-2xl sm:text-[1.85rem] font-black tracking-tight
                text-white leading-[1.1] mb-3"
            >
              ¿No encontrás el sistema{" "}
              <span className="gradient-text">que necesitás?</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.65 }}
              className="text-white/45 text-[14.5px] leading-relaxed"
            >
              Contanos tu idea y desarrollaremos una solución
              personalizada para tu negocio.
            </motion.p>
          </div>

          {/* Right — buttons */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.38, duration: 0.65 }}
            className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 flex-shrink-0"
          >
            {/* Primary */}
            <motion.a
              href={WA_SYSTEMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2.5
                text-white font-semibold text-[14px] px-7 py-[13px] rounded-xl whitespace-nowrap"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Solicitar Presupuesto
            </motion.a>

            {/* Ghost */}
            <motion.a
              href={WA_SYSTEMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center justify-center gap-2.5
                text-white font-semibold text-[14px] px-7 py-[13px] rounded-xl whitespace-nowrap"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <WAIcon className="w-[18px] h-[18px]" />
              Hablar por WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Section
═══════════════════════════════════════════════════════════════════ */
export default function SystemsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px 0px" });
  const gridInView   = useInView(gridRef,   { once: true, margin: "-60px 0px" });

  return (
    <section
      id="sistemas"
      className="relative py-28 overflow-hidden"
      style={{
        background: [
          "radial-gradient(ellipse 62% 55% at 88% 18%, rgba(0,191,255,.07) 0%, transparent 58%)",
          "radial-gradient(ellipse 55% 50% at 8%  72%, rgba(0,123,255,.065) 0%, transparent 55%)",
          "#050B14",
        ].join(", "),
      }}
    >
      <div className="noise" />

      {/* Section border */}
      <div className="absolute inset-x-0 top-0 h-px
        bg-gradient-to-r from-transparent via-white/[.07] to-transparent" />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[.022] overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sys-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#00BFFF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sys-dots)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          variants={stagger}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6
              border border-brand-blue/25 bg-brand-blue/[.06]
              text-brand-blue text-[11px] font-semibold tracking-[.18em] uppercase"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-brand-blue" />
            Sistemas
          </motion.span>

          <motion.h2 variants={fadeUp}
            className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.07] text-white mb-5"
          >
            Sistemas diseñados para{" "}
            <span className="gradient-text">optimizar tu negocio</span>
          </motion.h2>

          <motion.p variants={fadeUp}
            className="text-white/50 text-[1.05rem] max-w-2xl mx-auto leading-relaxed"
          >
            Desarrollamos herramientas digitales que ayudan a controlar procesos,
            aumentar la productividad y mejorar la toma de decisiones.
          </motion.p>
        </motion.div>

        {/* ── 2×2 grid ── */}
        <motion.div
          ref={gridRef}
          variants={stagger}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {SYSTEMS.map((s) => (
            <motion.div key={s.title} variants={fadeUp} className="h-full">
              <SystemCard {...s} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── CTA Banner ── */}
        <CTABanner />

      </div>
    </section>
  );
}
