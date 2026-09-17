import { Button } from "@/components/ui/Button";
import type { ResourceData } from "@/content/resources";
import { cn } from "@/lib/cn";

type Props = { resource: ResourceData; className?: string };

function ctaFor(resource: ResourceData): { label: string; href?: string; disabled: boolean } {
  if (resource.status === "available") {
    if (resource.downloadUrl) return { label: "Download", href: resource.downloadUrl, disabled: false };
    if (resource.externalUrl) return { label: "Open Resource", href: resource.externalUrl, disabled: false };
  }
  if (resource.status === "in-development") return { label: "In Development", disabled: true };
  return { label: "Coming Soon", disabled: true };
}

export function ResourceCard({ resource, className }: Props) {
  const cta = ctaFor(resource);
  const titleId = `resource-card-${resource.slug}-title`;
  const isPlaceholder = cta.disabled;
  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "flex h-full flex-col rounded-2xl border p-8",
        "border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-primary)]",
        className
      )}
    >
      <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-accent-cyan)]">
        {resource.type}
      </p>
      <h3
        id={titleId}
        className="mt-4 font-semibold leading-[1.15] tracking-[-0.01em] text-[color:var(--color-fg-primary)]"
        style={{ fontSize: "var(--text-h3)" }}
      >
        {resource.title}
      </h3>
      <p className="mt-4 flex-1 text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
        {resource.description}
      </p>
      <p className="mt-6 text-[length:var(--text-small)] uppercase tracking-[0.24em] text-[color:var(--color-fg-muted)]">
        For {resource.audience.join(", ")}
      </p>
      <div className="mt-6">
        {isPlaceholder ? (
          <span
            aria-disabled="true"
            className="inline-flex items-center rounded-full border border-[color:var(--color-border-subtle)] px-5 py-2 text-[length:var(--text-small)] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-fg-muted)]"
          >
            {cta.label}
          </span>
        ) : (
          <Button href={cta.href!} variant="primary">
            {cta.label}
          </Button>
        )}
      </div>
    </article>
  );
}
