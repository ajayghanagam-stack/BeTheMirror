"use client";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { NAV_ITEMS } from "@/lib/nav";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[color:var(--color-fg-primary)]"
      >
        <span className="sr-only">Menu</span>
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          {open ? (
            <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          ) : (
            <>
              <path d="M3 6h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M3 11h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M3 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        hidden={!open}
        className={cn(
          "fixed inset-0 z-50 flex flex-col",
          "bg-[color:var(--color-bg-primary)]/98 backdrop-blur-md"
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[color:var(--color-border-subtle)]">
          <span className="text-[length:var(--text-nav)] tracking-widest uppercase text-[color:var(--color-fg-secondary)]">
            Be the Mirror
          </span>
          <button
            ref={closeBtn}
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[color:var(--color-fg-primary)]"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile primary" className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="flex flex-col gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-disabled={!item.live || undefined}
                  className={cn(
                    "block text-3xl font-medium tracking-tight",
                    "text-[color:var(--color-fg-primary)] hover:text-[color:var(--color-accent-cyan)]",
                    !item.live && "opacity-70"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-6 pb-10">
          <Button href="#buy" variant="primary" className="w-full" onClick={() => setOpen(false)}>
            Buy the Book
          </Button>
        </div>
      </div>
    </div>
  );
}
