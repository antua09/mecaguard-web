"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

const faqCategories = [
  {
    category: "General",
    badge: "blue" as const,
    items: [
      {
        q: "¿Qué es MecaGuard?",
        a: "MecaGuard es una app de diagnóstico automotriz que se conecta al puerto OBD2 de tu vehículo a través de un adaptador ELM327. Lee códigos de falla, monitorea sensores en tiempo real y te explica el estado de tu auto en lenguaje claro.",
      },
      {
        q: "¿Es MecaGuard gratis?",
        a: "MecaGuard tiene un plan gratuito que incluye lectura de códigos DTC y hasta 5 escaneos por mes. Para funciones avanzadas como sensores en tiempo real, alertas y escaneos ilimitados, existe el plan Premium.",
      },
      {
        q: "¿En qué dispositivos funciona?",
        a: "MecaGuard está disponible para Android (8.0+) e iOS (13+). La web de gestión es compatible con cualquier navegador moderno.",
      },
    ],
  },
  {
    category: "Escáner y conexión",
    badge: "cyan" as const,
    items: [
      {
        q: "¿Necesito comprar un escáner?",
        a: "Sí, necesitas un adaptador OBD2 compatible con ELM327 (Bluetooth o Wi-Fi). Son económicos y fáciles de conseguir en línea o en tiendas de refacciones. Su precio varía entre $150 y $700 MXN.",
      },
      {
        q: "¿Qué tipo de adaptador OBD2 necesito?",
        a: "Cualquier adaptador ELM327 Bluetooth 4.0+ o Wi-Fi es compatible. Para Android recomendamos Bluetooth; para iPhone, Wi-Fi. Marcas como Vgate, OBDLink o adaptadores genéricos ELM327 v1.5 o superior funcionan correctamente.",
      },
      {
        q: "¿Dónde está el puerto OBD2 de mi vehículo?",
        a: "El puerto OBD2 generalmente se encuentra debajo del tablero, en el lado del conductor, cerca de la columna de dirección. Tiene forma trapezoidal con 16 pines y no requiere herramientas para conectar el adaptador.",
      },
      {
        q: "¿La app se conecta sola o tengo que hacer algo?",
        a: "Al abrir MecaGuard con el adaptador conectado al auto y el Bluetooth/Wi-Fi activo en tu teléfono, la app detecta automáticamente el dispositivo y establece la conexión en pocos segundos.",
      },
    ],
  },
  {
    category: "Compatibilidad de vehículos",
    badge: "violet" as const,
    items: [
      {
        q: "¿Funciona con cualquier vehículo?",
        a: "MecaGuard es compatible con cualquier vehículo que utilice el protocolo OBD2: prácticamente todos los autos fabricados desde 2001 en México, 1996 en EE.UU. y 2004 en Europa. No es compatible con motocicletas ni vehículos anteriores a OBD2.",
      },
      {
        q: "¿Funciona con mi auto de otra marca o país?",
        a: "Sí. OBD2 es un estándar internacional. Ya sea Toyota, Nissan, Honda, Volkswagen, Chevrolet, Ford, Kia, Hyundai u otras marcas, si el vehículo tiene OBD2, MecaGuard funcionará.",
      },
      {
        q: "¿Qué pasa con vehículos híbridos o eléctricos?",
        a: "Los híbridos con motor de combustión interna y eléctrico (como Toyota Prius, Nissan Leaf con modo ICE) son compatibles para el diagnóstico del sistema ICE. Los eléctricos puros tienen soporte parcial dependiendo del fabricante.",
      },
    ],
  },
  {
    category: "Diagnóstico y fallas",
    badge: "blue" as const,
    items: [
      {
        q: "¿Qué tipo de fallas puede detectar MecaGuard?",
        a: "MecaGuard detecta todos los códigos OBD2 estándar: códigos P (motor y transmisión), B (carrocería), C (chasis) y U (red de comunicación). También monitorea parámetros fuera de rango que pueden indicar fallas incipientes.",
      },
      {
        q: "¿Puedo borrar las fallas desde la app?",
        a: "Sí, en el plan Premium puedes borrar los códigos DTC una vez que se ha solucionado la falla. Ten en cuenta que borrar un código no resuelve el problema subyacente: si la falla persiste, el código volverá a aparecer.",
      },
      {
        q: "¿MecaGuard puede apagar la luz del motor (Check Engine)?",
        a: "Sí. Al borrar el código DTC asociado al testigo, la luz se apaga. Sin embargo, si el problema que la causó no fue reparado, el testigo volverá a encenderse en el siguiente ciclo de conducción.",
      },
      {
        q: "¿Cómo empiezo a diagnosticar mi auto?",
        a: "Es muy sencillo: 1) Conecta el adaptador OBD2 al puerto de tu auto. 2) Abre MecaGuard y activa Bluetooth o Wi-Fi. 3) La app se conectará automáticamente y podrás iniciar el escaneo. El proceso toma menos de un minuto.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("glass-card rounded-xl overflow-hidden", open && "border-blue-electric/20")}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 hover:bg-surface-2/30 transition-colors"
      >
        <span className="font-medium text-text-primary text-sm leading-snug">{q}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-text-muted flex-shrink-0 transition-transform duration-200",
            open && "rotate-180 text-blue-bright"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 text-sm text-text-secondary leading-relaxed border-t border-border pt-3">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Badge variant="outline" className="mb-5">Soporte</Badge>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-text-primary mb-6">
              Preguntas
              <br />
              <span className="gradient-text">frecuentes</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-lg mx-auto">
              Aquí encontrarás respuesta a las dudas más comunes sobre
              MecaGuard, el escáner y el diagnóstico de tu vehículo.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-32 space-y-14">
        {faqCategories.map((cat, ci) => (
          <AnimatedSection key={cat.category} delay={ci * 0.05}>
            <div className="flex items-center gap-3 mb-5">
              <Badge variant={cat.badge}>{cat.category}</Badge>
            </div>
            <div className="space-y-2.5">
              {cat.items.map((item, ii) => (
                <FAQItem key={ii} q={item.q} a={item.a} />
              ))}
            </div>
          </AnimatedSection>
        ))}

        {/* Contact CTA */}
        <AnimatedSection>
          <div className="glass-card rounded-2xl p-8 text-center border border-blue-electric/15">
            <h3 className="font-display text-xl font-bold text-text-primary mb-2">
              ¿No encontraste tu respuesta?
            </h3>
            <p className="text-text-secondary text-sm mb-6">
              Escríbenos directamente. Respondemos en menos de 24 horas.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-electric to-blue-600 hover:shadow-glow-blue hover:-translate-y-0.5 transition-all duration-200 text-sm"
            >
              Ir a contacto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
}
