import type { Metadata } from "next";
import { Syne, DM_Sans, Space_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mecaguard.app"),
  title: {
    default: "MecaGuard — Diagnóstico Automotriz Inteligente",
    template: "%s | MecaGuard",
  },
  description:
    "MecaGuard convierte tu smartphone en un escáner profesional. Conecta un OBD2, diagnostica fallas, monitorea sensores y entiende tu vehículo en tiempo real.",
  keywords: [
    "diagnóstico automotriz",
    "OBD2",
    "escáner ELM327",
    "códigos DTC",
    "fallas de motor",
    "mecánica inteligente",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://mecaguard.app",
    siteName: "MecaGuard",
    title: "MecaGuard — Diagnóstico Automotriz Inteligente",
    description:
      "Conecta tu escáner OBD2 y diagnostica tu vehículo como un profesional.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MecaGuard - Diagnóstico Automotriz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MecaGuard — Diagnóstico Automotriz Inteligente",
    description: "Conecta tu escáner OBD2 y diagnostica tu vehículo.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable}`}
    >
      <body className="bg-background text-text-primary font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
