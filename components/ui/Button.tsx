"use client";

import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "outline" | "ghost" | "gradient";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  as?: "button" | "a";
  href?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-blue-electric to-blue-600 text-white font-semibold hover:from-blue-bright hover:to-blue-electric hover:shadow-glow-blue",
  gradient:
    "bg-gradient-brand text-white font-semibold hover:opacity-90 hover:shadow-glow-blue",
  outline:
    "border border-blue-electric/40 text-blue-bright font-medium hover:border-blue-electric/80 hover:bg-blue-electric/8",
  ghost: "text-text-secondary font-medium hover:text-text-primary hover:bg-surface-2",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </span>
      )}
      <span className={cn(loading && "opacity-0")}>{children}</span>
    </motion.button>
  );
}
