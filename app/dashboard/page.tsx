"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logout } from "@/lib/firebase";
import { LogOut, User, Zap, Activity, Car, ChevronRight } from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => { if (!loading && !user) router.push("/login"); }, [user, loading, router]);

  if (loading || !user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-blue-electric/30 border-t-blue-electric rounded-full animate-spin"/>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {user.photoURL ? <img src={user.photoURL} alt="" className="w-12 h-12 rounded-2xl object-cover"/> :
              <div className="w-12 h-12 rounded-2xl bg-blue-electric/10 border border-blue-electric/20 flex items-center justify-center"><User className="w-6 h-6 text-blue-electric"/></div>}
            <div>
              <h1 className="font-display text-xl font-bold text-text-primary">Hola, {user.displayName?.split(" ")[0] ?? "Usuario"} 👋</h1>
              <p className="text-xs text-text-secondary">{user.email}</p>
            </div>
          </div>
          <button onClick={async () => { await logout(); router.push("/"); }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-text-secondary hover:text-text-primary transition-all">
            <LogOut className="w-4 h-4"/> Salir
          </button>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Car, label: "Vehículos conectados", value: "0", color: "text-blue-electric", bg: "bg-blue-electric/10 border-blue-electric/20" },
            { icon: Activity, label: "Diagnósticos realizados", value: "0", color: "text-cyan-400", bg: "bg-cyan-400/10 border-cyan-400/20" },
            { icon: Zap, label: "Plan actual", value: "Free", color: "text-violet-400", bg: "bg-violet-400/10 border-violet-400/20" },
          ].map(s => (
            <div key={s.label} className="glass-card rounded-xl p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${s.bg}`}><s.icon className={`w-5 h-5 ${s.color}`}/></div>
              <div><p className="text-2xl font-display font-bold text-text-primary">{s.value}</p><p className="text-xs text-text-secondary">{s.label}</p></div>
            </div>
          ))}
        </div>
        <div className="glass-card rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-electric/10 border border-blue-electric/20 flex items-center justify-center mx-auto"><Car className="w-8 h-8 text-blue-electric"/></div>
          <h2 className="font-display text-lg font-bold text-text-primary">Conecta tu primer vehículo</h2>
          <p className="text-sm text-text-secondary max-w-sm mx-auto">Empieza a diagnosticar tu vehículo conectando tu escáner OBD2 con la app MecaGuard.</p>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-electric to-blue-600 text-white text-sm font-semibold hover:shadow-glow-blue transition-all">
            <Zap className="w-4 h-4"/> Comenzar diagnóstico <ChevronRight className="w-4 h-4"/>
          </button>
        </div>
      </div>
    </div>
  );
}