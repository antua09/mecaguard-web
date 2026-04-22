"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { registerWithEmail, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setLoading(true);
    try {
      await registerWithEmail(name, email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/email-already-in-use") {
        setError("Este correo ya tiene una cuenta. Inicia sesión.");
      } else if (code === "auth/weak-password") {
        setError("La contraseña es muy débil.");
      } else if (code === "auth/invalid-email") {
        setError("El correo no es válido.");
      } else {
        setError("Error al crear la cuenta. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      router.push("/dashboard");
    } catch {
      setError("Error al registrarse con Google.");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    "3 créditos gratis al registrarte",
    "Sin tarjeta de crédito requerida",
    "Acceso inmediato al dashboard",
  ];

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 font-display font-bold text-2xl mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Zap size={20} className="text-primary-foreground" />
          </div>
          Meca<span className="text-primary">Guard</span>
        </Link>
        <p className="text-muted-foreground text-sm mt-2">Crea tu cuenta gratis</p>
      </div>

      {/* Benefits */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {benefits.map((b) => (
          <div key={b} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle size={12} className="text-primary" />
            {b}
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-border bg-background hover:bg-accent transition-colors text-sm font-medium mb-6 disabled:opacity-50"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Registrarse con Google
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-px bg-border flex-1" />
          <span className="text-xs text-muted-foreground">o con correo</span>
          <div className="h-px bg-border flex-1" />
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1.5">Nombre completo</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                required
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-background border border-input text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Correo electrónico</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-background border border-input text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Contraseña</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
                className="w-full pl-9 pr-10 py-3 rounded-xl bg-background border border-input text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta gratis"}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Al registrarte aceptas nuestros{" "}
          <Link href="/terminos" className="text-primary hover:underline">Términos</Link>
          {" "}y{" "}
          <Link href="/privacidad" className="text-primary hover:underline">Privacidad</Link>
        </p>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-6">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}
