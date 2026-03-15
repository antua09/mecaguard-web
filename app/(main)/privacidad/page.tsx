import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de MecaGuard. Cómo recopilamos, usamos y protegemos tus datos.",
};

const sections = [
  {
    title: "1. Información que recopilamos",
    content: `MecaGuard recopila información para ofrecerte el servicio de diagnóstico automotriz. Esto incluye: datos de registro (nombre, correo electrónico), datos de diagnóstico del vehículo (códigos DTC, lecturas de sensores, historial de escaneos), datos técnicos del adaptador OBD2 y, con tu consentimiento, datos de ubicación para el registro de viajes. No recopilamos información de pago directamente; los pagos se procesan a través de proveedores seguros certificados.`,
  },
  {
    title: "2. Cómo usamos tu información",
    content: `Utilizamos tus datos exclusivamente para: proveer y mejorar el servicio de diagnóstico, personalizar tu experiencia en la app, enviarte notificaciones y alertas sobre tu vehículo (si lo autorizas), y cumplir con obligaciones legales. Nunca vendemos tus datos personales a terceros ni los usamos para publicidad de terceros.`,
  },
  {
    title: "3. Almacenamiento y seguridad",
    content: `Todos los datos se almacenan en servidores cifrados con AES-256. Las comunicaciones entre la app y nuestros servidores usan TLS 1.3. Los datos de diagnóstico del vehículo se asocian a un identificador anónimo y no se vinculan a información personal identificable en nuestros sistemas de análisis.`,
  },
  {
    title: "4. Compartir información",
    content: `Compartimos datos únicamente en estas situaciones: con proveedores de servicio que nos asisten (hosting, analítica) bajo acuerdos de confidencialidad estrictos; cuando sea requerido por ley o autoridad competente; o en una fusión o adquisición (notificándote previamente). Nunca compartimos tus datos de diagnóstico con fabricantes de vehículos, talleres o terceros sin tu consentimiento explícito.`,
  },
  {
    title: "5. Tus derechos",
    content: `Tienes derecho a: acceder a los datos que tenemos sobre ti, corregirlos si son incorrectos, solicitar su eliminación (derecho al olvido), oponerte al tratamiento de tus datos, y portabilidad de datos. Para ejercer cualquiera de estos derechos, escríbenos a privacidad@mecaguard.app con el asunto "Derechos ARCO".`,
  },
  {
    title: "6. Retención de datos",
    content: `Los datos de diagnóstico se retienen mientras tengas una cuenta activa. En el plan Premium, el historial se guarda por 12 meses. Al cancelar tu cuenta, tienes 30 días para exportar tus datos. Después de ese período, los datos son eliminados de forma segura e irreversible.`,
  },
  {
    title: "7. Cookies y analítica",
    content: `La web utiliza cookies técnicas necesarias para su funcionamiento. Con tu consentimiento, utilizamos analítica anónima para entender cómo se usa la plataforma y mejorarla. No usamos cookies de seguimiento de terceros ni publicidad comportamental.`,
  },
  {
    title: "8. Cambios en esta política",
    content: `Podemos actualizar esta política periódicamente. Te notificaremos de cambios significativos por correo electrónico y dentro de la app. La fecha de última actualización siempre estará visible al inicio de este documento.`,
  },
  {
    title: "9. Contacto",
    content: `Si tienes preguntas sobre esta política, contáctanos en privacidad@mecaguard.app. Nuestro equipo de privacidad responde en menos de 48 horas hábiles.`,
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <Badge variant="outline" className="mb-5">Legal</Badge>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-4">
              Política de Privacidad
            </h1>
            <p className="text-text-muted text-sm">
              Última actualización: Enero 2025
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-32">
        <AnimatedSection>
          <div className="glass-card rounded-2xl p-7 mb-6 border border-blue-electric/10">
            <p className="text-text-secondary text-sm leading-relaxed">
              En MecaGuard nos tomamos muy en serio tu privacidad. Esta política
              explica de forma clara qué datos recopilamos, cómo los usamos y
              cómo los protegemos. Si tienes dudas, no dudes en contactarnos.
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-6">
          {sections.map((sec, i) => (
            <AnimatedSection key={sec.title} delay={i * 0.03}>
              <div className="glass-card rounded-xl p-6">
                <h2 className="font-display text-base font-bold text-text-primary mb-3">
                  {sec.title}
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed">{sec.content}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </>
  );
}
