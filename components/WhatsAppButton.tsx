"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WA_URL } from "@/lib/whatsapp";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end gap-3 pointer-events-none">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.92 }}
            animate={{ opacity: 1, x: 0,  scale: 1    }}
            exit={{    opacity: 0, x: 10, scale: 0.92 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="glass rounded-xl px-4 py-2.5 border border-white/[.08]
              shadow-[0_8px_40px_rgba(0,0,0,.6)] pointer-events-none"
          >
            <p className="text-white text-[13px] font-semibold whitespace-nowrap">
              ¡Hablemos por WhatsApp!
            </p>
            <p className="text-white/45 text-[11px] mt-0.5">+595 981 698 777</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="relative w-[54px] h-[54px] rounded-full flex items-center justify-center
          pointer-events-auto shadow-[0_8px_32px_rgba(37,211,102,.35)]"
        style={{
          background: "linear-gradient(145deg, #2ee86b 0%, #25D366 45%, #128C7E 100%)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        {/* Pulse ring 1 */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: "rgba(37,211,102,.38)" }}
          animate={{ scale: [1, 1.7, 1.7], opacity: [0.7, 0, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        />
        {/* Pulse ring 2 (staggered) */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: "rgba(37,211,102,.22)" }}
          animate={{ scale: [1, 1.95, 1.95], opacity: [0.5, 0, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />

        <WhatsAppIcon className="w-[26px] h-[26px] text-white relative z-10" />
      </motion.a>
    </div>
  );
}
