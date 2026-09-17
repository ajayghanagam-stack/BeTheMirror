import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary";
type Common = { variant?: Variant; className?: string; children: ReactNode };
type AsLink = Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[length:var(--text-button)] font-semibold tracking-wide uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent-yellow)] text-[color:var(--color-bg-primary)] hover:bg-[color-mix(in_srgb,var(--color-accent-yellow) 88%,white)]",
  secondary:
    "border border-[color:var(--color-border-subtle)] bg-transparent text-[color:var(--color-fg-primary)] hover:border-[color:var(--color-accent-cyan)] hover:text-[color:var(--color-accent-cyan)]",
};

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", className, children } = props;
  const classes = cn(base, variants[variant], className);
  if ("href" in props && props.href) {
    const { href, ...rest } = props as AsLink;
    return <Link href={href} className={classes} {...rest}>{children}</Link>;
  }
  const { variant: _v, className: _c, children: _ch, ...rest } = props as AsButton;
  return <button className={classes} {...rest}>{children}</button>;
}
