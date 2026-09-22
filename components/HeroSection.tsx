"use client";

import { motion } from "framer-motion";
import { FortalezaMockup } from "./ProjectMockups";
import { WA_URL } from "@/lib/whatsapp";

const FACTS = [
  "+50 proyectos entregados",
  "Atención directa por WhatsApp",
  "Hosting y soporte incluidos",
  "Precios en Gs. y USD",
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  return (
    <section id="inicio" className="relative pt-[72px]">
      <div className="mx-auto max-w-site px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end pt-16 sm:pt-24 pb-14 sm:pb-20">

          {/* ── Copy ── */}
          <div className="lg:col-span-7">
            <motion.p
              className="eyebrow mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              Estudio de desarrollo web y sistemas · Paraguay
            </motion.p>

            <motion.h1
              className="font-display font-medium text-ink text-[2.7rem] leading-[1.04] sm:text-[3.6rem] lg:text-[4.2rem]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease }}
            >
              Sitios web y sistemas que trabajan para tu negocio.
            </motion.h1>

            <motion.p
              className="mt-7 max-w-[540px] text-[17px] sm:text-[18px] leading-relaxed text-ink-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease }}
            >
              Diseñamos y desarrollamos páginas web, tiendas online y sistemas de
              gestión a medida. Vos nos contás qué necesita tu negocio; nosotros lo
              construimos, lo publicamos y lo mantenemos funcionando.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease }}
            >
              <a href="#planes" className="btn btn-ink">
                Ver planes y precios
              </a>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Hablar por WhatsApp
              </a>
            </motion.div>
          </div>

          {/* ── Latest project ── */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease }}
          >
            <a
              href="https://sistema-fortaleza.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="rounded-xl border border-line bg-white overflow-hidden shadow-[0_18px_50px_-24px_rgba(15,27,45,.35)] transition-transform duration-500 ease-out group-hover:-translate-y-1">
                <div className="flex items-center gap-1.5 px-3 h-8 border-b border-line bg-paper-2/60">
                  <span className="w-2 h-2 rounded-full bg-ink/15" />
                  <span className="w-2 h-2 rounded-full bg-ink/15" />
                  <span className="w-2 h-2 rounded-full bg-ink/15" />
                  <span className="ml-3 h-4 flex-1 max-w-[180px] rounded-full bg-ink/[.06]" />
                </div>
                <div className="relative aspect-[16/10]">
                  <FortalezaMockup />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <div>
                  <p className="eyebrow mb-1">Último lanzamiento</p>
                  <p className="text-[15px] text-ink font-medium">
                    Sistema Fortaleza — reservas online de cancha y quincho
                  </p>
                </div>
                <span className="text-[13px] text-ink-2 group-hover:text-ink transition-colors whitespace-nowrap">
                  Ver sitio ↗
                </span>
              </div>
            </a>
          </motion.div>
        </div>

        {/* ── Facts ── */}
        <motion.ul
          className="grid grid-cols-2 lg:grid-cols-4 border-t border-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {FACTS.map((f, i) => (
            <li
              key={f}
              className={[
                "py-5 text-[14px] text-ink-2",
                i % 2 === 1 ? "pl-5 border-l border-line" : "pr-5",
                i >= 2 ? "border-t border-line lg:border-t-0" : "",
                i === 2 ? "lg:pl-5 lg:border-l" : "",
                i === 3 ? "lg:pl-5" : "",
              ].join(" ")}
            >
              {f}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
