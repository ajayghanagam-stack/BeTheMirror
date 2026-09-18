import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import type { IdeaMeta } from "@/content/ideas";

type Props = { meta: IdeaMeta };

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function ArticleHeader({ meta }: Props) {
  return (
    <Section
      bleed="full"
      aria-labelledby="article-title"
      className="pt-16 md:pt-24 lg:pt-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              {meta.category}
            </p>
            <h1
              id="article-title"
              className="mt-6 font-semibold leading-[1.02] tracking-[-0.02em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              {meta.title}
            </h1>
            {meta.subtitle ? (
              <p className="mt-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
                {meta.subtitle}
              </p>
            ) : null}
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-10 text-[length:var(--text-small)] uppercase tracking-[0.24em] text-[color:var(--color-fg-muted)]">
              {meta.author} &middot; {formatDate(meta.publishedDate)} &middot; {meta.readingTime} min read
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
