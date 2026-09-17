import type { IdeaMeta } from "@/content/ideas";
import { PullQuote } from "@/components/ui/PullQuote";

export const meta: IdeaMeta = {
  slug: "transformation-intent-vs-experience",
  title: "The Difference Between Transformation Intent and Transformation Experience",
  subtitle:
    "Leadership judges transformation by the plan. Everyone else judges it by what has actually happened.",
  summary:
    "The distance between what leadership announces and what people experience is often where transformations quietly break. Closing that distance is a leadership responsibility, not a communications one.",
  category: "Leadership",
  tags: ["intent", "experience", "communication"],
  author: "Be the Mirror Editorial",
  publishedDate: "2026-09-17",
  readingTime: 3,
  status: "published",
  relatedIdeaSlugs: [
    "why-people-resist-change",
    "before-another-framework-look-in-the-mirror",
  ],
  relatedResourceSlug: "leadership-reflection-questions",
  mirrorQuestion:
    "If you asked ten people three levels below you what the transformation feels like, would their answer resemble the one on your leadership deck?",
};

export default function Body() {
  return (
    <>
      <p>
        Every transformation carries two versions of itself. One lives in the strategy documents,
        the town-hall slides and the leadership team&rsquo;s intent. The other lives in the
        experience of the people the transformation is happening to.
      </p>
      <p>
        The two are rarely the same. When the gap grows, the transformation is judged by the
        second one.
      </p>
      <h2>Where the gap comes from</h2>
      <p>
        It rarely comes from bad intent. It comes from distance. Leadership sees the arc. People
        further from the strategy see today&rsquo;s workload, this quarter&rsquo;s targets, and
        the previous change that was announced with similar confidence and never finished.
      </p>
      <PullQuote>
        Transformation is not what leadership announces. It is what people experience.
      </PullQuote>
      <h2>Closing the gap is leadership work</h2>
      <p>
        Communications teams can describe the change. They cannot close the experience gap.
        That closure happens when leaders make decisions visible, take unfinished
        transformations seriously, and treat feedback from the front line as data rather than
        as noise to be managed.
      </p>
      <p>
        The organizations that pull this off tend to say less about the plan and more about the
        experience it is producing.
      </p>
    </>
  );
}
