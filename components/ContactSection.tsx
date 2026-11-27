import Reveal from "./ui/Reveal";
import { WhatsAppIcon } from "./WhatsAppButton";
import { WA_URL } from "@/lib/whatsapp";

export default function ContactSection() {
  return (
    <section id="contacto" className="bg-ink text-paper py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">

          {/* ── Left ── */}
          <Reveal className="lg:col-span-6">
            <p className="eyebrow !text-paper/55">Contacto</p>
            <h2 className="mt-5 font-display font-medium text-[2.3rem] sm:text-[3rem] leading-[1.08]">
              ¿Preferís hablar directo?
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-paper/70 max-w-[460px]">
              Escribinos por WhatsApp y te respondemos nosotros, sin bots. Te decimos qué conviene
              para tu negocio y en cuánto tiempo lo entregamos.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn-paper mt-8">
              <WhatsAppIcon className="w-[18px] h-[18px] text-[#128C7E]" />
              Escribir por WhatsApp
            </a>
          </Reveal>

          {/* ── Right ── */}
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <dl className="border-t border-paper/15">
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
              <div className="py-5 border-b border-paper/15 grid grid-cols-[110px_1fr] gap-4 items-baseline">
                <dt className="text-[12px] tracking-[.12em] uppercase text-paper/55">Presupuesto</dt>
                <dd>
                  <a href="#presupuesto" className="text-[17px] hover:underline underline-offset-4">
                    Completar el formulario ↑
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
