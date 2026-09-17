import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { BOOK_THEMES } from "@/content/book";

export function BookThemes() {
  return (
    <Section
      aria-labelledby="themes-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Section 05 &middot; Themes" id="themes-title" className="max-w-3xl">
            What you&rsquo;ll explore
          </SectionHeading>
        </Reveal>
        <Reveal delayMs={100}>
          <p className="mt-6 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
            Broad ideas the book returns to &mdash; not a chapter list. Actual chapter titles will be
            published as the book&rsquo;s final structure is confirmed.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-2 lg:gap-y-14">
          {BOOK_THEMES.map((t, i) => (
            <Reveal as="li" key={t.title} delayMs={80 * (i % 2)}>
              <div className="border-t border-[color:var(--color-border-subtle)] pt-6">
                <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-accent-cyan)]">
                  Theme / {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="mt-4 font-semibold leading-[1.2] tracking-[-0.01em] text-[color:var(--color-fg-primary)]"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  {t.title}
                </h3>
                <p className="mt-3 max-w-lg text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
                  {t.summary}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
