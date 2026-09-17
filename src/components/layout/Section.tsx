import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & { bleed?: "none" | "full" };

export function Section({ className, bleed = "none", ...props }: Props) {
  return (
    <section
      className={cn(
        "relative",
        bleed === "none" && "py-[var(--spacing-section)]",
        bleed === "full" && "py-[var(--spacing-section)] overflow-hidden",
        className
      )}
      {...props}
    />
  );
}
