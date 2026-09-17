import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "./HeroBackground";
import { BookVisual } from "./BookVisual";

export function Hero() {
  return (
    <Section
      bleed="full"
      aria-labelledby="hero-title"
      className="pt-16 md:pt-24 lg:pt-28"
    >
      <HeroBackground />
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-20">
          {/* LEFT */}
          <div className="order-2 lg:order-1">
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              Leadership · Change · Transformation
            </p>

            <h1
              id="hero-title"
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
              Lois Wortley <span aria-hidden="true">·</span> Ajay Ghanagam <span aria-hidden="true">·</span> Hiren Doshi
            </p>

            <p className="mt-10 max-w-xl text-[length:var(--text-h3)] font-medium leading-snug text-[color:var(--color-fg-primary)]">
              Transformation changes when we change what we see.
            </p>

            <p className="mt-6 max-w-xl text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
              Organizations invest heavily in technology, processes and AI. Yet transformation often
              succeeds or fails because of something much more human &mdash; leadership, trust,
              behaviour, resistance and our willingness to see what is really happening.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#buy" variant="primary">Buy the Book</Button>
              <Button href="#ideas" variant="secondary">Explore the Ideas</Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="order-1 lg:order-2">
            <BookVisual priority />
          </div>
        </div>
      </Container>
    </Section>
  );
}
