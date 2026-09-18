import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { RESOURCES } from "@/content/resources";

export function FeaturedResource() {
  const featured = RESOURCES.find((r) => r.featured);
  if (!featured) return null;
  const available = featured.status === "available";
  const ctaLabel = available
    ? featured.downloadUrl
      ? "Download"
      : "Open Resource"
    : "Coming Soon";
  return (
    <Section
      aria-labelledby="featured-resource-title"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-[color:var(--color-accent-cyan-soft)] bg-[color:var(--color-bg-secondary)] p-8 md:p-12 lg:p-16">
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              Featured Resource &middot; {featured.type}
            </p>
            <h2
              id="featured-resource-title"
              className="mt-6 font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Before you ask your organization to change, ask yourself a few questions.
            </h2>
            <p className="mt-8 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              {featured.description}
            </p>
            <div className="mt-10">
              <span
                aria-disabled={available ? undefined : "true"}
                className="inline-flex items-center rounded-full border border-[color:var(--color-border-subtle)] px-5 py-2 text-[length:var(--text-small)] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-fg-muted)]"
              >
                {ctaLabel}
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
