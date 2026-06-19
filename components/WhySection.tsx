"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { WA_URL } from "@/lib/whatsapp";

/* ─── Feature icons ─────────────────────────────────────────────────── */
type SVGProps = { className?: string };

function CodeIcon({ className }: SVGProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75}
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function CpuIcon({ className }: SVGProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75}
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6"  height="6"  />
      <line x1="9"  y1="1"  x2="9"  y2="4"  />
      <line x1="15" y1="1"  x2="15" y2="4"  />
      <line x1="9"  y1="20" x2="9"  y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9"  x2="23" y2="9"  />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1"  y1="9"  x2="4"  y2="9"  />
      <line x1="1"  y1="14" x2="4"  y2="14" />
    </svg>
  );
}

function HeadsetIcon({ className }: SVGProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75}
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M3 18v-6a9 9 0 0118 0v6" />
      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z" />
      <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
    </svg>
  );
}

function TrendingUpIcon({ className }: SVGProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75}
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    Icon: CodeIcon,
    title: "Desarrollo a Medida",
    desc: "Cada proyecto es diseñado según las necesidades reales de tu negocio.",
  },
  {
    Icon: CpuIcon,
    title: "Tecnología Moderna",
    desc: "Utilizamos herramientas actuales para garantizar rendimiento y escalabilidad.",
  },
  {
    Icon: HeadsetIcon,
    title: "Soporte Continuo",
    desc: "Te acompañamos antes, durante y después de la implementación.",
  },
  {
    Icon: TrendingUpIcon,
    title: "Soluciones Escalables",
    desc: "Nuestros sistemas crecen junto con tu empresa.",
  },
] as const;

const STATS = [
  { target: 50,  suffix: "+",   label: "Proyectos desarrollados"         },
  { target: 30,  suffix: "+",   label: "Clientes satisfechos"            },
  { target: 100, suffix: "%",   label: "Compromiso con nuestros clientes" },
  { target: 24,  suffix: "/7",  label: "Soporte y acompañamiento"        },
] as const;

/* ─── Variants ──────────────────────────────────────────────────────── */
const stagger = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const fadeRight = {
  hidden:  { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0,   transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const fadeLeft = {
  hidden:  { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Counter hook ──────────────────────────────────────────────────── */
function useCountUp(target: number, active: boolean, duration = 2200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - (1 - p) ** 3;          // cubic ease-out
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

/* ─── Stat item ─────────────────────────────────────────────────────── */
function StatItem({ target, suffix, label }: typeof STATS[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const count = useCountUp(target, inView);

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-6">
      <div className="text-[3.2rem] sm:text-[3.6rem] font-black leading-none mb-3 tabular-nums">
        <span className="gradient-text">{count}</span>
        <span className="gradient-text">{suffix}</span>
      </div>
      <p className="text-white/45 text-sm font-medium leading-snug max-w-[130px]">{label}</p>
    </div>
  );
}

/* ─── Feature block ─────────────────────────────────────────────────── */
function FeatureBlock({ Icon, title, desc }: typeof FEATURES[number]) {
  return (
    <motion.div
      className="group flex gap-4 p-5 rounded-xl border border-white/[.06]
        bg-[rgba(11,19,32,.45)] backdrop-blur-sm
        hover:border-brand-blue/20 hover:bg-[rgba(11,19,32,.65)]
        transition-all duration-300"
      whileHover={{ x: 4, transition: { duration: 0.22 } }}
    >
      {/* Icon badge */}
      <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
        bg-gradient-to-br from-brand-blue/15 to-brand-blue-2/[.08]
        group-hover:from-brand-blue/22 group-hover:to-brand-blue-2/14
        transition-all duration-300">
        <Icon className="w-5 h-5 text-brand-blue" />
      </div>

      <div>
        <h4 className="text-[15px] font-bold text-white mb-1 leading-snug">{title}</h4>
        <p className="text-white/45 text-[13px] leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ─── Main section ──────────────────────────────────────────────────── */
export default function WhySection() {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const leftInView  = useInView(leftRef,  { once: true, margin: "-80px 0px" });
  const rightInView = useInView(rightRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      id="nosotros"
      className="relative overflow-hidden"
      style={{
        background: [
          "radial-gradient(ellipse 70% 60% at 90% 50%, rgba(0,123,255,.075) 0%, transparent 60%)",
          "radial-gradient(ellipse 50% 50% at 5%  20%, rgba(0,191,255,.055) 0%, transparent 55%)",
          "#050B14",
        ].join(", "),
      }}
    >
      <div className="noise" />

      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px
        bg-gradient-to-r from-transparent via-white/[.07] to-transparent" />

      {/* ── Why Choose block ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div
            ref={leftRef}
            variants={stagger}
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
            className="flex flex-col gap-7"
          >
            <motion.span variants={fadeRight}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full w-fit
                border border-brand-blue/25 bg-brand-blue/[.06]
                text-brand-blue text-[11px] font-semibold tracking-[.18em] uppercase"
            >
              <span className="w-[5px] h-[5px] rounded-full bg-brand-blue" />
              ¿Por qué elegir Somapp?
            </motion.span>

            <motion.h2 variants={fadeRight}
              className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.07] text-white"
            >
              Transformamos ideas en{" "}
              <span className="gradient-text">soluciones digitales</span>
              {" "}reales
            </motion.h2>

            <motion.p variants={fadeRight}
              className="text-white/50 text-[1.05rem] leading-relaxed"
            >
              En Somapp acompañamos a emprendedores, comercios y empresas en su
              transformación digital mediante herramientas modernas, escalables y
              diseñadas para generar resultados.
            </motion.p>

            {/* Decorative lines */}
            <motion.div variants={fadeRight} className="flex flex-col gap-2.5">
              {["Entrega en tiempo y forma", "Código limpio y escalable", "Diseño orientado al usuario"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-4 h-px bg-brand-blue/60" />
                    <span className="text-white/45 text-sm">{item}</span>
                  </div>
                )
              )}
            </motion.div>

            <motion.a variants={fadeRight}
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2.5 text-white font-semibold
                text-[15px] px-7 py-[13px] rounded-xl w-fit"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: .97 }}
            >
              Hablemos de tu proyecto
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right — features 2×2 */}
          <motion.div
            ref={rightRef}
            variants={stagger}
            initial="hidden"
            animate={rightInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {FEATURES.map((f, i) => (
              <motion.div key={i} variants={fadeLeft}>
                <FeatureBlock {...f} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Statistics bar ── */}
      <div
        ref={statsRef}
        className="relative border-t border-b border-white/[.06]"
        style={{
          background: "linear-gradient(180deg, rgba(11,19,32,.55) 0%, rgba(5,11,20,.8) 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Top/bottom glow lines */}
        <div className="absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px
          bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[800px] h-32 rounded-full opacity-30" style={{
            background: "radial-gradient(ellipse, rgba(0,191,255,.08) 0%, transparent 70%)",
          }} />
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {STATS.map((s, i) => (
              <div key={i} className="relative">
                {/* Vertical divider (except last) */}
                {i < STATS.length - 1 && (
                  <div className="hidden lg:block absolute right-0 inset-y-4
                    w-px bg-gradient-to-b from-transparent via-white/[.1] to-transparent" />
                )}
                {/* Mobile horizontal divider */}
                {i === 1 && (
                  <div className="lg:hidden absolute inset-x-6 bottom-0 h-px bg-white/[.06]" />
                )}
                <StatItem {...s} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
