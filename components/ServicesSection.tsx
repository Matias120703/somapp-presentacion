import Reveal from "./ui/Reveal";

const SERVICES = [
  {
    n: "01",
    title: "Landing page",
    lead: "Una página clara para presentar tu negocio y recibir consultas.",
    items: ["Diseño a medida, adaptado a celular", "Botón de WhatsApp y formulario de contacto", "SEO básico para aparecer en Google"],
  },
  {
    n: "02",
    title: "Sitio web con panel",
    lead: "Un sitio completo que vos mismo actualizás, sin depender de nadie.",
    items: ["Panel de administración propio", "Gestión de contenido, productos y usuarios", "Base de datos y dashboard"],
  },
  {
    n: "03",
    title: "Sistemas a medida",
    lead: "Herramientas hechas para cómo trabaja tu negocio.",
    items: ["Tiendas online y catálogos", "Reservas, turnos y disponibilidad", "Stock, ventas, caja y reportes"],
  },
];

const INCLUDED = [
  "Hosting por 6 meses",
  "Soporte y correcciones",
  "Diseño responsive",
  "Entrega lista para publicar",
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-20 sm:py-28 border-t border-line">
      <div className="mx-auto max-w-site px-6 lg:px-8">
        <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 sm:mb-16">
          <div className="md:col-span-4">
            <p className="eyebrow">Servicios</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display font-medium text-ink text-[2.1rem] sm:text-[2.8rem] leading-[1.1] max-w-[640px]">
              Tres formas de trabajar juntos.
            </h2>
            <p className="mt-4 text-[16px] text-ink-2 max-w-[540px] leading-relaxed">
              Desde una página simple hasta un sistema completo. Elegís el alcance;
              el resto lo resolvemos nosotros.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-line">
          {SERVICES.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.08}
              className={`py-9 md:pr-8 ${i > 0 ? "border-t md:border-t-0 md:border-l border-line md:pl-8" : ""}`}
            >
              <span className="font-display text-[15px] text-ink-2">{s.n}</span>
              <h3 className="mt-3 font-display text-[1.6rem] leading-tight text-ink">{s.title}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink">{s.lead}</p>
              <ul className="mt-5 flex flex-col gap-2">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[14.5px] text-ink-2 leading-snug">
                    <span className="mt-[9px] w-1 h-1 rounded-full bg-ink/40 flex-shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 sm:mt-12 rounded-xl bg-paper-2/70 border border-line px-6 py-6 sm:px-8 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-10 gap-y-3 items-center">
          <p className="eyebrow">Incluido en todo proyecto</p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {INCLUDED.map((it) => (
              <li key={it} className="text-[14.5px] text-ink flex items-center gap-2">
                <CheckIcon />
                {it}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-ink" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 10.5l3.2 3L15 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
