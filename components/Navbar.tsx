"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SomappLogo from "./SomappLogo";
import { WA_URL } from "@/lib/whatsapp";

const LINKS = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso",   href: "#proceso"   },
  { label: "Planes",    href: "#planes"    },
  { label: "Contacto",  href: "#contacto"  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open
          ? "bg-paper/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(15,27,45,.10)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-site px-6 lg:px-8 h-[72px] flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2.5 text-ink" aria-label="Somapp — inicio">
          <SomappLogo size={30} />
          <span className="font-semibold tracking-[.22em] text-[13px]">SOMAPP</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[14px] text-ink-2 hover:text-ink transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ink h-[42px] px-5 text-[14px]">
            Hablemos
          </a>
        </div>

        <button
          className="md:hidden relative w-10 h-10 -mr-2 flex items-center justify-center text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <span
            className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-[4px]"
            }`}
          />
          <span
            className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-[4px]"
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden border-t border-line bg-paper"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="px-6 py-4 flex flex-col">
              {LINKS.map((l) => (
                <li key={l.href} className="border-b border-line last:border-0">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-[17px] text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-4 pb-2">
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ink w-full">
                  Hablemos por WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
