import type { IdeaMeta } from "@/content/ideas";
import { PullQuote } from "@/components/ui/PullQuote";

export const meta: IdeaMeta = {
  slug: "before-another-framework-look-in-the-mirror",
  title: "Before You Add Another Framework, Look in the Mirror",
  subtitle:
    "Frameworks are useful. They are also easy to hide behind.",
  summary:
    "Transformation programmes tend to acquire frameworks the way ships acquire barnacles. Before adding another one, it is worth asking whether the last three have been used well — and what that answer says about leadership.",
  category: "Book Insights",
  tags: ["frameworks", "reflection", "leadership"],
  author: "Be the Mirror Editorial",
  publishedDate: "2026-09-17",
  readingTime: 3,
  status: "published",
  relatedIdeaSlugs: [
    "transformation-intent-vs-experience",
    "why-people-resist-change",
  ],
  relatedResourceSlug: "be-the-mirror-leadership-checklist",
  mirrorQuestion:
    "Before adopting the next framework, what would happen if you asked how well the last one was actually being used — and what that answer says about how you are leading?",
};

export default function Body() {
  return (
    <>
      <p>
        There is nothing wrong with frameworks. Most transformations benefit from a clear one.
        The difficulty is that frameworks are also very easy to accumulate, and accumulating
        frameworks can feel productive without changing very much.
      </p>
      <h2>The framework instinct</h2>
      <p>
        When a transformation is not moving, the instinct is often to add structure. A new
        operating model. A new maturity matrix. A new stage-gate. Each addition sounds like
        progress. Each also delays the harder question of why the previous structure is not
        being used.
      </p>
      <PullQuote>
        Sometimes the most valuable thing a change agent can do is help an organization see
        itself more clearly — before adding one more thing to it.
      </PullQuote>
      <h2>The mirror question</h2>
      <p>
        Before adopting the next framework, it is worth asking a smaller question: how well is
        the last one being used, and what does that answer say about how the organization is
        being led? That reflection tends to be more useful than the framework it might replace.
      </p>
      <p>
        The point of a mirror is not to admire the reflection. It is to notice what needs to
        change on this side of the glass.
      </p>
    </>
  );
}
