import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BookHero } from "@/components/site/book/BookHero";
import { CentralQuestion } from "@/components/site/book/CentralQuestion";
import { WhyWeWroteIt } from "@/components/site/book/WhyWeWroteIt";
import { TitleMetaphor } from "@/components/site/book/TitleMetaphor";
import { BookThemes } from "@/components/site/book/BookThemes";
import { WhoShouldRead } from "@/components/site/book/WhoShouldRead";
import { AIWorld } from "@/components/site/book/AIWorld";
import { BookJourney } from "@/components/site/book/BookJourney";
import { FromTheBook } from "@/components/site/book/FromTheBook";
import { BookEndorsements } from "@/components/site/book/BookEndorsements";
import { BookFinalCTA } from "@/components/site/book/BookFinalCTA";
import { ContinueExploringSection } from "@/components/site/book/ContinueExploringSection";

export const metadata: Metadata = {
  title: "Be the Mirror | The Book",
  description:
    "Discover Be the Mirror, A Change Agent\u2019s Guide to Transformation for an AI World by Lois Wortley, Ajay Ghanagam and Hiren Doshi — exploring leadership, people, resistance, trust and organizational change.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <Header />
      <main id="main">
        <BookHero />
        <CentralQuestion />
        <WhyWeWroteIt />
        <TitleMetaphor />
        <BookThemes />
        <WhoShouldRead />
        <AIWorld />
        <BookJourney />
        <FromTheBook />
        <BookEndorsements />
        <BookFinalCTA />
        <ContinueExploringSection />
      </main>
      <Footer />
    </>
  );
}
