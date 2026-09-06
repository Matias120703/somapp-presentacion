"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const WA_PRICING_URL =
  "https://wa.me/595981698777?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20los%20planes%20web%20de%20Somapp.";

type Currency = "PYG" | "USD";

/* ═══════════════════════════════════════════════════════════════════
   Data
═══════════════════════════════════════════════════════════════════ */
const PLANS = [
  {
    id: "basico",
    name: "Básico",
    featured: false,
    badge: null as string | null,
    title: "Landing Page Profesional",
    prices: {
      PYG: "Desde Gs. 650.000",
      USD: "Desde USD 115",
    },
    features: [
      "Diseño premium",
      "Responsive",
      "WhatsApp integrado",
      "Formulario de contacto",
      "Hosting por 6 meses",
      "SEO básico",
    ],
  },
  {
    id: "profesional",
    name: "Profesional",
    featured: true,
    badge: "Más Elegido" as string | null,
    title: "Página Web + Panel Administrativo",
    prices: {
      PYG: "Desde Gs. 1.990.000",
      USD: "Desde USD 345",
    },
    features: [
      "Plan Básico completo",
      "Panel de Administración",
      "Gestión de contenido y productos",
      "Dashboard profesional",
      "Base de datos",
      "Usuarios y permisos",
    ],
  },
];

const NOTE =
  "Precios base: el costo final se ajusta según las funcionalidades que necesite tu proyecto. " +
  "Incluye hosting y soporte por 6 meses. Dominio personalizado no incluido.";

/* ═══════════════════════════════════════════════════════════════════
   Animation variants
═══════════════════════════════════════════════════════════════════ */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ═══════════════════════════════════════════════════════════════════
   Icons
═══════════════════════════════════════════════════════════════════ */
function CheckIcon() {
  return (
    <svg className="w-[18px] h-[18px] flex-shrink-0" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="rgba(47,125,246,.35)" strokeWidth="1.3" />
      <path d="M6.5 10l2.5 2.5 4.5-5"
        stroke="#2F7DF6" strokeWidth="1.9"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor"
      viewBox="0 0 24 24" strokeWidth={2.3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Currency toggle
═══════════════════════════════════════════════════════════════════ */
function CurrencyToggle({
  currency,
  setCurrency,
}: {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}) {
  return (
    <div
      className="inline-flex items-center rounded-xl p-1"
      style={{
        background: "rgba(11,19,32,.88)",
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      {(["PYG", "USD"] as Currency[]).map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          className="relative px-5 py-2 text-[13px] font-semibold rounded-lg
            transition-colors duration-200 whitespace-nowrap"
          style={{ color: currency === c ? "white" : "rgba(255,255,255,.38)" }}
        >
          {currency === c && (
            <motion.div
              layoutId="currency-pill"
              className="absolute inset-0 rounded-lg"
              style={{
                background:
                  "linear-gradient(130deg, rgba(47,125,246,.24) 0%, rgba(25,85,216,.2) 100%)",
                border: "1px solid rgba(47,125,246,.4)",
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
          <span className="relative z-10 inline-flex items-center gap-1.5">
            <span className="text-[14px] leading-none">{c === "PYG" ? "🇵🇾" : "🇺🇸"}</span>
            {c === "PYG" ? "Guaraníes" : "USD"}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Price display
═══════════════════════════════════════════════════════════════════ */
function PriceDisplay({ price, featured }: { price: string; featured: boolean }) {
  const hasDesde = price.startsWith("Desde ");
  const numPart  = hasDesde ? price.slice(6) : price;

  return (
    <div className="mb-1 pt-1">
      <div className="min-h-[2.8rem] flex flex-col justify-center">
        {hasDesde && (
          <span
            className="block text-[10.5px] font-semibold tracking-[.2em] uppercase mb-0.5"
            style={{ color: featured ? "rgba(47,125,246,.75)" : "rgba(255,255,255,.28)" }}
          >
            Desde
          </span>
        )}
        <AnimatePresence mode="wait">
          <motion.span
            key={price}
            className={`block font-black leading-none ${
              featured ? "gradient-text text-[2.15rem]" : "text-white text-[2rem]"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {numPart}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Featured card (Profesional)
═══════════════════════════════════════════════════════════════════ */
function FeaturedCard({
  plan,
  currency,
}: {
  plan: (typeof PLANS)[number];
  currency: Currency;
}) {
  const price = plan.prices[currency];

  return (
    <div className="relative">
      {plan.badge && (
        <div
          className="absolute -top-[14px] left-1/2 -translate-x-1/2 z-10
            px-4 py-[5px] rounded-full text-[10.5px] font-bold tracking-[.18em] uppercase
            whitespace-nowrap text-white shadow-[0_4px_16px_rgba(25,85,216,.3)]"
          style={{ background: "linear-gradient(130deg, #2F7DF6 0%, #1955D8 100%)" }}
        >
          {plan.badge}
        </div>
      )}

      <motion.div
        className="relative rounded-2xl overflow-hidden flex flex-col px-8 pt-11 pb-9 border"
        style={{
          background: "linear-gradient(155deg, #0e1c30 0%, #0a1220 60%, #080e1a 100%)",
          borderColor: "rgba(47,125,246,.35)",
          boxShadow: "0 16px 50px rgba(0,0,0,.35)",
        }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, #2F7DF6, #1955D8)" }}
        />

        <span
          className="text-[10.5px] font-semibold tracking-[.22em] uppercase mb-2"
          style={{ color: "rgba(47,125,246,.85)" }}
        >
          {plan.name}
        </span>

        <PriceDisplay price={price} featured />

        <p className="text-white/60 text-[13px] font-medium leading-snug mb-6">
          {plan.title}
        </p>

        <div
          className="h-px mb-6"
          style={{ background: "linear-gradient(90deg, transparent, rgba(47,125,246,.28), transparent)" }}
        />

        <ul className="flex flex-col gap-3 mb-8 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <CheckIcon />
              <span className="text-[13.5px] text-white/80">{f}</span>
            </li>
          ))}
        </ul>

        <motion.a
          href={WA_PRICING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex items-center justify-center gap-2.5
            text-white font-semibold text-[14px] px-6 py-[13px] rounded-xl"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          Solicitar Presupuesto
          <ArrowRight />
        </motion.a>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Standard card (Básico)
═══════════════════════════════════════════════════════════════════ */
function StandardCard({
  plan,
  currency,
}: {
  plan: (typeof PLANS)[number];
  currency: Currency;
}) {
  const price = plan.prices[currency];

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden flex flex-col px-7 py-9 h-full"
      style={{
        background: "rgba(11,19,32,.65)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "rgba(255,255,255,.07)",
      }}
      whileHover={{
        y: -4,
        borderColor: "rgba(47,125,246,.3)",
        transition: { duration: 0.25, ease: "easeOut" },
      }}
    >
      <span className="text-[10.5px] font-semibold tracking-[.22em] uppercase text-white/30 mb-2">
        {plan.name}
      </span>

      <PriceDisplay price={price} featured={false} />

      <p className="text-white/42 text-[13px] font-medium leading-snug mb-6">
        {plan.title}
      </p>

      <div className="h-px mb-6" style={{ background: "rgba(255,255,255,.06)" }} />

      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5">
            <CheckIcon />
            <span className="text-[13.5px] text-white/58">{f}</span>
          </li>
        ))}
      </ul>

      <motion.a
        href={WA_PRICING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-ghost flex items-center justify-center gap-2.5
          text-white font-semibold text-[14px] px-6 py-[13px] rounded-xl"
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.97 }}
      >
        Solicitar Presupuesto
        <ArrowRight />
      </motion.a>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Section
═══════════════════════════════════════════════════════════════════ */
export default function PricingSection() {
  const [currency, setCurrency] = useState<Currency>("PYG");

  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef  = useRef<HTMLDivElement>(null);
  const noteRef   = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px 0px" });
  const cardsInView  = useInView(cardsRef,  { once: true, margin: "-60px 0px" });
  const noteInView   = useInView(noteRef,   { once: true, margin: "-60px 0px" });

  return (
    <section
      id="planes"
      className="relative py-28 overflow-hidden"
      style={{
        background: [
          "radial-gradient(ellipse 62% 55% at 12% 48%, rgba(47,125,246,.07) 0%, transparent 58%)",
          "radial-gradient(ellipse 55% 52% at 92% 30%, rgba(25,85,216,.07) 0%, transparent 55%)",
          "#050B14",
        ].join(", "),
      }}
    >
      <div className="noise" />

      <div className="absolute inset-x-0 top-0 h-px
        bg-gradient-to-r from-transparent via-white/[.07] to-transparent" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          variants={stagger}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="text-center mb-10"
        >
          <motion.span variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6
              border border-brand-blue/25 bg-brand-blue/[.06]
              text-brand-blue text-[11px] font-semibold tracking-[.18em] uppercase"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-brand-blue" />
            Planes
          </motion.span>

          <motion.h2 variants={fadeUp}
            className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.07] text-white mb-4"
          >
            Elegí el plan ideal para{" "}
            <span className="gradient-text">tu proyecto</span>
          </motion.h2>

          <motion.p variants={fadeUp}
            className="text-white/50 text-[1.05rem] max-w-lg mx-auto leading-relaxed mb-8"
          >
            Precios claros en guaraníes o dólares, sin letra chica.
          </motion.p>

          <motion.div variants={fadeUp} className="flex justify-center">
            <CurrencyToggle currency={currency} setCurrency={setCurrency} />
          </motion.div>
        </motion.div>

        {/* ── Cards grid ── */}
        <motion.div
          ref={cardsRef}
          variants={stagger}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:items-end pt-8"
        >
          {PLANS.map((plan) => (
            <motion.div key={plan.id} variants={fadeUp} className="h-full">
              {plan.featured ? (
                <FeaturedCard plan={plan} currency={currency} />
              ) : (
                <StandardCard plan={plan} currency={currency} />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* ── Note + CTA ── */}
        <motion.div
          ref={noteRef}
          initial={{ opacity: 0, y: 20 }}
          animate={noteInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 text-center"
        >
          <div
            className="h-px mb-8 max-w-xs mx-auto"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,.09), transparent)" }}
          />

          <p className="text-white/45 text-[13.5px] leading-relaxed max-w-xl mx-auto mb-8">
            {NOTE}
          </p>

          <motion.a
            href={WA_PRICING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2.5
              text-white font-semibold text-[14px] px-7 py-[12px] rounded-xl"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Solicitar Cotización
            <ArrowRight />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
