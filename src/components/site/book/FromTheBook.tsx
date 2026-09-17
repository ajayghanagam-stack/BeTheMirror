import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { EXCERPTS } from "@/content/book";

export function FromTheBook() {
  return (
    <Section
      bleed="full"
      aria-labelledby="from-the-book-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-[520px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
                style={{ background: "var(--color-accent-cyan-soft)" }}
              />
              <Image
                src="/book-lying-flat.png"
                alt="Be the Mirror hardcover lying flat"
                width={1254}
                height={1254}
                sizes="(min-width: 1024px) 520px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <SectionHeading eyebrow="Section 09" id="from-the-book-title">
                From the book
              </SectionHeading>
            </Reveal>

            {EXCERPTS.length === 0 ? (
              <Reveal delayMs={100}>
                <p className="mt-8 max-w-xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-muted)]">
                  Selected excerpts coming soon.
                </p>
              </Reveal>
            ) : (
              <ul className="mt-10 flex flex-col gap-10">
                {EXCERPTS.map((e, i) => (
                  <Reveal as="li" key={i} delayMs={80 * i}>
                    <blockquote className="max-w-xl border-l border-[color:var(--color-accent-cyan-soft)] pl-6 text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
                      &ldquo;{e.text}&rdquo;
                    </blockquote>
                    {e.source ? (
                      <p className="mt-3 text-[length:var(--text-small)] uppercase tracking-[0.24em] text-[color:var(--color-fg-secondary)]">
                        &mdash; {e.source}
                      </p>
                    ) : null}
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
