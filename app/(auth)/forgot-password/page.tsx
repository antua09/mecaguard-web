"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Mail, Zap, ArrowLeft, CheckCircle2 } from "lucide-react";
import { resetPassword } from "@/lib/firebase";
import { cn } from "@/utils/cn";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const input = "w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted/60 focus:outline-none focus:border-blue-electric/60 focus:ring-1 focus:ring-blue-electric/20 transition-all";

  async function handleReset(e: React.FormEvent) {
    e.preventDefault(); setError(""); setLoading(true);
    try { await resetPassword(email); setSent(true); }
    catch (err: any) {
      const m: Record<string,string> = { "auth/user-not-found": "No existe cuenta con ese correo.", "auth/invalid-email": "Correo inválido." };
      setError(m[err.code] ?? "Error. Inténtalo de nuevo.");
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-gradient-hero opacity-40"/>
      <div className="absolute inset-0 grid-pattern opacity-20"/>
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-electric/20 border border-blue-electric/30 flex items-center justify-center"><Zap className="w-5 h-5 text-blue-electric"/></div>
            <span className="font-display text-xl font-bold text-text-primary">Meca<span className="text-blue-electric">Guard</span></span>
          </Link>
        </div>
        <div className="glass-card rounded-2xl p-8">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto"><CheckCircle2 className="w-7 h-7 text-emerald-400"/></div>
              <h2 className="font-display text-lg font-bold text-text-primary">¡Correo enviado!</h2>
              <p className="text-sm text-text-secondary">Revisa tu bandeja en <strong>{email}</strong> y sigue las instrucciones.</p>
              <Link href="/login" className="inline-flex items-center gap-2 text-sm text-blue-electric hover:underline"><ArrowLeft className="w-4 h-4"/>Volver al login</Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-5">
              <div><h2 className="font-display text-lg font-bold text-text-primary mb-1">Recuperar contraseña</h2>
                <p className="text-sm text-text-secondary">Te enviaremos un link para restablecer tu contraseña.</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Correo</label>
                <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"/>
                  <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@correo.com" className={cn(input,"pl-10")}/>
                </div>
              </div>
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-electric to-blue-600 text-white text-sm font-semibold hover:-translate-y-0.5 transition-all disabled:opacity-60">
                {loading?"Enviando...":"Enviar instrucciones"}
              </button>
              <Link href="/login" className="flex items-center justify-center gap-2 text-xs text-text-muted hover:text-text-primary"><ArrowLeft className="w-3 h-3"/>Volver al login</Link>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}