"use client";

import { useState } from "react";
import Reveal from "./ui/Reveal";
import { WhatsAppIcon } from "./WhatsAppButton";
import { WA_URL } from "@/lib/whatsapp";

const PROYECTO_TIPOS = [
  "Landing page",
  "Sitio web con panel",
  "Tienda online",
  "Sistema de reservas",
  "Sistema de gestión",
  "Otro",
];

const fieldClass =
  "w-full h-12 rounded-lg border border-line bg-white px-4 text-[15px] text-ink " +
  "placeholder:text-ink-2/60 outline-none transition-colors focus:border-ink";

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block mb-2 text-[12px] tracking-[.12em] uppercase text-ink-2">{children}</label>;
}

export default function ContactSection() {
  const [nombre,   setNombre]   = useState("");
  const [empresa,  setEmpresa]  = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [tipo,     setTipo]     = useState("");
  const [mensaje,  setMensaje]  = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = [
      "Hola, vi la página de Somapp y me gustaría solicitar un presupuesto.",
      nombre   && `Nombre: ${nombre}`,
      empresa  && `Empresa: ${empresa}`,
      whatsapp && `WhatsApp: ${whatsapp}`,
      tipo     && `Tipo de proyecto: ${tipo}`,
      mensaje  && `Mensaje: ${mensaje}`,
    ].filter(Boolean);
    const url = `https://wa.me/595981698777?text=${encodeURIComponent(parts.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contacto" className="bg-ink text-paper py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* ── Left ── */}
          <Reveal className="lg:col-span-5">
            <p className="eyebrow !text-paper/55">Contacto</p>
            <h2 className="mt-5 font-display font-medium text-[2.3rem] sm:text-[3rem] leading-[1.08]">
              Contanos qué necesita tu negocio.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-paper/70 max-w-[440px]">
              Respondemos por WhatsApp, sin formularios eternos ni esperas. Te decimos
              qué conviene, cuánto cuesta y en cuánto tiempo lo entregamos.
            </p>

            <dl className="mt-10 border-t border-paper/15">
              <div className="py-5 border-b border-paper/15 grid grid-cols-[110px_1fr] gap-4 items-baseline">
                <dt className="text-[12px] tracking-[.12em] uppercase text-paper/55">WhatsApp</dt>
                <dd>
                  <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="text-[17px] hover:underline underline-offset-4">
                    +595 981 698 777
                  </a>
                </dd>
              </div>
              <div className="py-5 border-b border-paper/15 grid grid-cols-[110px_1fr] gap-4 items-baseline">
                <dt className="text-[12px] tracking-[.12em] uppercase text-paper/55">Ubicación</dt>
                <dd className="text-[17px]">Paraguay · trabajamos con clientes de todo el país</dd>
              </div>
            </dl>

            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn-paper mt-8">
              <WhatsAppIcon className="w-[18px] h-[18px] text-[#128C7E]" />
              Escribir por WhatsApp
            </a>
          </Reveal>

          {/* ── Form ── */}
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <form onSubmit={handleSubmit} className="rounded-xl bg-paper text-ink p-6 sm:p-8">
              <p className="text-[15px] text-ink-2 mb-6">
                Completá lo que puedas; el mensaje se arma solo y se envía por WhatsApp.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Nombre</Label>
                  <input className={fieldClass} placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div>
                  <Label>Negocio</Label>
                  <input className={fieldClass} placeholder="Nombre del negocio (opcional)" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
                </div>
                <div>
                  <Label>WhatsApp</Label>
                  <input className={fieldClass} type="tel" placeholder="+595 981 000 000" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                </div>
                <div>
                  <Label>Tipo de proyecto</Label>
                  <select
                    className={`${fieldClass} appearance-none cursor-pointer ${tipo ? "" : "text-ink-2/60"}`}
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  >
                    <option value="" disabled>Elegí una opción</option>
                    {PROYECTO_TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Label>Mensaje</Label>
                  <textarea
                    className={`${fieldClass} h-auto py-3 resize-none`}
                    rows={4}
                    placeholder="Contanos brevemente qué necesitás"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-ink w-full mt-6">
                Enviar por WhatsApp
              </button>
              <p className="mt-3 text-center text-[12.5px] text-ink-2">
                Tus datos se usan solo para responderte.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
