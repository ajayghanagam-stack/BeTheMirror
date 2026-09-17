import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { BOOK_AUDIENCES } from "@/content/book";

export function WhoShouldRead() {
  return (
    <Section
      aria-labelledby="who-should-read-title"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Section 06" id="who-should-read-title" className="max-w-3xl">
            Who should read it
          </SectionHeading>
        </Reveal>
        <Reveal delayMs={100}>
          <p className="mt-6 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
            Written for the situations transformation puts people in &mdash; not simply for job titles.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-2 lg:gap-y-12">
          {BOOK_AUDIENCES.map((a, i) => (
            <Reveal as="li" key={a.situation} delayMs={80 * (i % 2)}>
              <div className="border-t border-[color:var(--color-border-subtle)] pt-6">
                {a.label ? (
                  <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-accent-cyan)]">
                    {a.label}
                  </p>
                ) : null}
                <p
                  className="mt-4 max-w-xl font-semibold leading-[1.25] tracking-[-0.01em] text-[color:var(--color-fg-primary)]"
                  style={{ fontSize: "var(--text-h3)" }}
                >
                  {a.situation}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
