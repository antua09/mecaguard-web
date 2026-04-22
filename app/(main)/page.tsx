import Link from "next/link";
import { Zap, Shield, Activity, Coins, ArrowRight, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MecaGuard — Diagnóstico Automotriz Inteligente",
};

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary mb-8">
            <Zap size={14} />
            Diagnóstico OBD2 con IA
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-6">
            Tu vehículo,<br />
            <span className="gradient-text">sin secretos.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Conecta tu escáner OBD2 y diagnostica tu auto como un profesional. Sin suscripciones, solo paga lo que usas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Comenzar gratis
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/planes"
              className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent transition-colors"
            >
              <Coins size={18} />
              Ver precios
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            {[
              { value: "+10,000", label: "Vehículos" },
              { value: "+3,500", label: "Códigos DTC" },
              { value: "98%", label: "Satisfacción" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-display font-bold gradient-text">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Todo lo que necesitas</h2>
            <p className="text-muted-foreground">Diagnóstico profesional desde tu smartphone.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Activity,
                title: "Diagnóstico en tiempo real",
                desc: "Lee códigos DTC, RPM, temperatura y más desde tu OBD2.",
                color: "text-blue-400 bg-blue-400/10",
              },
              {
                icon: Shield,
                title: "Datos privados",
                desc: "Tu información se almacena de forma segura en la nube.",
                color: "text-green-400 bg-green-400/10",
              },
              {
                icon: Coins,
                title: "Sin suscripciones",
                desc: "Paga solo lo que usas. Cada crédito = $20 MXN.",
                color: "text-amber-400 bg-amber-400/10",
              },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-card border border-border rounded-2xl p-6">
                  <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center mb-4`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-3xl p-12">
          <Coins size={36} className="text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold mb-3">
            Empieza con 3 créditos gratis
          </h2>
          <p className="text-muted-foreground mb-2">Sin tarjeta de crédito. Acceso inmediato.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center text-sm text-muted-foreground mb-8">
            {["3 créditos gratis", "Sin suscripción", "Cancela cuando quieras"].map((b) => (
              <span key={b} className="flex items-center gap-1">
                <CheckCircle size={13} className="text-primary" />
                {b}
              </span>
            ))}
          </div>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Crear cuenta gratis
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}
