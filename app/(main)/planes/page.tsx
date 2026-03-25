"use client";
import { motion } from "motion/react";
import { Coins, Zap, FileText, Bot, Activity, RotateCcw, TrendingUp, ShieldCheck, Infinity } from "lucide-react";
import Link from "next/link";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Crea tu cuenta",
    description: "Regístrate gratis y recibe 10 créditos de bienvenida para empezar a explorar MecaGuard sin costo.",
  },
  {
    step: "02",
    title: "Compra créditos",
    description: "Elige el paquete que mejor se adapte a tu uso. Sin suscripciones, sin cobros recurrentes.",
  },
  {
    step: "03",
    title: "Úsalos cuando quieras",
    description: "Cada acción en la app consume una cantidad de créditos. Tú decides cuándo y cómo usarlos.",
  },
];

const BENEFITS = [
  {
    icon: Infinity,
    title: "Sin vencimiento",
    description: "Tus créditos no caducan. Compra hoy y úsalos cuando los necesites.",
  },
  {
    icon: Coins,
    title: "Paga lo que usas",
    description: "Sin cobros mensuales fijos. Solo gastas créditos cuando realizas acciones.",
  },
  {
    icon: ShieldCheck,
    title: "Transparencia total",
    description: "Cada crédito gastado queda registrado en tu historial con detalle.",
  },
  {
    icon: Activity,
    title: "Sincronización en tiempo real",
    description: "Tu saldo se actualiza al instante en la web y en la app móvil.",
  },
];

export default function PlanesPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-4">

      {/* Hero */}
      <div className="text-center mb-20">
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
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
        >
          Sin suscripciones.<br />
          <span className="text-primary">Solo créditos.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10"
        >
          MecaGuard funciona con un sistema de créditos flexible. 
          Compra créditos una sola vez, úsalos cuando quieras y nunca pagues por lo que no usas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/register"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Comenzar gratis — 10 créditos
          </Link>
          <Link
            href="/contacto"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            ¿Tienes preguntas? Contáctanos →
          </Link>
        </motion.div>
      </div>

      {/* How it works */}
      <div className="max-w-4xl mx-auto mb-24">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-2xl font-bold text-center mb-12"
        >
          ¿Cómo funciona?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-lg">{item.step}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-4xl mx-auto mb-24">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-2xl font-bold text-center mb-12"
        >
          Ventajas del sistema de créditos
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {BENEFITS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 bg-card border border-border rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FAQ simple */}
      <div className="max-w-2xl mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-2xl font-bold text-center mb-10"
        >
          Preguntas frecuentes
        </motion.h2>
        <div className="space-y-4">
          {[
            {
              q: "¿Los créditos vencen?",
              a: "No. Tus créditos no tienen fecha de vencimiento. Puedes usarlos cuando quieras.",
            },
            {
              q: "¿Cómo sé cuántos créditos me quedan?",
              a: "Tu saldo aparece en el dashboard de la app y se actualiza en tiempo real cada vez que realizas una acción.",
            },
            {
              q: "¿Puedo ver en qué usé mis créditos?",
              a: "Sí. Cada acción queda registrada en tu historial de transacciones con fecha, descripción y cantidad de créditos.",
            },
            {
              q: "¿Los créditos funcionan también en la app móvil?",
              a: "Sí. El saldo es el mismo en la web y en la app móvil. Se sincroniza automáticamente.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-5"
            >
              <h4 className="font-semibold mb-2">{item.q}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto text-center bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-3xl p-10"
      >
        <Coins size={32} className="text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3">Empieza con 10 créditos gratis</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Crea tu cuenta y explora MecaGuard sin necesidad de tarjeta de crédito.
        </p>
        <Link
          href="/register"
          className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          Crear cuenta gratis
        </Link>
      </motion.div>

    </div>
  );
}