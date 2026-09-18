// src/app/contact/page.tsx
import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ContactHero } from "@/components/site/contact/ContactHero";
import { ContactOptions } from "@/components/site/contact/ContactOptions";
import { ContactSection } from "@/components/site/contact/ContactSection";
import { coerceEnquiryType } from "@/lib/enquiry";

export const metadata: Metadata = {
  title: "Contact | Be the Mirror",
  description:
    "Contact the Be the Mirror authors about speaking, workshops, media, events and conversations about organizational transformation and change.",
  alternates: { canonical: "/contact" },
};

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const typeParam = Array.isArray(params.type) ? params.type[0] : params.type;
  const defaultEnquiryType = coerceEnquiryType(typeParam);

  return (
    <>
      <Header />
      <main id="main">
        <ContactHero />
        <ContactOptions />
        <ContactSection defaultEnquiryType={defaultEnquiryType} />
      </main>
      <Footer />
    </>
  );
}
