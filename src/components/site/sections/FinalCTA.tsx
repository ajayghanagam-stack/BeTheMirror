import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { PURCHASE_URL } from "@/config/site";

export function FinalCTA() {
  return (
    <Section
      bleed="full"
      id="buy"
      aria-labelledby="final-cta-title"
      className="border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
              Section 09
            </p>
            <h2
              id="final-cta-title"
              className="mt-4 font-semibold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-fg-primary)]"
              style={{ fontSize: "var(--text-display)" }}
            >
              Change starts with what we are{" "}
              <span className="text-[color:var(--color-accent-yellow)]">willing to see</span>.
            </h2>
            <p className="mt-8 max-w-xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-secondary)]">
              Be the Mirror is an invitation to look differently at transformation &mdash; and at
              the role each of us plays in making change possible.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={PURCHASE_URL} variant="primary">Buy the Book</Button>
              <Button href="#ideas" variant="secondary">Explore the Ideas</Button>
            </div>
            <a
              href="/speaking"
              className="mt-6 inline-block text-[length:var(--text-small)] text-[color:var(--color-accent-cyan)] hover:underline"
            >
              Bring Be the Mirror to your organization &rarr;
            </a>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delayMs={120}>
            <div className="relative">
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
        </div>
      </Container>
    </Section>
  );
}
