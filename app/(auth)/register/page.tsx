"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Mail, Lock, User, Eye, EyeOff, Chrome, Zap } from "lucide-react";
import { registerWithEmail, loginWithGoogle } from "@/lib/firebase";
import { cn } from "@/utils/cn";

function friendlyError(code: string) {
  const map: Record<string,string> = {
    "auth/email-already-in-use": "Ya existe una cuenta con ese correo.",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
    "auth/invalid-email": "El formato del correo no es válido.",
    "auth/popup-closed-by-user": "Cerraste el popup de Google.",
  };
  return map[code] ?? "Ocurrió un error. Inténtalo de nuevo.";
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const input = cn("w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted/60 focus:outline-none focus:border-blue-electric/60 focus:ring-1 focus:ring-blue-electric/20 transition-all");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault(); setError(""); setLoading(true);
    try { await registerWithEmail(email, password, name); router.push("/dashboard"); }
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
            <div className="w-10 h-10 rounded-xl bg-blue-electric/20 border border-blue-electric/30 flex items-center justify-center"><Zap className="w-5 h-5 text-blue-electric"/></div>
            <span className="font-display text-xl font-bold text-text-primary">Meca<span className="text-blue-electric">Guard</span></span>
          </Link>
          <p className="text-text-secondary text-sm mt-3">Crea tu cuenta gratis</p>
        </div>
        <div className="glass-card rounded-2xl p-8 space-y-5">
          <button onClick={handleGoogle} disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border bg-surface-2 hover:bg-surface-2/80 text-sm font-medium text-text-primary transition-all disabled:opacity-60">
            <Chrome className="w-4 h-4"/> Registrarse con Google
          </button>
          <div className="flex items-center gap-3"><div className="flex-1 h-px bg-border"/><span className="text-xs text-text-muted">o con correo</span><div className="flex-1 h-px bg-border"/></div>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Nombre completo</label>
              <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"/>
                <input type="text" required value={name} onChange={e=>setName(e.target.value)} placeholder="Tu nombre" className={cn(input,"pl-10")}/>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Correo electrónico</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"/>
                <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@correo.com" className={cn(input,"pl-10")}/>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Contraseña</label>
              <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"/>
                <input type={showPass?"text":"password"} required minLength={6} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" className={cn(input,"pl-10 pr-10")}/>
                <button type="button" onClick={()=>setShowPass(p=>!p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">{showPass?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}</button>
              </div>
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-electric to-blue-600 text-white text-sm font-semibold hover:-translate-y-0.5 transition-all disabled:opacity-60">
              {loading ? "Creando cuenta..." : "Crear cuenta gratis"}
            </button>
            <p className="text-center text-xs text-text-muted">Al registrarte aceptas nuestros <Link href="/terminos" className="text-blue-electric hover:underline">Términos</Link> y <Link href="/privacidad" className="text-blue-electric hover:underline">Privacidad</Link></p>
          </form>
        </div>
        <p className="text-center text-xs text-text-muted mt-6">¿Ya tienes cuenta? <Link href="/login" className="text-blue-electric hover:underline">Iniciar sesión</Link></p>
      </motion.div>
    </div>
  );
}