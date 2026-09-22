import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT"],
  weight: "variable",
});

/* ─── Viewport ─────────────────────────────────────────────────────── */
export const viewport: Viewport = {
  themeColor: "#F6F4EF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/* ─── Metadata ─────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://somapp.com.py"),

  title: {
    default: "SOMAPP — Páginas web y sistemas a medida en Paraguay",
    template: "%s | SOMAPP",
  },
  description:
    "Estudio de desarrollo en Paraguay. Diseñamos y desarrollamos páginas web, tiendas online y sistemas de gestión a medida, con hosting y soporte incluidos.",
  keywords: [
    "desarrollo web Paraguay",
    "páginas web profesionales",
    "sistemas de gestión empresarial",
    "tienda online Paraguay",
    "sistema de reservas",
    "software a medida",
    "SOMAPP",
  ],
  authors:   [{ name: "SOMAPP", url: "https://somapp.com.py" }],
  creator:   "SOMAPP",
  publisher: "SOMAPP",

  openGraph: {
    type:        "website",
    locale:      "es_PY",
    url:         "https://somapp.com.py",
    siteName:    "SOMAPP",
    title:       "SOMAPP — Páginas web y sistemas a medida",
    description:
      "Diseñamos y desarrollamos páginas web, tiendas online y sistemas de gestión a medida para negocios en Paraguay.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SOMAPP" }],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "SOMAPP — Páginas web y sistemas a medida",
    description:
      "Diseñamos y desarrollamos páginas web, tiendas online y sistemas de gestión a medida para negocios en Paraguay.",
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
    <html lang="es" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
