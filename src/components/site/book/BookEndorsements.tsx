import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Testimonial } from "@/components/ui/Testimonial";
import { TESTIMONIALS } from "@/content/book";

export function BookEndorsements() {
  return (
    <Section
      aria-labelledby="endorsements-title"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Section 10" id="endorsements-title" className="max-w-3xl">
            What readers are saying
          </SectionHeading>
        </Reveal>

        {TESTIMONIALS.length === 0 ? (
          <Reveal delayMs={100}>
            <p className="mt-8 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-muted)]">
              Reader perspectives and endorsements coming soon.
            </p>
          </Reveal>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delayMs={100 * (i % 3)}>
                <Testimonial quote={t.quote} attribution={t.attribution} role={t.role} org={t.org} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
