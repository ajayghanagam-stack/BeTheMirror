import { cn } from "@/lib/cn";

type Props = { className?: string };

export function MetaphorVisual({ className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "grid grid-cols-3 items-center gap-6 text-[color:var(--color-accent-cyan)]",
        className
      )}
    >
      {/* Fracture */}
      <svg viewBox="0 0 120 80" className="h-16 w-full" fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M6 74 L38 30 L48 46 L64 12 L82 44 L98 20 L114 74" />
        <path d="M6 74 L114 74" opacity="0.35" />
      </svg>
      {/* Reflection (mirror plane) */}
      <svg viewBox="0 0 120 80" className="h-16 w-full" fill="none" stroke="currentColor" strokeWidth="1.25">
        <rect x="30" y="14" width="60" height="52" rx="2" />
        <path d="M30 40 L90 40" strokeDasharray="2 3" opacity="0.55" />
      </svg>
      {/* Light */}
      <svg viewBox="0 0 120 80" className="h-16 w-full text-[color:var(--color-accent-yellow)]" fill="none" stroke="currentColor" strokeWidth="1.25">
        <circle cx="60" cy="40" r="10" />
        <g opacity="0.7">
          <path d="M60 12 L60 22" />
          <path d="M60 58 L60 68" />
          <path d="M32 40 L42 40" />
          <path d="M78 40 L88 40" />
          <path d="M40 20 L47 27" />
          <path d="M73 53 L80 60" />
          <path d="M80 20 L73 27" />
          <path d="M47 53 L40 60" />
        </g>
      </svg>
    </div>
  );
}
