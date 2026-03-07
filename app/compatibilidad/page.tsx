import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, AlertCircle, ArrowRight, Car, Bluetooth, Plug } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Compatibilidad",
  description:
    "Verifica si tu vehículo y escáner OBD2 son compatibles con MecaGuard. Requisitos, protocolos y adaptadores recomendados.",
};

const requirements = [
  {
    ok: true,
    text: "Vehículos con protocolo OBD2 (post-2001 en México, 1996 en EE.UU., 2004 en Europa)",
  },
  { ok: true, text: "Adaptador ELM327 Bluetooth 4.0+ o Wi-Fi" },
  { ok: true, text: "Smartphone Android 8.0+ o iOS 13+" },
  { ok: true, text: "Bluetooth habilitado o conexión Wi-Fi en el dispositivo" },
];

const notCompatible = [
  { text: "Vehículos anteriores al año 2001 (sin protocolo OBD2)" },
  { text: "Motocicletas y cuatriciclos (OBD2 no aplica)" },
  { text: "Vehículos con sistemas de diagnóstico propietarios cerrados (algunos modelos premium)" },
];

const adapters = [
  {
    name: "ELM327 Bluetooth",
    price: "$150–$400 MXN",
    type: "Bluetooth",
    rating: 5,
    notes: "Más común, fácil de conseguir. Busca versión 1.5 o superior.",
  },
  {
    name: "ELM327 Wi-Fi",
    price: "$200–$500 MXN",
    type: "Wi-Fi",
    rating: 4,
    notes: "Ideal para iPhone. Conecta como una red Wi-Fi desde el auto.",
  },
  {
    name: "Vgate iCar Pro",
    price: "$400–$700 MXN",
    type: "Bluetooth 4.0",
    rating: 5,
    notes: "Calidad premium, muy estable. Recomendado para uso frecuente.",
  },
  {
    name: "OBDLink LX",
    price: "$800–$1,200 MXN",
    type: "Bluetooth",
    rating: 5,
    notes: "Máximo rendimiento, compatible con protocolos avanzados.",
  },
];

const protocols = [
  { code: "ISO 15765 (CAN)", coverage: "90%", note: "Estándar moderno, mayoría de autos post-2008" },
  { code: "ISO 14230 (KWP2000)", coverage: "6%", note: "Vehículos 2000–2007" },
  { code: "ISO 9141-2", coverage: "2%", note: "Autos europeos y asiáticos" },
  { code: "SAE J1850 PWM", coverage: "1%", note: "Ford pre-2008" },
  { code: "SAE J1850 VPW", coverage: "1%", note: "GM pre-2008" },
];

export default function CompatibilidadPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Badge variant="cyan" className="mb-5">Compatibilidad</Badge>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-text-primary mb-6">
              ¿Funciona con
              <br />
              <span className="gradient-text">tu vehículo?</span>
            </h1>
            <p className="text-text-secondary text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
              MecaGuard es compatible con la gran mayoría de vehículos modernos.
              Aquí encontrarás todo lo que necesitas saber antes de empezar.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 space-y-16">
        {/* Requisitos */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Compatible */}
          <AnimatedSection id="obd2">
            <div className="glass-card rounded-2xl p-7 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <h2 className="font-display text-xl font-bold text-text-primary">Compatible con</h2>
              </div>
              <ul className="space-y-3">
                {requirements.map((r) => (
                  <li key={r.text} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">{r.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* No compatible */}
          <AnimatedSection delay={0.1}>
            <div className="glass-card rounded-2xl p-7 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-400" />
                </div>
                <h2 className="font-display text-xl font-bold text-text-primary">No compatible con</h2>
              </div>
              <ul className="space-y-3">
                {notCompatible.map((r) => (
                  <li key={r.text} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">{r.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 p-3 rounded-xl bg-amber-500/8 border border-amber-500/15 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-300/80">
                  Si tienes dudas sobre tu modelo específico, contáctanos y lo verificamos.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Adaptadores recomendados */}
        <AnimatedSection id="elm327">
          <h2 className="font-display text-3xl font-bold text-text-primary mb-3">
            Adaptadores recomendados
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl">
            Cualquier adaptador ELM327 compatible funciona con MecaGuard. Estos
            son algunos de los más confiables del mercado.
          </p>
          <StaggerContainer className="grid sm:grid-cols-2 gap-4" staggerDelay={0.08}>
            {adapters.map((a) => (
              <StaggerItem key={a.name}>
                <div className="glass-card glass-card-hover rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-display font-bold text-text-primary">{a.name}</h3>
                      <span className="text-xs text-text-muted">{a.type}</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-blue-bright whitespace-nowrap">
                      {a.price}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mb-3">{a.notes}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-1 rounded-full ${
                          i < a.rating ? "bg-blue-electric" : "bg-border"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedSection>

        {/* Protocolos */}
        <AnimatedSection>
          <h2 className="font-display text-3xl font-bold text-text-primary mb-3">
            Protocolos soportados
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl">
            MecaGuard soporta todos los protocolos del estándar OBD2.
          </p>
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 px-6 py-3 border-b border-border text-xs font-semibold text-text-muted uppercase tracking-wider">
              <span>Protocolo</span>
              <span>Cobertura</span>
              <span>Notas</span>
            </div>
            {protocols.map((p, i) => (
              <div
                key={p.code}
                className={`grid grid-cols-3 px-6 py-4 text-sm items-center ${
                  i < protocols.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <span className="font-mono text-blue-bright text-xs">{p.code}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-electric to-cyan-glow"
                      style={{ width: p.coverage }}
                    />
                  </div>
                  <span className="text-xs text-text-muted">{p.coverage}</span>
                </div>
                <span className="text-xs text-text-secondary">{p.note}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="text-center">
          <h3 className="font-display text-2xl font-bold text-text-primary mb-4">
            ¿Aún tienes dudas de compatibilidad?
          </h3>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-electric to-blue-600 hover:shadow-glow-blue hover:-translate-y-0.5 transition-all duration-200"
          >
            Consultar compatibilidad
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </>
  );
}
