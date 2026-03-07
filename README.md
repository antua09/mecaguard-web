# MecaGuard — Web Oficial

Página web oficial de **MecaGuard**, plataforma de diagnóstico automotriz inteligente.

## Stack tecnológico

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — estilos utilitarios con tokens personalizados
- **Motion** (Framer Motion v11) — animaciones suaves
- **Zod** — validación de formularios
- **Lucide React** — iconos

## Estructura del proyecto

```
mecaguard/
├── app/                      # App Router (páginas)
│   ├── layout.tsx            # Layout raíz (fuentes, Navbar, Footer)
│   ├── page.tsx              # Home (/)
│   ├── funciones/            # /funciones
│   ├── compatibilidad/       # /compatibilidad
│   ├── planes/               # /planes
│   ├── faq/                  # /faq
│   ├── contacto/             # /contacto
│   ├── privacidad/           # /privacidad
│   ├── terminos/             # /terminos
│   └── not-found.tsx         # 404
├── components/               # Componentes reutilizables
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ContactForm.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       └── AnimatedSection.tsx
├── sections/                 # Secciones de la home
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── FeaturesHighlight.tsx
│   ├── TrustBar.tsx
│   ├── HomePricing.tsx
│   ├── HomeFAQ.tsx
│   └── CTA.tsx
├── lib/
│   ├── validations.ts        # Esquemas Zod
│   └── contact-action.ts     # Server action formulario
├── hooks/
│   └── useScrollReveal.ts
├── utils/
│   └── cn.ts                 # Utilidad clsx + tw-merge
├── styles/
│   └── globals.css           # Estilos base + variables CSS
├── public/                   # Assets estáticos
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

## Instalación y desarrollo

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo
npm run dev

# 3. Build producción
npm run build
npm start
```

## Paleta de colores

| Token           | Valor     | Uso                  |
|-----------------|-----------|----------------------|
| background      | #07080D   | Fondo principal      |
| surface         | #0D0F18   | Cards, nav           |
| blue-electric   | #2D7FFF   | Acento primario      |
| cyan-glow       | #00D4FF   | Acento secundario    |
| violet-deep     | #7B2FBE   | Acento terciario     |
| text-primary    | #F0F2FF   | Texto principal      |
| text-secondary  | #9AA0C4   | Texto secundario     |

## Tipografía

- **Display**: Syne (títulos, headings) — `font-display`
- **Body**: DM Sans (cuerpo de texto) — `font-body`
- **Mono**: Space Mono (datos técnicos, código) — `font-mono`

## Integrar el formulario de contacto

En `lib/contact-action.ts`, el servidor action simula el envío. Para integrar con un proveedor de email real:

```ts
// Ejemplo con Resend
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({ ... });
```

## Variables de entorno

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://mecaguard.app
RESEND_API_KEY=re_...   # Para emails de contacto
```

## SEO

Cada página tiene su propio `metadata` con title, description y OG tags. El layout raíz define los metadatos base y el `metadataBase`.

---

Desarrollado con ❤️ para MecaGuard.
