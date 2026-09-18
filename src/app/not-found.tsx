import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <Section className="py-[var(--spacing-section)]">
          <Container>
            <div className="flex flex-col items-center text-center gap-6 max-w-lg mx-auto">
              <h1 className="text-[length:var(--text-h1)] font-bold text-[color:var(--color-fg-primary)]">
                Not everything goes to plan.
              </h1>
              <p className="text-[length:var(--text-body-lg)] text-[color:var(--color-fg-secondary)]" style={{ lineHeight: "var(--text-body-lg--line-height)" }}>
                Neither does transformation. Return to Be the Mirror.
              </p>
              <Button href="/" variant="primary">Back to Home</Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
