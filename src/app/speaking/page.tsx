// src/app/speaking/page.tsx
import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SpeakingHero } from "@/components/site/speaking/SpeakingHero";
import { WhyThisMatters } from "@/components/site/speaking/WhyThisMatters";
import { SpeakingTopics } from "@/components/site/speaking/SpeakingTopics";
import { SessionFormats } from "@/components/site/speaking/SessionFormats";
import { AudienceSection } from "@/components/site/speaking/AudienceSection";
import { TakeAways } from "@/components/site/speaking/TakeAways";
import { BookConnection } from "@/components/site/speaking/BookConnection";
import { SpeakingAuthors } from "@/components/site/speaking/SpeakingAuthors";
import { SpeakingFinalCTA } from "@/components/site/speaking/SpeakingFinalCTA";

export const metadata: Metadata = {
  title: "Speaking & Workshops | Be the Mirror",
  description:
    "Explore speaking sessions and workshops from Be the Mirror for leaders, change agents and organizations navigating transformation in an AI-driven world.",
  alternates: { canonical: "/speaking" },
};

export default function SpeakingPage() {
  return (
    <>
      <Header />
      <main id="main">
        <SpeakingHero />
        <WhyThisMatters />
        <SpeakingTopics />
        <SessionFormats />
        <AudienceSection />
        <TakeAways />
        <BookConnection />
        <SpeakingAuthors />
        <SpeakingFinalCTA />
      </main>
      <Footer />
    </>
  );
}
