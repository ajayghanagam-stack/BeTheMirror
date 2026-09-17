import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function BookPreview() {
  return (
    <Section
      aria-labelledby="book-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
                style={{ background: "var(--color-accent-cyan-soft)" }}
              />
              <Image
                src="/book-3-books.png"
                alt="The Be the Mirror hardcover shown as three stacked copies"
                width={1402}
                height={1122}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delayMs={120}>
            <SectionHeading eyebrow="Section 07" id="book-title">
              The book
            </SectionHeading>

            <p
              className="mt-8 font-semibold leading-[1.15] tracking-[-0.01em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Three perspectives.
              <br />
              Years of transformation experience.
              <br />
              One central idea.
            </p>

            <p
              className="mt-8 max-w-xl font-medium leading-[1.35] text-[color:var(--color-accent-yellow)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              Are we willing to see what needs to change?
            </p>

            <p className="mt-8 max-w-xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Be the Mirror explores transformation from the perspective of the people who lead it,
              experience it and help organizations navigate it.
            </p>
            <p className="mt-4 max-w-xl text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
              It looks beyond tools and frameworks to the human realities of change &mdash;
              leadership, behaviour, trust, resistance, culture and the growing impact of AI.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#ideas" variant="secondary">Explore the Book</Button>
              <Button href="#buy" variant="primary">Buy the Book</Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
