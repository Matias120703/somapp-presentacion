"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./ui/Reveal";

const WA_PRICING_URL =
  "https://wa.me/595981698777?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20los%20planes%20web%20de%20Somapp.";

type Currency = "PYG" | "USD";

const PLANS = [
  {
    id: "basico",
    name: "Básico",
    featured: false,
    title: "Landing page profesional",
    lead: "Para presentar tu negocio y empezar a recibir consultas.",
    priceLabel: "",
    prices: { PYG: "Gs. 1.150.000", USD: "USD 225" },
    monthly: { PYG: "Gs. 150.000 a 200.000", USD: "USD 26 a 35" },
    features: [
      "Diseño a medida y responsive",
      "WhatsApp integrado",
      "Formulario de contacto",
      "SEO básico",
    ],
  },
  {
    id: "profesional",
    name: "Profesional",
    featured: true,
    title: "Sitio web + panel administrativo",
    lead: "Para manejar contenido y productos por tu cuenta.",
    priceLabel: "Precio base",
    prices: { PYG: "Gs. 3.475.000", USD: "USD 635" },
    monthly: { PYG: "Gs. 645.000", USD: "USD 112" },
    features: [
      "Todo lo del plan Básico",
      "Panel de administración",
      "Gestión de contenido y productos",
      "Base de datos y dashboard",
      "Usuarios y permisos",
    ],
  },
];

const PAYMENT_NOTE =
  "Para comenzar se abona el 50% del desarrollo junto con la primera mensualidad.";

const NOTE =
  "El plan Profesional parte de un precio base: el costo final y la mensualidad se ajustan según lo que " +
  "necesite tu proyecto. Los sistemas más complejos, como pagos online o pedidos por QR desde la mesa con " +
  "aviso a cocina, se cotizan aparte según alcance. Dominio no incluido.";

export default function PricingSection() {
  const [currency, setCurrency] = useState<Currency>("PYG");

  return (
    <section id="planes" className="py-20 sm:py-28 border-t border-line">
      <div className="mx-auto max-w-site px-6 lg:px-8">
        <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 sm:mb-14">
          <div className="md:col-span-4">
            <p className="eyebrow">Planes</p>
          </div>
          <div className="md:col-span-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h2 className="font-display font-medium text-ink text-[2.1rem] sm:text-[2.8rem] leading-[1.1] max-w-[560px]">
                Precios claros, desde el primer mensaje.
              </h2>
            </div>
            <CurrencyToggle currency={currency} setCurrency={setCurrency} />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08}>
              <PlanCard plan={plan} currency={currency} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-start-5 md:col-span-8 max-w-[640px] space-y-2">
            <p className="text-[15px] leading-relaxed text-ink">{PAYMENT_NOTE}</p>
            <p className="text-[14px] leading-relaxed text-ink-2">{NOTE}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Plan card ─────────────────────────────────────────────────── */
function PlanCard({ plan, currency }: { plan: (typeof PLANS)[number]; currency: Currency }) {
  const dark = plan.featured;
  const price = plan.prices[currency];
  const monthly = plan.monthly[currency];

  return (
    <div
      className={`h-full rounded-xl border p-7 sm:p-9 flex flex-col ${
        dark ? "bg-ink text-paper border-ink" : "bg-white text-ink border-line"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className={`eyebrow ${dark ? "!text-paper/60" : ""}`}>{plan.name}</span>
        {dark && (
          <span className="text-[11px] tracking-[.14em] uppercase px-2.5 py-1 rounded-full border border-paper/25 text-paper/80">
            Más elegido
          </span>
        )}
      </div>

      <h3 className="mt-5 font-display text-[1.6rem] leading-tight">{plan.title}</h3>
      <p className={`mt-2 text-[15px] leading-relaxed ${dark ? "text-paper/65" : "text-ink-2"}`}>
        {plan.lead}
      </p>

      <div className="mt-7 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        {plan.priceLabel && (
          <span className={`text-[12px] tracking-[.14em] uppercase ${dark ? "text-paper/55" : "text-ink-2"}`}>
            {plan.priceLabel}
          </span>
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={price}
            className="font-display text-[2.4rem] sm:text-[2.7rem] leading-none"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {price}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className={`mt-3 text-[15px] ${dark ? "text-paper/75" : "text-ink-2"}`}>
        + {monthly} por mes
        <span className={dark ? "text-paper/50" : "text-ink-2/70"}> · hosting, soporte y mantenimiento</span>
      </p>

      <div className={`my-7 h-px ${dark ? "bg-paper/15" : "bg-line"}`} />

      <ul className="flex flex-col gap-3 flex-1">
        {plan.features.map((f) => (
          <li key={f} className={`flex gap-3 text-[15px] ${dark ? "text-paper/85" : "text-ink"}`}>
            <svg className="w-4 h-4 mt-[3px] flex-shrink-0" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 10.5l3.2 3L15 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={WA_PRICING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn mt-9 w-full ${dark ? "btn-paper" : "btn-ink"}`}
      >
        Solicitar presupuesto
      </a>
    </div>
  );
}

/* ── Currency toggle ───────────────────────────────────────────── */
function CurrencyToggle({
  currency,
  setCurrency,
}: {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}) {
  return (
    <div className="inline-flex self-start rounded-full border border-line p-1 bg-white" role="group" aria-label="Moneda">
      {(["PYG", "USD"] as Currency[]).map((c) => {
        const active = currency === c;
        return (
          <button
            key={c}
            type="button"
            onClick={() => setCurrency(c)}
            aria-pressed={active}
            className={`relative h-9 px-4 rounded-full text-[13.5px] font-medium transition-colors ${
              active ? "text-paper" : "text-ink-2 hover:text-ink"
            }`}
          >
            {active && (
              <motion.span
                layoutId="currency-pill"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            <span className="relative">{c === "PYG" ? "Guaraníes" : "Dólares"}</span>
          </button>
        );
      })}
    </div>
  );
}
