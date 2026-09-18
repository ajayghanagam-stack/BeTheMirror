// src/components/site/contact/ContactSection.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InquiryForm } from "@/components/site/contact/InquiryForm";
import type { EnquiryType } from "@/lib/enquiry";

type ContactSectionProps = {
  defaultEnquiryType: EnquiryType;
};

export function ContactSection({ defaultEnquiryType }: ContactSectionProps) {
  return (
    <Section id="inquiry-form" className="py-[var(--spacing-section)]">
      <Container>
        <SectionHeading eyebrow="Get in touch" id="inquiry-form-heading" align="left">
          Tell us about your inquiry.
        </SectionHeading>
        <div className="mt-10 max-w-2xl">
          <InquiryForm defaultEnquiryType={defaultEnquiryType} />
        </div>
      </Container>
    </Section>
  );
}
