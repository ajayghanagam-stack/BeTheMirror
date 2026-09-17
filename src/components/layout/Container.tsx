import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--container-site)]",
        "px-[var(--spacing-gutter)] md:px-[var(--spacing-gutter-md)] lg:px-[var(--spacing-gutter-lg)]",
        className
      )}
      {...props}
    />
  );
}
