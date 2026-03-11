"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Zap, Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/lib/firebase";
import { cn } from "@/utils/cn";

const NAV_LINKS = [
  { href: "/funciones", label: "Funciones" },
  { href: "/compatibilidad", label: "Compatibilidad" },
  { href: "/planes", label: "Planes" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  async function handleLogout() {
    await logout();
    setUserMenuOpen(false);
    router.push("/");
  }

  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "bg-background/90 backdrop-blur-md border-b border-border/50" : "bg-transparent")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-electric/20 border border-blue-electric/30 flex items-center justify-center"><Zap className="w-4 h-4 text-blue-electric"/></div>
            <span className="font-display text-lg font-bold text-text-primary">Meca<span className="text-blue-electric">Guard</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} className={cn("text-sm transition-colors", pathname===l.href ? "text-text-primary font-medium" : "text-text-secondary hover:text-text-primary")}>{l.label}</Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            {!loading && (user ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(p=>!p)} className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border hover:border-border/60 transition-all">
                  {user.photoURL ? <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full object-cover"/> :
                    <div className="w-6 h-6 rounded-full bg-blue-electric/20 flex items-center justify-center"><User className="w-3 h-3 text-blue-electric"/></div>}
                  <span className="text-sm text-text-primary font-medium">{user.displayName?.split(" ")[0] ?? "Mi cuenta"}</span>
                  <ChevronDown className="w-3 h-3 text-text-muted"/>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl p-2 border border-border shadow-xl">
                    <Link href="/dashboard" onClick={()=>setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-all"><User className="w-4 h-4"/>Mi dashboard</Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all"><LogOut className="w-4 h-4"/>Cerrar sesión</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Iniciar sesión</Link>
                <Link href="/register" className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-electric to-blue-600 text-white text-sm font-semibold hover:shadow-glow-blue hover:-translate-y-0.5 transition-all duration-200">Comenzar gratis</Link>
              </>
            ))}
          </div>
          <button onClick={() => setOpen(p=>!p)} className="md:hidden text-text-secondary hover:text-text-primary">
            {open ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map(l => (<Link key={l.href} href={l.href} onClick={()=>setOpen(false)} className="block text-sm text-text-secondary hover:text-text-primary py-1">{l.label}</Link>))}
            <div className="pt-3 border-t border-border space-y-2">
              {user ? (
                <><Link href="/dashboard" onClick={()=>setOpen(false)} className="block text-sm text-text-primary py-1">Mi dashboard</Link>
                <button onClick={handleLogout} className="text-sm text-red-400">Cerrar sesión</button></>
              ) : (
                <><Link href="/login" onClick={()=>setOpen(false)} className="block text-sm text-text-secondary py-1">Iniciar sesión</Link>
                <Link href="/register" onClick={()=>setOpen(false)} className="block w-full text-center px-4 py-2 rounded-xl bg-gradient-to-r from-blue-electric to-blue-600 text-white text-sm font-semibold">Comenzar gratis</Link></>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}