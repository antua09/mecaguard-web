"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Coins, Zap, FileText, Bot, Activity, RotateCcw,
  TrendingUp, Plus, Clock, ChevronRight
} from "lucide-react";
import Link from "next/link";

const CREDIT_COSTS = [
  { action: "Lectura de códigos DTC", credits: 2, icon: Zap, color: "text-blue-400" },
  { action: "Diagnóstico completo", credits: 10, icon: Activity, color: "text-violet-400" },
  { action: "Reporte PDF", credits: 5, icon: FileText, color: "text-cyan-400" },
  { action: "Consulta IA", credits: 3, icon: Bot, color: "text-pink-400" },
  { action: "Monitoreo en tiempo real", credits: 1, icon: TrendingUp, color: "text-green-400" },
  { action: "Reset de códigos", credits: 2, icon: RotateCcw, color: "text-amber-400" },
];

const MOCK_TRANSACTIONS = [
  { type: "purchase", description: "Paquete Estándar", amount: 150, date: "hace 2 días" },
  { type: "usage", description: "Diagnóstico completo", amount: -10, date: "hace 1 día" },
  { type: "usage", description: "Reporte PDF", amount: -5, date: "hace 1 día" },
  { type: "usage", description: "Consulta IA", amount: -3, date: "hace 5 horas" },
  { type: "bonus", description: "Bono de bienvenida", amount: 10, date: "hace 2 días" },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [credits] = useState(142);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">
              Hola, {user.displayName?.split(" ")[0] || "Usuario"} 👋
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {user.email}
            </p>
          </div>
          <Link
            href="/planes"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            Comprar créditos
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Credits card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 text-primary mb-4">
              <Coins size={20} />
              <span className="text-sm font-semibold">Tus créditos</span>
            </div>
            <div className="text-5xl font-bold mb-1">{credits}</div>
            <p className="text-muted-foreground text-sm mb-6">créditos disponibles</p>
            <Link
              href="/planes"
              className="flex items-center justify-between w-full bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl px-4 py-3 text-sm transition-all group"
            >
              <span>Recargar créditos</span>
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Credit costs — SOLO VISIBLE EN APP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              Costo por acción
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CREDIT_COSTS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.action}
                    className="flex items-center justify-between bg-background rounded-xl px-4 py-3 border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={item.color} />
                      <span className="text-sm">{item.action}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                      <Coins size={13} />
                      {item.credits}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              Historial reciente
            </h2>
            <div className="space-y-2">
              {MOCK_TRANSACTIONS.map((tx, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${tx.type === "purchase" || tx.type === "bonus" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                      {tx.type === "purchase" || tx.type === "bonus" ? "+" : "-"}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.description}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock size={11} />
                        {tx.date}
                      </p>
                    </div>
                  </div>
                  <span className={`text-sm font-bold ${tx.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount} créditos
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}