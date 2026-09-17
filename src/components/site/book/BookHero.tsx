import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { PURCHASE_URL } from "@/config/site";

export function BookHero() {
  return (
    <Section
      bleed="full"
      aria-labelledby="book-hero-title"
      className="pt-16 md:pt-24 lg:pt-28"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              The Book
            </p>
            <h1
              id="book-hero-title"
              className="mt-6 font-semibold leading-[0.95] tracking-[-0.02em]"
              style={{ fontSize: "var(--text-display)" }}
            >
              <span className="block text-[color:var(--color-fg-primary)]">BE THE</span>
              <span className="block text-[color:var(--color-accent-yellow)]">MIRROR</span>
            </h1>
            <p className="mt-6 max-w-xl text-[length:var(--text-body-lg)] leading-[1.55] text-[color:var(--color-fg-secondary)]">
              A Change Agent&rsquo;s Guide to Transformation for an AI World
            </p>
            <p className="mt-4 text-[length:var(--text-small)] tracking-wide text-[color:var(--color-fg-muted)]">
              Lois Wortley <span aria-hidden="true">&middot;</span> Ajay Ghanagam <span aria-hidden="true">&middot;</span> Hiren Doshi
            </p>
            <p className="mt-10 max-w-xl text-[length:var(--text-h3)] font-medium leading-snug text-[color:var(--color-fg-primary)]">
              Transformation changes when we change what we see.
            </p>
            <p className="mt-6 max-w-xl text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
              Technology can change quickly. Organizations rarely do.
            </p>
            <p className="mt-4 max-w-xl text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
              Be the Mirror explores the human side of transformation &mdash; how leadership, trust,
              resistance, behaviour, culture and the actions of change agents shape whether change
              becomes real.
            </p>
            <p className="mt-4 max-w-xl text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
              The book looks at transformation in a world increasingly shaped by AI, while keeping
              people at the center of the conversation.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={PURCHASE_URL} variant="primary">Buy the Book</Button>
              <Button href="#why-we-wrote-it" variant="secondary">Why we wrote it</Button>
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delayMs={120}>
            <figure className="relative mx-auto w-full max-w-[560px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-8 -z-10 blur-2xl"
                style={{
                  background:
                    "radial-gradient(60% 55% at 55% 45%, rgba(245,201,77,0.20), transparent 70%), radial-gradient(50% 60% at 30% 60%, rgba(62,199,255,0.18), transparent 75%)",
                }}
              />
              <Image
                src="/book-3-books.png"
                alt="Be the Mirror hardcover shown as three stacked copies"
                width={1402}
                height={1122}
                priority
                sizes="(min-width: 1024px) 560px, (min-width: 640px) 60vw, 90vw"
                className="h-auto w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
              />
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
