"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={`w-9 h-9 rounded-xl bg-secondary ${className}`} />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border border-border hover:border-primary/40 hover:bg-primary/10 ${className}`}
      aria-label="Cambiar tema"
    >
      {isDark ? (
        <Sun size={16} className="text-muted-foreground hover:text-primary transition-colors" />
      ) : (
        <Moon size={16} className="text-muted-foreground hover:text-primary transition-colors" />
      )}
    </button>
  );
}