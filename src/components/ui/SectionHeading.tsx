import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  id: string;
  align?: "left" | "center";
  className?: string;
  children: ReactNode;
};

export function SectionHeading({ eyebrow, id, align = "left", children, className }: Props) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "font-semibold leading-[1.05] tracking-[-0.015em] text-[color:var(--color-fg-primary)]",
          eyebrow ? "mt-4" : ""
        )}
        style={{ fontSize: "var(--text-h1)" }}
      >
        {children}
      </h2>
    </div>
  );
}
