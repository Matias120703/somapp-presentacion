"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SomappLogo from "./SomappLogo";
import { WA_URL } from "@/lib/whatsapp";

const NAV_LINKS = [
  { label: "Inicio",     href: "#inicio"     },
  { label: "Planes",     href: "#planes"     },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Proceso",    href: "#proceso"    },
  { label: "Contacto",   href: "#contacto"   },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [active,      setActive]      = useState("Inicio");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Bar */}
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "glass border-b border-white/[0.06] shadow-[0_2px_40px_rgba(0,0,0,.5)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-[68px] flex items-center justify-between gap-8">

          {/* ── Logo ── */}
          <motion.a
            href="#inicio"
            className="flex items-center gap-2.5 group flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <SomappLogo size={33} glow />
            <span className="text-[17px] font-bold tracking-[.22em] text-white select-none">
              SOMAPP
            </span>
          </motion.a>

          {/* ── Desktop links ── */}
          <ul className="hidden lg:flex items-center">
            {NAV_LINKS.map((link, i) => (
              <motion.li key={link.label}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.055, duration: 0.45 }}
              >
                <NavLink
                  href={link.href}
                  label={link.label}
                  active={active === link.label}
                  onClick={() => setActive(link.label)}
                />
              </motion.li>
            ))}
          </ul>

          {/* ── Right area ── */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* CTA */}
            <motion.a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex btn-primary text-white text-sm font-semibold px-5 py-[10px] rounded-xl items-center gap-2 tracking-wide"
              initial={{ opacity: 0, scale: .9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: .85, duration: .45 }}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: .97 }}
            >
              Solicitar Presupuesto
              <ArrowRight />
            </motion.a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-lg border border-white/10 hover:border-brand-blue/35 transition-colors duration-200"
            >
              <Hamburger open={mobileOpen} />
            </button>
          </div>
        </nav>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden glass border-b border-white/[0.06]"
          >
            <ul className="px-5 py-3 space-y-0.5">
              {NAV_LINKS.map((link, i) => (
                <motion.li key={link.label}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={() => { setActive(link.label); setMobileOpen(false); }}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active === link.label
                        ? "text-brand-blue bg-brand-blue/10"
                        : "text-white/65 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-2 pb-1">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary block text-center text-white text-sm font-semibold px-5 py-3 rounded-xl"
                >
                  Solicitar Presupuesto
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────── */

function NavLink({ href, label, active, onClick }: {
  href: string; label: string; active: boolean; onClick: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`relative px-3.5 py-2 text-[13.5px] font-medium rounded-lg transition-colors duration-200 group ${
        active ? "text-brand-blue" : "text-white/60 hover:text-white"
      }`}
    >
      {label}
      {/* Active / hover underline dot */}
      <span className={`absolute bottom-[5px] left-1/2 -translate-x-1/2 rounded-full bg-brand-blue
        transition-all duration-300 ${
          active
            ? "w-[18px] h-[2px] opacity-100"
            : "w-0 h-[2px] opacity-0 group-hover:w-[14px] group-hover:opacity-50"
        }`}
      />
    </a>
  );
}

function ArrowRight() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
        d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <>
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        className="w-[18px] h-px bg-white rounded block"
      />
      <motion.span
        animate={open ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
        className="w-[18px] h-px bg-white rounded block"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        className="w-[18px] h-px bg-white rounded block"
      />
    </>
  );
}
