import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AuthorCard } from "@/components/ui/AuthorCard";
import { Reveal } from "@/components/motion/Reveal";

const AUTHORS = ["Lois Wortley", "Ajay Ghanagam", "Hiren Doshi"] as const;

export function AuthorsPreview() {
  return (
    <Section
      id="authors"
      aria-labelledby="authors-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-primary)]"
    >
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <SectionHeading eyebrow="Section 08" id="authors-title">
              Three perspectives.
              <br />
              One shared experience.
            </SectionHeading>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-8 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Transformation is never only about process or technology.
            </p>
          </Reveal>
          <Reveal delayMs={200}>
            <p className="mt-4 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Ultimately, it is about people.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {AUTHORS.map((name, i) => (
            <Reveal key={name} delayMs={100 * i}>
              <AuthorCard name={name} />
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={200}>
          <div className="mt-12">
            <Button href="/authors" variant="secondary">Meet the Authors</Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
