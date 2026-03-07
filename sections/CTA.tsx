"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Zap } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function CTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-electric/8 via-transparent to-transparent" />
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <AnimatedSection>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-electric to-cyan-glow shadow-glow-blue mb-8 mx-auto">
            <Zap className="w-8 h-8 text-white" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            ¿Listo para conocer
            <br />
            <span className="gradient-text">tu vehículo de verdad?</span>
          </h2>

          <p className="text-text-secondary text-lg sm:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Únete a miles de conductores que ya diagnostican, monitorean y
            protegen su auto con MecaGuard.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/planes"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-electric to-blue-600 hover:shadow-glow-blue hover:-translate-y-0.5 transition-all duration-200 text-base"
            >
              Comenzar gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-text-secondary border border-border hover:border-border-light hover:text-text-primary hover:bg-surface-2 transition-all duration-200 text-base"
            >
              Hablar con nosotros
            </Link>
          </div>

          <p className="text-xs text-text-muted mt-6">
            Plan gratuito disponible · Sin tarjeta de crédito
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
