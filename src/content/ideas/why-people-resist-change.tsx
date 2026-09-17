import type { IdeaMeta } from "@/content/ideas";
import { PullQuote } from "@/components/ui/PullQuote";

export const meta: IdeaMeta = {
  slug: "why-people-resist-change",
  title: "Why People Resist Change — and Why That May Be Rational",
  subtitle: "Resistance is often labelled as a problem. It is more useful to treat it as information.",
  summary:
    "When a transformation stalls, leaders often ask why people are resisting. A more useful question is what the change is asking of them — and whether the answer makes resistance rational.",
  category: "Change Management",
  tags: ["resistance", "behaviour", "leadership"],
  author: "Be the Mirror Editorial",
  publishedDate: "2026-09-17",
  readingTime: 3,
  featured: true,
  status: "published",
  relatedIdeaSlugs: [
    "transformation-intent-vs-experience",
    "before-another-framework-look-in-the-mirror",
  ],
  relatedResourceSlug: "team-transformation-conversation-guide",
  mirrorQuestion:
    "If your transformation is struggling, are you looking first at the people resisting it — or at the environment that made resistance rational?",
};

export default function Body() {
  return (
    <>
      <p>
        When a transformation stalls, the language used to describe it says a great deal about
        where leadership is looking. People are called blockers. Teams are said to lack buy-in.
        A change management plan is judged to be under-communicated. Resistance becomes the
        problem to be managed.
      </p>
      <p>
        This framing is comfortable. It also tends to be inaccurate.
      </p>
      <h2>Resistance is usually a signal, not a personality trait</h2>
      <p>
        People do not, as a rule, resist change because they enjoy the friction. They resist
        specific changes for specific reasons. A new process removes the discretion that made
        their work valuable. A new tool asks them to trade fluency for uncertainty. A new
        structure quietly reduces the number of people who look like them at the top.
      </p>
      <p>
        Each of those is a rational response to information the transformation may not have
        acknowledged yet.
      </p>
      <PullQuote>
        Resistance is often the most honest feedback loop leadership has. It is worth listening
        to before it is worth solving.
      </PullQuote>
      <h2>A different question to ask</h2>
      <p>
        Rather than asking why people are resisting, it is more useful to ask what the change is
        asking of them, and whether the environment supports that ask. If the environment does
        not, resistance is not the problem. It is the accurate reading.
      </p>
      <p>
        That reading, taken seriously, is often where transformation actually begins.
      </p>
    </>
  );
}
