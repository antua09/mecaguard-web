import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle, Gauge, Brain, History, Plug, Bell,
  ArrowRight, Settings, Map, BarChart3, Wifi
} from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { CTA } from "@/sections/CTA";

export const metadata: Metadata = {
  title: "Funciones",
  description:
    "Descubre todas las funciones de MecaGuard: lectura DTC, sensores en tiempo real, historial de escaneos, alertas preventivas y más.",
};

const mainFeatures = [
  {
    icon: AlertTriangle,
    title: "Lectura y borrado de códigos DTC",
    description:
      "Accede a los códigos de diagnóstico almacenados y pendientes en la ECU de tu vehículo. MecaGuard los interpreta en lenguaje claro, indicando la causa probable, la gravedad y si es seguro seguir circulando. Una vez reparada la falla, borra el código desde la misma app.",
    tags: ["Códigos P, A, B, U", "Severidad indicada", "Borrado de fallas"],
    color: "blue",
    badge: "Diagnóstico",
  },
  {
    icon: Gauge,
    title: "Monitoreo de sensores en tiempo real",
    description:
      "Visualiza más de 30 parámetros de tu motor mientras el vehículo opera: RPM, velocidad, temperatura del refrigerante, presión del colector, voltaje de batería, posición del acelerador y más. Datos actualizados en milisegundos.",
    tags: ["30+ sensores OBD", "Actualización en tiempo real", "Gráficas históricas"],
    color: "cyan",
    badge: "Sensores",
  },
  {
    icon: Brain,
    title: "Interpretación inteligente de fallas",
    description:
      "No basta con leer el código. MecaGuard analiza el contexto: el tipo de vehículo, los parámetros relacionados y la frecuencia de la falla para darte una explicación comprensible. Sabrás si es un problema serio o algo menor.",
    tags: ["Análisis contextual", "Lenguaje comprensible", "Recomendaciones claras"],
    color: "violet",
    badge: "Inteligencia",
  },
  {
    icon: History,
    title: "Historial completo de escaneos",
    description:
      "Guarda automáticamente cada sesión de diagnóstico. Compara el estado de tu vehículo a lo largo del tiempo, rastrea la evolución de una falla y documenta las reparaciones realizadas.",
    tags: ["Almacenamiento en nube", "Comparación temporal", "Exportación PDF"],
    color: "blue",
    badge: "Historial",
  },
  {
    icon: Bell,
    title: "Alertas y notificaciones preventivas",
    description:
      "MecaGuard detecta señales de alerta antes de que aparezca el testigo: valores fuera de rango, fluctuaciones anómalas, cambios de tendencia. Te notifica para que actúes antes de que sea una falla costosa.",
    tags: ["Alertas por parámetro", "Notificaciones push", "Umbrales personalizables"],
    color: "cyan",
    badge: "Prevención",
  },
  {
    icon: Plug,
    title: "Compatibilidad amplia OBD2",
    description:
      "Compatible con protocolos OBD2 estándar: ISO 9141-2, ISO 14230 (KWP), ISO 15765 (CAN), SAE J1850 PWM y VPW. Funciona con la inmensa mayoría de vehículos del mundo.",
    tags: ["Todos los protocolos OBD2", "ELM327 compatible", "+10,000 modelos"],
    color: "violet",
    badge: "Compatibilidad",
  },
  {
    icon: BarChart3,
    title: "Dashboard de salud del vehículo",
    description:
      "Un panel visual que muestra el estado general de tu auto de un vistazo: puntuación de salud, sistemas monitoreados, alertas activas y próximas revisiones.",
    tags: ["Score de salud", "Vista general", "Sistemas monitoreados"],
    color: "blue",
    badge: "Dashboard",
  },
  {
    icon: Map,
    title: "Registro de viajes",
    description:
      "Documenta rutas y viajes con datos técnicos asociados: consumo estimado, temperatura máxima, RPM promedio. Útil para detectar patrones relacionados con condiciones de manejo.",
    tags: ["Rutas registradas", "Datos técnicos por viaje", "Estadísticas"],
    color: "cyan",
    badge: "Viajes",
  },
  {
    icon: Wifi,
    title: "Conexión estable y rápida",
    description:
      "Soporte para adaptadores Bluetooth 4.0+ y Wi-Fi. La conexión se mantiene estable incluso en movimiento, con reconexión automática si hay interrupciones.",
    tags: ["Bluetooth y Wi-Fi", "Reconexión automática", "Baja latencia"],
    color: "violet",
    badge: "Conectividad",
  },
];

const colorMap: Record<string, string> = {
  blue: "text-blue-bright bg-blue-electric/10 border-blue-electric/15",
  cyan: "text-cyan-400 bg-cyan-glow/10 border-cyan-glow/15",
  violet: "text-violet-400 bg-violet-deep/10 border-violet-deep/15",
};

const badgeVariantMap: Record<string, "blue" | "cyan" | "violet"> = {
  blue: "blue",
  cyan: "cyan",
  violet: "violet",
};

export default function FuncionesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-70" />
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Badge variant="blue" className="mb-5">Funciones completas</Badge>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Todo lo que un diagnóstico
              <br />
              <span className="gradient-text">profesional debería tener.</span>
            </h1>
            <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              MecaGuard no es una app de códigos OBD. Es una plataforma de
              diagnóstico completa diseñada para conductores que quieren
              entender y cuidar su vehículo.
            </p>
            <Link
              href="/planes"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-electric to-blue-600 hover:shadow-glow-blue hover:-translate-y-0.5 transition-all duration-200"
            >
              Probar MecaGuard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {mainFeatures.map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 0.04}>
                <div className="glass-card glass-card-hover rounded-2xl p-7 sm:p-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${colorMap[feature.color]}`}
                      >
                        <feature.icon className={`w-6 h-6 ${colorMap[feature.color].split(" ")[0]}`} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="font-display text-xl font-bold text-text-primary">
                          {feature.title}
                        </h3>
                        <Badge variant={badgeVariantMap[feature.color]}>
                          {feature.badge}
                        </Badge>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {feature.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-text-muted bg-surface-2 border border-border rounded-full px-3 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
