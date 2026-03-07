"use client";

import { motion } from "motion/react";
import { Bluetooth, Smartphone, FileText, ArrowRight } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";

const steps = [
  {
    step: "01",
    icon: Bluetooth,
    title: "Conecta tu escáner",
    description:
      "Inserta un adaptador OBD2 compatible (ELM327 Bluetooth o Wi-Fi) en el puerto de diagnóstico de tu vehículo, ubicado bajo el volante.",
    detail: "Compatible con ELM327, Vgate, OBDLink y más",
    color: "from-blue-electric/20 to-blue-electric/5",
    iconColor: "text-blue-bright",
    borderColor: "border-blue-electric/20",
  },
  {
    step: "02",
    icon: Smartphone,
    title: "Abre MecaGuard",
    description:
      "Lanza la app, selecciona tu vehículo y establece la conexión. MecaGuard detecta automáticamente el adaptador y se comunica con la ECU.",
    detail: "Conexión en menos de 5 segundos",
    color: "from-cyan-glow/20 to-cyan-glow/5",
    iconColor: "text-cyan-400",
    borderColor: "border-cyan-glow/20",
  },
  {
    step: "03",
    icon: FileText,
    title: "Obtén tu diagnóstico",
    description:
      "Recibe el informe completo: códigos DTC activos, parámetros en tiempo real, nivel de salud del motor y recomendaciones claras.",
    detail: "Diagnóstico en lenguaje comprensible, no técnico",
    color: "from-violet-deep/20 to-violet-deep/5",
    iconColor: "text-violet-400",
    borderColor: "border-violet-deep/20",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <Badge variant="blue" className="mb-4">
            Proceso simple
          </Badge>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-5">
            Así de fácil funciona
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Tres pasos y tendrás acceso completo al diagnóstico de tu vehículo.
            Sin conocimientos técnicos requeridos.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 relative" staggerDelay={0.15}>
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px bg-gradient-to-r from-blue-electric/30 via-cyan-glow/30 to-violet-deep/30" />

          {steps.map((step, i) => (
            <StaggerItem key={step.step}>
              <div className="relative glass-card glass-card-hover rounded-2xl p-7 h-full flex flex-col">
                {/* Step number */}
                <div className="absolute top-5 right-5 font-mono text-5xl font-bold text-text-muted/10 select-none">
                  {step.step}
                </div>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} border ${step.borderColor} flex items-center justify-center mb-6`}
                >
                  <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                  {step.description}
                </p>

                {/* Detail pill */}
                <div className="inline-flex items-center gap-1.5 text-xs text-text-muted bg-surface rounded-full px-3 py-1.5 border border-border w-fit">
                  <div className="w-1 h-1 rounded-full bg-blue-electric" />
                  {step.detail}
                </div>

                {/* Arrow (not last) */}
                {i < steps.length - 1 && (
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className="hidden md:block absolute -right-4 top-16 z-10"
                  >
                    <ArrowRight className="w-6 h-6 text-border" />
                  </motion.div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
