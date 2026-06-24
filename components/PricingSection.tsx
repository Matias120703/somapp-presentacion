"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const WA_PRICING_URL =
  "https://wa.me/595981698777?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20los%20planes%20web%20de%20Somapp.";

type Mode = "unico" | "mensual";
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
      PYG: {
        unico: { current: "Gs. 1.000.000", original: "Gs. 1.500.000" },
        mensual: { current: "Gs. 180.000/mes", original: "Gs. 270.000/mes" },
      },
      USD: {
        unico: { current: "USD 160", original: "USD 240" },
        mensual: { current: "USD 29.25/mes", original: "USD 43.88/mes" },
      },
    },
    features: [
      "Diseño premium",
      "Responsive",
      "WhatsApp integrado",
      "Formulario de contacto",
      "Hosting por 12 meses",
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
      PYG: {
        unico: { current: "Gs. 2.300.000", original: "Gs. 3.450.000" },
        mensual: { current: "Gs. 250.000/mes", original: "Gs. 375.000/mes" },
      },
      USD: {
        unico: { current: "USD 376.69", original: "USD 565.04" },
        mensual: { current: "USD 40.94/mes", original: "USD 61.41/mes" },
      },
    },
    features: [
      "Plan Basico Completo",
      "Panel de Administración",
      "Gestión de contenido",
      "Gestión de productos",
      "Dashboard profesional",
      "Base de datos",
      "Usuarios y permisos",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    featured: false,
    badge: null as string | null,
    title: "Sistema Empresarial Personalizado",
    prices: {
      PYG: {
        unico: { current: "Desde Gs. 4.500.000", original: "Gs. 6.750.000" },
        mensual: { current: "Gs. 450.000/mes", original: "Gs. 675.000/mes" },
      },
      USD: {
        unico: { current: "Desde USD 737", original: "USD 1105.50" },
        mensual: { current: "USD 73.70/mes", original: "USD 110.55/mes" },
      },
    },
    features: [
      "Plan Profesional Completo",
      "Sistema a medida",
      "Control de stock",
      "Ventas",
      "Compras",
      "Clientes",
      "Reportes",
      "Caja",
      "Automatizaciones",
    ],
  },
];

const NOTES: Record<Mode, string> = {
  unico:
    "Los planes de pago único incluyen 12 meses de hosting y soporte. Luego de ese período el cliente puede renovar el servicio de mantenimiento.",
  mensual:
    "Los planes mensuales incluyen desarrollo, hosting, mantenimiento, soporte y actualizaciones.",
};

const DISCLAIMER =
  "Los precios publicados corresponden a planes base. El costo final puede variar según las funcionalidades y requerimientos específicos de cada proyecto.";

const DOMAIN_DISCLAIMER =
  "Los precios publicados no incluyen la compra del dominio. El dominio personalizado (ejemplo: empresa.com, empresa.com.py, empresa.dev) se adquiere por separado y su costo depende de la disponibilidad y extensión elegida.";

const DOMAIN_EXAMPLES = ["mipagina.com", "miempresa.com.py", "misistema.dev"];

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
      <circle cx="10" cy="10" r="9" stroke="rgba(0,191,255,.35)" strokeWidth="1.3" />
      <path d="M6.5 10l2.5 2.5 4.5-5"
        stroke="#00BFFF" strokeWidth="1.9"
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
   Toggle
═══════════════════════════════════════════════════════════════════ */
function PricingToggle({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <div
      className="inline-flex items-center rounded-xl p-1"
      style={{
        background: "rgba(11,19,32,.88)",
        border: "1px solid rgba(255,255,255,.08)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {(["unico", "mensual"] as Mode[]).map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className="relative px-6 py-2.5 text-[13.5px] font-semibold rounded-lg
            transition-colors duration-200 whitespace-nowrap"
          style={{ color: mode === m ? "white" : "rgba(255,255,255,.38)" }}
        >
          {mode === m && (
            <motion.div
              layoutId="pricing-pill"
              className="absolute inset-0 rounded-lg"
              style={{
                background:
                  "linear-gradient(130deg, rgba(0,191,255,.22) 0%, rgba(0,123,255,.18) 100%)",
                border: "1px solid rgba(0,191,255,.38)",
                boxShadow: "0 0 16px rgba(0,191,255,.14)",
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
          <span className="relative z-10">
            {m === "unico" ? "Pago Único" : "Pago Mensual"}
          </span>
        </button>
      ))}
    </div>
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
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
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
                  "linear-gradient(130deg, rgba(0,191,255,.22) 0%, rgba(0,123,255,.18) 100%)",
                border: "1px solid rgba(0,191,255,.38)",
                boxShadow: "0 0 16px rgba(0,191,255,.14)",
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
   Animated price display — original crossed out + current prominent
═══════════════════════════════════════════════════════════════════ */
function PriceDisplay({
  price,
  originalPrice,
  featured,
}: {
  price: string;
  originalPrice: string;
  featured: boolean;
}) {
  const hasDesde = price.startsWith("Desde ");
  const numPart  = hasDesde ? price.slice(6) : price;

  return (
    <div className="mb-1">
      {/* Original price — crossed out, animates on mode switch */}
      <AnimatePresence mode="wait">
        <motion.span
          key={originalPrice}
          className={`block text-[13.5px] font-medium line-through leading-none mb-2 ${
            featured ? "text-brand-blue/40" : "text-white/32"
          }`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {originalPrice}
        </motion.span>
      </AnimatePresence>

      {/* Current price */}
      <div className="min-h-[2.8rem] flex flex-col justify-center">
        {hasDesde && (
          <span
            className="block text-[10.5px] font-semibold tracking-[.2em] uppercase mb-0.5"
            style={{ color: featured ? "rgba(0,191,255,.65)" : "rgba(255,255,255,.28)" }}
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
  mode,
  currency,
}: {
  plan: (typeof PLANS)[number];
  mode: Mode;
  currency: Currency;
}) {
  const { current: price, original: originalPrice } = plan.prices[currency][mode];

  return (
    <div className="relative">
      {plan.badge && (
        <div
          className="absolute -top-[14px] left-1/2 -translate-x-1/2 z-10
            px-4 py-[5px] rounded-full text-[10.5px] font-bold tracking-[.18em] uppercase
            whitespace-nowrap text-white shadow-[0_4px_20px_rgba(0,191,255,.35)]"
          style={{ background: "linear-gradient(130deg, #00BFFF 0%, #0070f3 100%)" }}
        >
          {plan.badge}
        </div>
      )}

      {/* Ambient glow behind card */}
      <div
        className="absolute -inset-6 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,191,255,.16) 0%, rgba(0,123,255,.08) 45%, transparent 70%)",
        }}
      />

      {/* Gradient border wrapper */}
      <motion.div
        className="relative rounded-2xl p-px"
        style={{
          background:
            "linear-gradient(140deg, #00BFFF 0%, #007BFF 50%, rgba(0,191,255,.6) 100%)",
        }}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Inner card */}
        <motion.div
          className="relative rounded-2xl overflow-hidden flex flex-col px-8 pt-11 pb-9"
          style={{
            background: "linear-gradient(155deg, #0e1f38 0%, #080f20 60%, #060d1a 100%)",
          }}
          whileHover={{
            boxShadow:
              "0 28px 90px rgba(0,191,255,.18), 0 0 180px rgba(0,123,255,.1)",
          }}
          initial={{
            boxShadow:
              "0 16px 60px rgba(0,191,255,.1), 0 0 120px rgba(0,123,255,.07)",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Top shimmer */}
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,191,255,.65), transparent)",
            }}
          />

          {/* Ambient pulse */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 110%, rgba(0,191,255,.07) 0%, transparent 65%)",
            }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <span
            className="text-[10.5px] font-semibold tracking-[.22em] uppercase mb-2"
            style={{ color: "rgba(0,191,255,.75)" }}
          >
            {plan.name}
          </span>

          <PriceDisplay price={price} originalPrice={originalPrice} featured />

          <p className="text-white/60 text-[13px] font-medium leading-snug mb-6">
            {plan.title}
          </p>

          <div
            className="h-px mb-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,191,255,.28), transparent)",
            }}
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
              text-white font-semibold text-[14px] px-6 py-[13px] rounded-xl
              shadow-[0_8px_32px_rgba(0,191,255,.22)]"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Solicitar Presupuesto
            <ArrowRight />
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Standard card (Básico / Premium)
═══════════════════════════════════════════════════════════════════ */
function StandardCard({
  plan,
  mode,
  currency,
}: {
  plan: (typeof PLANS)[number];
  mode: Mode;
  currency: Currency;
}) {
  const { current: price, original: originalPrice } = plan.prices[currency][mode];

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden flex flex-col px-7 py-9 h-full"
      style={{
        background: "rgba(11,19,32,.65)",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "rgba(255,255,255,.07)",
      }}
      whileHover={{
        y: -6,
        borderColor: "rgba(0,191,255,.28)",
        boxShadow:
          "0 24px 70px rgba(0,191,255,.09), 0 0 0 1px rgba(0,191,255,.18)",
        transition: { duration: 0.25, ease: "easeOut" },
      }}
    >
      {/* Top shimmer on hover */}
      <motion.div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,191,255,.45), transparent)",
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />

      <span className="text-[10.5px] font-semibold tracking-[.22em] uppercase text-white/30 mb-2">
        {plan.name}
      </span>

      <PriceDisplay price={price} originalPrice={originalPrice} featured={false} />

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
  const [mode, setMode] = useState<Mode>("unico");
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
          "radial-gradient(ellipse 62% 55% at 12% 48%, rgba(0,191,255,.07) 0%, transparent 58%)",
          "radial-gradient(ellipse 55% 52% at 92% 30%, rgba(0,123,255,.07) 0%, transparent 55%)",
          "#050B14",
        ].join(", "),
      }}
    >
      <div className="noise" />

      {/* Section top border */}
      <div className="absolute inset-x-0 top-0 h-px
        bg-gradient-to-r from-transparent via-white/[.07] to-transparent" />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[.018] overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="price-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00BFFF" strokeWidth=".5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#price-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

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
            className="text-white/50 text-[1.05rem] max-w-lg mx-auto leading-relaxed mb-6"
          >
            Soluciones adaptadas a cada etapa de crecimiento.
          </motion.p>

          {/* Promo badge */}
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                text-[10.5px] font-bold tracking-[.16em] uppercase"
              style={{
                background: "linear-gradient(130deg, rgba(0,191,255,.1) 0%, rgba(0,123,255,.08) 100%)",
                border: "1px solid rgba(0,191,255,.3)",
                color: "#00BFFF",
                boxShadow: "0 0 18px rgba(0,191,255,.08)",
              }}
            >
              <motion.span
                className="w-[5px] h-[5px] rounded-full bg-brand-blue flex-shrink-0"
                animate={{ opacity: [1, .25, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              Promoción de Lanzamiento
            </span>
          </motion.div>

          {/* Payment mode toggle */}
          <motion.div variants={fadeUp} className="flex justify-center mb-3">
            <PricingToggle mode={mode} setMode={setMode} />
          </motion.div>

          {/* Currency toggle */}
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:items-end pt-8"
        >
          {PLANS.map((plan) => (
            <motion.div key={plan.id} variants={fadeUp} className="h-full">
              {plan.featured ? (
                <FeaturedCard plan={plan} mode={mode} currency={currency} />
              ) : (
                <StandardCard plan={plan} mode={mode} currency={currency} />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* ── Notes + disclaimer + CTA ── */}
        <motion.div
          ref={noteRef}
          initial={{ opacity: 0, y: 20 }}
          animate={noteInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 text-center"
        >
          {/* Divider */}
          <div
            className="h-px mb-10 max-w-xs mx-auto"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,.09), transparent)",
            }}
          />

          {/* Mode-specific note — animates on toggle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={mode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="text-white/52 text-[14px] leading-relaxed max-w-2xl mx-auto mb-4"
            >
              {NOTES[mode]}
            </motion.p>
          </AnimatePresence>

          {/* Disclaimer */}
          <p className="text-white/28 text-[12.5px] leading-relaxed max-w-2xl mx-auto mb-5">
            {DISCLAIMER}
          </p>

          {/* Domain disclaimer */}
          <div className="max-w-2xl mx-auto mb-8 flex flex-col items-center gap-2">
            <div className="flex items-start sm:items-center gap-2 text-left sm:text-center">
              <span className="text-[13px] leading-none mt-px sm:mt-0 opacity-60 flex-shrink-0">🌐</span>
              <p className="text-white/26 text-[11.5px] leading-relaxed">
                {DOMAIN_DISCLAIMER}
              </p>
            </div>

            <p className="text-white/18 text-[11px] leading-relaxed flex flex-wrap justify-center gap-x-1.5">
              <span>Ejemplos de dominios:</span>
              {DOMAIN_EXAMPLES.map((d, i) => (
                <span key={d} className="text-white/30">
                  {d}{i < DOMAIN_EXAMPLES.length - 1 && " ·"}
                </span>
              ))}
            </p>

            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                text-[10px] font-medium text-white/35 mt-1"
              style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              🌐 Dominio personalizado no incluido en los planes
            </span>
          </div>

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
