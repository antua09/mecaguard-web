import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-display font-bold text-primary mb-4">404</p>
      <h1 className="text-2xl font-display font-bold mb-2">Página no encontrada</h1>
      <p className="text-muted-foreground mb-8">La página que buscas no existe.</p>
      <Link href="/" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
        Ir al inicio
      </Link>
    </div>
  );
}
