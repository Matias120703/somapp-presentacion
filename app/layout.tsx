import type { Metadata, Viewport } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

/* ─── Viewport ─────────────────────────────────────────────────────── */
export const viewport: Viewport = {
  themeColor: "#050B14",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/* ─── Metadata ─────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://somapp.com.py"),

  title: {
    default: "SOMAPP — Soluciones Digitales | Sistemas, Páginas Web y Apps",
    template: "%s | SOMAPP",
  },
  description:
    "Desarrollamos sistemas de gestión, páginas web profesionales y aplicaciones móviles a medida para empresas y emprendedores en Paraguay. Tecnología moderna para impulsar tu negocio.",
  keywords: [
    "soluciones digitales Paraguay",
    "desarrollo web Paraguay",
    "sistemas de gestión empresarial",
    "aplicaciones móviles a medida",
    "páginas web profesionales",
    "software empresarial",
    "automatización de procesos",
    "SOMAPP",
    "emprendedores Paraguay",
    "e-commerce Paraguay",
  ],
  authors:   [{ name: "SOMAPP", url: "https://somapp.com.py" }],
  creator:   "SOMAPP",
  publisher: "SOMAPP",

  openGraph: {
    type:        "website",
    locale:      "es_PY",
    url:         "https://somapp.com.py",
    siteName:    "SOMAPP",
    title:       "SOMAPP — Soluciones Digitales",
    description:
      "Desarrollamos sistemas de gestión, páginas web profesionales y aplicaciones móviles a medida para empresas y emprendedores en Paraguay.",
    images: [
      {
        url:    "/og-image.png",
        width:  1200,
        height: 630,
        alt:    "SOMAPP — Soluciones Digitales",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "SOMAPP — Soluciones Digitales",
    description:
      "Desarrollamos sistemas de gestión, páginas web y aplicaciones móviles a medida para empresas y emprendedores en Paraguay.",
    images: ["/og-image.png"],
  },

  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true },
  },

  icons: {
    icon:      [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    shortcut:  "/favicon.ico",
    apple:     "/apple-touch-icon.png",
  },

  category: "technology",
};

/* ─── Layout ─────────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
