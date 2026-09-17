import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

export function OpeningProvocation() {
  return (
    <Section
      aria-labelledby="provocation-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-primary)]"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p
              id="provocation-title"
              className="font-semibold leading-[1.1] tracking-[-0.015em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              &ldquo;What if the biggest obstacle to transformation isn&rsquo;t technology?&rdquo;
            </p>
          </Reveal>

          <Reveal delayMs={120}>
            <p
              className="mt-8 font-semibold leading-[1.1] tracking-[-0.015em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              &ldquo;What if it&rsquo;s what we{" "}
              <span className="text-[color:var(--color-accent-yellow)]">fail to see</span>?&rdquo;
            </p>
          </Reveal>

          <Reveal delayMs={220}>
            <p className="mx-auto mt-14 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Organizations often respond to transformation challenges by adding more technology,
              more process, more governance and more tools.
            </p>
          </Reveal>

          <Reveal delayMs={280}>
            <p className="mx-auto mt-6 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              But the deeper challenge may be leadership, trust, behaviour, alignment and the way
              people experience change.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
