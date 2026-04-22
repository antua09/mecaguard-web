"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className={`w-9 h-9 rounded-xl ${className}`} />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`w-9 h-9 rounded-xl flex items-center justify-center border border-border hover:bg-accent transition-all ${className}`}
      aria-label="Cambiar tema"
    >
      {theme === "dark" ? (
        <Sun size={16} className="text-muted-foreground" />
      ) : (
        <Moon size={16} className="text-muted-foreground" />
      )}
    </button>
  );
}
