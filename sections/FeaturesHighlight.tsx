"use client";

import Link from "next/link";
import { ArrowRight, AlertTriangle, Gauge, Brain, History, Plug, Bell } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";

const features = [
  {
    icon: AlertTriangle,
    title: "Lectura de códigos DTC",
    description: "Lee, interpreta y borra códigos de diagnóstico con explicación clara de cada falla detectada.",
    color: "text-blue-bright",
    bg: "bg-blue-electric/10",
    border: "border-blue-electric/15",
  },
  {
    icon: Gauge,
    title: "Sensores en tiempo real",
    description: "Monitorea parámetros como RPM, temperatura, presión de combustible y más de 30 sensores OBD.",
    color: "text-cyan-400",
    bg: "bg-cyan-glow/10",
    border: "border-cyan-glow/15",
  },
  {
    icon: Brain,
    title: "Interpretación inteligente",
    description: "MecaGuard traduce los datos técnicos a lenguaje claro. Sabrás exactamente qué le pasa a tu auto.",
    color: "text-violet-400",
    bg: "bg-violet-deep/10",
    border: "border-violet-deep/15",
  },
  {
    icon: History,
    title: "Historial de escaneos",
    description: "Guarda y compara diagnósticos anteriores para hacer seguimiento del estado de tu vehículo.",
    color: "text-blue-bright",
    bg: "bg-blue-electric/10",
    border: "border-blue-electric/15",
  },
  {
    icon: Plug,
    title: "Compatibilidad OBD2",
    description: "Funciona con cualquier vehículo que tenga protocolo OBD2 (post-2001 en México y EE.UU).",
    color: "text-cyan-400",
    bg: "bg-cyan-glow/10",
    border: "border-cyan-glow/15",
  },
  {
    icon: Bell,
    title: "Alertas preventivas",
    description: "Recibe notificaciones cuando detectamos anomalías antes de que se conviertan en fallas graves.",
    color: "text-violet-400",
    bg: "bg-violet-deep/10",
    border: "border-violet-deep/15",
  },
];

export function FeaturesHighlight() {
  return (
    <section id="funciones" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="max-w-2xl mb-16">
          <Badge variant="violet" className="mb-4">
            Funciones principales
          </Badge>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-5">
            Todo lo que necesitas
            <br />
            <span className="gradient-text">en un solo lugar.</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            MecaGuard combina la potencia de un escáner profesional con la
            simplicidad que cualquier conductor puede usar.
          </p>
        </AnimatedSection>

        {/* Features grid */}
        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          staggerDelay={0.08}
        >
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="glass-card glass-card-hover rounded-2xl p-6 h-full group">
                <div
                  className={`w-11 h-11 rounded-xl ${f.bg} border ${f.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-display text-base font-bold text-text-primary mb-2">
                  {f.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <AnimatedSection className="text-center mt-12">
          <Link
            href="/funciones"
            className="inline-flex items-center gap-2 text-blue-bright font-medium hover:text-text-primary transition-colors group"
          >
            Ver todas las funciones
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
