import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { AUTHORS } from "@/content/authors";

export function AuthorsHero() {
  return (
    <Section
      bleed="full"
      aria-labelledby="authors-hero-title"
      className="pt-16 md:pt-24 lg:pt-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              The Authors
            </p>
            <h1
              id="authors-hero-title"
              className="mt-6 font-semibold leading-[0.98] tracking-[-0.02em]"
              style={{ fontSize: "var(--text-display)" }}
            >
              <span className="block text-[color:var(--color-fg-primary)]">Three perspectives.</span>
              <span className="block text-[color:var(--color-accent-yellow)]">One shared belief.</span>
            </h1>
          </Reveal>

          <Reveal delayMs={120}>
            <p className="mt-10 text-[length:var(--text-h3)] font-medium leading-snug text-[color:var(--color-fg-primary)]">
              Transformation is never only about process or technology.
            </p>
          </Reveal>
          <Reveal delayMs={200}>
            <p className="mt-4 text-[length:var(--text-h3)] font-medium leading-snug text-[color:var(--color-fg-secondary)]">
              Ultimately, it is about people.
            </p>
          </Reveal>

          <Reveal delayMs={280}>
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[length:var(--text-body-lg)] text-[color:var(--color-fg-secondary)]">
              {AUTHORS.map((a) => (
                <li key={a.slug}>
                  <a
                    href={`#${a.slug}`}
                    className="border-b border-[color:var(--color-border-subtle)] pb-1 hover:border-[color:var(--color-accent-cyan)] hover:text-[color:var(--color-fg-primary)]"
                  >
                    {a.name}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
