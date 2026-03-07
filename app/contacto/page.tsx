import type { Metadata } from "next";
import { Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos con cualquier pregunta sobre MecaGuard. Respondemos en menos de 24 horas.",
};

const contactInfo = [
  {
    icon: Mail,
    label: "Correo",
    value: "hola@mecaguard.app",
    link: "mailto:hola@mecaguard.app",
    color: "text-blue-bright",
    bg: "bg-blue-electric/10 border-blue-electric/15",
  },
  {
    icon: MessageSquare,
    label: "Soporte técnico",
    value: "soporte@mecaguard.app",
    link: "mailto:soporte@mecaguard.app",
    color: "text-cyan-400",
    bg: "bg-cyan-glow/10 border-cyan-glow/15",
  },
  {
    icon: Clock,
    label: "Tiempo de respuesta",
    value: "Menos de 24 horas",
    color: "text-violet-400",
    bg: "bg-violet-deep/10 border-violet-deep/15",
  },
];

export default function ContactoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Badge variant="blue" className="mb-5">Contacto</Badge>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-text-primary mb-5">
              ¿Tienes alguna{" "}
              <span className="gradient-text">pregunta?</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-lg mx-auto">
              Nuestro equipo está listo para ayudarte. Escríbenos y te
              respondemos en menos de 24 horas.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left: Info */}
          <AnimatedSection className="lg:col-span-2">
            <div className="space-y-4 mb-8">
              {contactInfo.map((c) => (
                <div key={c.label} className={`glass-card rounded-xl p-4 flex items-center gap-4`}>
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${c.bg}`}
                  >
                    <c.icon className={`w-5 h-5 ${c.color}`} />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-0.5">{c.label}</div>
                    {c.link ? (
                      <a
                        href={c.link}
                        className="text-sm text-text-primary hover:text-blue-bright transition-colors"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <span className="text-sm text-text-primary">{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-xl p-5 border border-blue-electric/10">
              <h3 className="font-display font-bold text-text-primary mb-2 text-sm">
                ¿Eres taller o empresa?
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed mb-3">
                Tenemos planes y condiciones especiales para negocios. Cuéntanos
                tu caso en el formulario.
              </p>
              <span className="text-xs text-blue-bright font-medium">
                Planes Pro disponibles →
              </span>
            </div>
          </AnimatedSection>

          {/* Right: Form */}
          <AnimatedSection className="lg:col-span-3" delay={0.1}>
            <ContactForm />
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}
