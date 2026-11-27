"use client";

import { useState } from "react";
import Reveal from "./ui/Reveal";
import { WhatsAppIcon } from "./WhatsAppButton";

const WA_NUMBER = "595981698777";

const SERVICIOS = [
  "Página web",
  "Tienda online",
  "Sistema de turnos o reservas",
  "Tarjeta de fidelidad digital",
  "Sistema a medida",
  "Otro",
];

const RANGOS = [
  "Hasta Gs. 1.500.000",
  "Gs. 1.500.000 a 3.000.000",
  "Gs. 3.000.000 a 6.000.000",
  "Gs. 6.000.000 a 12.000.000",
  "Más de Gs. 12.000.000",
];

const PLAZOS = ["Lo antes posible", "Este mes", "En 1 a 3 meses", "Solo estoy averiguando"];

const fieldClass =
  "w-full h-12 rounded-lg border border-line bg-white px-4 text-[15px] text-ink " +
  "placeholder:text-ink-2/60 outline-none transition-colors focus:border-ink";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block mb-2 text-[14px] font-medium text-ink">
      {children}
      {optional && <span className="font-normal text-ink-2"> (opcional)</span>}
    </label>
  );
}

function Group({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="py-8 border-t border-line first:border-t-0 first:pt-0">
      <legend className="contents">
        <span className="flex items-baseline gap-3 mb-5">
          <span className="text-[12px] tracking-[.12em] text-ink-2">{n}</span>
          <span className="font-display text-[1.35rem] leading-tight text-ink">{title}</span>
        </span>
      </legend>
      {children}
    </fieldset>
  );
}

function Chip({
  type,
  name,
  value,
  checked,
  onChange,
}: {
  type: "checkbox" | "radio";
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex items-center gap-3 min-h-12 rounded-lg border px-4 py-3 text-[15px] cursor-pointer transition-colors ${
        checked ? "border-ink bg-ink text-paper" : "border-line bg-white text-ink hover:border-ink/40"
      }`}
    >
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span
        aria-hidden="true"
        className={`flex-shrink-0 w-4 h-4 border flex items-center justify-center ${
          type === "radio" ? "rounded-full" : "rounded-[4px]"
        } ${checked ? "border-paper" : "border-ink/30"}`}
      >
        {checked && <span className={`w-2 h-2 bg-paper ${type === "radio" ? "rounded-full" : "rounded-[2px]"}`} />}
      </span>
      {value}
    </label>
  );
}

export default function BudgetSection() {
  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [negocio, setNegocio] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [redes, setRedes] = useState("");
  const [rubro, setRubro] = useState("");
  const [servicios, setServicios] = useState<string[]>([]);
  const [rango, setRango] = useState("");
  const [plazo, setPlazo] = useState("");
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState("");

  const toggleServicio = (s: string) =>
    setServicios((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const falta =
      (!nombre.trim() && "Falta tu nombre.") ||
      (whatsapp.replace(/\D/g, "").length < 6 && "Falta un WhatsApp válido.") ||
      (!negocio.trim() && "Falta el nombre de tu negocio.") ||
      (!servicios.length && "Elegí al menos un servicio.") ||
      (!rango && "Elegí cuánto querés invertir.") ||
      "";
    setError(falta);
    if (falta) return;

    const lineas = [
      "Hola, completé el formulario de presupuesto en la web de Somapp.",
      "",
      `Nombre: ${nombre.trim()}`,
      `WhatsApp: ${whatsapp.trim()}`,
      `Negocio: ${negocio.trim()}${ciudad.trim() ? ` (${ciudad.trim()})` : ""}${redes.trim() ? ` · ${redes.trim()}` : ""}`,
      rubro.trim() ? `A qué se dedica: ${rubro.trim()}` : null,
      `Me interesa: ${servicios.join(", ")}`,
      `Puedo invertir: ${rango}`,
      plazo ? `Para cuándo: ${plazo}` : null,
      comentario.trim() ? `Comentario: ${comentario.trim()}` : null,
    ].filter((l) => l !== null);

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lineas.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="presupuesto" className="py-20 sm:py-28 border-t border-line">
      <div className="mx-auto max-w-site px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">Presupuesto</p>
              <h2 className="mt-5 font-display font-medium text-ink text-[2.1rem] sm:text-[2.8rem] leading-[1.1]">
                Contanos tu proyecto y te pasamos un precio justo.
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-2 max-w-[400px]">
                Cada negocio necesita algo distinto. Con estas respuestas armamos una propuesta a tu
                medida, con precio, mensualidad y tiempos claros. Toma dos minutos.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={0.08}>
            <form onSubmit={handleSubmit} noValidate className="rounded-xl border border-line bg-paper-2/40 p-6 sm:p-10">
              <Group n="01" title="Tus datos">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="p-nombre">Nombre y apellido</Label>
                    <input id="p-nombre" className={fieldClass} maxLength={60} autoComplete="name" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="p-whatsapp">WhatsApp</Label>
                    <input id="p-whatsapp" type="tel" className={fieldClass} maxLength={25} autoComplete="tel" placeholder="0981 123 456" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                  </div>
                </div>
              </Group>

              <Group n="02" title="Tu negocio">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="p-negocio">Nombre del negocio</Label>
                    <input id="p-negocio" className={fieldClass} maxLength={80} value={negocio} onChange={(e) => setNegocio(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="p-ciudad" optional>Ciudad</Label>
                    <input id="p-ciudad" className={fieldClass} maxLength={60} value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="p-redes" optional>Instagram o página web</Label>
                    <input id="p-redes" className={fieldClass} maxLength={120} placeholder="@tunegocio" value={redes} onChange={(e) => setRedes(e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="p-rubro" optional>¿A qué se dedica tu negocio?</Label>
                    <textarea
                      id="p-rubro"
                      className={`${fieldClass} h-auto py-3 resize-none`}
                      rows={3}
                      maxLength={300}
                      placeholder="Ej.: barbería con 3 sillas, trabajamos con turnos"
                      value={rubro}
                      onChange={(e) => setRubro(e.target.value)}
                    />
                  </div>
                </div>
              </Group>

              <Group n="03" title="¿Qué te interesa?">
                <p className="-mt-2 mb-4 text-[14px] text-ink-2">Podés elegir más de uno.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICIOS.map((s) => (
                    <Chip key={s} type="checkbox" name="servicios" value={s} checked={servicios.includes(s)} onChange={() => toggleServicio(s)} />
                  ))}
                </div>
              </Group>

              <Group n="04" title="¿Cuánto querés invertir?">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {RANGOS.map((r) => (
                    <Chip key={r} type="radio" name="rango" value={r} checked={rango === r} onChange={() => setRango(r)} />
                  ))}
                </div>
              </Group>

              <Group n="05" title="¿Para cuándo lo necesitás?">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PLAZOS.map((p) => (
                    <Chip key={p} type="radio" name="plazo" value={p} checked={plazo === p} onChange={() => setPlazo(p)} />
                  ))}
                </div>
                <div className="mt-6">
                  <Label htmlFor="p-comentario" optional>¿Algo más que quieras contarnos?</Label>
                  <textarea
                    id="p-comentario"
                    className={`${fieldClass} h-auto py-3 resize-none`}
                    rows={4}
                    maxLength={800}
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                  />
                </div>
              </Group>

              <div className="pt-2">
                <p role="alert" aria-live="polite" className="min-h-[22px] mb-2 text-[14px] text-[#b42318]">
                  {error}
                </p>
                <button type="submit" className="btn btn-ink w-full">
                  <WhatsAppIcon className="w-[18px] h-[18px]" />
                  Enviar por WhatsApp
                </button>
                <p className="mt-3 text-center text-[12.5px] text-ink-2">
                  Se abre WhatsApp con tus respuestas listas para enviar. Tus datos se usan solo para
                  preparar tu presupuesto.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
