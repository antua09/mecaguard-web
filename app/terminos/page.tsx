import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Términos de Uso",
  description: "Términos y condiciones de uso de MecaGuard.",
};

const sections = [
  {
    title: "1. Aceptación de los términos",
    content: "Al crear una cuenta o usar MecaGuard, aceptas estos términos de uso en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, te pedimos que no uses el servicio.",
  },
  {
    title: "2. Descripción del servicio",
    content: "MecaGuard es una plataforma de diagnóstico automotriz que permite leer y analizar datos de vehículos a través del protocolo OBD2. El servicio está pensado como una herramienta informativa de apoyo y no reemplaza el diagnóstico profesional de un mecánico certificado.",
  },
  {
    title: "3. Limitación de responsabilidad",
    content: "MecaGuard proporciona información basada en los datos recibidos del protocolo OBD2. La interpretación y las decisiones derivadas de dichos datos son responsabilidad exclusiva del usuario. MecaGuard no se hace responsable por daños al vehículo, accidentes o pérdidas derivadas del uso o mal uso de la información proporcionada.",
  },
  {
    title: "4. Uso aceptable",
    content: "El usuario se compromete a usar MecaGuard únicamente con fines legales y para vehículos de su propiedad o sobre los que tiene autorización expresa del propietario. Está prohibido usar el servicio para actividades ilícitas, manipulación de sistemas de control del vehículo o cualquier uso que viole leyes locales o internacionales.",
  },
  {
    title: "5. Planes y pagos",
    content: "Los planes de pago se cobran de forma mensual o anual según la modalidad elegida. Puedes cancelar en cualquier momento desde la configuración de tu cuenta. No se realizan reembolsos por períodos parciales, excepto en los casos requeridos por la ley. Los precios pueden cambiar con aviso previo de 30 días.",
  },
  {
    title: "6. Cuenta y seguridad",
    content: "Eres responsable de mantener la seguridad de tu cuenta y contraseña. MecaGuard no se hace responsable de pérdidas derivadas del acceso no autorizado a tu cuenta. En caso de sospecha de acceso no autorizado, debes notificarnos de inmediato.",
  },
  {
    title: "7. Propiedad intelectual",
    content: "Todo el contenido de MecaGuard, incluyendo software, diseño, texto, gráficos y marcas, es propiedad de MecaGuard o sus licenciantes y está protegido por leyes de propiedad intelectual. No está permitido copiar, modificar, distribuir o crear obras derivadas sin autorización expresa.",
  },
  {
    title: "8. Modificaciones del servicio",
    content: "Nos reservamos el derecho de modificar, suspender o discontinuar cualquier parte del servicio con o sin previo aviso. Para cambios significativos, notificaremos a los usuarios con al menos 30 días de anticipación.",
  },
  {
    title: "9. Legislación aplicable",
    content: "Estos términos se rigen por las leyes de México. Cualquier disputa se resolverá en los tribunales competentes de la Ciudad de México, México.",
  },
  {
    title: "10. Contacto",
    content: "Para preguntas sobre estos términos, escríbenos a legal@mecaguard.app.",
  },
];

export default function TerminosPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <Badge variant="outline" className="mb-5">Legal</Badge>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-4">
              Términos de Uso
            </h1>
            <p className="text-text-muted text-sm">Última actualización: Enero 2025</p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-32">
        <AnimatedSection>
          <div className="glass-card rounded-2xl p-7 mb-6 border border-amber-500/15">
            <p className="text-text-secondary text-sm leading-relaxed">
              <strong className="text-amber-400">Aviso importante:</strong> MecaGuard es
              una herramienta de diagnóstico informativa. La información
              proporcionada no reemplaza la opinión de un mecánico profesional
              certificado. Siempre consulta a un experto ante dudas sobre la
              seguridad de tu vehículo.
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-4">
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
