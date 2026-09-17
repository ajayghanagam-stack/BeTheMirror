import type { IdeaMeta } from "@/content/ideas";
import { PullQuote } from "@/components/ui/PullQuote";

export const meta: IdeaMeta = {
  slug: "change-agents-dont-need-to-control-everything",
  title: "Change Agents Don\u2019t Need to Control Everything",
  subtitle:
    "The instinct to control the transformation is often the reason it does not travel.",
  summary:
    "Change agents are often rewarded for owning outcomes. That habit becomes a limit when the transformation depends on people making it their own. Letting go is a skill, not a failure.",
  category: "Change Agents",
  tags: ["ownership", "trust", "control"],
  author: "Be the Mirror Editorial",
  publishedDate: "2026-09-17",
  readingTime: 3,
  status: "published",
  relatedIdeaSlugs: [
    "before-another-framework-look-in-the-mirror",
    "ai-adoption-is-an-organizational-change-problem",
  ],
  relatedResourceSlug: "change-agent-reflection-guide",
  mirrorQuestion:
    "Where in this transformation are you holding on because it matters — and where are you holding on because letting go feels risky?",
};

export default function Body() {
  return (
    <>
      <p>
        Change agents tend to be organized, responsible and unusually willing to carry weight.
        These traits are how they became change agents. They are also how many transformations
        end up depending on a small group of people who cannot let go.
      </p>
      <h2>Control looks like ownership — until it doesn&rsquo;t</h2>
      <p>
        Holding the plan tightly early on is often the right move. Holding it tightly later,
        when the transformation needs to travel into the rest of the organization, quietly
        signals that no one else is trusted to hold it.
      </p>
      <PullQuote>
        A transformation that only works when the change agent is in the room has not
        transformed anything yet.
      </PullQuote>
      <h2>Letting go is a design choice</h2>
      <p>
        Handing ownership over is not the same as walking away. It is a deliberate choice about
        what the change agent still owns (the shape, the standards, the difficult conversations)
        and what the rest of the organization now owns (the practice, the decisions, the
        results).
      </p>
      <p>
        The change agents who make transformations stick tend to be the ones who work themselves
        out of the centre of the picture on purpose.
      </p>
    </>
  );
}
