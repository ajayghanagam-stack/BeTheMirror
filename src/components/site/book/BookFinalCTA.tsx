import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { PURCHASE_URL } from "@/config/site";

export function BookFinalCTA() {
  return (
    <Section
      bleed="full"
      aria-labelledby="book-final-cta-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              The Book
            </p>
            <h2
              id="book-final-cta-title"
              className="mt-6 font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-display)" }}
            >
              Ready to look at transformation{" "}
              <span className="text-[color:var(--color-accent-yellow)]">differently?</span>
            </h2>
            <p className="mt-8 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Be the Mirror invites leaders and change agents to look beyond tools and frameworks
              and examine how change is actually experienced.
            </p>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href={PURCHASE_URL} variant="primary">Buy the Book</Button>
              <Button href="/authors" variant="secondary">Meet the Authors</Button>
            </div>
            <a
              href="/speaking"
              className="mt-6 inline-block text-[length:var(--text-small)] text-[color:var(--color-accent-cyan)] hover:underline"
            >
              Invite the Authors &rarr;
            </a>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
