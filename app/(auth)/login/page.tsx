"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, Chrome, Zap } from "lucide-react";
import { loginWithEmail, loginWithGoogle, sendMagicLink } from "@/lib/firebase";
import { cn } from "@/utils/cn";

type Tab = "password" | "magic";

function friendlyError(code: string) {
  const map: Record<string, string> = {
    "auth/invalid-credential": "Correo o contraseña incorrectos.",
    "auth/user-not-found": "No existe cuenta con ese correo.",
    "auth/wrong-password": "Contraseña incorrecta.",
    "auth/too-many-requests": "Demasiados intentos. Intenta más tarde.",
    "auth/popup-closed-by-user": "Cerraste el popup de Google.",
    "auth/network-request-failed": "Error de conexión.",
  };
  return map[code] ?? "Ocurrió un error. Inténtalo de nuevo.";
}

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicSent, setMagicSent] = useState(false);

  const input = cn("w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted/60 focus:outline-none focus:border-blue-electric/60 focus:ring-1 focus:ring-blue-electric/20 transition-all");

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault(); setError(""); setLoading(true);
    try { await loginWithEmail(email, password); router.push("/dashboard"); }
    catch (err: any) { setError(friendlyError(err.code)); }
    finally { setLoading(false); }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault(); setError(""); setLoading(true);
    try { await sendMagicLink(email); setMagicSent(true); }
    catch (err: any) { setError(friendlyError(err.code)); }
    finally { setLoading(false); }
  }

  async function handleGoogle() {
    setError(""); setLoading(true);
    try { await loginWithGoogle(); router.push("/dashboard"); }
    catch (err: any) { setError(friendlyError(err.code)); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-gradient-hero opacity-40" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-electric/20 border border-blue-electric/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-electric" />
            </div>
            <span className="font-display text-xl font-bold text-text-primary">Meca<span className="text-blue-electric">Guard</span></span>
          </Link>
          <p className="text-text-secondary text-sm mt-3">Inicia sesión en tu cuenta</p>
        </div>
        <div className="glass-card rounded-2xl p-8 space-y-6">
          <div className="flex gap-1 bg-surface-2 rounded-xl p-1">
            {(["password","magic"] as Tab[]).map(t => (
              <button key={t} onClick={() => { setTab(t); setError(""); setMagicSent(false); }}
                className={cn("flex-1 py-2 text-xs font-medium rounded-lg transition-all", tab===t ? "bg-blue-electric text-white" : "text-text-secondary hover:text-text-primary")}>
                {t === "password" ? "Contraseña" : "Magic Link"}
              </button>
            ))}
          </div>
          <button onClick={handleGoogle} disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border bg-surface-2 hover:bg-surface-2/80 text-sm font-medium text-text-primary transition-all disabled:opacity-60">
            <Chrome className="w-4 h-4" /> Continuar con Google
          </button>
          <div className="flex items-center gap-3"><div className="flex-1 h-px bg-border"/><span className="text-xs text-text-muted">o</span><div className="flex-1 h-px bg-border"/></div>
          {tab === "password" && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Correo</label>
                <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"/>
                  <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@correo.com" className={cn(input,"pl-10")}/>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Contraseña</label>
                <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"/>
                  <input type={showPass?"text":"password"} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" className={cn(input,"pl-10 pr-10")}/>
                  <button type="button" onClick={()=>setShowPass(p=>!p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">{showPass?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}</button>
                </div>
                <div className="flex justify-end mt-1.5"><Link href="/forgot-password" className="text-xs text-blue-electric hover:underline">¿Olvidaste tu contraseña?</Link></div>
              </div>
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-electric to-blue-600 text-white text-sm font-semibold hover:-translate-y-0.5 transition-all disabled:opacity-60">
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
            </form>
          )}
          {tab === "magic" && (
            magicSent ? (
              <div className="text-center py-4 space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto"><Mail className="w-6 h-6 text-emerald-400"/></div>
                <p className="text-sm font-medium text-text-primary">¡Revisa tu correo!</p>
                <p className="text-xs text-text-secondary">Enviamos un link a <strong>{email}</strong></p>
              </div>
            ) : (
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">Correo</label>
                  <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"/>
                    <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@correo.com" className={cn(input,"pl-10")}/>
                  </div>
                </div>
                {error && <p className="text-xs text-red-400">{error}</p>}
                <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-electric to-blue-600 text-white text-sm font-semibold hover:-translate-y-0.5 transition-all disabled:opacity-60">
                  {loading ? "Enviando..." : "Enviar magic link"}
                </button>
              </form>
            )
          )}
        </div>
        <p className="text-center text-xs text-text-muted mt-6">¿No tienes cuenta? <Link href="/register" className="text-blue-electric hover:underline">Crear cuenta gratis</Link></p>
      </motion.div>
    </div>
  );
}