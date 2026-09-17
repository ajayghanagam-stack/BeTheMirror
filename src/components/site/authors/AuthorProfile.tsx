import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { AuthorPerspective } from "@/components/ui/AuthorPerspective";
import type { Author } from "@/content/authors";
import { cn } from "@/lib/cn";

type Props = { author: Author; index: number };

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function AuthorProfile({ author, index }: Props) {
  const photoOnRight = index % 2 === 1;
  const titleId = `${author.slug}-title`;
  return (
    <Section
      aria-labelledby={titleId}
      className="border-t border-[color:var(--color-border-subtle)]"
    >
      <Container>
        <article id={author.slug} className="scroll-mt-24">
          <div className={cn(
            "grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-20",
          )}>
            <Reveal className={cn("order-1", photoOnRight ? "lg:order-2" : "lg:order-1")}>
              <div className="relative mx-auto w-full max-w-[440px]">
                {author.image ? (
                  <Image
                    src={author.image.src}
                    alt={author.image.alt}
                    width={author.image.width}
                    height={author.image.height}
                    sizes="(min-width: 1024px) 440px, 90vw"
                    className="h-auto w-full rounded-2xl"
                  />
                ) : (
                  <>
                    <div
                      aria-hidden="true"
                      className="flex aspect-[4/5] w-full items-center justify-center rounded-2xl border border-[color:var(--color-accent-cyan-soft)]"
                      style={{
                        background:
                          "radial-gradient(120% 80% at 30% 20%, var(--color-bg-secondary) 0%, var(--color-bg-primary) 70%)",
                      }}
                    >
                      <span
                        className="font-semibold tracking-[0.06em] text-[color:var(--color-fg-secondary)]"
                        style={{ fontSize: "var(--text-display)" }}
                      >
                        {initialsOf(author.name)}
                      </span>
                    </div>
                    <p className="mt-3 text-[length:var(--text-small)] text-[color:var(--color-fg-muted)]">
                      Author photograph &mdash; to be supplied.
                    </p>
                  </>
                )}
              </div>
            </Reveal>

            <Reveal
              className={cn("order-2", photoOnRight ? "lg:order-1" : "lg:order-2")}
              delayMs={120}
            >
              <p className="text-[length:var(--text-small)] font-semibold tracking-[0.28em] uppercase text-[color:var(--color-accent-cyan)]">
                Author &middot; {String(index + 1).padStart(2, "0")}
              </p>
              <h2
                id={titleId}
                className="mt-4 font-semibold leading-[1.05] tracking-[-0.015em] text-[color:var(--color-fg-primary)]"
                style={{ fontSize: "var(--text-h1)" }}
              >
                {author.name}
              </h2>
              <p className="mt-2 text-[length:var(--text-small)] uppercase tracking-[0.24em] text-[color:var(--color-fg-secondary)]">
                {author.role ?? "Author"}
              </p>

              {author.shortBio ? (
                <p className="mt-8 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-primary)]">
                  {author.shortBio}
                </p>
              ) : (
                <p className="mt-8 max-w-2xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-fg-muted)]">
                  Short introduction to be provided.
                </p>
              )}

              {author.fullBio ? (
                <p className="mt-6 max-w-2xl text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-secondary)]">
                  {author.fullBio}
                </p>
              ) : (
                <p className="mt-6 max-w-2xl text-[length:var(--text-body)] leading-[var(--text-body--line-height)] text-[color:var(--color-fg-muted)]">
                  Biography content to be provided.
                </p>
              )}

              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
                <div>
                  <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-fg-secondary)]">
                    Areas of experience
                  </p>
                  {author.expertise && author.expertise.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {author.expertise.map((e) => (
                        <li
                          key={e}
                          className="rounded-full border border-[color:var(--color-border-subtle)] px-3 py-1 text-[length:var(--text-small)] text-[color:var(--color-fg-primary)]"
                        >
                          {e}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-[length:var(--text-body)] text-[color:var(--color-fg-muted)]">
                      Areas of expertise to be provided.
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-[length:var(--text-small)] font-semibold tracking-[0.24em] uppercase text-[color:var(--color-fg-secondary)]">
                    Connect
                  </p>
                  {author.linkedinUrl ? (
                    <a
                      href={author.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex border-b border-[color:var(--color-accent-cyan-soft)] pb-1 text-[length:var(--text-body)] text-[color:var(--color-fg-primary)] hover:border-[color:var(--color-accent-cyan)] hover:text-[color:var(--color-accent-cyan)]"
                    >
                      LinkedIn
                    </a>
                  ) : (
                    <p className="mt-4 text-[length:var(--text-body)] text-[color:var(--color-fg-muted)]">
                      LinkedIn URL to be provided.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-10">
                <AuthorPerspective name={author.name} quote={author.perspective} />
              </div>
            </Reveal>
          </div>
        </article>
      </Container>
    </Section>
  );
}
