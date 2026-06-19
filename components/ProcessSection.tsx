"use client";

import { useRef, type ComponentType } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   Icons
═══════════════════════════════════════════════════════════════════ */
type SvgProps = { className?: string };

function ChatIcon({ className }: SvgProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"
      strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

function ClipboardIcon({ className }: SvgProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"
      strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <path d="M9 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2h-3" />
      <line x1="9"  y1="12" x2="15" y2="12" />
      <line x1="9"  y1="16" x2="13" y2="16" />
    </svg>
  );
}

function PenIcon({ className }: SvgProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"
      strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function CodeBracketIcon({ className }: SvgProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"
      strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function GlobeIcon({ className }: SvgProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"
      strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Data
═══════════════════════════════════════════════════════════════════ */
type StepData = {
  number: number;
  title: string;
  desc: string;
  Icon: ComponentType<SvgProps>;
};

const STEPS: StepData[] = [
  {
    number: 1,
    title: "Reunión Inicial",
    desc: "Analizamos tus necesidades, objetivos y visión del proyecto.",
    Icon: ChatIcon,
  },
  {
    number: 2,
    title: "Planificación",
    desc: "Definimos la estructura, funcionalidades y alcance de la solución.",
    Icon: ClipboardIcon,
  },
  {
    number: 3,
    title: "Diseño",
    desc: "Creamos una experiencia moderna, intuitiva y alineada con tu marca.",
    Icon: PenIcon,
  },
  {
    number: 4,
    title: "Desarrollo",
    desc: "Construimos la solución utilizando tecnologías modernas y escalables.",
    Icon: CodeBracketIcon,
  },
  {
    number: 5,
    title: "Lanzamiento y Soporte",
    desc: "Implementamos el proyecto y brindamos acompañamiento continuo.",
    Icon: GlobeIcon,
  },
];

/* ═══════════════════════════════════════════════════════════════════
   Scroll variants
═══════════════════════════════════════════════════════════════════ */
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ═══════════════════════════════════════════════════════════════════
   Step node (numbered glow circle)
═══════════════════════════════════════════════════════════════════ */
function StepNode({ number, inView }: { number: number; inView: boolean }) {
  return (
    <div className="relative flex-shrink-0 w-12 h-12">
      {/* Outer pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "rgba(0,191,255,.18)" }}
        animate={inView ? { scale: [1, 1.75, 1], opacity: [0.5, 0, 0.5] } : {}}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Inner glow */}
      <motion.div
        className="absolute -inset-1 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(0,191,255,.4), transparent 70%)" }}
        animate={inView ? { opacity: [0.3, 0.6, 0.3] } : {}}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      {/* Circle */}
      <motion.div
        className="absolute inset-0 rounded-full flex items-center justify-center z-10"
        style={{
          background: "linear-gradient(135deg, rgba(0,191,255,.14) 0%, rgba(0,123,255,.08) 100%)",
          border: "1.5px solid rgba(0,191,255,.45)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? {
          scale: 1,
          opacity: 1,
          boxShadow: "0 0 18px rgba(0,191,255,.28), 0 0 36px rgba(0,191,255,.1)",
        } : {}}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-[12.5px] font-black gradient-text tabular-nums select-none">
          {String(number).padStart(2, "0")}
        </span>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Step card inner content (shared by both layouts)
═══════════════════════════════════════════════════════════════════ */
function StepCardContent({ step }: { step: StepData }) {
  const { Icon, title, desc } = step;
  return (
    <motion.div
      className="relative rounded-2xl p-5 sm:p-6 w-full border transition-colors duration-300"
      style={{
        background:           "rgba(11,19,32,.65)",
        backdropFilter:       "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        borderColor:          "rgba(255,255,255,.07)",
      }}
      whileHover={{
        y: -4,
        borderColor: "rgba(0,191,255,.28)",
        boxShadow:   "0 18px 55px rgba(0,191,255,.1)",
        transition:  { duration: 0.22, ease: "easeOut" },
      }}
    >
      {/* Top shimmer on hover */}
      <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl overflow-hidden">
        <motion.div
          className="h-full w-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,191,255,.5), transparent)" }}
          initial={{ opacity: 0, x: "-100%" }}
          whileHover={{ opacity: 1, x: "100%", transition: { duration: 0.55, ease: "linear" } }}
        />
      </div>

      {/* Icon + title */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(0,191,255,.1)",
            border: "1px solid rgba(0,191,255,.22)",
          }}
        >
          <Icon className="w-[17px] h-[17px] text-brand-blue" />
        </div>
        <h3 className="text-[16px] font-bold text-white leading-snug">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-white/48 text-[13.5px] leading-relaxed pl-[3px]">{desc}</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Desktop alternating row
═══════════════════════════════════════════════════════════════════ */
function DesktopRow({
  step,
  index,
  isLast,
}: {
  step: StepData;
  index: number;
  isLast: boolean;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`flex items-start ${!isLast ? "pb-10" : ""}`}>

      {/* Left column */}
      <div className="flex-1 flex justify-end pr-10 min-w-0">
        {isLeft && (
          <motion.div
            className="w-full max-w-[380px]"
            initial={{ opacity: 0, x: -34 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <StepCardContent step={step} />
          </motion.div>
        )}
      </div>

      {/* Centre: node + segment line */}
      <div className="flex flex-col items-center flex-shrink-0 z-10">
        <StepNode number={step.number} inView={inView} />
        {!isLast && (
          <motion.div
            className="w-px mt-3"
            style={{
              height:          "72px",
              background:      "linear-gradient(to bottom, rgba(0,191,255,.35), rgba(0,191,255,.05))",
              transformOrigin: "top",
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.32 }}
          />
        )}
      </div>

      {/* Right column */}
      <div className="flex-1 pl-10 min-w-0">
        {!isLeft && (
          <motion.div
            className="w-full max-w-[380px]"
            initial={{ opacity: 0, x: 34 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <StepCardContent step={step} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Mobile step (left node, right card)
═══════════════════════════════════════════════════════════════════ */
function MobileStep({
  step,
  isLast,
}: {
  step: StepData;
  isLast: boolean;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <div ref={ref} className="flex gap-5">
      {/* Left: node + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <StepNode number={step.number} inView={inView} />
        {!isLast && (
          <motion.div
            className="w-px mt-3 flex-1 min-h-[48px]"
            style={{
              background:      "linear-gradient(to bottom, rgba(0,191,255,.28), rgba(0,191,255,.04))",
              transformOrigin: "top",
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
          />
        )}
      </div>

      {/* Right: card */}
      <div className={`flex-1 min-w-0 ${!isLast ? "pb-9" : ""}`}>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <StepCardContent step={step} />
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Section
═══════════════════════════════════════════════════════════════════ */
export default function ProcessSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      id="proceso"
      className="relative py-28 overflow-hidden"
      style={{
        background: [
          "radial-gradient(ellipse 65% 55% at 50% 0%, rgba(0,191,255,.07) 0%, transparent 55%)",
          "radial-gradient(ellipse 55% 60% at 5%  60%, rgba(0,123,255,.065) 0%, transparent 55%)",
          "radial-gradient(ellipse 50% 55% at 95% 55%, rgba(0,191,255,.055) 0%, transparent 55%)",
          "#050B14",
        ].join(", "),
      }}
    >
      <div className="noise" />

      {/* Top section border */}
      <div className="absolute inset-x-0 top-0 h-px
        bg-gradient-to-r from-transparent via-white/[.07] to-transparent" />

      {/* Subtle radial dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[.018] overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="proc-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#00BFFF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#proc-dots)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
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
            Proceso
          </motion.span>

          <motion.h2 variants={fadeUp}
            className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.07] text-white mb-4"
          >
            Así trabajamos{" "}
            <span className="gradient-text">en Somapp</span>
          </motion.h2>

          <motion.p variants={fadeUp}
            className="text-white/50 text-[1.05rem] max-w-xl mx-auto leading-relaxed"
          >
            Un proceso claro y eficiente para convertir ideas en soluciones digitales.
          </motion.p>
        </motion.div>

        {/* ── Mobile timeline (hidden on lg+) ── */}
        <div className="lg:hidden">
          {STEPS.map((step, i) => (
            <MobileStep key={step.number} step={step} isLast={i === STEPS.length - 1} />
          ))}
        </div>

        {/* ── Desktop alternating timeline (hidden below lg) ── */}
        <div className="hidden lg:block">
          {STEPS.map((step, i) => (
            <DesktopRow
              key={step.number}
              step={step}
              index={i}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
