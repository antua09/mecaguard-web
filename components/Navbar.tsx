"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Zap, Menu, X, Coins, LogOut, User, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { subscribeToCredits } from "@/lib/credits";

const NAV_LINKS = [
  { href: "/funciones", label: "Funciones" },
  { href: "/planes", label: "Créditos" },
  { href: "/compatibilidad", label: "Compatibilidad" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToCredits(user.uid, (c) => setCredits(c?.balance ?? 0));
    return () => unsub();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap size={16} className="text-primary-foreground" />
          </div>
          <span>
            Meca<span className="text-primary">Guard</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === l.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user ? (
            <>
              {/* Credits badge */}
              <Link
                href="/creditos"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors"
              >
                <Coins size={14} />
                {credits !== null ? credits : "–"} créditos
              </Link>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent border border-border hover:border-primary/30 transition-all text-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <User size={12} className="text-primary" />
                  </div>
                  <span className="hidden md:block text-foreground max-w-[100px] truncate">
                    {user.displayName || user.email?.split("@")[0]}
                  </span>
                  <ChevronDown size={14} className="text-muted-foreground" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-lg py-1 z-50">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User size={14} />
                      Dashboard
                    </Link>
                    <Link
                      href="/creditos"
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Coins size={14} />
                      Mis créditos
                    </Link>
                    <div className="border-t border-border my-1" />
                    <button
                      onClick={() => { handleLogout(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut size={14} />
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Comenzar gratis
              </Link>
            </>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur px-4 py-4 space-y-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/creditos" className="flex items-center gap-2 px-3 py-2.5 text-sm text-primary" onClick={() => setMobileOpen(false)}>
                <Coins size={14} /> {credits ?? 0} créditos
              </Link>
              <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full text-left px-3 py-2.5 text-sm text-destructive">
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link href="/login" className="block px-3 py-2.5 text-sm" onClick={() => setMobileOpen(false)}>
              Iniciar sesión
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
