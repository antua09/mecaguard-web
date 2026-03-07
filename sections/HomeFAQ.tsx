"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

const faqs = [
  {
    q: "¿Necesito un escáner especial para usar MecaGuard?",
    a: "No. Solo necesitas un adaptador OBD2 estándar compatible con ELM327 (Bluetooth o Wi-Fi). Son económicos y fáciles de conseguir. MecaGuard hace el resto.",
  },
  {
    q: "¿Funciona con cualquier vehículo?",
    a: "MecaGuard es compatible con cualquier vehículo que use protocolo OBD2: la mayoría de autos fabricados desde el año 2001 en México, 1996 en EE.UU. y 2004 en Europa.",
  },
  {
    q: "¿Qué tipo de fallas puede detectar?",
    a: "Detecta códigos de motor (P), transmisión (A/B), carrocería (B) y red (U). También monitorea sensores en tiempo real para detectar anomalías antes de que enciendan el testigo.",
  },
  {
    q: "¿Mis datos son privados?",
    a: "Sí. Tus datos de diagnóstico están cifrados y nunca se comparten con terceros. Tú controlas completamente tu información.",
  },
];

export function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Preguntas frecuentes</Badge>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary mb-5">
            Resolvemos tus dudas
          </h2>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div
                className={cn(
                  "glass-card rounded-xl overflow-hidden transition-all duration-200",
                  open === i && "border-blue-electric/25"
                )}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                >
                  <span className="font-medium text-text-primary text-sm leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-text-muted flex-shrink-0 transition-transform duration-200",
                      open === i && "rotate-180 text-blue-bright"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-4 text-sm text-text-secondary leading-relaxed border-t border-border pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-8">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-sm text-blue-bright hover:text-text-primary transition-colors group"
          >
            Ver todas las preguntas
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
