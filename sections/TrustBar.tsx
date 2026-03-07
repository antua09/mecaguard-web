"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Star, Users, Car, Shield } from "lucide-react";

const trustItems = [
  { icon: Users, value: "12,000+", label: "Usuarios activos" },
  { icon: Car, value: "50,000+", label: "Diagnósticos realizados" },
  { icon: Star, value: "4.9/5", label: "Calificación promedio" },
  { icon: Shield, value: "100%", label: "Datos privados y seguros" },
];

export function TrustBar() {
  return (
    <section className="py-12 border-y border-border/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-surface/50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustItems.map((item, i) => (
            <AnimatedSection key={item.label} delay={i * 0.1} className="text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-electric/10 border border-blue-electric/15 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-blue-bright" />
                </div>
              </div>
              <div className="font-display text-2xl font-bold text-text-primary mb-1">
                {item.value}
              </div>
              <div className="text-xs text-text-muted">{item.label}</div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
