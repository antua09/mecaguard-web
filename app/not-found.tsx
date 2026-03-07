import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-mono text-8xl font-bold text-border mb-4 select-none">404</div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-electric to-cyan-glow flex items-center justify-center mx-auto mb-6">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <h1 className="font-display text-2xl font-bold text-text-primary mb-3">
          Página no encontrada
        </h1>
        <p className="text-text-secondary text-sm mb-7 max-w-sm mx-auto">
          La página que buscas no existe o fue movida. Vuelve al inicio para
          continuar.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-electric to-blue-600 hover:shadow-glow-sm transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
