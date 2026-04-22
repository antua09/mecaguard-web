"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Coins, Zap, FileText, Bot, Activity, RotateCcw,
  TrendingUp, Plus, Clock, ChevronRight, AlertTriangle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  subscribeToCredits,
  subscribeToTransactions,
  type CreditBalance,
  type Transaction,
  CREDIT_COSTS,
  CREDIT_PRICE_MXN,
} from "@/lib/credits";

const ACTION_COSTS = [
  { label: "Escaneo OBD2", credits: CREDIT_COSTS.SCAN, icon: Zap, color: "text-blue-400" },
  { label: "Reporte PDF", credits: CREDIT_COSTS.PDF_REPORT, icon: FileText, color: "text-cyan-400" },
  { label: "Consulta IA", credits: CREDIT_COSTS.AI_QUERY, icon: Bot, color: "text-violet-400" },
  { label: "Monitoreo en tiempo real", credits: CREDIT_COSTS.REALTIME, icon: TrendingUp, color: "text-green-400" },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [balance, setBalance] = useState<CreditBalance | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const u1 = subscribeToCredits(user.uid, setBalance);
    const u2 = subscribeToTransactions(user.uid, setTransactions, 10);
    return () => { u1(); u2(); };
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const lowCredits = (balance?.balance ?? 0) < 2;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">
              Hola, {user.displayName?.split(" ")[0] || "Usuario"} 👋
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{user.email}</p>
          </div>
          <Link
            href="/creditos"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            Comprar créditos
          </Link>
        </div>

        {/* Low credits warning */}
        {lowCredits && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-6">
            <AlertTriangle size={18} className="text-amber-400 shrink-0" />
            <p className="text-sm">
              Tus créditos están bajos.{" "}
              <Link href="/creditos" className="text-amber-400 font-medium hover:underline">
                Compra más por $20 MXN c/u →
              </Link>
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Credits card */}
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Coins size={18} />
              <span className="text-sm font-semibold">Tus créditos</span>
            </div>
            <div className="text-5xl font-display font-bold mb-1">
              {balance?.balance ?? 0}
            </div>
            <p className="text-muted-foreground text-sm mb-1">créditos disponibles</p>
            <p className="text-xs text-muted-foreground mb-6">
              Equivale a ${(balance?.balance ?? 0) * CREDIT_PRICE_MXN} MXN
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
              <div>
                <p className="font-semibold text-foreground">{balance?.totalPurchased ?? 0}</p>
                <p>Comprados</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">{balance?.totalUsed ?? 0}</p>
                <p>Usados</p>
              </div>
            </div>
            <Link
              href="/creditos"
              className="flex items-center justify-between w-full bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl px-4 py-3 text-sm transition-all group"
            >
              <span className="font-medium">Comprar créditos</span>
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Costs table — visible only here */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              Costo por acción
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ACTION_COSTS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center justify-between bg-background rounded-xl px-4 py-3 border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={15} className={item.color} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold text-primary">
                      <Coins size={12} />
                      {item.credits}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Cada crédito equivale a <span className="font-semibold text-foreground">${CREDIT_PRICE_MXN} MXN</span>
            </p>
          </div>

          {/* Transaction history */}
          <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
              Historial reciente
            </h2>

            {transactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                <Activity size={32} className="mx-auto mb-2 opacity-30" />
                Aún no hay transacciones
              </div>
            ) : (
              <div className="space-y-1">
                {transactions.map((tx, i) => (
                  <div key={tx.id || i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        tx.amount > 0 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                      }`}>
                        {tx.type === "purchase" ? "C" : tx.type === "bonus" ? "B" : "U"}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{tx.description}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={10} />
                          {tx.createdAt instanceof Date
                            ? tx.createdAt.toLocaleDateString("es-MX")
                            : "Reciente"}
                          {tx.priceMXN && ` · $${tx.priceMXN} MXN`}
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${tx.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                      {tx.amount > 0 ? "+" : ""}{tx.amount} créditos
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
