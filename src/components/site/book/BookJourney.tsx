import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { BookChapter } from "@/components/ui/BookChapter";
import { CHAPTERS } from "@/content/book";

export function BookJourney() {
  return (
    <Section
      aria-labelledby="book-journey-title"
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Section 08" id="book-journey-title" className="max-w-3xl">
            Book journey
          </SectionHeading>
        </Reveal>

        {CHAPTERS.length === 0 ? (
          <Reveal delayMs={100}>
            <p className="mt-10 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-muted)]">
              Chapter-by-chapter overview coming soon.
            </p>
          </Reveal>
        ) : (
          <div className="mt-14 flex flex-col gap-10">
            {CHAPTERS.map((c) => (
              <Reveal key={c.number}>
                <BookChapter
                  number={c.number}
                  title={c.title}
                  summary={c.summary}
                  optionalQuote={c.optionalQuote}
                />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
