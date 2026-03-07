import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, Zap, Shield, Star } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Planes y precios",
  description:
    "Elige el plan MecaGuard que mejor se adapta a tus necesidades. Plan gratuito disponible, sin tarjeta de crédito.",
};

const plans = [
  {
    name: "Básico",
    icon: Shield,
    price: "Gratis",
    period: "",
    description: "Para conductores que quieren entender su vehículo sin compromisos.",
    color: "border-border",
    featured: false,
    cta: "Empezar gratis",
    features: {
      "Lectura de códigos DTC": true,
      "Borrado de códigos DTC": false,
      "Escaneos por mes": "5",
      "Sensores en tiempo real": false,
      "Historial de escaneos": "7 días",
      "Alertas preventivas": false,
      "Dashboard de salud": false,
      "Soporte": "Comunidad",
      "Exportación PDF": false,
      "Múltiples vehículos": false,
    },
  },
  {
    name: "Premium",
    icon: Zap,
    price: "$99",
    period: "/mes MXN",
    description: "Para conductores que quieren el control total de su vehículo.",
    color: "border-blue-electric/40",
    featured: true,
    cta: "Probar 14 días gratis",
    yearlyNote: "o $890/año (ahorra 25%)",
    features: {
      "Lectura de códigos DTC": true,
      "Borrado de códigos DTC": true,
      "Escaneos por mes": "Ilimitados",
      "Sensores en tiempo real": true,
      "Historial de escaneos": "12 meses",
      "Alertas preventivas": true,
      "Dashboard de salud": true,
      "Soporte": "Prioritario",
      "Exportación PDF": true,
      "Múltiples vehículos": "3 vehículos",
    },
  },
  {
    name: "Pro",
    icon: Star,
    price: "$199",
    period: "/mes MXN",
    description: "Para talleres y usuarios avanzados que gestionan múltiples autos.",
    color: "border-violet-deep/30",
    featured: false,
    cta: "Contactar ventas",
    features: {
      "Lectura de códigos DTC": true,
      "Borrado de códigos DTC": true,
      "Escaneos por mes": "Ilimitados",
      "Sensores en tiempo real": true,
      "Historial de escaneos": "Ilimitado",
      "Alertas preventivas": true,
      "Dashboard de salud": true,
      "Soporte": "Dedicado",
      "Exportación PDF": true,
      "Múltiples vehículos": "Ilimitados",
    },
  },
];

const featureList = Object.keys(plans[0].features);

export default function PlanesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Badge variant="blue" className="mb-5">Planes y precios</Badge>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-text-primary mb-6">
              Simple. Transparente.
              <br />
              <span className="gradient-text">Sin sorpresas.</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Empieza gratis. Actualiza solo si lo necesitas. Sin contratos ni compromisos de permanencia.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* Cards */}
        <StaggerContainer
          className="grid md:grid-cols-3 gap-5 mb-16"
          staggerDelay={0.12}
        >
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div
                className={`relative rounded-2xl p-7 h-full flex flex-col border ${plan.color} ${
                  plan.featured
                    ? "bg-gradient-to-b from-blue-electric/8 to-surface shadow-[0_0_60px_rgba(45,127,255,0.08)]"
                    : "bg-surface"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant="blue">
                      <Zap className="w-2.5 h-2.5" />
                      Más popular
                    </Badge>
                  </div>
                )}

                {/* Header */}
                <div className="mb-7 pb-7 border-b border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        plan.featured
                          ? "bg-blue-electric/15 border border-blue-electric/20"
                          : "bg-surface-2 border border-border"
                      }`}
                    >
                      <plan.icon
                        className={`w-4.5 h-4.5 ${
                          plan.featured ? "text-blue-bright" : "text-text-secondary"
                        }`}
                      />
                    </div>
                    <span className="font-display font-bold text-text-primary">{plan.name}</span>
                  </div>
                  <p className="text-text-secondary text-sm mb-5 leading-relaxed">{plan.description}</p>
                  <div className="flex items-end gap-1">
                    <span className="font-display text-4xl font-bold text-text-primary">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-text-muted text-sm mb-1">{plan.period}</span>
                    )}
                  </div>
                  {"yearlyNote" in plan && (
                    <p className="text-xs text-text-muted mt-1">{plan.yearlyNote}</p>
                  )}
                </div>

                {/* Feature list */}
                <ul className="space-y-3 mb-7 flex-1">
                  {featureList.slice(0, 6).map((feat) => {
                    const val = plan.features[feat as keyof typeof plan.features];
                    const isTrue = val === true;
                    const isFalse = val === false;
                    return (
                      <li key={feat} className="flex items-center gap-2.5 text-sm">
                        {isTrue ? (
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        ) : isFalse ? (
                          <X className="w-4 h-4 text-text-muted/40 flex-shrink-0" />
                        ) : (
                          <Check className="w-4 h-4 text-blue-bright flex-shrink-0" />
                        )}
                        <span className={isFalse ? "text-text-muted/50" : "text-text-secondary"}>
                          {feat}
                          {!isTrue && !isFalse && (
                            <span className="ml-1.5 text-text-primary font-medium">· {val}</span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* CTA */}
                <Link
                  href={plan.name === "Pro" ? "/contacto" : "/contacto"}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    plan.featured
                      ? "bg-gradient-to-r from-blue-electric to-blue-600 text-white hover:shadow-glow-blue hover:-translate-y-0.5"
                      : "border border-border text-text-secondary hover:border-border-light hover:text-text-primary hover:bg-surface-2"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Comparison table */}
        <AnimatedSection>
          <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
            Comparativa completa
          </h2>
          <div className="glass-card rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 px-6 py-4 border-b border-border bg-surface-2">
              <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">Función</div>
              {plans.map((p) => (
                <div key={p.name} className="text-center">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      p.featured ? "text-blue-bright" : "text-text-muted"
                    }`}
                  >
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
            {featureList.map((feat, i) => (
              <div
                key={feat}
                className={`grid grid-cols-4 px-6 py-3.5 text-sm items-center ${
                  i < featureList.length - 1 ? "border-b border-border/40" : ""
                }`}
              >
                <span className="text-text-secondary text-sm">{feat}</span>
                {plans.map((p) => {
                  const val = p.features[feat as keyof typeof p.features];
                  return (
                    <div key={p.name} className="flex justify-center">
                      {val === true ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : val === false ? (
                        <X className="w-4 h-4 text-text-muted/30" />
                      ) : (
                        <span className="text-xs font-medium text-text-secondary">{val}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </>
  );
}
