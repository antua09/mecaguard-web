import type { Metadata } from "next";
import { Syne, DM_Sans, Space_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mecaguard.app"),
  title: { default: "MecaGuard — Diagnóstico Automotriz Inteligente", template: "%s | MecaGuard" },
  description: "Conecta tu smartphone con el cerebro de tu auto. Diagnóstico profesional, lectura de fallas y monitoreo en tiempo real.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body className="bg-background text-text-primary antialiased">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}