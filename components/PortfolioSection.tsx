import Image from "next/image";
import Reveal from "./ui/Reveal";

const PROJECTS = [
  {
    id: "orden",
    title: "Orden",
    kind: "Sistema de gestión",
    desc: "App de finanzas para negocios, profesionales y el campo: ventas, gastos y turnos se cargan hablando, con una foto o escribiendo, y muestra cuánto quedó de verdad.",
    url: "https://gestion-financiera-wheat.vercel.app/",
    image: "/proyectos/orden.png",
  },
  {
    id: "js-muebles",
    title: "JS Muebles Proyectados",
    kind: "Catálogo con configurador 3D",
    desc: "Fábrica de muebles a medida: catálogo, configurador de acabados en 3D y agenda de fabricación para reservar el lugar.",
    url: "https://js-muebles-web.vercel.app/",
    image: "/proyectos/js-muebles.png",
  },
  {
    id: "innovare",
    title: "Clínica Innovare",
    kind: "Sistema de turnos",
    desc: "Clínica odontológica con reserva de consultas online, confirmación por WhatsApp y panel para manejar la agenda.",
    url: "https://somapp-bases.vercel.app/",
    image: "/proyectos/innovare.png",
  },
  {
    id: "style-house",
    title: "Style House Barber Shop",
    kind: "Sitio web con reservas",
    desc: "Barbería premium: servicios, galería de trabajos y contacto directo para reservar turno.",
    url: "https://style-house-barber.vercel.app/",
    image: "/proyectos/style-house.png",
  },
  {
    id: "pigmento",
    title: "Pigmento Cosméticos",
    kind: "Tienda online",
    desc: "Skincare coreano y maquillaje: elección de tono, tamaño y formato, precio mayorista, dos sucursales y pedido por WhatsApp.",
    url: "https://pigmento-cosmeticos.vercel.app/",
    image: "/proyectos/pigmento.png",
  },
  {
    id: "bar-sandwich",
    title: "Bar Sandwich",
    kind: "Sitio web",
    desc: "Sitio para bar y restaurante con carta, galería, reseñas de Google, ubicación y reserva de mesa.",
    url: "https://somapp-bar-sandwich.vercel.app/",
    image: "/proyectos/bar-sandwich.png",
  },
  {
    id: "mova",
    title: "Mova Importados",
    kind: "Tienda online",
    desc: "E-commerce de perfumes, skincare y maquillaje importados: catálogo por categorías, filtros, ofertas y pedido por WhatsApp.",
    url: "https://mova-tienda-online.vercel.app/",
    image: "/proyectos/mova.png",
  },
  {
    id: "villa-toscana",
    title: "Villa Toscana",
    kind: "Sitio web",
    desc: "Sitio para restaurante con menú, horarios, delivery, reservas y contacto directo con los clientes.",
    url: "https://villa-toscana.vercel.app/",
    image: "/proyectos/villa-toscana.png",
  },
];

export function BrowserShot({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <>
      <div className="flex items-center gap-1.5 px-3 h-8 border-b border-line bg-paper-2/60">
        <span className="w-2 h-2 rounded-full bg-ink/15" />
        <span className="w-2 h-2 rounded-full bg-ink/15" />
        <span className="w-2 h-2 rounded-full bg-ink/15" />
        <span className="ml-3 h-4 flex-1 max-w-[200px] rounded-full bg-ink/[.06]" />
      </div>
      <div className="relative aspect-[16/10] bg-paper-2">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
    </>
  );
}

function ProjectCard({ title, kind, desc, url, image, index }: (typeof PROJECTS)[number] & { index: number }) {
  return (
    <Reveal delay={(index % 2) * 0.08}>
      <a href={url} target="_blank" rel="noopener noreferrer" className="group block">
        <div className="rounded-xl border border-line bg-white overflow-hidden transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_22px_50px_-24px_rgba(15,27,45,.35)]">
          <BrowserShot src={image} alt={`Página de ${title}`} />
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
