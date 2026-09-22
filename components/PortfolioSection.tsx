import Reveal from "./ui/Reveal";
import {
  ZurikMockup,
  MovaMockup,
  RestauranteMockup,
  FortalezaMockup,
} from "./ProjectMockups";

const PROJECTS = [
  {
    id: "fortaleza",
    title: "Sistema Fortaleza",
    kind: "Sistema de reservas",
    desc: "Reservas online de cancha sintética, parrilla y eventos, con disponibilidad en tiempo real y código de seguimiento.",
    url: "https://sistema-fortaleza.vercel.app/",
    Mockup: FortalezaMockup,
  },
  {
    id: "mova",
    title: "Mova Importados",
    kind: "Tienda online",
    desc: "E-commerce de perfumes, skincare y maquillaje importados: catálogo por categorías, filtros, ofertas y pedido por WhatsApp.",
    url: "https://mova-tienda-online.vercel.app/",
    Mockup: MovaMockup,
  },
  {
    id: "zurik",
    title: "Zurik Perfumería",
    kind: "Catálogo digital",
    desc: "Catálogo para exhibir perfumes y promociones, con compra directa y una presentación pensada para marca de lujo.",
    url: "https://cu-sers-matias-documents-zurik.vercel.app/",
    Mockup: ZurikMockup,
  },
  {
    id: "restaurante",
    title: "Villa Toscana",
    kind: "Sitio web",
    desc: "Sitio para restaurante con menú, platos destacados, reservas y contacto directo con los clientes.",
    url: "https://villa-toscana.vercel.app/",
    Mockup: RestauranteMockup,
  },
];

function ProjectCard({ title, kind, desc, url, Mockup, index }: (typeof PROJECTS)[number] & { index: number }) {
  return (
    <Reveal delay={(index % 2) * 0.08}>
      <a href={url} target="_blank" rel="noopener noreferrer" className="group block">
        <div className="rounded-xl border border-line bg-white overflow-hidden transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_22px_50px_-24px_rgba(15,27,45,.35)]">
          <div className="flex items-center gap-1.5 px-3 h-8 border-b border-line bg-paper-2/60">
            <span className="w-2 h-2 rounded-full bg-ink/15" />
            <span className="w-2 h-2 rounded-full bg-ink/15" />
            <span className="w-2 h-2 rounded-full bg-ink/15" />
            <span className="ml-3 h-4 flex-1 max-w-[200px] rounded-full bg-ink/[.06]" />
          </div>
          <div className="relative aspect-[16/10]">
            <Mockup />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_auto] gap-x-6 gap-y-1.5 items-baseline">
          <h3 className="font-display text-[1.45rem] leading-tight text-ink">{title}</h3>
          <span className="text-[12px] tracking-[.12em] uppercase text-ink-2">{kind}</span>
          <p className="col-span-2 text-[15px] leading-relaxed text-ink-2 max-w-[520px]">{desc}</p>
          <span className="col-span-2 mt-1 text-[14px] text-ink underline decoration-line underline-offset-4 group-hover:decoration-ink transition-colors">
            Ver sitio ↗
          </span>
        </div>
      </a>
    </Reveal>
  );
}

export default function PortfolioSection() {
  return (
    <section id="proyectos" className="py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6 lg:px-8">
        <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 sm:mb-16">
          <div className="md:col-span-4">
            <p className="eyebrow">Proyectos</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display font-medium text-ink text-[2.1rem] sm:text-[2.8rem] leading-[1.1] max-w-[640px]">
              Trabajo reciente para negocios reales.
            </h2>
            <p className="mt-4 text-[16px] text-ink-2 max-w-[540px] leading-relaxed">
              Cada proyecto está publicado y en uso. Podés entrar, navegar y ver
              exactamente el tipo de trabajo que entregamos.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
