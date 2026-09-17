import { cn } from "@/lib/cn";

type Props = {
  name: string;
  role?: string;
  note?: string;
  className?: string;
};

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function AuthorCard({
  name,
  role = "Author",
  note = "[Biography coming in Phase 3]",
  className,
}: Props) {
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border p-6",
        "border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-secondary)]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="flex aspect-[4/5] w-full items-center justify-center rounded-xl border border-[color:var(--color-accent-cyan-soft)]"
        style={{
          background:
            "radial-gradient(120% 80% at 30% 20%, var(--color-bg-secondary) 0%, var(--color-bg-primary) 70%)",
        }}
      >
        <span
          className="font-semibold tracking-[0.06em] text-[color:var(--color-fg-secondary)]"
          style={{ fontSize: "var(--text-display)" }}
        >
          {initialsOf(name)}
        </span>
      </div>

      <h3
        className="mt-6 font-semibold tracking-[-0.005em] text-[color:var(--color-fg-primary)]"
        style={{ fontSize: "var(--text-h3)" }}
      >
        {name}
      </h3>
      <p className="mt-1 text-[length:var(--text-small)] uppercase tracking-[0.24em] text-[color:var(--color-accent-cyan)]">
        {role}
      </p>
      <p className="mt-3 text-[length:var(--text-small)] text-[color:var(--color-fg-muted)]">
        {note}
      </p>
    </article>
  );
}
