"use client";

import Link from "next/link";
import { Check, ArrowRight, Zap } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";

const plans = [
  {
    name: "Básico",
    price: "Gratis",
    period: "",
    description: "Para empezar y conocer tu vehículo.",
    features: [
      "Lectura de códigos DTC",
      "5 escaneos por mes",
      "Historial básico",
      "Compatible con OBD2",
    ],
    cta: "Comenzar gratis",
    href: "/planes",
    featured: false,
  },
  {
    name: "Premium",
    price: "$99",
    period: "/mes MXN",
    description: "Para conductores que quieren control total.",
    features: [
      "Todo lo del plan Básico",
      "Escaneos ilimitados",
      "Sensores en tiempo real",
      "Alertas preventivas",
      "Historial completo",
      "Soporte prioritario",
    ],
    cta: "Probar 14 días gratis",
    href: "/planes",
    featured: true,
  },
];

export function HomePricing() {
  return (
    <section id="planes" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-blue-electric/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <Badge variant="cyan" className="mb-4">Planes</Badge>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-5">
            Acceso desde el primer día
          </h2>
          <p className="text-text-secondary text-lg max-w-lg mx-auto">
            Empieza gratis. Actualiza cuando necesites más potencia.
          </p>
        </AnimatedSection>

        <StaggerContainer
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          staggerDelay={0.15}
        >
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div
                className={`relative rounded-2xl p-7 h-full flex flex-col ${
                  plan.featured
                    ? "bg-gradient-to-b from-blue-electric/10 to-surface border border-blue-electric/30 shadow-[0_0_40px_rgba(45,127,255,0.1)]"
                    : "glass-card"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="blue">
                      <Zap className="w-2.5 h-2.5" />
                      Más popular
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold text-text-primary mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">{plan.description}</p>
                  <div className="flex items-end gap-1">
                    <span className="font-display text-4xl font-bold text-text-primary">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-text-muted text-sm mb-1">{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          plan.featured
                            ? "bg-blue-electric/20"
                            : "bg-surface-2"
                        }`}
                      >
                        <Check
                          className={`w-2.5 h-2.5 ${
                            plan.featured ? "text-blue-bright" : "text-text-muted"
                          }`}
                        />
                      </div>
                      <span className="text-text-secondary">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    plan.featured
                      ? "bg-gradient-to-r from-blue-electric to-blue-600 text-white hover:shadow-glow-blue hover:-translate-y-0.5"
                      : "border border-border text-text-secondary hover:border-border-light hover:text-text-primary"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection className="text-center mt-8">
          <Link
            href="/planes"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-secondary transition-colors group"
          >
            Ver comparativa completa de planes
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
