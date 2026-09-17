import type { IdeaMeta } from "@/content/ideas";
import { PullQuote } from "@/components/ui/PullQuote";

export const meta: IdeaMeta = {
  slug: "technology-can-change-faster-than-organizations",
  title: "Technology Can Change Faster Than Organizations Can",
  subtitle: "A new platform is a decision. Adoption is a series of behaviours.",
  summary:
    "It is now possible to procure and deploy transformational technology in a quarter. The organizational work needed to actually use it well takes considerably longer — and that gap is where transformation lives.",
  category: "Transformation",
  tags: ["technology", "adoption", "capacity"],
  author: "Be the Mirror Editorial",
  publishedDate: "2026-09-17",
  readingTime: 3,
  status: "published",
  relatedIdeaSlugs: [
    "ai-adoption-is-an-organizational-change-problem",
    "transformation-intent-vs-experience",
  ],
  relatedResourceSlug: "ai-transformation-readiness-checklist",
  mirrorQuestion:
    "Which is moving faster in your organization — the technology you are deploying, or the capacity of your people to use it well?",
};

export default function Body() {
  return (
    <>
      <p>
        Buying transformational technology has never been easier. A cloud platform can be signed
        off in a quarter. A large language model can be integrated in weeks. A workflow tool can
        be piloted before the change plan is written.
      </p>
      <p>
        The organizational work of actually using that technology well tends to run on a
        different clock.
      </p>
      <h2>Two speeds, one transformation</h2>
      <p>
        Systems can be replaced quickly. Behaviours, decision rights, incentive structures and
        the assumptions built into how people work rarely can. The result is a familiar
        pattern: the technology arrives on time, the transformation does not.
      </p>
      <PullQuote>
        The gap between what an organization has installed and what it actually uses is often
        the most expensive part of any transformation programme.
      </PullQuote>
      <h2>Designing for the slower clock</h2>
      <p>
        Treating adoption as a phase after go-live tends to shorten the time available for the
        harder work. A more useful stance is to plan the human work backwards from the outcomes
        the technology is supposed to enable, and to give that work the same visibility that
        the technology decision receives.
      </p>
      <p>
        Otherwise, the organization ends up with new tools and old habits — and the transformation
        is judged by the habits.
      </p>
    </>
  );
}
