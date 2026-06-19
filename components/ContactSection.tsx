"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   Constants
═══════════════════════════════════════════════════════════════════ */
const WA_DEFAULT = "https://wa.me/595981698777?text=" +
  encodeURIComponent(
    "Hola, vi la página de Somapp y me gustaría solicitar información sobre sus servicios."
  );
const WA_PRESUPUESTO = "https://wa.me/595981698777?text=" +
  encodeURIComponent(
    "Hola, vi la página de Somapp y me gustaría solicitar un presupuesto."
  );

const PROYECTO_TIPOS = [
  "Página Web",
  "Sistema Empresarial",
  "E-commerce",
  "Aplicación Móvil",
  "Otro",
];

/* ═══════════════════════════════════════════════════════════════════
   Icons
═══════════════════════════════════════════════════════════════════ */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"
      strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
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

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Animation variants
═══════════════════════════════════════════════════════════════════ */
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ═══════════════════════════════════════════════════════════════════
   Form primitives
═══════════════════════════════════════════════════════════════════ */
const inputBase =
  "w-full rounded-xl px-4 py-[11px] text-[14px] text-white placeholder:text-white/25 " +
  "outline-none transition-all duration-200";

function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-[11.5px] font-semibold tracking-[.14em] uppercase text-white/38 mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={inputBase}
        style={{
          background: "rgba(255,255,255,.038)",
          border: `1px solid ${focused ? "rgba(0,191,255,.42)" : "rgba(255,255,255,.08)"}`,
          boxShadow: focused ? "0 0 0 3px rgba(0,191,255,.07)" : "none",
        }}
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-[11.5px] font-semibold tracking-[.14em] uppercase text-white/38 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={inputBase + " appearance-none cursor-pointer"}
        style={{
          background: "#0B1320",
          border: `1px solid ${focused ? "rgba(0,191,255,.42)" : "rgba(255,255,255,.08)"}`,
          boxShadow: focused ? "0 0 0 3px rgba(0,191,255,.07)" : "none",
          color: value ? "white" : "rgba(255,255,255,.25)",
        }}
      >
        <option value="" disabled style={{ background: "#0B1320", color: "rgba(255,255,255,.35)" }}>
          Seleccionar tipo...
        </option>
        {options.map((o) => (
          <option key={o} value={o} style={{ background: "#0B1320", color: "white" }}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-[11.5px] font-semibold tracking-[.14em] uppercase text-white/38 mb-2">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
        className={inputBase + " resize-none"}
        style={{
          background: "rgba(255,255,255,.038)",
          border: `1px solid ${focused ? "rgba(0,191,255,.42)" : "rgba(255,255,255,.08)"}`,
          boxShadow: focused ? "0 0 0 3px rgba(0,191,255,.07)" : "none",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Left column — contact info
═══════════════════════════════════════════════════════════════════ */
function ContactInfo({ inView }: { inView: boolean }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-col"
    >
      {/* Brand block */}
      <motion.div variants={fadeUp} className="flex items-center gap-3.5 mb-6">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(0,191,255,.15) 0%, rgba(0,123,255,.1) 100%)",
            border: "1px solid rgba(0,191,255,.32)",
            boxShadow: "0 0 28px rgba(0,191,255,.14), inset 0 1px 0 rgba(0,191,255,.2)",
          }}
        >
          <span className="text-[18px] font-black gradient-text select-none">S</span>
        </div>
        <div>
          <div className="text-[22px] font-black text-white tracking-tight leading-none">
            SOMAPP
          </div>
          <div className="text-[11px] font-semibold tracking-[.2em] uppercase text-white/35 mt-1">
            Soluciones Digitales
          </div>
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div
        variants={fadeUp}
        className="h-px mb-7"
        style={{ background: "linear-gradient(90deg, rgba(0,191,255,.35), rgba(0,191,255,.05) 70%, transparent)" }}
      />

      {/* Description */}
      <motion.p variants={fadeUp}
        className="text-white/55 text-[15.5px] leading-relaxed mb-9"
      >
        Contanos tu proyecto y te ayudaremos a encontrar la mejor solución.
      </motion.p>

      {/* Contact cards */}
      <motion.div variants={fadeUp} className="flex flex-col gap-4 mb-10">

        {/* WhatsApp */}
        <motion.a
          href={WA_DEFAULT}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-2xl group"
          style={{
            background: "rgba(11,19,32,.65)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            border: "1px solid rgba(255,255,255,.07)",
          }}
          whileHover={{
            borderColor: "rgba(37,211,102,.28)",
            boxShadow: "0 10px 40px rgba(37,211,102,.07)",
            y: -3,
            transition: { duration: 0.22, ease: "easeOut" },
          }}
        >
          {/* Icon container */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(37,211,102,.1)",
              border: "1px solid rgba(37,211,102,.25)",
            }}
          >
            <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[11px] font-semibold tracking-[.14em] uppercase text-white/35">
                WhatsApp
              </span>
              {/* Live indicator */}
              <span className="relative flex h-[7px] w-[7px]">
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-[#25D366]"
                  animate={{ scale: [1, 1.9, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-[#25D366]" />
              </span>
            </div>
            <div className="text-[15px] font-bold text-white">+595 981 698 777</div>
          </div>
          <motion.div
            className="text-white/25 group-hover:text-white/55 transition-colors"
            whileHover={{ x: 2 }}
          >
            <ArrowRight />
          </motion.div>
        </motion.a>

        {/* Location */}
        <motion.div
          className="flex items-center gap-4 p-4 rounded-2xl"
          style={{
            background: "rgba(11,19,32,.65)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            border: "1px solid rgba(255,255,255,.07)",
          }}
          whileHover={{
            borderColor: "rgba(0,191,255,.22)",
            boxShadow: "0 10px 40px rgba(0,191,255,.06)",
            y: -3,
            transition: { duration: 0.22, ease: "easeOut" },
          }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(0,191,255,.08)",
              border: "1px solid rgba(0,191,255,.2)",
            }}
          >
            <LocationIcon className="w-5 h-5 text-brand-blue" />
          </div>
          <div>
            <div className="text-[11px] font-semibold tracking-[.14em] uppercase text-white/35 mb-0.5">
              Ubicación
            </div>
            <div className="text-[15px] font-bold text-white">Paraguay</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative trust note */}
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-3 p-4 rounded-2xl"
        style={{
          background: "rgba(0,191,255,.04)",
          border: "1px solid rgba(0,191,255,.12)",
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(0,191,255,.1)" }}
        >
          <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor"
            viewBox="0 0 24 24" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <p className="text-[13px] text-white/42 leading-snug">
          Tu información es confidencial y se usa{" "}
          <span className="text-white/62">solo para contactarte</span>.
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Right column — contact form
═══════════════════════════════════════════════════════════════════ */
function ContactForm({ inView }: { inView: boolean }) {
  const [nombre,   setNombre]   = useState("");
  const [empresa,  setEmpresa]  = useState("");
  const [email,    setEmail]    = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [tipo,     setTipo]     = useState("");
  const [mensaje,  setMensaje]  = useState("");

  const handleSubmit = () => {
    const parts = [
      "Hola, vi la página de Somapp y me gustaría solicitar un presupuesto.",
      nombre   && `Nombre: ${nombre}`,
      empresa  && `Empresa: ${empresa}`,
      email    && `Email: ${email}`,
      whatsapp && `WhatsApp: ${whatsapp}`,
      tipo     && `Tipo de proyecto: ${tipo}`,
      mensaje  && `Mensaje: ${mensaje}`,
    ].filter(Boolean);
    const url = `https://wa.me/595981698777?text=${encodeURIComponent(parts.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      className="relative rounded-2xl overflow-hidden p-7 sm:p-8"
      style={{
        background: "rgba(11,19,32,.72)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,.07)",
        boxShadow: "0 24px 80px rgba(0,0,0,.25)",
      }}
    >
      {/* Top shimmer */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,191,255,.5), transparent)" }}
      />

      {/* Ambient glow top-right */}
      <div
        className="absolute -top-28 -right-28 w-80 h-80 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,191,255,.055) 0%, transparent 65%)" }}
      />

      {/* Form header */}
      <div className="flex items-center gap-3 mb-7">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(0,191,255,.1)", border: "1px solid rgba(0,191,255,.22)" }}
        >
          <SendIcon className="w-[15px] h-[15px] text-brand-blue" />
        </div>
        <h3 className="text-[17px] font-bold text-white">Envianos tu consulta</h3>
      </div>

      {/* Horizontal divider */}
      <div className="h-px mb-7" style={{ background: "rgba(255,255,255,.06)" }} />

      {/* Fields */}
      <div className="flex flex-col gap-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nombre" placeholder="Tu nombre" value={nombre} onChange={setNombre} />
          <Field label="Empresa" placeholder="Empresa (opcional)" value={empresa} onChange={setEmpresa} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Correo Electrónico" type="email" placeholder="tu@email.com"
            value={email} onChange={setEmail} />
          <Field label="WhatsApp" type="tel" placeholder="+595 981 000 000"
            value={whatsapp} onChange={setWhatsapp} />
        </div>

        <SelectField
          label="Tipo de Proyecto"
          value={tipo}
          onChange={setTipo}
          options={PROYECTO_TIPOS}
        />

        <TextareaField
          label="Mensaje"
          placeholder="Contanos sobre tu proyecto, objetivos y cualquier detalle relevante..."
          value={mensaje}
          onChange={setMensaje}
        />

        {/* Divider */}
        <div className="h-px" style={{ background: "rgba(255,255,255,.05)" }} />

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            onClick={handleSubmit}
            type="button"
            className="btn-primary flex-1 flex items-center justify-center gap-2.5
              text-white font-semibold text-[14px] px-6 py-[13px] rounded-xl
              shadow-[0_8px_32px_rgba(0,191,255,.22)] cursor-pointer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Solicitar Presupuesto
            <SendIcon className="w-3.5 h-3.5" />
          </motion.button>

          <motion.a
            href={WA_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost flex-1 flex items-center justify-center gap-2.5
              text-white font-semibold text-[14px] px-6 py-[13px] rounded-xl"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            Hablar por WhatsApp
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CTA Banner
═══════════════════════════════════════════════════════════════════ */
function CTABanner({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-16 rounded-2xl overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(155deg, #0e1f38 0%, #080f20 60%, #060d1a 100%)",
        }}
      />

      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: "1px solid rgba(0,191,255,.18)" }}
      />

      {/* Top shimmer line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,191,255,.65), transparent)",
        }}
      />

      {/* Ambient glows */}
      <motion.div
        className="absolute -left-24 top-1/2 -translate-y-1/2 w-[420px] h-[420px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,191,255,.08) 0%, transparent 65%)" }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute -right-24 top-1/2 -translate-y-1/2 w-[420px] h-[420px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,123,255,.07) 0%, transparent 65%)" }}
      />

      {/* Content */}
      <div className="relative px-8 sm:px-12 py-12 sm:py-14 flex flex-col lg:flex-row items-center justify-between gap-8">

        {/* Left: text */}
        <div className="text-center lg:text-left max-w-xl">
          <h3 className="text-[1.7rem] sm:text-[2rem] font-black text-white tracking-tight leading-tight mb-3">
            Convertimos ideas en{" "}
            <span className="gradient-text">soluciones digitales</span>.
          </h3>
          <p className="text-white/50 text-[15px] leading-relaxed">
            Desde páginas web hasta sistemas empresariales completos. En Somapp desarrollamos
            tecnología para impulsar negocios.
          </p>
        </div>

        {/* Right: buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 flex-shrink-0">
          <motion.a
            href={WA_PRESUPUESTO}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center justify-center gap-2.5
              text-white font-semibold text-[14px] px-7 py-[13px] rounded-xl
              shadow-[0_8px_32px_rgba(0,191,255,.22)] whitespace-nowrap"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Solicitar Presupuesto
            <ArrowRight />
          </motion.a>

          <motion.a
            href={WA_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost flex items-center justify-center gap-2.5
              text-white font-semibold text-[14px] px-7 py-[13px] rounded-xl whitespace-nowrap"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            Hablar por WhatsApp
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Section
═══════════════════════════════════════════════════════════════════ */
export default function ContactSection() {
  const headerRef  = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bannerRef  = useRef<HTMLDivElement>(null);

  const headerInView  = useInView(headerRef,  { once: true, margin: "-80px 0px" });
  const contentInView = useInView(contentRef, { once: true, margin: "-60px 0px" });
  const bannerInView  = useInView(bannerRef,  { once: true, margin: "-60px 0px" });

  return (
    <section
      id="contacto"
      className="relative py-28 overflow-hidden"
      style={{
        background: [
          "radial-gradient(ellipse 62% 55% at 18% 38%, rgba(0,191,255,.07) 0%, transparent 58%)",
          "radial-gradient(ellipse 55% 52% at 88% 28%, rgba(0,123,255,.07) 0%, transparent 55%)",
          "radial-gradient(ellipse 50% 50% at 50% 95%, rgba(0,191,255,.05) 0%, transparent 55%)",
          "#050B14",
        ].join(", "),
      }}
    >
      <div className="noise" />

      {/* Top section border */}
      <div className="absolute inset-x-0 top-0 h-px
        bg-gradient-to-r from-transparent via-white/[.07] to-transparent" />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[.018] overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00BFFF" strokeWidth=".5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

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
            Contacto
          </motion.span>

          <motion.h2 variants={fadeUp}
            className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.07] text-white mb-4"
          >
            ¿Listo para transformar tu idea en una{" "}
            <span className="gradient-text">solución digital</span>?
          </motion.h2>

          <motion.p variants={fadeUp}
            className="text-white/50 text-[1.05rem] max-w-2xl mx-auto leading-relaxed"
          >
            Estamos preparados para ayudarte a crear sistemas, páginas web y soluciones
            tecnológicas que impulsen tu negocio.
          </motion.p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start"
        >
          <ContactInfo inView={contentInView} />
          <ContactForm inView={contentInView} />
        </div>

        {/* ── CTA Banner ── */}
        <div ref={bannerRef}>
          <CTABanner inView={bannerInView} />
        </div>

      </div>
    </section>
  );
}
