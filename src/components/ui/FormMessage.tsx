import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type FormMessageProps = {
  variant: "error" | "info" | "success";
  children: ReactNode;
  className?: string;
};

export function FormMessage({ variant, children, className }: FormMessageProps) {
  const colorMap = {
    error: "text-red-400 bg-red-950/30 border border-red-800/40",
    info: "text-[color:var(--color-fg-secondary)] bg-[color:var(--color-bg-secondary)] border border-[color:var(--color-border-subtle)]",
    success: "text-[color:var(--color-accent-cyan)] bg-[color:var(--color-accent-cyan-soft)]/10 border border-[color:var(--color-accent-cyan)]/20",
  };

  return (
    <p
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "rounded-md px-4 py-3 text-[length:var(--text-body)]",
        colorMap[variant],
        className
      )}
    >
      {children}
    </p>
  );
}
