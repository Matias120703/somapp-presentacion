import SomappLogo from "./SomappLogo";

const NAV = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso",   href: "#proceso"   },
  { label: "Planes",    href: "#planes"    },
  { label: "Contacto",  href: "#contacto"  },
];

const SOCIAL = [
  { label: "WhatsApp",  href: "https://wa.me/595981698777" },
  { label: "Instagram", href: "https://www.instagram.com/somapp043/" },
  { label: "Facebook",  href: "https://www.facebook.com/profile.php?id=61558303434109&locale=es_LA" },
  { label: "TikTok",    href: "https://www.tiktok.com/@somapp043" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper border-t border-paper/15">
      <div className="mx-auto max-w-site px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <a href="#inicio" className="inline-flex items-center gap-2.5" aria-label="Somapp — inicio">
              <SomappLogo size={28} />
              <span className="font-semibold tracking-[.22em] text-[13px]">SOMAPP</span>
            </a>
            <p className="mt-4 text-[14.5px] leading-relaxed text-paper/60 max-w-[360px]">
              Estudio de desarrollo web y sistemas en Paraguay. Páginas web, tiendas
              online y software a medida para negocios que quieren crecer.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="text-[12px] tracking-[.12em] uppercase text-paper/45 mb-4">Navegación</p>
            <ul className="flex flex-col gap-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[14.5px] text-paper/80 hover:text-paper transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[12px] tracking-[.12em] uppercase text-paper/45 mb-4">Redes</p>
            <ul className="flex flex-col gap-2.5">
              {SOCIAL.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-[14.5px] text-paper/80 hover:text-paper transition-colors">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-paper/15 flex flex-col sm:flex-row justify-between gap-2 text-[13px] text-paper/45">
          <span>© {new Date().getFullYear()} SOMAPP. Todos los derechos reservados.</span>
          <span>Hecho en Paraguay</span>
        </div>
      </div>
    </footer>
  );
}
