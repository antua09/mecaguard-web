"use client";

import Link from "next/link";
import { Coins, Zap, Infinity, Shield, Activity, ArrowRight } from "lucide-react";
import { CREDIT_PRICE_MXN } from "@/lib/credits";

export default function PlanesPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary mb-6">
            <Coins size={15} />
            Sistema de créditos
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Sin suscripciones.<br />
            <span className="gradient-text">Solo créditos.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Cada crédito cuesta <strong className="text-foreground">${CREDIT_PRICE_MXN} MXN</strong>. Compra los que necesitas, cuando los necesitas. Nunca vencen.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Comenzar gratis — 3 créditos
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/creditos"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-xl font-semibold hover:bg-accent transition-colors"
            >
              <Coins size={16} />
              Comprar créditos
            </Link>
          </div>
        </div>

        {/* Price card */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-3xl p-8 text-center mb-12">
          <p className="text-sm text-muted-foreground mb-2">Precio por crédito</p>
          <div className="text-6xl font-display font-bold text-primary mb-1">${CREDIT_PRICE_MXN}</div>
          <p className="text-muted-foreground">MXN por crédito · Sin vencimiento</p>
        </div>

        {/* How it works */}
        <div className="mb-12">
          <h2 className="text-xl font-display font-bold text-center mb-8">¿Cómo funciona?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: "01", title: "Crea tu cuenta", desc: "Regístrate gratis y recibe 3 créditos de bienvenida." },
              { n: "02", title: "Compra créditos", desc: "Desde 1 crédito. $20 MXN cada uno, sin mínimo." },
              { n: "03", title: "Úsalos", desc: "Cada escaneo, reporte o consulta IA consume créditos." },
            ].map((s) => (
              <div key={s.n} className="text-center p-6 rounded-2xl bg-card border border-border">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="font-display font-bold text-primary">{s.n}</span>
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {[
            { icon: Infinity, title: "Sin vencimiento", desc: "Tus créditos no caducan nunca." },
            { icon: Coins, title: "Paga lo que usas", desc: "Sin cobros mensuales fijos." },
            { icon: Shield, title: "Transparencia", desc: "Historial completo de cada crédito gastado." },
            { icon: Activity, title: "Tiempo real", desc: "Saldo sincronizado en web y app móvil." },
          ].map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="flex gap-4 p-5 bg-card border border-border rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{b.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-display font-bold text-center mb-6">Preguntas frecuentes</h2>
          <div className="space-y-3">
            {[
              { q: "¿Los créditos vencen?", a: "No. Tus créditos no tienen fecha de vencimiento." },
              { q: "¿Puedo comprar 1 solo crédito?", a: `Sí. Puedes comprar desde 1 crédito por $${CREDIT_PRICE_MXN} MXN, sin mínimo de compra.` },
              { q: "¿Dónde veo mi saldo?", a: "En tu dashboard y en el Navbar siempre visible." },
              { q: "¿Funciona en la app móvil?", a: "Sí. El saldo es el mismo en web y app, sincronizado en tiempo real." },
            ].map((f) => (
              <div key={f.q} className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold text-sm mb-1">{f.q}</h3>
                <p className="text-muted-foreground text-sm">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
