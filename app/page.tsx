import type { Metadata } from "next";
import { Hero } from "@/sections/Hero";
import { TrustBar } from "@/sections/TrustBar";
import { HowItWorks } from "@/sections/HowItWorks";
import { FeaturesHighlight } from "@/sections/FeaturesHighlight";
import { HomePricing } from "@/sections/HomePricing";
import { HomeFAQ } from "@/sections/HomeFAQ";
import { CTA } from "@/sections/CTA";

export const metadata: Metadata = {
  title: "MecaGuard — Diagnóstico Automotriz Inteligente",
  description:
    "Conecta tu escáner OBD2 y convierte tu smartphone en un diagnóstico profesional. Lee fallas, monitorea sensores y cuida tu auto con MecaGuard.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <FeaturesHighlight />
      <HomePricing />
      <HomeFAQ />
      <CTA />
    </>
  );
}
