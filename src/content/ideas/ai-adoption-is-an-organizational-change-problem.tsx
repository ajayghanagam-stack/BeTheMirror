import type { IdeaMeta } from "@/content/ideas";
import { PullQuote } from "@/components/ui/PullQuote";

export const meta: IdeaMeta = {
  slug: "ai-adoption-is-an-organizational-change-problem",
  title: "AI Adoption Is an Organizational Change Problem",
  subtitle:
    "Most AI programmes are treated as technology deployments. They are actually asking people to work differently.",
  summary:
    "AI capabilities can be procured off the shelf. The trust, judgement and decision rights required to use them well cannot. Treating AI as a change programme, not a deployment, is where value shows up.",
  category: "AI Transformation",
  tags: ["ai", "adoption", "trust"],
  author: "Be the Mirror Editorial",
  publishedDate: "2026-09-17",
  readingTime: 3,
  featured: false,
  status: "published",
  relatedIdeaSlugs: [
    "technology-can-change-faster-than-organizations",
    "change-agents-dont-need-to-control-everything",
  ],
  relatedResourceSlug: "ai-transformation-readiness-checklist",
  mirrorQuestion:
    "Are you asking your organization to adopt an AI tool — or to change how decisions get made? The second is a much larger ask than the first.",
};

export default function Body() {
  return (
    <>
      <p>
        Almost every organization now has an AI initiative. Very few describe it as a change
        programme. That framing gap is where most of the practical difficulty lives.
      </p>
      <p>
        AI does not simply add capacity. It changes what people are being asked to do with their
        judgement, their time and their accountability.
      </p>
      <h2>What is actually being asked</h2>
      <p>
        Ask a knowledge worker to use a copilot and you are, in practice, asking them to trust a
        system they did not build, defend outputs they did not fully author, and change the
        rhythm of work that made them credible. That is not a training issue. It is a change of
        role.
      </p>
      <PullQuote>
        The organizations that get value from AI are usually not the ones with the best models.
        They are the ones who took the human questions seriously.
      </PullQuote>
      <h2>Three questions worth asking early</h2>
      <p>
        What becomes uncertain when AI enters this workflow? Who is accountable when the model is
        wrong? What does &ldquo;good&rdquo; look like when the work is being co-produced with a
        system?
      </p>
      <p>
        These are not procurement questions. They are transformation questions. Treated as
        such, they change what a successful AI programme actually looks like.
      </p>
    </>
  );
}
