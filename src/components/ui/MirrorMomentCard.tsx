import { MirrorMoment } from "@/components/ui/MirrorMoment";
import type { MirrorMomentData } from "@/content/mirror-moments";
import { cn } from "@/lib/cn";

type Props = { moment: MirrorMomentData; index: number; className?: string };

export function MirrorMomentCard({ moment, index, className }: Props) {
  return (
    <MirrorMoment index={index} className={className}>
      &ldquo;
      {moment.paragraphs.map((p, i) => {
        const isEmphasis = moment.emphasisIndex === i;
        const isLast = i === moment.paragraphs.length - 1;
        return (
          <span key={i}>
            <span
              className={cn(
                isEmphasis && "text-[color:var(--color-accent-yellow)]"
              )}
            >
              {p}
            </span>
            {isLast ? null : (
              <>
                <br />
                <br />
              </>
            )}
          </span>
        );
      })}
      &rdquo;
    </MirrorMoment>
  );
}
