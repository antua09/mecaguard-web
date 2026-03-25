"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Zap, Star, Building2, Wrench, Check, Coins } from "lucide-react";
import Link from "next/link";

const PACKAGES = [
  {
    id: "basic",
    name: "Básico",
    icon: Zap,
    credits: 50,
    price: 9.99,
    priceMXN: 170,
    color: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
    features: ["50 créditos", "Sin vencimiento", "Soporte por email", "Historial de diagnósticos"],
    popular: false,
  },
  {
    id: "standard",
    name: "Estándar",
    icon: Star,
    credits: 150,
    price: 19.99,
    priceMXN: 340,
    color: "from-violet-500/20 to-violet-600/5",
    border: "border-violet-500/30",
    iconColor: "text-violet-400",
    features: ["150 créditos", "Sin vencimiento", "Soporte prioritario", "Historial completo", "Exportar reportes PDF"],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    icon: Building2,
    credits: 400,
    price: 39.99,
    priceMXN: 680,
    color: "from-cyan-500/20 to-cyan-600/5",
    border: "border-cyan-500/30",
    iconColor: "text-cyan-400",
    features: ["400 créditos", "Sin vencimiento", "Soporte 24/7", "Historial ilimitado", "Reportes avanzados", "API access"],
    popular: false,
  },
  {
    id: "workshop",
    name: "Taller",
    icon: Wrench,
    credits: 1000,
    price: 79.99,
    priceMXN: 1360,
    color: "from-amber-500/20 to-amber-600/5",
    border: "border-amber-500/30",
    iconColor: "text-amber-400",
    features: ["1,000 créditos", "Sin vencimiento", "Gerente de cuenta", "Multi-usuario (5)", "Dashboard taller", "Facturación"],
    popular: false,
  },
];

export default function PlanesPage() {
  const [currency, setCurrency] = useState<"USD" | "MXN">("USD");

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary mb-6"
        >
          <Coins size={16} />
          Sistema de créditos
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Paga solo lo que usas
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg max-w-xl mx-auto mb-8"
        >
          Sin suscripciones. Sin sorpresas. Compra créditos una vez y úsalos cuando los necesites — nunca vencen.
        </motion.p>

        {/* Currency toggle */}
        <div className="inline-flex items-center bg-card border border-border rounded-full p-1">
          <button
            onClick={() => setCurrency("USD")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${currency === "USD" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            USD
          </button>
          <button
            onClick={() => setCurrency("MXN")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${currency === "MXN" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            MXN
          </button>
        </div>
      </div>

      {/* Packages grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PACKAGES.map((pkg, i) => {
          const Icon = pkg.icon;
          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className={`relative rounded-2xl border bg-gradient-to-b p-6 flex flex-col ${pkg.border} ${pkg.color} ${pkg.popular ? "ring-2 ring-primary" : ""}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Más popular
                </div>
              )}

              <div className={`w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center mb-4 ${pkg.iconColor}`}>
                <Icon size={20} />
              </div>

              <h3 className="text-lg font-bold mb-1">{pkg.name}</h3>

              <div className="flex items-end gap-1 mb-1">
                <span className="text-3xl font-bold">
                  {currency === "USD" ? `$${pkg.price}` : `$${pkg.priceMXN}`}
                </span>
                <span className="text-muted-foreground text-sm mb-1">{currency}</span>
              </div>

              <div className="flex items-center gap-1.5 text-sm font-semibold text-primary mb-6">
                <Coins size={14} />
                {pkg.credits.toLocaleString()} créditos
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={14} className="text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${pkg.popular ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-card border border-border hover:border-primary/50 hover:text-primary"}`}
              >
                Comenzar ahora
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-muted-foreground text-sm mt-12"
      >
        🔒 Pagos seguros · Los créditos nunca vencen · Soporte en español
      </motion.p>
    </div>
  );
}