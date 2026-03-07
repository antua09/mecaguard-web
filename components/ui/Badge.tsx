import { cn } from "@/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "cyan" | "violet" | "outline";
  className?: string;
}

const variants = {
  blue: "bg-blue-electric/10 text-blue-bright border-blue-electric/20",
  cyan: "bg-cyan-glow/10 text-cyan-400 border-cyan-glow/20",
  violet: "bg-violet-deep/10 text-violet-400 border-violet-deep/20",
  outline: "border-border text-text-secondary",
};

export function Badge({ children, variant = "blue", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
