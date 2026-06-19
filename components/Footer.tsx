"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SomappLogo from "./SomappLogo";
import { WA_URL } from "@/lib/whatsapp";

/* ═══════════════════════════════════════════════════════════════════
   Data
═══════════════════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { label: "Inicio",     href: "#inicio"     },
  { label: "Planes",     href: "#planes"     },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Proceso",    href: "#proceso"    },
  { label: "Contacto",   href: "#contacto"   },
];

const SOLUTIONS = [
  { label: "Landing Page",          href: "#planes" },
  { label: "Página Web",            href: "#planes" },
  { label: "E-commerce",            href: "#planes" },
  { label: "Sistema Empresarial",   href: "#planes" },
];

/* ═══════════════════════════════════════════════════════════════════
   Variants
═══════════════════════════════════════════════════════════════════ */
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ═══════════════════════════════════════════════════════════════════
   Sub-components
═══════════════════════════════════════════════════════════════════ */
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h4 className="text-[11.5px] font-bold tracking-[.22em] uppercase text-white/55 mb-3">
        {children}
      </h4>
      <div
        className="h-[1.5px] w-7 rounded-full"
        style={{ background: "linear-gradient(90deg, #00BFFF 0%, transparent 100%)" }}
      />
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      className="flex items-center gap-2 text-[13.5px] text-white/40 hover:text-white/75
        transition-colors duration-200 group w-fit"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <span className="w-[3px] h-[3px] rounded-full bg-brand-blue flex-shrink-0
        opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      {children}
    </motion.a>
  );
}

function SocialBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40"
      style={{
        background: "rgba(255,255,255,.045)",
        border: "1px solid rgba(255,255,255,.08)",
      }}
      whileHover={{
        scale: 1.14,
        y: -3,
        color: "#00BFFF",
        borderColor: "rgba(0,191,255,.5)",
        boxShadow: "0 0 18px rgba(0,191,255,.3), 0 4px 20px rgba(0,191,255,.1)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.93 }}
    >
      {children}
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Social SVG icons
═══════════════════════════════════════════════════════════════════ */
function IconWhatsApp() {
  return (
    <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.85} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Small contact icon cards
═══════════════════════════════════════════════════════════════════ */
function ContactRow({
  icon,
  label,
  value,
  href,
  iconBg,
  iconBorder,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  iconBg: string;
  iconBorder: string;
}) {
  const inner = (
    <div className="flex items-start gap-3 group">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: iconBg, border: `1px solid ${iconBorder}` }}
      >
        {icon}
      </div>
      <div>
        <div className="text-[10.5px] font-semibold tracking-[.14em] uppercase text-white/28 mb-[3px]">
          {label}
        </div>
        <div className="text-[13.5px] text-white/50 group-hover:text-white/75 transition-colors duration-200">
          {value}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ x: 2 }}
        transition={{ duration: 0.16 }}
      >
        {inner}
      </motion.a>
    );
  }
  return <div>{inner}</div>;
}

/* ═══════════════════════════════════════════════════════════════════
   Footer
═══════════════════════════════════════════════════════════════════ */
export default function Footer() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: [
          "radial-gradient(ellipse 70% 60% at 12% 20%, rgba(0,191,255,.05) 0%, transparent 55%)",
          "radial-gradient(ellipse 55% 55% at 90% 75%, rgba(0,123,255,.05) 0%, transparent 55%)",
          "#030810",
        ].join(", "),
      }}
    >
      <div className="noise" />

      {/* Top border line */}
      <div className="absolute inset-x-0 top-0 h-px
        bg-gradient-to-r from-transparent via-white/[.08] to-transparent" />

      {/* Top cyan glow accent */}
      <div
        className="absolute inset-x-0 top-0 h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(0,191,255,.5) 35%, rgba(0,123,255,.45) 65%, transparent 95%)",
          filter: "blur(4px)",
        }}
      />

      {/* Main content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10"
      >
        {/* ── 4-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 xl:gap-10 mb-14">

          {/* ── Col 1 — Brand ── */}
          <motion.div variants={fadeUp} className="sm:col-span-2 lg:col-span-1">

            {/* Logo + wordmark */}
            <a href="#inicio" className="inline-flex items-center gap-3 mb-5 group">
              <SomappLogo size={36} glow />
              <div>
                <div className="text-[17px] font-black text-white tracking-[.2em] leading-none">
                  SOMAPP
                </div>
                <div className="text-[10px] font-semibold tracking-[.22em] uppercase text-white/30 mt-1">
                  Soluciones Digitales
                </div>
              </div>
            </a>

            {/* Description */}
            <p className="text-[13.5px] text-white/40 leading-relaxed mb-7 max-w-[270px]">
              Desarrollamos soluciones digitales para ayudar a emprendedores, comercios y empresas
              a crecer mediante tecnología moderna.
            </p>

            {/* Social row */}
            <div className="flex items-center gap-2.5">
              <SocialBtn href="https://wa.me/595981698777" label="WhatsApp">
                <IconWhatsApp />
              </SocialBtn>
              <SocialBtn href="https://www.instagram.com/matt_clipps/reels/" label="Instagram">
                <IconInstagram />
              </SocialBtn>
              <SocialBtn href="https://www.facebook.com/profile.php?id=61558303434109&locale=es_LA" label="Facebook">
                <IconFacebook />
              </SocialBtn>
              <SocialBtn href="https://www.tiktok.com/@somapp043" label="TikTok">
                <IconTikTok />
              </SocialBtn>
            </div>
          </motion.div>

          {/* ── Col 2 — Navegación ── */}
          <motion.div variants={fadeUp}>
            <ColHeading>Navegación</ColHeading>
            <ul className="flex flex-col gap-[11px]">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 3 — Soluciones ── */}
          <motion.div variants={fadeUp}>
            <ColHeading>Soluciones</ColHeading>
            <ul className="flex flex-col gap-[11px]">
              {SOLUTIONS.map((s) => (
                <li key={s.label}>
                  <FooterLink href={s.href}>{s.label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 4 — Contacto ── */}
          <motion.div variants={fadeUp}>
            <ColHeading>Contacto</ColHeading>
            <div className="flex flex-col gap-5">
              <ContactRow
                href={WA_URL}
                label="WhatsApp"
                value="+595 981 698 777"
                iconBg="rgba(37,211,102,.09)"
                iconBorder="rgba(37,211,102,.22)"
                icon={
                  <svg className="w-[14px] h-[14px] text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                }
              />
              <ContactRow
                label="Ubicación"
                value="Paraguay"
                iconBg="rgba(0,191,255,.07)"
                iconBorder="rgba(0,191,255,.18)"
                icon={
                  <svg className="w-[14px] h-[14px] text-brand-blue" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
              />
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <motion.div
          variants={fadeUp}
          className="h-px mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,.07) 25%, rgba(255,255,255,.07) 75%, transparent)",
          }}
        />

        {/* ── Bottom bar ── */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-[12.5px] text-white/28 text-center sm:text-left">
            © 2026 SOMAPP. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-[12.5px] text-white/28 hover:text-white/58
                transition-colors duration-200 whitespace-nowrap"
            >
              Política de Privacidad
            </a>
            <span className="w-px h-3 rounded-full bg-white/15 flex-shrink-0" />
            <a
              href="#"
              className="text-[12.5px] text-white/28 hover:text-white/58
                transition-colors duration-200 whitespace-nowrap"
            >
              Términos y Condiciones
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
