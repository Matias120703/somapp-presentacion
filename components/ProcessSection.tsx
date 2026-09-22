import Reveal from "./ui/Reveal";

const STEPS = [
  {
    n: "1",
    title: "Reunión inicial",
    text: "Hablamos por WhatsApp o videollamada. Entendemos qué hace tu negocio y qué necesitás resolver.",
  },
  {
    n: "2",
    title: "Propuesta y alcance",
    text: "Te enviamos qué incluye el proyecto, precio y tiempos. Sin sorpresas después.",
  },
  {
    n: "3",
    title: "Diseño",
    text: "Armamos la estructura y el diseño con tu marca. Revisás y ajustamos hasta que quede bien.",
  },
  {
    n: "4",
    title: "Desarrollo",
    text: "Construimos el sitio o sistema y lo probamos en celular y computadora.",
  },
  {
    n: "5",
    title: "Lanzamiento y soporte",
    text: "Lo publicamos con hosting incluido y te acompañamos durante los primeros 6 meses.",
  },
];

export default function ProcessSection() {
  return (
    <section id="proceso" className="py-20 sm:py-28 border-t border-line">
      <div className="mx-auto max-w-site px-6 lg:px-8">
        <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 sm:mb-16">
          <div className="md:col-span-4">
            <p className="eyebrow">Proceso</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display font-medium text-ink text-[2.1rem] sm:text-[2.8rem] leading-[1.1] max-w-[640px]">
              Cinco pasos, de la idea al sitio publicado.
            </h2>
          </div>
        </Reveal>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10 border-t border-line pt-10">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.07}>
              <li>
                <span className="font-display text-[2.4rem] leading-none text-ink">{s.n}</span>
                <h3 className="mt-4 text-[16px] font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
