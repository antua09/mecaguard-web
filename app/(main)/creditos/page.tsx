"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Coins, Plus, Minus, ShoppingCart, CheckCircle,
  Zap, FileText, Bot, TrendingUp, ArrowLeft, Infinity
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  subscribeToCredits,
  purchaseCredits,
  type CreditBalance,
  CREDIT_PRICE_MXN,
  CREDIT_COSTS,
} from "@/lib/credits";

const QUICK_AMOUNTS = [1, 5, 10, 20, 50];

const ACTION_COSTS = [
  { label: "Escaneo OBD2", credits: CREDIT_COSTS.SCAN, icon: Zap },
  { label: "Reporte PDF", credits: CREDIT_COSTS.PDF_REPORT, icon: FileText },
  { label: "Consulta IA", credits: CREDIT_COSTS.AI_QUERY, icon: Bot },
  { label: "Monitoreo tiempo real", credits: CREDIT_COSTS.REALTIME, icon: TrendingUp },
];

export default function CreditosPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [balance, setBalance] = useState<CreditBalance | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [purchasing, setPurchasing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login?redirect=/creditos");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    return subscribeToCredits(user.uid, setBalance);
  }, [user]);

  const total = quantity * CREDIT_PRICE_MXN;

  const handlePurchase = async () => {
    if (!user || quantity < 1) return;
    setPurchasing(true);
    try {
      await purchaseCredits(user.uid, quantity);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setPurchasing(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft size={16} />
            Volver al dashboard
          </Link>
          <h1 className="text-3xl font-display font-bold">Sistema de créditos</h1>
          <p className="text-muted-foreground mt-1">Cada crédito cuesta <span className="font-semibold text-foreground">${CREDIT_PRICE_MXN} MXN</span>. Sin vencimiento.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Purchase card */}
          <div>
            {/* Current balance */}
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                  <Coins size={16} />
                  Balance actual
                </div>
                <span className="text-2xl font-display font-bold">{balance?.balance ?? 0}</span>
              </div>
            </div>

            {/* Quantity selector */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-semibold mb-4">¿Cuántos créditos quieres?</h2>

              {/* Quick amounts */}
              <div className="flex flex-wrap gap-2 mb-5">
                {QUICK_AMOUNTS.map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuantity(q)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                      quantity === q
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  min={1}
                  max={1000}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))}
                  className="flex-1 text-center text-2xl font-display font-bold bg-background border border-input rounded-xl py-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <button
                  onClick={() => setQuantity(Math.min(1000, quantity + 1))}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Summary */}
              <div className="bg-background border border-border rounded-xl p-4 mb-5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{quantity} crédito{quantity !== 1 ? "s" : ""} × ${CREDIT_PRICE_MXN} MXN</span>
                  <span className="font-semibold">${total} MXN</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Balance después</span>
                  <span className="font-semibold text-primary">
                    {(balance?.balance ?? 0) + quantity} créditos
                  </span>
                </div>
              </div>

              {/* Purchase button */}
              {success ? (
                <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 font-semibold text-sm">
                  <CheckCircle size={18} />
                  ¡{quantity} crédito{quantity !== 1 ? "s" : ""} agregado{quantity !== 1 ? "s" : ""}!
                </div>
              ) : (
                <button
                  onClick={handlePurchase}
                  disabled={purchasing || quantity < 1}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <ShoppingCart size={16} />
                  {purchasing ? "Procesando..." : `Comprar ${quantity} crédito${quantity !== 1 ? "s" : ""} — $${total} MXN`}
                </button>
              )}

              <p className="text-xs text-muted-foreground text-center mt-3">
                🔒 Simulación de pago · Los créditos se agregan al instante
              </p>
            </div>
          </div>

          {/* Info column */}
          <div className="space-y-6">
            {/* Benefits */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-semibold mb-4">Ventajas del sistema</h2>
              <div className="space-y-3">
                {[
                  { icon: Infinity, title: "Sin vencimiento", desc: "Tus créditos no caducan nunca." },
                  { icon: Coins, title: "Paga lo que usas", desc: "Sin cobros fijos ni suscripciones." },
                  { icon: TrendingUp, title: "Tiempo real", desc: "Tu saldo se actualiza al instante en web y app." },
                ].map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon size={15} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{b.title}</p>
                        <p className="text-xs text-muted-foreground">{b.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cost table */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-semibold mb-4">Costo por acción</h2>
              <div className="space-y-2">
                {ACTION_COSTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon size={14} className="text-muted-foreground" />
                        {item.label}
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="font-semibold text-primary flex items-center gap-1">
                          <Coins size={12} /> {item.credits}
                        </span>
                        <span className="text-muted-foreground text-xs">${item.credits * CREDIT_PRICE_MXN} MXN</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
