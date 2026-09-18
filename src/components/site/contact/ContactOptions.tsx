// src/components/site/contact/ContactOptions.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

type ContactOptionCard = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

const CONTACT_OPTIONS: readonly ContactOptionCard[] = [
  {
    title: "Speaking & Workshops",
    description:
      "Invite the authors to speak at your conference, leadership event, or executive offsite. We offer keynotes, workshops, panel participation, and virtual sessions.",
    ctaLabel: "Enquire about Speaking",
    ctaHref: "/contact?type=speaking#inquiry-form",
  },
  {
    title: "Media & Interviews",
    description:
      "Podcast appearances, editorial interviews, and media conversations about organizational transformation, AI adoption, and the ideas in Be the Mirror.",
    ctaLabel: "Enquire about Media",
    ctaHref: "/contact?type=media#inquiry-form",
  },
  {
    title: "General Enquiry",
    description:
      "For all other questions &mdash; about the book, bulk orders, or anything else &mdash; use the general enquiry form.",
    ctaLabel: "Send a General Enquiry",
    ctaHref: "/contact?type=general#inquiry-form",
  },
];

export function ContactOptions() {
  return (
    <Section className="py-[var(--spacing-section)] bg-[color:var(--color-bg-secondary)]">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {CONTACT_OPTIONS.map((option) => (
            <div
              key={option.title}
              className="flex flex-col gap-4 rounded-lg border border-[color:var(--color-border-subtle)] p-6"
            >
              <h2 className="text-[length:var(--text-h3)] font-semibold text-[color:var(--color-fg-primary)]">
                {option.title}
              </h2>
              <p
                className="text-[length:var(--text-body)] text-[color:var(--color-fg-secondary)] flex-1"
                dangerouslySetInnerHTML={{ __html: option.description }}
              />
              <a
                href={option.ctaHref}
                className="text-[length:var(--text-button)] text-[color:var(--color-accent-cyan)] hover:underline font-medium mt-auto"
              >
                {option.ctaLabel} &rarr;
              </a>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
