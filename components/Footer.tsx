import Link from "next/link";
import { Zap, Twitter, Instagram, Linkedin, Youtube, Mail } from "lucide-react";

const footerLinks = {
  producto: [
    { href: "/funciones", label: "Funciones" },
    { href: "/compatibilidad", label: "Compatibilidad" },
    { href: "/planes", label: "Planes" },
    { href: "/faq", label: "Preguntas frecuentes" },
  ],
  empresa: [
    { href: "/contacto", label: "Contacto" },
    { href: "/blog", label: "Blog" },
    { href: "/privacidad", label: "Privacidad" },
    { href: "/terminos", label: "Términos de uso" },
  ],
  diagnostico: [
    { href: "/compatibilidad#obd2", label: "Qué es OBD2" },
    { href: "/compatibilidad#elm327", label: "Escáner ELM327" },
    { href: "/funciones#dtc", label: "Códigos DTC" },
    { href: "/funciones#sensores", label: "Sensores en tiempo real" },
  ],
};

const socialLinks = [
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 group mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-electric to-cyan-glow flex items-center justify-center shadow-glow-sm">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-text-primary tracking-tight">
                Meca<span className="gradient-text-blue">Guard</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs mb-6">
              Diagnóstico automotriz inteligente. Conecta tu escáner OBD2 y
              entiende tu vehículo como un profesional.
            </p>
            <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
              <Mail className="w-4 h-4 text-blue-electric" />
              <a
                href="mailto:hola@mecaguard.app"
                className="hover:text-text-secondary transition-colors"
              >
                hola@mecaguard.app
              </a>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-muted hover:text-text-secondary hover:border-border-light transition-all duration-200"
                >
                  <s.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
                {category === "producto"
                  ? "Producto"
                  : category === "empresa"
                  ? "Empresa"
                  : "Diagnóstico"}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} MecaGuard. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <Link href="/privacidad" className="hover:text-text-secondary transition-colors">
              Privacidad
            </Link>
            <span className="text-border">·</span>
            <Link href="/terminos" className="hover:text-text-secondary transition-colors">
              Términos
            </Link>
            <span className="text-border">·</span>
            <Link href="/contacto" className="hover:text-text-secondary transition-colors">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
